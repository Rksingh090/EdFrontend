import React, { useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import TeacherSidebar from '../../components/base/TeacherSidebar';

import { AiOutlineDelete } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import { RiTwitterXFill } from 'react-icons/ri';
import { CiFacebook, CiLinkedin } from 'react-icons/ci';
import { FiGithub } from 'react-icons/fi';
import { IoImagesOutline } from 'react-icons/io5';
import { TbFileCertificate } from 'react-icons/tb';

import { uploadImage } from '../../functions/uploader';
import { updateUserProfile } from '../../reducers/UserReducer';
import { isJSONEqual } from '../../functions/jsonMatch';
import { RxUpdate } from 'react-icons/rx';

import teacherBackground from "../../assets/images/teacher-background.jpg"
import { HiOutlineUserCircle } from 'react-icons/hi';
import SelectOption from '../../components/utils/SelectOption';
import { BsPerson } from 'react-icons/bs';

const Settings = () => {
    const [checked, setChecked] = useState(false);
    const [showTab, setShowTab] = useState("profile");


    return (
        <TeacherSidebar>
            <div className="TSSettingPage">
                <div className={`${checked ? "" : ""}`}>
                    <div className='tabMenu whiteBG withShadow roundSM'>
                        <p className={showTab === "profile" ? "active" : ""} onClick={() => setShowTab("profile")}>Profile</p>
                        <p className={showTab === "password" ? "active" : ""} onClick={() => setShowTab("password")}>Password</p>
                        <p className={showTab === "social" ? "active" : ""} onClick={() => setShowTab("social")}>Social Profile</p>
                    </div>

                    {showTab === "profile" &&
                        <ProfileTab />
                    }

                    {showTab === "password" &&
                        <div className='STPPasswordTab'>
                            <div className="SPTInputGroup">
                                <p className='label'>Current Password</p>
                                <input type="text" placeholder='Current Password' className='GrayedInput' />
                            </div>
                            <div className="SPTInputGroup">
                                <p className='label'>New Password</p>
                                <input type="text" placeholder='Type Password' className='GrayedInput' />
                            </div>
                            <div className="SPTInputGroup">
                                <p className='label'>Re-type New Password</p>
                                <input type="text" placeholder='Type Password' className='GrayedInput' />
                            </div>
                            <button className='STPChangePassword'>Reset Password</button>
                        </div>
                    }


                    {showTab === "social" &&
                        <div className='STPLinkTab'>
                            <h1 className='STPLinkTabHeading'>Social Profile Link</h1>
                            <div className='inputDiv whiteBG withShadow nopad'>
                                <BsPerson size={20} />
                                <input type="text" placeholder='https://portfolio.com' className='w-[500px] gap-8 outline-none border-[1px] border-gray-300 p-2 rounded-md' />
                            </div>
                            <div className="inputDiv whiteBG withShadow nopad">
                                <CiFacebook size={22} />
                                <input type="text" placeholder='https://facebook.com' className='w-[500px] gap-8 outline-none border-[1px] border-gray-300 p-2 rounded-md' />
                            </div>
                            <div className='inputDiv whiteBG withShadow nopad'>
                                <RiTwitterXFill size={18} />
                                <input type="text" placeholder='https://x.com' className='w-[500px] gap-8 outline-none border-[1px] border-gray-300 p-2 rounded-md' />
                            </div>
                            <div className='inputDiv whiteBG withShadow nopad'>
                                <CiLinkedin size={22} />
                                <input type="text" placeholder='https://linkedin.com' className='w-[500px] gap-8 outline-none border-[1px] border-gray-300 p-2 rounded-md' />
                            </div>
                            <div className='inputDiv whiteBG withShadow nopad'>
                                <FiGithub size={18} />
                                <input type="text" placeholder='https://github.com' className='w-[500px] gap-8 outline-none border-[1px] border-gray-300 p-2 rounded-md' />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </TeacherSidebar>
    )
}


const ProfileTab = () => {
    const dispatch = useDispatch();

    const profileImgRef = useRef(null);
    const coverImageRef = useRef(null);
    const certificateImageRef = useRef(null);


    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // selectors 
    const { user } = useSelector(state => state.user)


    const [userData, setUserData] = useState(user);
    const [skillInput, setSkillInput] = useState({ name: "", experiance: "begginer" })

    // set user inputs 
    const handleChange = (e) => {
        const { name, value } = e.target;
        let f = {};
        f[name] = value;

        setUserData({
            ...userData,
            ...f
        });
    }

    // add skill 
    const addSkill = (e) => {
        if (skillInput.name === "") return;
        setUserData({
            ...userData,
            skills: [skillInput, ...userData?.skills]
        })
        setSkillInput({
            name: "",
            experiance: "begginer"
        })

    }

    // set skill name 
    const handleSkill = (e) => {
        const { value } = e.target;
        setSkillInput({
            ...skillInput,
            name: value
        })
    }

    // handle profile upload click
    const handleUploadProfile = (e) => {
        if (profileImgRef.current) {
            profileImgRef.current.click()
        }
    }

    // handle cover upload click
    const handleUploadCover = (e) => {
        if (coverImageRef.current) {
            coverImageRef.current.click()
        }
    }

    // handle certificate upload click
    const handleCertificateUpload = (e) => {
        if (certificateImageRef.current) {
            certificateImageRef.current.click()
        }
    }

    // handle delete profile 
    const deleteProfileImage = (e) => {
        setUserData({
            ...userData,
            dp: ""
        })
        setShowProfileMenu(false)
    }

    // handle delete profile 
    const deleteCoverImage = (e) => {
        setUserData({
            ...userData,
            cover: ""
        })
    }

    // upload profile image 
    const handleUploadProfileImg = async (e) => {
        if (!e.target?.files[0] || e.target?.files.length === 0) {
            return;
        };
        const file = e.target.files[0];
        const data = await uploadImage(file, "profile", 200, 200);
        setUserData(prev => ({
            ...prev,
            dp: data.imgUrl
        }))
        setShowProfileMenu(false);
    };

    // upload cover image 
    const handleUploadCoverImg = async (e) => {
        if (!e.target?.files[0] || e.target?.files.length === 0) {
            return;
        };

        const file = e.target.files[0];
        const data = await uploadImage(file, "cover", 700, 430);
        setUserData(prev => ({
            ...prev,
            cover: data.imgUrl
        }))
    };

    // upload certificate image
    const handleCertificateUploadImg = async (e) => {
        if (!e.target?.files[0] || e.target?.files.length === 0) {
            return;
        };
        const file = e.target.files[0];
        const data = await uploadImage(file, "certificate", 700, 430);
        setUserData(prev => ({
            ...prev,
            certificate_signature: data.imgUrl
        }))
    }

    // update profile 
    const updateProfile = () => {
        if (!isJSONEqual(userData, user)) {
            let toUpdate = userData;
            if (userData.dp && userData.dp === "") delete toUpdate.dp
            if (userData.cover && userData.cover === "") delete toUpdate.cover
            if (userData.certificate_signature && userData.certificate_signature === "") delete toUpdate.certificate_signature

            dispatch(updateUserProfile(toUpdate))
        }
    }

    return (
        <div className='SettingsProfileTab'>

            {/* <ModalForm visible={true}>

            </ModalForm> */}

            <div className="SPTProfileUploadContainer">

                <div className="profilePhoto">
                    <img alt="profile dp" src={userData.dp || "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"} />
                </div>


                <div className="coverImgDiv">
                    <img src={userData?.cover || teacherBackground} alt="" />
                </div>

                <div className='profileMenuBtns'>
                    <input type="file" ref={profileImgRef} onChange={handleUploadProfileImg} hidden={true} accept="image/png, image/gif, image/jpeg, image/jpg" />
                    <button className="actionButton upload" onClick={handleUploadProfile}>
                        <HiOutlineUserCircle size={25} />
                    </button>
                    <button className="actionButton delete" onClick={deleteProfileImage}>
                        <AiOutlineDelete size={25} />
                    </button>
                </div>



                <div className='uploadCoverBtn'>
                    <input ref={coverImageRef} onChange={handleUploadCoverImg} type="file" hidden={true} accept="image/png, image/gif, image/jpeg, image/jpg" />
                    <div className="coverMenuBtn">
                        <div className='actionButton upload' onClick={handleUploadCover}>
                            <IoImagesOutline size={25} />
                        </div>
                        <div className='actionButton delete' onClick={deleteCoverImage}>
                            <AiOutlineDelete size={25} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='STPFormGroup'>

                <div className='TwoInputGridGroup'>
                    <div className='SPTInputGroup'>
                        <p className='label'>First Name</p>
                        <input value={userData.first_name} name="first_name" onChange={handleChange} type="text" placeholder='First Name' className='GrayedInput' />
                    </div>
                    <div className='SPTInputGroup'>
                        <p className='label'>Last Name</p>
                        <input value={userData.last_name} name="last_name" onChange={handleChange} type="text" placeholder='Last  Name' className='GrayedInput' />
                    </div>
                </div>

                <div className='TwoInputGridGroup'>
                    <div className='SPTInputGroup'>
                        <p className='label'>Email</p>
                        <input value={userData.email} name="email" disabled type="email" placeholder='Email' className='GrayedInput' />
                    </div>
                    <div className='SPTInputGroup'>
                        <p className='label'>Phone Number</p>
                        <input value={userData.phone} name="phone" onChange={handleChange} type="phone" placeholder='Phone Number' className='GrayedInput' />
                    </div>
                </div>

                <div className='SPTInputGroup'>
                    <p className='label'>Skill/Occupation</p>
                    <div className='skillsInputs'>
                        <input value={skillInput.name} onChange={handleSkill} type="text" placeholder='eg. Java' className='GrayedInput' />
                        <div>
                            <SelectOption
                                label={"Select Level"}
                                options={[
                                    {
                                        name: "Begginer",
                                        value: "begginer"
                                    },
                                    {
                                        name: "Intermediate",
                                        value: "intermediate"
                                    },
                                    {
                                        name: "Proficient",
                                        value: "proficient"
                                    },
                                ]}
                                value={skillInput.experiance}
                                onChange={(experiance) => setSkillInput({ ...skillInput, experiance: experiance })}
                                textField={"name"}
                                valueField={"value"}
                            />
                            <input value="Add" onClick={addSkill} type="button" />
                        </div>
                    </div>
                </div>
                <div className='SettingSkills'>
                    {userData?.skills && userData.skills?.length > 0 &&
                        userData.skills.map((skill, skillIdx) => {
                            return (
                                <div key={skillIdx} className='SettingSkillItem'>
                                    <p className='skillName'>{skill?.name}</p>
                                    <p className='skillExperiance'>{skill?.experiance}</p>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='SPTInputGroup'>
                    <label htmlFor="bioraphy" className='label'>Biography</label>
                    <textarea
                        name="bio"
                        value={userData?.bio || ""}
                        onChange={handleChange}
                        rows="10"
                        className='GrayedInput'
                    ></textarea>
                </div>


                <div>
                    <h3 className='certificateHeading'>Certificate Signature</h3>
                    <div className='certificateUploadArea'>
                        <div className='certificateImageDiv'>
                            {userData.certificate_signature && userData.certificate_signature !== "" ? (
                                <img src={userData.certificate_signature} alt="user certificate" />
                            ) : (
                                <>
                                    <BiImageAdd />
                                    <p>Upload image</p>
                                </>
                            )}
                        </div>
                        <div className='certificateUploadMeta'>
                            <p className='font-[600]'>Size: 700x430 pixels</p>
                            <p>File Support: jpg, .jpeg,. gif, or .png.</p>
                            <input type="file" ref={certificateImageRef} onChange={handleCertificateUploadImg} name="profilePhoto" hidden={true} accept="image/png, image/gif, image/jpeg, image/jpg" />
                            <button className='certificateImageUpload' onClick={handleCertificateUpload}>
                                <TbFileCertificate className='text-[20px]' />
                                <span>Upload image</span>
                            </button>
                        </div>
                    </div>
                </div>

                <button className='profileMainUpdate' onClick={updateProfile}>
                    <RxUpdate size={20} />
                    <span>Update Profile</span>
                </button>
            </div>

        </div>
    )
}




export default Settings