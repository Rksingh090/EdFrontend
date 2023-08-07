import React, { } from 'react'
import TeacherSidebar from '../../components/base/TeacherSidebar'
import { useSelector } from 'react-redux';

const Myprofile = () => {

    const { user } = useSelector((state) => state.user);

    return (
        <TeacherSidebar>
            <div className='pt-[20px]'>
                <div>
                    <h1 className='font-[600] text-[20px] pb-8'>My Profile</h1>
                </div>
                <div className='myProfileData'>

                    <div className='flex justify-center overflow-hidden items-center w-[150px] h-[150px] rounded-full shadow-lg'
                    style={{
                        boxShadow: "2px 5px 10px #d9d9d9"
                    }}>
                        <img src={user.dp || "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" } alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className='flex justify-between  items-center pt-8'>
                        <div className='flex gap-4 items-center'>
                            <p>Registration Date</p>
                        </div>
                        <div>
                            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center pt-8'>
                        <div className='flex gap-4 items-center'>
                            <p>First Name</p>
                        </div>
                        <div>
                            <p>{user.first_name}</p>
                        </div>
                    </div>
                    {user.last_name && <div className='flex justify-between items-center pt-8'>
                        <div className='flex gap-4 items-center'>
                            <p>Last Name</p>
                        </div>
                        <div>
                            <p>{user.last_name}</p>
                        </div>
                    </div>
                    }
                    <div className='flex justify-between items-center pt-8'>
                        <div className='flex gap-4 items-center'>
                            <p>Email</p>
                        </div>
                        <div>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center pt-8'>
                        <div className='flex gap-4 items-center'>
                            <p>Phone Number</p>
                        </div>
                        <div>
                            <p>{user.phone}</p>
                        </div>
                    </div>
                    {user.skills.length > 0 && (
                        <div className='profileSkillsBadges'>
                            <div className=''>
                                <p>Skill/Occupation</p>
                            </div>
                            <div className='flex gap-2 flex-wrap  '>
                                {user.skills && user.skills?.length > 0 && user?.skills.slice(0,3).map((skill, idx) => (
                                    <p key={idx} className='bg-gray-200 py-1 px-3 rounded-[40px]'>{skill.name}</p>
                                ))}
                                {user.skills && user.skills?.length > 3 && (
                                    <p className='bg-gray-200 py-1 px-3 rounded-[40px]'>{Number(user.skills?.length)-3} more..</p>
                                )}
                            </div>
                        </div>
                    )}
                    <div className='flex flex-col gap-y-3 items-start pt-8'>
                        <p className='text-xl'>Biography</p>
                        <p className='text-gray-500' >{user.bio}</p>
                    </div>
                </div>



            </div>

        </TeacherSidebar>
    )
}

export default Myprofile