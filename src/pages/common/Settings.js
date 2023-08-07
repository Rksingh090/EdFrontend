import React, { useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import TeacherSidebar from '../../components/base/TeacherSidebar';

import { AiFillDelete } from 'react-icons/ai'
import { BsCameraFill } from 'react-icons/bs';
import { BiImageAdd } from 'react-icons/bi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { AiOutlineWifi } from 'react-icons/ai';
import { GrFacebookOption } from 'react-icons/gr'
import { ImTwitter } from 'react-icons/im';
import { FaLinkedinIn } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';
import { FiGithub } from 'react-icons/fi';
import { IoImagesOutline } from 'react-icons/io5';
import { TbFileCertificate } from 'react-icons/tb';

import { uploadImage } from '../../functions/uploader';
import { updateUserProfile } from '../../reducers/UserReducer';
import { isJSONEqual } from '../../functions/jsonMatch';
import { RxUpdate } from 'react-icons/rx';

const Settings = () => {
    const [checked, setChecked] = useState(false);
    const [showTab, setShowTab] = useState("profile");


    return (
        <TeacherSidebar>
            <div className='font-[600] text-[20px]'>Settings</div>
            <div className={`${checked ? "" : ""}`}>
                <div className='tabMenu'>
                    <p className={showTab === "profile" ? "active" : ""} onClick={() => setShowTab("profile")}>Profile</p>
                    <p className={showTab === "password" ? "active" : ""} onClick={() => setShowTab("password")}>Password</p>
                    <p className={showTab === "social" ? "active" : ""} onClick={() => setShowTab("social")}>Social Profile</p>
                </div>
                {showTab === "profile" &&
                    <ProfileTab />
                }
                {showTab === "password" &&
                    <div>
                        <div className="pt-[20px]">
                            <p>Current Password</p>
                            <input type="text" placeholder='Current Password' className='w-[500px] outline-none border-[1px] border-gray-300 p-2 rounded-md my-4' />
                            <p>New Password</p>
                            <input type="text" placeholder='Type Password' className='w-[500px] outline-none border-[1px] border-gray-300 p-2 rounded-md my-4' />
                            <p>Re-type New Password</p>
                            <input type="text" placeholder='Type Password' className='w-[500px] outline-none border-[1px] border-gray-300 p-2 rounded-md my-4' />
                        </div>
                        <button className=' bg-[#35ff] py-2 mt-2 text-[#fff] rounded-md px-2'> <span>
                        </span> Reset Password</button>
                    </div>
                }

                
                {showTab === "social" &&
                    <div>
                        <div className='pt-[20px]'>
                            <div>
                                <h1 className='font-[600] text-[20px] pb-8'>Social Profile Link</h1>
                            </div>
                            <div className='flex justify-between w-[800px] items-center pt-8'>
                                <div className='flex gap-4 items-center'>
                                    <GrFacebookOption />
                                    <p>Facebook</p>
                                </div>
                                <div>
                                    <input type="text" placeholder='https://facebook.com/username' className='w-[500px] gap-8 outline-none border-[1px] border-gray-300 p-2 rounded-md' />
                                </div>
                            </div>
                            <div className='flex justify-between w-[800px] items-center pt-8'>
                                <div className='flex gap-4 items-center'>
                                    <ImTwitter />
                                    <p>Twitter</p>
                                </div>
                                <div>
                                    <input type="text" placeholder='https://Twitter.com/username' className='w-[500px] gap-8 outline-none border-[1px] border-gray-300 p-2 rounded-md' />
                                </div>
                            </div>
                            <div className='flex justify-between w-[800px] items-center pt-8'>
                                <div className='flex gap-4 items-center'>
                                    <FaLinkedinIn />
                                    <p>Linkedin</p>
                                </div>
                                <div>
                                    <input type="text" placeholder='https://Linkedin.com/username' className='w-[500px] gap-8 outline-none border-[1px] border-gray-300 p-2 rounded-md' />
                                </div>
                            </div>
                            <div className='flex justify-between w-[800px] items-center pt-8'>
                                <div className='flex gap-4 items-center'>
                                    <CgWebsite />
                                    <p>Website</p>
                                </div>
                                <div>
                                    <input type="text" placeholder='https://Website.com/username' className='w-[500px] gap-8 outline-none border-[1px] border-gray-300 p-2 rounded-md' />
                                </div>
                            </div>
                            <div className='flex justify-between w-[800px] items-center pt-8'>
                                <div className='flex gap-4 items-center'>
                                    <FiGithub />
                                    <p>Github</p>
                                </div>
                                <div>
                                    <input type="text" placeholder='https://Github.com/username' className='w-[500px] gap-8 outline-none border-[1px] border-gray-300 p-2 rounded-md' />
                                </div>
                            </div>
                        </div>
                    </div>
                }
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
        console.log(f);

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
        <div className='w-full pt-[20px]'>

            <div className='profileAndCover mobileResponsive'>
                <div className='h-[70%] relative'>
                    <img src={userData.cover || "https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/backgroundCover.jpg"} alt="" className='coverPhoto' />
                    <input ref={coverImageRef} onChange={handleUploadCoverImg} type="file" hidden={true} accept="image/png, image/gif, image/jpeg, image/jpg" />
                    <div className='coverUploadBtn' onClick={handleUploadCover}>
                        <IoImagesOutline className='text-[20px]' />
                        <span>
                            Upload Cover Photo
                        </span>
                    </div>
                    <div className='coverDeleteBTN' onClick={deleteCoverImage}>
                        <AiFillDelete size={25} color='white' />
                    </div>
                </div>

                <div className='profilePhoto'>
                    <img className='object-cover' alt="profile dp" src={userData.dp || "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"} />
                    <div className='profileUploadIcon' onClick={(e) => setShowProfileMenu(!showProfileMenu)}>
                        <BsCameraFill size={22} color='white' />
                    </div>
                </div>

                {showProfileMenu && (
                    <div className='profileMenu'>
                        <input type="file" ref={profileImgRef} onChange={handleUploadProfileImg} name="profilePhoto" hidden={true} accept="image/png, image/gif, image/jpeg, image/jpg" />
                        <div onClick={handleUploadProfile}>
                            <BsCameraFill />
                            <p>Upload Profile</p>
                        </div>
                        <div onClick={deleteProfileImage}>
                            <RiDeleteBin6Fill />
                            <p>Delete</p>
                        </div>
                    </div>
                )}

                <div className='flex justify-end py-3 w-[100%]'>
                    <div className='flex gap-3 items-center'>
                        <AiOutlineWifi />
                        <p> Profile Photo Size: 200x200 pixels  </p>
                        <p>  Cover Photo Size: 700x430 pixels</p>
                    </div>
                </div>
            </div>


            <div className='grid mobileResponsive grid-cols-2 gap-4 pt-8'>
                <div>
                    <p>First Name</p>
                    <input value={userData.first_name} name="first_name" onChange={handleChange} type="text" placeholder='First Name' className='w-full outline-none border-[1px] p-2 rounded-md' />
                </div>
                <div>
                    <p>Last Name</p>
                    <input value={userData.last_name} name="last_name" onChange={handleChange} type="text" placeholder='Last  Name' className='w-full outline-none border-[1px] p-2 rounded-md' />
                </div>
            </div>
            <div className='grid mobileResponsive grid-cols-2 gap-4 pt-8'>
                <div>
                    <p>Email</p>
                    <input value={userData.email} name="email" disabled type="email" placeholder='Email' className='w-full outline-none border-[1px] p-2 rounded-md' />
                </div>
                <div>
                    <p>Phone Number</p>
                    <input value={userData.phone} name="phone" onChange={handleChange} type="phone" placeholder='Phone Number' className='w-full outline-none border-[1px] p-2 rounded-md' />
                </div>
            </div>
            <div className='mobileResponsive pt-8'>
                <p>Skill/Occupation</p>
                <div className='skillsInputs'>
                    <input value={skillInput.name} onChange={handleSkill} type="text" placeholder='UX Designer' className='w-[100%] outline-none border-[1px] p-2 rounded-md' />
                    <div>
                        <select name="skillExperiance" value={skillInput.experiance} onChange={({ target }) => setSkillInput({ ...skillInput, experiance: target.value })}>
                            <option value="begginer">Begginer</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="proficient">Proficient</option>
                        </select>
                        <input value="Add" onClick={addSkill} type="button" />
                    </div>
                </div>
            </div>
            <div className='mobileResponsive flex-wrap skills pt-4'>
                {userData?.skills && userData.skills?.length > 0 &&
                    userData.skills.map((skill, skillIdx) => {
                        return (
                            <div key={skillIdx} className='skillItem'>
                                <p className='skillName'>{skill?.name}</p>
                                <p className='skillExperiance'>{skill?.experiance}</p>
                            </div>
                        )
                    })
                }
            </div>

            <div className='pt-4 mobileResponsive' id="bio">
                <p><label htmlFor="bioraphy">Bio</label></p>
                <textarea id="bioraphy" name="bio" value={userData?.bio || ""} onChange={handleChange} rows="4" cols="50" className='w-[100%] outline-none border-[1px] p-2 rounded-md'></textarea>
            </div>


            <div className='pt-4 pb-2 '>
                <p className='font-[500] text-[16px] '>Certificate Signature</p>
            </div>
            <div className='mobileResponsive certificateUploadArea'>
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
            <button className='profileMainUpdate' onClick={updateProfile}>
                <RxUpdate size={20} />
                <span>Update Profile</span>
            </button>
        </div>
    )
}




export default Settings