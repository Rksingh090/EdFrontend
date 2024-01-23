import React, { useMemo, useRef } from 'react'
import ModalForm from '../utils/ModalForm';
import ReactQuill from 'react-quill';

import { useCourse } from '../../context/CourseBuilderProvider';

import { TbPaperclip } from 'react-icons/tb';
import { MdOutlineClose } from 'react-icons/md';
import { BiInfoCircle } from 'react-icons/bi';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { uploadImage, uploadPdfFile } from '../../functions/uploader';
import { AiOutlineDelete } from 'react-icons/ai';
import QuillToolbar, { formats, modules } from '../utils/EditorToolbar';
import Switch from '../utils/Switch';
import { QuizFormFooter } from './FormFooter';

const AssignmentForm = ({ showAssignment }) => {

	const assignmentPDFRef = useRef();
	const quillRef = useRef(null);

	const { closeAssignmentForm, assignmentUpdateData, createNewAssignment,
		updateAssignmentData, assignmentData, setAssignmentData } = useCourse();

	const handleSubmit = () => {
		createNewAssignment()
	}

	const handleUpdate = () => {
		updateAssignmentData()
	}

	// handle upload pdf
	const handleUploadPDF = async (e) => {
		let pdfFile = e.target.files[0];
		if (!pdfFile || pdfFile === null) return;
		const { pdfUrl, pdfKey, status } = await uploadPdfFile(pdfFile);
		if (status === "success") {
			setAssignmentData(prev => ({
				...prev,
				assignment_pdf: pdfUrl,
				pdf_name: pdfKey
			}))
		}
	}


	// upload quil image 
	const uploadQuilImage = () => {
		if (!quillRef?.current) return;
		const editor = quillRef.current.getEditor();
		console.log(editor)

		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();

		input.onchange = async () => {
			const file = input.files[0];
			if (/^image\//.test(file.type)) {
				const { status, imgUrl } = await uploadImage(file, "assignmentImg"); // upload data into server or aws or cloudinary
				if (status === "success") {
					editor.insertEmbed(editor.getSelection(), "image", imgUrl);
				}
			} else {
				alert('You could only upload images.');
			}
		};
	};

	const memoModules = useMemo(() => ({
		...modules,
		toolbar: {
			...modules.toolbar,
			handlers: {
				...modules.toolbar.handlers,
				image: uploadQuilImage
			}
		}
	}), [])


	const handleQuillChange = (value) => {
		setAssignmentData(prev => ({ ...prev, description: value }))
	}


	return (
		<ModalForm visible={showAssignment}>
			<div className='assignmentform'>
				{/* quiz form header  */}
				<div className="assignmentHeader">
					<h2 className='assignmentFormHeading'>Assignment</h2>
					<div className='closeAssignmentFormBtn'>
						<MdOutlineClose size={20} onClick={() => closeAssignmentForm()} />
					</div>
				</div>

				{/* quiz form body */}
				<div className="quizFormBody">
					<div className='flex flex-col gap-4 p-4'>
						<div className='assignmentTitle'>
							<p className='quizFormInputText'>Assignment Title</p>
							<input value={assignmentData?.title} onChange={(e) => setAssignmentData(prev => ({ ...prev, title: e.target.value }))} type="text" placeholder='Assignments' className='assignmentFormInput w-full' />
						</div>
						<div className='assignButton'>
							<p className="quizFormInputText" htmlFor="">Summary</p>
							<button className='addAssignmentMedia'>
								<BsMusicNoteBeamed />
								<span>Add Media</span>
							</button>
						</div>

						<div className='assignmentQuilTool assignmentReactQuillContainer'>
							<QuillToolbar hasSeparation={true} />
							<ReactQuill
								modules={memoModules}
								formats={formats}
								ref={quillRef}
								theme={"snow"}
								className='assignmentReactQuill'
								value={assignmentData?.description}
								onChange={handleQuillChange}
							/>
						</div>

						{
							assignmentData?.assignment_pdf === "" ?
								(
									<div className='uploadPDFs'>
										<button onClick={() => assignmentPDFRef?.current && assignmentPDFRef?.current?.click()}>
											<IoCloudUploadOutline size={20} />
											<span>Upload Pdf</span>
										</button>
										<input type="file" hidden={true} onChange={handleUploadPDF} ref={assignmentPDFRef} accept="application/pdf" />
									</div>
								)
								: (
									<div className='removeAssignmentPdf'>
										<div className='pdfFile'>
											<span>PDF File: {assignmentData?.pdf_name}</span>
											<div className={"removePdf"} onClick={() => setAssignmentData(prev => ({ ...prev, assignment_pdf: "", pdf_name: "" }))}>
												<AiOutlineDelete size={15} />
											</div>
										</div>
									</div>
								)
						}


						<div className='assignButton'>
							<p className="quizFormInputText">Attachments</p>
							<button className='uploadAttachemnts'>
								<TbPaperclip size={20} />
								Upload Attachments
							</button>
						</div>
					</div>

					<div className='contentDrip p-4'>
						<p className="quizFormInputText">Content Drip Settings</p>
						<p className='unlocking'>Unlocking date</p>
						<input
							value={String(assignmentData?.unlocking_date).substring(0, 16)}
							onChange={(e) => setAssignmentData(prev => ({ ...prev, unlocking_date: e.target.value }))}
							type="datetime-local" className='assignmentFormInput' />
					</div>

					<div className='assignmentBodyThirdSection'>
						<div className='timeLimitDiv'>
							<p className='quizFormInputText'>Time Limit</p>
							<div className='flex gap-2'>
								<input
									value={assignmentData?.time_limit}
									onChange={(e) => setAssignmentData(prev => ({ ...prev, time_limit: Number(e.target.value) }))}
									type="Number" className='assignmentFormInput' />
								<select className='assignmentFormInput'
									value={assignmentData?.time_limit_type}
									onChange={(e) => setAssignmentData(prev => ({ ...prev, time_limit_type: e.target.value }))}
								>
									<option value="minute">Minute</option>
									<option value="hour">Hour</option>
									<option value="day">Day</option>
									<option value="month">Month</option>
								</select>
							</div>
						</div>

						<div className='inputWithHeadingInfo'>
							<p className='quizFormInputText'>Total Points</p>
							<input
								value={assignmentData?.total_points}
								onChange={(e) => setAssignmentData(prev => ({ ...prev, total_points: Number(e.target.value) }))}
								type="Number" className='assignmentFormInput' />
							<div className='infoIconText'>
								<BiInfoCircle />
								<p>Maximum points a student can score</p>
							</div>
						</div>

						<div className='inputWithHeadingInfo'>
							<p className='quizFormInputText'>Minimum Pass Points</p>
							<input
								value={assignmentData?.passing_point}
								onChange={(e) => setAssignmentData(prev => ({ ...prev, passing_point: Number(e.target.value) }))}
								type="Number" className='assignmentFormInput' />
							<div className='infoIconText'>
								<BiInfoCircle />
								<p>Minimum points required for the student to pass this assignment.</p>
							</div>
						</div>


						<div className='inputWithHeadingInfo'>
							<p className='quizFormInputText'>Allow to upload files</p>
							<input
								value={assignmentData?.max_uploads}
								onChange={(e) => setAssignmentData(prev => ({ ...prev, max_uploads: Number(e.target.value) }))}
								type="Number" className='assignmentFormInput' />
							<div className='infoIconText'>
								<BiInfoCircle />
								<p>Define the number of files that a student can upload in this assignment. Input 0 to disable the option to upload.</p>
							</div>
						</div>

						<div className='inputWithHeadingInfo'>
							<p className='quizFormInputText'>Max. file size limit (MB)</p>
							<input
								value={assignmentData?.max_size}
								onChange={(e) => setAssignmentData(prev => ({ ...prev, max_size: Number(e.target.value) }))}
								type="Number" className='assignmentFormInput' />
							<div className='infoIconText'>
								<BiInfoCircle />
								<p>Define the number of files that a student can upload in this assignment. Input 0 to disable the option to upload.</p>
							</div>
						</div>

						<div className="qfpInputDiv">
							<p>Enable Course Preview</p>
							<Switch value={assignmentData.preview_available} onChange={(value) => setAssignmentData((prev) => ({ ...prev, preview_available: value }))} />
						</div>

					</div>
				</div>

				{/* quiz form footer  */}
				<div className="quizFormFooter">
					<QuizFormFooter submitText={"Submit"} onSubmit={assignmentUpdateData.isEditType ? handleUpdate : handleSubmit} onCancle={() => closeAssignmentForm()} />
				</div>
			</div>
		</ModalForm>
	)
}


export default AssignmentForm