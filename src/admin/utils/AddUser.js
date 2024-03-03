import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API, BACKEND_URL } from '../../constant';
import Breadcrumb from '../../utils/Breadcrumb';

import { AiOutlinePlus } from 'react-icons/ai';
import { FaRegImages } from 'react-icons/fa';
import { uploadImage } from '../../functions/uploader';

const AddUser = ({ type, role, breadcrumKey, breadcrumbName, onAddUser, onUpdateUser }) => {
    const dispatch = useDispatch();
    const { userId } = useParams()
    const profileImageUpload = useRef(null)

    const [userSchema, setUserSchema] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        dp: "",
        confirmPassword: "",
        skills: [],
        bio: "",
        gender: "male",
        education: {
            name: "",
            start: new Date().toISOString(),
            end: new Date().toISOString(),
            college: ""
        }
    })

    const [skill, setSkill] = useState({
        name: "",
        experiance: "begginer"
    })

    const addSkillToTeacher = () => {
        setUserSchema(prev => ({ ...prev, skills: [...prev.skills, skill] }))
        setSkill({
            name: "",
            experiance: "begginer"
        })
    }

    const updateTeacherGender = (e) => {
        const { name, value } = e.target;
        setUserSchema(prev => ({
            ...prev,
            [name]: String(value).toLowerCase()
        }))
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserSchema(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const addUserToDB = (e) => {
        e.preventDefault();
        onAddUser({ ...userSchema, role })
        setUserSchema({
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            password: "",
            dp: "",
            confirmPassword: "",
            skills: [],
            bio: "",
            gender: "male",
            education: {
                name: "",
                start: "",
                end: "",
                college: ""
            }
        })
    }

    const updateUser = (e) => {
        e?.preventDefault();
        onUpdateUser({ ...userSchema, role })
    }

    const handleUploadVideo = async (e) => {
        const file = e.target.files;
        if (file.length < 1) {
            return;
        }
        const uploadProfile = await uploadImage(file[0], "profile", 200, 200);
        if (uploadProfile.status === "success") {
            setUserSchema(prev => ({
                ...prev,
                dp: uploadProfile.imgUrl
            }))
        } else {
            alert(uploadProfile?.alert);
        }
    }

    useEffect(() => {
        if (type === "edit" && userId !== "" && userId !== undefined && userId !== null) {
            axios.get(`${API}/admin/user/${userId}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then((res) => {
                const { user, status } = res.data;
                if (status === "success") {
                    setUserSchema(
                        {
                            ...user,
                            role: role,
                            confirmPassword: user.password
                        })
                }
            })
        }
    }, [dispatch, type, userId, role])


    return (
        <div className='addNewTeacherForm'>

            <div className="headingBar">
                <h2 className='PageHeading'>{(breadcrumbName).substring(0, breadcrumbName.length - 1)}</h2>
                <Breadcrumb breadcrumbData={[
                    {
                        link: `/admin/${breadcrumKey}/`,
                        text: `${breadcrumbName}`
                    },
                    {
                        link: `/admin/${breadcrumKey}/add`,
                        text: type === "edit" ? `${userSchema.first_name} ${userSchema.last_name}` : `Add ${breadcrumbName.substring(0, breadcrumbName.length - 1)}`,
                        noclick: true
                    }
                ]} />
            </div>


            <div className="tableContainer">
                <div className="tableHeading">
                    <h2 className='heading'>Add New {breadcrumbName.substring(0, breadcrumbName.length - 1)}</h2>
                </div>


                <form className='teacherColInputs' onSubmit={type === "edit" ? updateUser : addUserToDB}>
                    <p className='multiInputheading'>Basic Details</p>

                    <div className='flex flex-col gap-2 w-[200px]'>
                        <div className="AddUserPhotoContainer">
                            {userSchema?.dp ? (
                                <img className='w-full h-full object-cover' src={`${BACKEND_URL}/${userSchema?.dp}`} alt="" />
                            ) : (
                                <FaRegImages size={35} color='#999' />
                            )}
                        </div>
                        <button
                            type='button'
                            onClick={() => profileImageUpload.current && profileImageUpload?.current?.click()}
                            className='bg-[var(--main)] text-white  py-2  text-[14px] w-full rounded-[5px]'>
                            {
                                userSchema?.dp ?
                                    "Change Image"
                                    :
                                    "Upload Image"
                            }
                        </button>
                        <input
                            type="file"
                            onChange={handleUploadVideo}
                            className='hidden' ref={profileImageUpload} accept="image/jpg, image/jpeg, image/png" />
                    </div>

                    <div className='inputDivideDiv two'>
                        <div className='flexColInput'>
                            <label htmlFor="first_name">First Name*</label>
                            <input type="text" id='first_name' className='FormInput'
                                value={userSchema.first_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='flexColInput'>
                            <label htmlFor="last_name">Last Name (optional)</label>
                            <input type="text" id='last_name' className='FormInput'
                                value={userSchema.last_name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='inputDivideDiv two'>
                        <div className='flexColInput'>
                            <label htmlFor="email">Email*</label>
                            <input type="email" id='email' className='FormInput'
                                value={userSchema.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='flexColInput'>
                            <label htmlFor="phone">Phone*</label>
                            <input type="number" id='phone' className='FormInput noNumberStyle'
                                value={userSchema.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className='inputDivideDiv two'>
                        <div className='flexColInput'>
                            <label htmlFor="password">Password*</label>
                            <input type="password"
                                value={userSchema.password}
                                onChange={handleInputChange}
                                id='password' className='FormInput' />
                        </div>
                        <div className='flexColInput'>
                            <label htmlFor="confirmPassword" >Confirm Password*</label>
                            <input type="password" id='confirmPassword' className='FormInput'
                                value={userSchema.confirmPassword}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className={`flexColInput ${userSchema.skills.length > 0 ? "gap-y-4" : ""}`}>
                        <div className='inputDivideDiv fourXthreeXone'>
                            <div className='flexColInput'>
                                <label htmlFor="skill">Skills</label>
                                <input type="tel" id='skill' className='FormInput'
                                    value={skill.name} onChange={(e) => setSkill(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div className='flexColInput'>
                                <label htmlFor="skillLevel">Skill Level</label>
                                <select className='FormInput' id="skillLevel"
                                    value={skill.experiance} onChange={(e) => setSkill(prev => ({ ...prev, experiance: e.target.value }))}
                                >
                                    <option value="begginer">Begginer</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="proficient">Proficient</option>
                                </select>
                            </div>

                            <div className='addSkillBtn' onClick={addSkillToTeacher}>Add Skill</div>
                        </div>
                        <div className='proficiency'>
                            {
                                userSchema.skills &&
                                userSchema.skills.length > 0 &&
                                userSchema.skills.map((skill, idx) => (
                                    <div className='skill' key={idx}>
                                        <p>{skill?.name}</p>
                                        <p className='skillLevel'>{skill?.experiance}</p>
                                    </div>

                                ))
                            }
                        </div>
                    </div>

                    <div className='flexColInput gap2'>
                        <p className='headingLabel'>Gender*</p>
                        <div className='flexRowInput gap2'>
                            <div className='flexRowInput gap1'>
                                <input type="radio" name="gender" id="male" checked={userSchema.gender === "male"} value={"male"} onChange={e => updateTeacherGender(e)} />
                                <label htmlFor='male'>Male</label>
                            </div>
                            <div className='flexRowInput gap1'>
                                <input type="radio" name="gender" id="female" checked={userSchema.gender === "female"} value={"female"} onChange={e => updateTeacherGender(e)} />
                                <label htmlFor='female'>Female</label>
                            </div>
                            <div className='flexRowInput gap1'>
                                <input type="radio" name="gender" id="other" checked={userSchema.gender === "other"} value={"other"} onChange={e => updateTeacherGender(e)} />
                                <label htmlFor='other'>Other</label>
                            </div>
                        </div>
                    </div>

                    <p className='multiInputheading mt-3'>Education</p>
                    <div className='inputDivideDiv two'>
                        <div className='flexColInput'>
                            <label htmlFor='degree'>Degree</label>
                            <input type="text" id="degree" className="FormInput"
                                value={userSchema?.education?.name}
                                onChange={(e) => setUserSchema(prev => ({
                                    ...prev,
                                    education: {
                                        ...prev.education,
                                        name: e.target.value
                                    }
                                }))}
                            />
                        </div>
                        <div className='flexColInput'>
                            <label htmlFor='college'>College</label>
                            <input type="text" id="college" className="FormInput"

                                value={userSchema?.education?.college}
                                onChange={(e) => setUserSchema(prev => ({
                                    ...prev,
                                    education: {
                                        ...prev.education,
                                        college: e.target.value
                                    }
                                }))}
                            />
                        </div>
                        <div className='flexColInput'>
                            <label htmlFor='start' >Start Date</label>
                            <input type="date" className='FormInput' id="start"
                                value={userSchema?.education?.start && String(userSchema?.education?.start).substring(0, 10)}
                                onChange={(e) => setUserSchema(prev => ({
                                    ...prev,
                                    education: {
                                        ...prev.education,
                                        start: e.target.value
                                    }
                                }))}
                            />
                        </div>
                        <div className='flexColInput'>
                            <label htmlFor='end'>End Date</label>
                            <input type="date" className='FormInput' id="end"
                                value={userSchema?.education?.end && String(userSchema?.education?.end).substring(0, 10)}
                                onChange={(e) => setUserSchema(prev => ({
                                    ...prev,
                                    education: {
                                        ...prev.education,
                                        end: e.target.value
                                    }
                                }))}
                            />
                        </div>


                    </div>
                    {type === "edit" ?
                        (
                            <button className='createFormBtn' type='submit'>
                                <span>Update {breadcrumbName.substring(0, breadcrumbName.length - 1)}</span>
                            </button>
                        )
                        : (
                            <button className='createFormBtn' type='submit'>
                                <AiOutlinePlus size={20} />
                                <span>Add {breadcrumbName.substring(0, breadcrumbName.length - 1)}</span>
                            </button>

                        )
                    }

                </form>
            </div>
        </div>
    )
}

export default AddUser