import React, { } from 'react'
import TeacherSidebar from '../../components/base/TeacherSidebar'
import { useSelector } from 'react-redux';

const Myprofile = () => {

    const { user } = useSelector((state) => state.user);

    return (
        <TeacherSidebar>
            <div className='TSProfilePage'>
                <h1 className='TSProfileHeading'>Profile</h1>
                <div className="TSProfileMain">
                    <div className='TSProfileImage'>
                        <img src={user.dp || "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"} alt="" />
                        <h4 className='name'>{user.first_name} {user.last_name}</h4>
                    </div>
                    <div className='TSProfileCData'>
                        <h4>{user.email}</h4>
                        <h4>{user.phone}</h4>
                        <h4>{new Date(user.createdAt).toDateString()}</h4>
                    </div>

                    <div className='TSProfileSkills'>
                        <h2 className='title'>Skills</h2>
                        {user.skills &&
                            user.skills.length > 0 && (
                                <div className='profileSkillsBadges'>
                                    {user.skills && user.skills?.length > 0 && user?.skills.map((skill, idx) => (
                                        <p key={idx} className='item'>{skill.name}</p>
                                    ))}
                                </div>
                            )}
                    </div>

                </div>


                <h2 className='TSProfileHeading mt20'>Biography</h2>
                <div className='TSProfileBio'>
                    <p >{user.bio}</p>
                </div>

            </div>

        </TeacherSidebar>
    )
}

export default Myprofile