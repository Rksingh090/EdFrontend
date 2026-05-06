import React, { useMemo, useRef, useState } from 'react'
import ModalForm from '../utils/ModalForm'

import ReactQuill from 'react-quill'

import { useCourse } from '../../context/CourseBuilderProvider';

import { MdOutlineClose } from 'react-icons/md';
import { BiImageAdd, BiImageAlt, BiLink } from 'react-icons/bi';
import { BsCodeSlash } from 'react-icons/bs';
import { ImHtmlFive } from 'react-icons/im';
import { AiOutlineDelete, AiOutlinePaperClip, AiOutlineYoutube } from 'react-icons/ai';
import { RiDeleteBin5Line, RiVimeoLine } from 'react-icons/ri';
import { TfiShortcode } from 'react-icons/tfi';
import QuillToolbar, { formats, modules } from '../utils/EditorToolbar';
import { uploadImage, uploadPdfFile, uploadVideo } from '../../functions/uploader';
import Switch from '../utils/Switch';
import ProgressBar from '../utils/ProgressBar';
import axios from 'axios';
import { API, BACKEND_URL } from '../../constant';
import SelectOption from '../utils/SelectOption';


const AddLessonForm = ({ showLesson }) => {

	const {
		setShowLessonForm, lessonData, setLessonData,
		lessonUpdateData, addNewLesson, closeLessonForm,
		updateLessonById
	} = useCourse();

	const reactQuillRef = useRef(null);
	const lessonPdfRef = useRef(null);
	const lessonHTML5VideoRef = useRef(null);

	const [videoUploading, setVideoUploading] = useState(false);
	const [progressPercent, setProgressPercent] = useState(0);

	const handleSubmit = () => {
		addNewLesson();
	}

	const handleUpdate = () => {
		updateLessonById()
	}

	// img upload and add to quill editor 
	const uploadImageInCourseLesson = () => {
		if (!reactQuillRef?.current) return;
		const editor = reactQuillRef.current.getEditor();
		console.log(editor)

		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();

		input.onchange = async () => {
			const file = input.files[0];
			if (/^image\//.test(file.type)) {
				const { status, imgUrl } = await uploadImage(file, "lesson-images"); // upload data into server or aws or cloudinary
				if (status === "success") {
					editor.insertEmbed(editor.getSelection(), "image", BACKEND_URL + "/" + imgUrl);
				}
			} else {
				alert('You could only upload images.');
			}
		};
	}

	const lessonModules = useMemo(() => ({
		...modules,
		toolbar: {
			...modules.toolbar,
			handlers: {
				...modules.toolbar.handlers,
				image: uploadImageInCourseLesson
			}
		}
	}), [])

	const handleUploadPDF = async (e) => {
		let pdfFile = e.target.files[0];
		if (!pdfFile || pdfFile === null) return;
		const { pdfUrl, pdfKey, status } = await uploadPdfFile(pdfFile, "lesson-pdf");
		if (status === "success") {
			setLessonData(prev => ({
				...prev,
				pdf_attachment: pdfUrl,
				pdf_attachment_name: pdfKey
			}))
		}
	}

	const handleUploadLessonVideo = async (e) => {
		setVideoUploading(true)
		let videoFile = e.target.files[0];
		if (!videoFile || videoFile === null) return;

		const formData = new FormData();
		formData.append("video", videoFile);

		const response = await axios.post(`${API}/upload/video?videoKey=lesson-video`, formData, {
			onUploadProgress: (p) => {
				console.log(p);
				const totalSize = p.total;
				const uploadSize = p.loaded;
				const uploadPercent = Math.floor((uploadSize * 100) / totalSize);
				setProgressPercent(uploadPercent)
			}
		});

		// const { videoUrl, videoKey, status } = await uploadVideo(videoFile, "lesson-video");

		const { videoUrl, videoKey, status } = response.data;

		if (status === "success") {
			setLessonData(prev => ({
				...prev,
				video_source_title: videoKey,
				video_source: BACKEND_URL + videoUrl,
			}))
		}
		setVideoUploading(false)
	}


	return (
		<ModalForm visible={showLesson}>
			<div className='lessonForm'>
				{/* quiz form header  */}
				<div className="assignmentHeader">
					<h1 className='lessonFormHeading'>Lesson</h1>
					<div className='closeAssignmentFormBtn'>
						<MdOutlineClose size={20} onClick={() => setShowLessonForm(false)} />
					</div>
				</div>

				{/* quiz form body */}
				<div className="quizFormBody">
					<div className='flex flex-col gap-4 p-4'>

						<div className='assignmentTitle'>
							<p className='quizFormInputText'>Lesson Title</p>
							<input
								value={lessonData?.title}
								onChange={(e) => setLessonData(prev => ({
									...prev,
									title: e.target.value
								}))}
								type="text" placeholder='Lesson Title' className='assignmentFormInput w-full'
							/>
						</div>

						<div className='assignButton'>
							<p className="quizFormInputText" htmlFor="">Lesson Note</p>
							<div className='w-full assignmentReactQuillContainer'>
								<QuillToolbar hasSeparation={true} />
								<ReactQuill theme={"snow"}
									value={lessonData?.lesson_content}
									onChange={(data) => setLessonData(prev => ({
										...prev,
										lesson_content: data
									}))}
									ref={reactQuillRef}
									formats={formats}
									modules={lessonModules}
									placeholder='Lesson Content...'
									className='assignmentReactQuill w-full'
								/>
							</div>
						</div>


						<div className='assignButton'>
							<p className="quizFormInputText">Featured Image</p>
							<div className='featuredImage'>
								<div className='placeholderImg'>
									{
										lessonData?.featured_image ? (
											<div className='featuredWithDel'>
												<img src={lessonData.featured_image} alt="" className="placeholder" />
												<div className='deleteIcon'>
													<RiDeleteBin5Line />
												</div>
											</div>
										)
											:
											(
												<>
													<BiImageAdd size={25} />
													<span>Upload Image</span>
												</>
											)

									}
								</div>
								<div className='featuredImagePrequisites'>
									<span>Size: 700x430 pixels</span>
									<span>File Support: jpg, .jpeg,. gif, or .png.</span>
									<button className='featuredUploadBTN'>
										<BiImageAlt />
										<span>Upload Image</span>
									</button>
								</div>
							</div>
						</div>

						<div className='assignButton'>
							<p className="quizFormInputText">Video Source</p>
							{/* <div className='customSelectInput'>
								<div className='fixedSelectIcon'>
									{lessonData.video_source_type === "html5" && (
										<ImHtmlFive size={20} />
									)}
									{lessonData.video_source_type === "embeded" && (
										<BsCodeSlash size={20} />
									)}
									{lessonData.video_source_type === "external-url" && (
										<BiLink size={20} />
									)}
									{lessonData.video_source_type === "youtube" && (
										<AiOutlineYoutube size={20} />
									)}
									{lessonData.video_source_type === "vimeo" && (
										<RiVimeoLine size={20} />
									)}
									{lessonData.video_source_type === "shortcode" && (
										<TfiShortcode size={20} />
									)}
								</div>

								<select
									value={lessonData.video_source_type}
									onChange={(e) => {
										setLessonData(prev => ({
											...prev,
											video_source: "",
											video_source_type: e.target.value
										}))
									}}
									className='padding'>
									<option value="none">None</option>
									<option value="html5">HTML 5(mp4)</option>
									<option value="external-url">External URL</option>
									<option value="youtube">YouTube</option>
									<option value="vimeo">Vimeo</option>
									<option value="embeded">Embeded</option>
									<option value="shortcode">Shortcode</option>
								</select>
							</div> */}

							<SelectOption
								iconField={"icon"}
								valueField={"value"}
								textField={"text"}
								options={[
									{ value: "html5", text: "HTML 5", icon: <ImHtmlFive size={16} /> },
									{ value: "external-url", text: "External URL", icon: <BiLink size={16} /> },
									{ value: "youtube", text: "Youtube", icon: <AiOutlineYoutube size={16} /> },
									{ value: "vimeo", text: "Vimeo", icon: <RiVimeoLine size={16} /> },
									{ value: "embeded", text: "Embdeded", icon: <BsCodeSlash size={16} /> },
									{ value: "shortcode", text: "Shortcdoe", icon: <TfiShortcode size={16} /> },
								]}
								onChange={(value) => {
									setLessonData(prev => ({
										...prev,
										video_source: "",
										video_source_type: value
									}))
								}}
								label={"Select Video Source"}
								value={lessonData?.video_source_type}
								style={{
									minHeight: "40px"
								}}
								optionClass={"flexRowCenter gap1"}
								maxHeight={"200px"}
							/>

							{videoUploading && (
								<ProgressBar progress={progressPercent} />
							)}
							{videoUploading && (
								<div>
									<p>Please wait untill full video uploaded.</p>
								</div>
							)}

							{lessonData.video_source_type === "html5" && (
								<>

									{
										lessonData.video_source &&
											lessonData.video_source !== "" ? (
											<div className='h-max w-full overflow-hidden'>
												<video controls>
													<source src={lessonData.video_source} />
												</video>
											</div>

										) : (
											<div className='videoSource noPadding html5Style'>
												<span className='bold'>Drag & Drop Your Video</span>
												<span>File Format: .mp4</span>
												<span>or</span>
												<button className="browseVideo" onClick={() => lessonHTML5VideoRef.current && lessonHTML5VideoRef?.current?.click()}>Browse File</button>
												<input type="file" hidden={true} onChange={handleUploadLessonVideo} ref={lessonHTML5VideoRef} accept="video/mp4" />
											</div>
										)
									}
								</>
							)}

							{lessonData.video_source_type === "external-url" && (
								<div className='videoSource externalUrl'>
									<input type="text"
										value={lessonData.video_source}
										onChange={(e) => setLessonData(prev => ({
											...prev,
											video_source: e.target.value
										}))}
										placeholder='Paste External Video URL' />
								</div>
							)}
							{lessonData.video_source_type === "youtube" && (
								<div className='videoSource youtubeURL'>
									<input type="text"
										value={lessonData.video_source}
										onChange={(e) => setLessonData(prev => ({
											...prev,
											video_source: e.target.value
										}))}
										placeholder='Paste Youtube Video URL' />
								</div>
							)}
							{lessonData.video_source_type === "vimeo" && (
								<div className='videoSource vimeoURL'>
									<input type="text"
										value={lessonData.video_source}
										onChange={(e) => setLessonData(prev => ({
											...prev,
											video_source: e.target.value
										}))}
										placeholder='Paste Vimeo Video URL' />
								</div>
							)}

							{lessonData.video_source_type === "embeded" && (
								<div className='videoSource embededCoded'>
									<textarea
										value={lessonData.video_source}
										onChange={(e) => setLessonData(prev => ({
											...prev,
											video_source: e.target.value
										}))}
										rows={6} placeholder='Place your embed code here'></textarea>
								</div>
							)}

							{lessonData.video_source_type === "shortcode" && (
								<div className='videoSource shortCode'>
									<input
										value={lessonData.video_source}
										onChange={(e) => setLessonData(prev => ({
											...prev,
											video_source: e.target.value
										}))}
										type="text" placeholder='Paste Shortcode' />
								</div>
							)}
						</div>

						<div className='assignButton'>
							<p className="quizFormInputText">Video Playback Time</p>
							<div className='playBackTimeGrid'>
								<div className="timeInput">
									<input
										value={lessonData.video_playback_time?.hour}
										onChange={(e) => setLessonData(prev => ({
											...prev,
											video_playback_time: {
												...prev.video_playback_time,
												hour: Number(e.target.value)
											}
										}))}
										type="number" id="hour" className='noNumberStyle' />
									<label htmlFor="hour">Hour</label>
								</div>
								<div className="timeInput">
									<input
										value={lessonData.video_playback_time?.minute}
										onChange={(e) => setLessonData(prev => ({
											...prev,
											video_playback_time: {
												...prev.video_playback_time,
												minute: Number(e.target.value)
											}
										}))}
										type="number" id="minute" className='noNumberStyle' />
									<label htmlFor="minute">Minute</label>
								</div>
								<div className="timeInput">
									<input
										value={lessonData.video_playback_time?.second}
										onChange={(e) => setLessonData(prev => ({
											...prev,
											video_playback_time: {
												...prev.video_playback_time,
												second: Number(e.target.value)
											}
										}))}
										type="number" id="second" className='noNumberStyle' />
									<label htmlFor="second">Second</label>
								</div>
							</div>
						</div>

						<div className='assignButton'>
							{
								(
									!lessonData?.pdf_attachment ||
									lessonData?.pdf_attachment === ""
								) ?
									(
										<div className='uploadPDFs'>
											<button onClick={() => lessonPdfRef?.current && lessonPdfRef?.current?.click()}>
												<AiOutlinePaperClip size={20} />
												<span>Upload PDF</span>
											</button>
											<input type="file" hidden={true} onChange={handleUploadPDF} ref={lessonPdfRef} accept="application/pdf" />
										</div>
									)
									: (
										<div className='removeAssignmentPdf'>
											<div className='pdfFile'>
												<span>PDF File: {lessonData?.pdf_attachment_name}</span>
												<div className={"removePdf"} onClick={() => setLessonData(prev => ({ ...prev, pdf_attachment: "", pdf_attachment_name: "" }))}>
													<AiOutlineDelete size={15} />
												</div>
											</div>
										</div>
									)
							}
						</div>

						<div className="qfpInputDiv">
							<p>Enable Course Preview</p>
							<Switch value={lessonData.preview_available} onChange={(value) => setLessonData((prev) => ({ ...prev, preview_available: value }))} />
						</div>

					</div>
				</div>

				{/* quiz form footer  */}
				<div className="quizFormFooter">
					<QuizFormFooter
						submitText={lessonUpdateData.isEditType ? "Update Lesson" : "Add Lesson"}
						onSubmit={() => { lessonUpdateData.isEditType ? handleUpdate() : handleSubmit() }}
						onCancle={() => closeLessonForm()} />
				</div>
			</div>
		</ModalForm>
	)
}

const QuizFormFooter = ({ enableBack, onBack, onSubmit, submitText, onCancle }) => {
	return (
		<div className='widthManager quizFooterBTNs'>
			<button className='qCancleBtn' onClick={onCancle}>Cancle</button>
			<div className='qFormAdjBTNS'>
				{enableBack === true && <button className='qCancleBtn' onClick={onBack}>Back</button>}
				<button className='qSubmitBtn' onClick={onSubmit}>{submitText}</button>
			</div>
		</div>
	)
}


export default AddLessonForm