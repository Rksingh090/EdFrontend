import React, { useMemo, useState } from 'react'
import './registerform.css';

import { GrAdd } from 'react-icons/gr';
import { RiDeleteBinLine } from 'react-icons/ri';
import axios from 'axios';
import { API } from '../constant';
import { Link } from 'react-router-dom';

const RegisterForm = () => {

    const numberRelatation = useMemo(() => [
        "student",
        "father",
        "mother",
        "other"
    ], [])

    const [userData, setUserData] = useState({
        student_name: "",
        father_name: "",
        email: "",
        subjects: [],
        class: "",
        school_name: "",
        state: "",
        area: "",
        message: "",
        primary_number: "",
        primary_rel: "student",
        other_numbers: [],
        coupon_code: ""
    })

    // add new mobile object in other_number 
    const addNewMobile = () => {
        setUserData(prev => ({
            ...prev,
            other_numbers: [
                ...prev.other_numbers,
                {
                    number_rel: "student",
                    mobile_no: ""
                }
            ]
        }))
    }

    // add mobile in other_numbers
    const removeMobile = (index) => {
        let allMobiles = [...userData.other_numbers];
        console.log(index);
        allMobiles = allMobiles.filter((item, idx) => idx !== index);

        setUserData(prev => ({
            ...prev,
            other_numbers: allMobiles
        }))
    }

    // handle edit mobile number at index 
    const handleMobileAtIdx = (e, idx) => {
        let allMobile = [...userData.other_numbers]
        allMobile[idx].mobile_no = e.target.value;
        setUserData(prev => ({
            ...prev,
            other_numbers: allMobile
        }))
    }

    // handle edit mobile_rel at index 
    const selectMobileRel = (e, idx) => {
        let allMobile = [...userData.other_numbers]
        allMobile[idx].number_rel = e.target.value;
        setUserData(prev => ({
            ...prev,
            other_numbers: allMobile
        }))
    }

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // on click subject checkboxes 
    const handleSubjectChange = (e) => {
        const { value } = e.target;
        if (userData.subjects.includes(value)) {
            const filterSubject = userData.subjects.filter((subItem) => subItem !== value)
            setUserData(prev => ({
                ...prev,
                subjects: filterSubject
            }))
        } else {
            setUserData(prev => ({
                ...prev,
                subjects: [...prev.subjects, value]
            }))
        }
    }

    // select /deselect all subjects 
    const selectDeselectAll = () => {
        let hasSub = true;
        ["Maths", "Science", "English", "SST"].forEach((ele) => {
            if (!userData.subjects.includes(ele)) {
                hasSub = false;
            }
        })
        if (hasSub) {
            setUserData(prev => ({
                ...prev,
                subjects: []
            }))
        } else {
            setUserData(prev => ({
                ...prev,
                subjects: ["Maths", "Science", "English", "SST"]
            }))
        }
    }

    // handle form user query 
    const handleFormUserQuery = (e) => {
        e.preventDefault();
        axios.post(`${API}/userquery`, userData)
            .then((res) => {
                const { status } = res.data;
                if (status === "success") {
                    alert("Your query has been submitted. Please find password attached in email and Verify email.")
                    setUserData({
                        student_name: "",
                        father_name: "",
                        email: "",
                        subjects: [],
                        class: "",
                        school_name: "",
                        state: "",
                        area: "",
                        message: "",
                        primary_number: "",
                        primary_rel: "student",
                        other_numbers: []
                    })
                    window.location.href = "/"
                }
            }).catch(err => {
                alert(err.response?.data?.message)
            })
    }


    return (
        <div className='A1RegisterForm'>

            <form className='A1RegForm' onSubmit={handleFormUserQuery}>
                <div className='A1RegInputGroup'>
                    <input value={userData.student_name} onChange={handleInputChange} name='student_name' type="text" id="A1RegName" required />
                    <label htmlFor="A1RegName">Student Name</label>
                </div>
                <div className='A1RegInputGroup'>
                    <input value={userData.father_name} onChange={handleInputChange} name='father_name' type="text" id="A1RegFatherName" required />
                    <label htmlFor="A1RegFatherName">Father's Name</label>
                </div>
                <div className='A1RegInputGroup'>
                    <input type="email" value={userData.email} onChange={handleInputChange} name='email' id="A1RegEmail" required />
                    <label htmlFor="A1RegEmail" >Email</label>
                </div>
                <div className='A1RegMobileWithType'>
                    <div className='A1RegInputGroup' >
                        <select className="A1RegInput noNumberStyle capitalize"
                            value={userData.primary_rel}
                            onChange={handleInputChange}
                            name='primary_rel'
                            id='A1RegPhone'
                        >
                            {
                                numberRelatation &&
                                numberRelatation.map((nR, nrIdx) => (
                                    <option value={nR} key={nrIdx} className='capitalize'>{nR}</option>
                                ))
                            }
                        </select>
                        <label htmlFor='A1RegPhone'>Rel</label>
                    </div>
                    <div className='A1RegInputGroup' >
                        <input type="number" value={userData.primary_number} onChange={handleInputChange} name='primary_number' id="A1MobileNo" className='noNumberStyle' required />
                        <label htmlFor="A1MobileNo" >Mobile No</label>
                    </div>
                    <button type='button' className='A1InputActionBtn' title='Add Mobile No' onClick={addNewMobile}>
                        <GrAdd size={22} color='white' />
                    </button>
                </div>
                {
                    userData.other_numbers &&
                    userData.other_numbers.length > 0 &&
                    userData.other_numbers.map((otherNo, idx) => (
                        <div className='A1RegMobileWithType' key={idx}>
                            <div className='A1RegInputGroup' >
                                <select className="A1RegInput noNumberStyle capitalize" onChange={(e) => selectMobileRel(e, idx)}>
                                    {
                                        numberRelatation &&
                                        numberRelatation.map((nR, nrIdx) => (
                                            <option value={nR} key={nrIdx} className='capitalize'>{nR}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='A1RegInputGroup' >
                                <input type="number" value={otherNo?.mobile_no} onChange={(e) => handleMobileAtIdx(e, idx)} className='noNumberStyle' required />
                                <label>Mobile No</label>
                            </div>
                            <button type='button' className='A1InputActionBtn' title='Add Mobile No' onClick={() => removeMobile(idx)}>
                                <RiDeleteBinLine size={22} color='white' />
                            </button>

                        </div>
                    ))
                }

                <div className='A1RegInputGroup'>
                    <input type="text" id="A1RegClass" value={userData.class} onChange={handleInputChange} name='class' className='A1RegInput' required />
                    <label htmlFor="A1RegClass">Class</label>
                </div>

                <div className='A1SubjectGroup'>
                    <h2>Subjects</h2>
                    <div className='A1CheckBoxFlex'>
                        <div className='A1RegCheckBox'>
                            <input type="checkbox"
                                checked={userData.subjects.includes("Maths") && userData.subjects.includes("Science") && userData.subjects.includes("SST") && userData.subjects.includes("English")}
                                onChange={selectDeselectAll}
                                className='llInput sm' style={{ borderColor: "#222" }} id='A1RegSubAll' />
                            <label htmlFor="A1RegSubAll">All Subjects</label>
                        </div>
                        <div className='A1RegCheckBox'>
                            <input type="checkbox" onChange={handleSubjectChange} checked={userData.subjects.includes("Maths")} value={"Maths"} className='llInput sm' style={{ borderColor: "#222" }} id='A1RegSubMath' />
                            <label htmlFor="A1RegSubMath">Maths</label>
                        </div>
                        <div className='A1RegCheckBox'>
                            <input type="checkbox" onChange={handleSubjectChange} checked={userData.subjects.includes("Science")} value={"Science"} className='llInput sm' style={{ borderColor: "#222" }} id='A1RegSubScience' />
                            <label htmlFor="A1RegSubScience">Science</label>
                        </div>
                        <div className='A1RegCheckBox'>
                            <input type="checkbox" onChange={handleSubjectChange} checked={userData.subjects.includes("SST")} value={"SST"} className='llInput sm' style={{ borderColor: "#222" }} id='A1RegSubSST' />
                            <label htmlFor="A1RegSubSST">SST</label>
                        </div>
                        <div className='A1RegCheckBox'>
                            <input type="checkbox" onChange={handleSubjectChange} checked={userData.subjects.includes("English")} value={"English"} className='llInput sm' style={{ borderColor: "#222" }} id='A1RegSubEnglish' />
                            <label htmlFor="A1RegSubEnglish">English</label>
                        </div>
                    </div>
                </div>


                <div className='A1RegInputGroup'>
                    <input type="text" value={userData.school_name} onChange={handleInputChange} name='school_name' id="A1RegSchool" className='A1RegInput' required />
                    <label htmlFor="A1RegSchool">School Name</label>
                </div>

                <div className='A1RegInputGroup'>
                    <input type="text" value={userData.state} onChange={handleInputChange} name='state' id="A1RegState" className='A1RegInput' required />
                    <label htmlFor="A1RegState">State</label>
                </div>

                <div className='A1RegInputGroup'>
                    <input type="text" value={userData.area} onChange={handleInputChange} name='area' id="A1RegArea" className='A1RegInput' required />
                    <label htmlFor="A1RegState">Area</label>
                </div>

                <div className='A1RegAreaGroup'>
                    <textarea rows="5" value={userData.message} onChange={handleInputChange} name='message' id="A1RegMessage" className='A1RegTextArea' ></textarea>
                    <label htmlFor="A1RegMessage">Do you know someone looking for Coaching ?</label>
                </div>

                <div className='A1RegAreaGroup'>
                    <input value={userData.coupon_code} onChange={handleInputChange} required name='coupon_code' id="A1RegMessage" className='A1RegTextArea' />
                    <label htmlFor="A1RegMessage">Coupon Code</label>
                </div>

                <button type='submit' className='A1RegSubmitBtn'>
                    Submit
                </button>

                <div className='A1RegGoHome'>
                    <Link to="/">Go to Home</Link>
                </div>


            </form>

        </div>
    )
}

export default RegisterForm