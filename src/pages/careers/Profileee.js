import React, { useState } from 'react'
import Base from '../../components/base/Base';
import "./careers.css";
import { BsFillPeopleFill } from 'react-icons/bs';
import { AiTwotoneBell } from 'react-icons/ai';
import { BiCloudUpload } from 'react-icons/bi';

const Profileee = () => {
    const [tabstate, setTabState] = useState(1);

    return (
        <Base noFooter={true}>

            <div className='profilecontainer'>
                <div className='wrapperprofile'>
                    <div className='heasder'>


                        <div className='images'>
                            <div className='iconsprofile'>
                                <BsFillPeopleFill className='iconf' />

                            </div>
                            <div className='profilename'>
                                <h1>vicky Chaudhary</h1>
                                <p>kumarvicky2617@gmail.com</p>
                            </div>
                        </div>
                        <div >
                            <div className='imagess'>
                                <AiTwotoneBell />
                                <p>1. Verify your phone number. Only verified Phones can be used at the time of login</p>
                                <button>verify</button>

                            </div>
                            <div className='imagess'>
                                <AiTwotoneBell />
                                <p>1. Verify your phone number. Only verified Phones can be used at the time of login</p>


                            </div>
                        </div>
                    </div>


                </div>



            </div>
            <div className='profile-input'>
                <div className='profile1-input1'>




                    <div className='text1'>
                        <h1>Candidate Profile</h1>
                    </div>
                    <div className='formcionatiner'>
                        <div className='clickbtn'>
                            <p className={`carrerstab ${tabstate === 1 && "active"}`} onClick={() => setTabState(1)}>Biographical</p>
                            <p className={`carrerstab ${tabstate === 2 && "active"}`} onClick={() => setTabState(2)}>Contact</p>
                            <p className={`carrerstab ${tabstate === 3 && "active"}`} onClick={() => setTabState(3)}>Address</p>
                            <p className={`carrerstab ${tabstate === 4 && "active"}`} onClick={() => setTabState(4)}>Resume</p>
                            <p className={`carrerstab ${tabstate === 5 && "active"}`} onClick={() => setTabState(5)}>Work Experience</p>
                            <p className={`carrerstab ${tabstate === 6 && "active"}`} onClick={() => setTabState(6)}>Job</p>
                            <p className={`carrerstab ${tabstate === 7 && "active"}`} onClick={() => setTabState(7)}>References</p>
                            <p className={`carrerstab ${tabstate === 8 && "active"}`} onClick={() => setTabState(8)}>Education</p>
                            <p className={`carrerstab ${tabstate === 9 && "active"}`} onClick={() => setTabState(9)}>Personal Identity</p>
                            <p className={`carrerstab ${tabstate === 10 && "active"}`} onClick={() => setTabState(10)}>Personal Documents</p>
                            <p className={`carrerstab ${tabstate === 11 && "active"}`} onClick={() => setTabState(11)}>Visa</p>
                            <p className={`carrerstab ${tabstate === 12 && "active"}`} onClick={() => setTabState(12)}>Social Security</p>
                            <p className={`carrerstab ${tabstate === 13 && "active"}`} onClick={() => setTabState(13)}>Emergency</p>
                            <p className={`carrerstab ${tabstate === 14 && "active"}`} onClick={() => setTabState(14)}>Salary Payment</p>
                            <p className={`carrerstab ${tabstate === 15 && "active"}`} onClick={() => setTabState(15)}>Last Salary</p>
                            <p className={`carrerstab ${tabstate === 16 && "active"}`} onClick={() => setTabState(16)}>Misc</p>
                        </div>
                        {tabstate === 1 && <div>
                            <h1 className='biographic'>Biographical</h1>

                            <div className='formcuinariner'>
                                <div className='inpiut'>
                                    <label htmlFor="">first Name</label>
                                    <input type="text" className='' />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Middle Name</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Last Name</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Gender *</label>
                                    <select name="cars" id="cars">
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="opel">Opel</option>
                                        <option value="audi">Audi</option>
                                    </select>

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Date of Birth *</label>
                                    <input type="date" name="" id="" />
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Country of birth *</label>
                                    <input type="text" />
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Nationality *</label>
                                    <select name="cars" id="cars">
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="opel">Opel</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Full Name</label>
                                    <input type="text" />
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Are you ready to relocate *</label>
                                    <select name="" id="">
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="opel">Opel</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Are you ready to relocate *</label>
                                    <select name="" id="" >
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="opel">Opel</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        }
                        {tabstate === 2 && <div>
                            <h1 className='biographic'>Contact</h1>

                            <div className='formcuinariner'>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <input type="email" className='' />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Country Code Personal *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Personal mobile no *</label>
                                    <input type="number" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Country Code Office</label>
                                    <select name="cars" id="cars" placeholder='please select'>
                                        <option value="volvo" >+91</option>
                                        <option value="saab">+253</option>
                                        <option value="opel">+61</option>
                                        <option value="audi">Other</option>
                                    </select>

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">office mobile no</label>
                                    <input type="number" />
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Facebook ID *</label>
                                    <input type="text" />
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Linkedin ID *</label>
                                    <input type="text" />
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Extension mobile no</label>
                                    <input type="text" />
                                </div>


                            </div>

                        </div>
                        }
                        {tabstate === 3 && <div>
                            <h1 className='biographic'>Address</h1>
                            <div>
                                <h1 className='currentsaddresh'>Current Address</h1>
                            </div>

                            <div className='formcuinariner'>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Current Flat/House/Wing Number *</label>
                                    <input type="email" className='' />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Current Street/Locality/Area *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Current Landmark *</label>
                                    <input type="number" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Current Pincode</label>
                                    <input type="number" />



                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Current Country</label>
                                    <select name="cars" id="cars" placeholder='please select'>
                                        <option value="volvo" >india</option>
                                        <option value="saab">Afghanistan</option>
                                        <option value="opel">Barbuda</option>
                                        <option value="audi">	Azerbaijan</option>
                                        <option value="audi">Bhutan</option>
                                        <option value="audi">Canada</option>
                                        <option value="audi">Cabo Verde</option>
                                        <option value="audi">Dominica</option>
                                        <option value="audi">Estonia</option>
                                        <option value="audi">Finland</option>
                                        <option value="audi">Gabon</option>
                                        <option value="audi">Germany</option>
                                        <option value="audi">Ethiopia</option>
                                        <option value="audi">Grenada</option>
                                        <option value="audi">Israel</option>
                                        <option value="audi">Ireland</option>
                                        <option value="audi">Jamaica</option>
                                        <option value="audi">Kyrgyzstan</option>
                                        <option value="audi">Lebanon</option>
                                        <option value="audi">Liechtenstein</option>
                                        <option value="audi">Luxembourg</option>
                                        <option value="audi">Moldova</option>
                                        <option value="audi">Montenegro</option>
                                        <option value="audi">Morocco</option>
                                    </select>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Current State*</label>
                                    <select name="" id="">
                                        <option value=""></option>
                                        <option value="">No items found</option>
                                    </select>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Current City *</label>
                                    <select name="" id="">
                                        <option value=""></option>
                                        <option value="">No items found</option>
                                    </select>
                                </div>



                            </div>
                            <div>
                                <h1 className='currentsaddresh'>Permanent Address</h1>
                            </div>

                            <div>
                                <p className='ptrahgty'>Please select</p>
                                <div className='checkbox'>
                                    <input type="checkbox" name="" id="" value="Same as current address" />
                                    <label htmlFor=""> Same as current address</label>

                                </div>


                                <div className='formcuinariner'>
                                    <div className='inpiut'>
                                        <label htmlFor="">
                                            Permanent Flat/House/Wing Number *</label>
                                        <input type="email" className='' />

                                    </div>
                                    <div className='inpiut'>
                                        <label htmlFor="">Permanent Street/Locality/Area*</label>
                                        <input type="text" />

                                    </div>
                                    <div className='inpiut'>
                                        <label htmlFor="">Permanent Landmark*</label>
                                        <input type="number" />

                                    </div>
                                    <div className='inpiut'>
                                        <label htmlFor="">Permanent Pincode</label>
                                        <input type="number" />



                                    </div>
                                    <div className='inpiut'>
                                        <label htmlFor="">Permanent Country</label>
                                        <select name="cars" id="cars" placeholder='please select'>
                                            <option value="volvo" >india</option>
                                            <option value="saab">Afghanistan</option>
                                            <option value="opel">Barbuda</option>
                                            <option value="audi">	Azerbaijan</option>
                                            <option value="audi">Bhutan</option>
                                            <option value="audi">Canada</option>
                                            <option value="audi">Cabo Verde</option>
                                            <option value="audi">Dominica</option>
                                            <option value="audi">Estonia</option>
                                            <option value="audi">Finland</option>
                                            <option value="audi">Gabon</option>
                                            <option value="audi">Germany</option>
                                            <option value="audi">Ethiopia</option>
                                            <option value="audi">Grenada</option>
                                            <option value="audi">Israel</option>
                                            <option value="audi">Ireland</option>
                                            <option value="audi">Jamaica</option>
                                            <option value="audi">Kyrgyzstan</option>
                                            <option value="audi">Lebanon</option>
                                            <option value="audi">Liechtenstein</option>
                                            <option value="audi">Luxembourg</option>
                                            <option value="audi">Moldova</option>
                                            <option value="audi">Montenegro</option>
                                            <option value="audi">Morocco</option>
                                        </select>
                                    </div>
                                    <div className='inpiut'>
                                        <label htmlFor="">Permanent State*</label>
                                        <select name="" id="">
                                            <option value=""></option>
                                            <option value="">No items found</option>
                                        </select>
                                    </div>
                                    <div className='inpiut'>
                                        <label htmlFor="">Permanent City *</label>
                                        <select name="" id="">
                                            <option value=""></option>
                                            <option value="">No items found</option>
                                        </select>
                                    </div>



                                </div>

                            </div>
                            <div>
                                <h1 className='currentsaddresh'>Emergency Address</h1>
                            </div>

                            <p className='ptrahgty'>Please select</p>
                            <div className='checkbox'>
                                <input type="checkbox" name="" id="" value="Same as current address" />
                                <label htmlFor=""> Same as current address</label>

                            </div>

                            <div className='formcuinariner'>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Emergency  Flat/House/Wing Number *</label>
                                    <input type="email" className='' />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Emergency  Street/Locality/Area *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Emergency  Landmark *</label>
                                    <input type="number" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Emergency  Pincode</label>
                                    <input type="number" />



                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Emergency  Country</label>
                                    <select name="cars" id="cars" placeholder='please select'>
                                        <option value="volvo" >india</option>
                                        <option value="saab">Afghanistan</option>
                                        <option value="opel">Barbuda</option>
                                        <option value="audi">	Azerbaijan</option>
                                        <option value="audi">Bhutan</option>
                                        <option value="audi">Canada</option>
                                        <option value="audi">Cabo Verde</option>
                                        <option value="audi">Dominica</option>
                                        <option value="audi">Estonia</option>
                                        <option value="audi">Finland</option>
                                        <option value="audi">Gabon</option>
                                        <option value="audi">Germany</option>
                                        <option value="audi">Ethiopia</option>
                                        <option value="audi">Grenada</option>
                                        <option value="audi">Israel</option>
                                        <option value="audi">Ireland</option>
                                        <option value="audi">Jamaica</option>
                                        <option value="audi">Kyrgyzstan</option>
                                        <option value="audi">Lebanon</option>
                                        <option value="audi">Liechtenstein</option>
                                        <option value="audi">Luxembourg</option>
                                        <option value="audi">Moldova</option>
                                        <option value="audi">Montenegro</option>
                                        <option value="audi">Morocco</option>
                                    </select>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Emergency  State*</label>
                                    <select name="" id="">
                                        <option value=""></option>
                                        <option value="">No items found</option>
                                    </select>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Emergency  City *</label>
                                    <select name="" id="">
                                        <option value=""></option>
                                        <option value="">No items found</option>
                                    </select>
                                </div>



                            </div>
                        </div>
                        }
                        {
                            tabstate === 4 && <div>
                                .++
                                <div>
                                    <h1>Resume</h1>
                                </div>
                                <div className='resumebox'>


                                    <div className='resume'>
                                        <button>
                                            UPLOAD
                                        </button>
                                        <p>Upload or drag and drop the file here.</p>
                                    </div>
                                </div>
                            </div>
                        }
                        {tabstate === 15 && <div>
                            <h1 className='biographic'>Last Salary</h1>

                            <div className='formcuinariner'>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Currency *</label>
                                    <select name="" id="">
                                        <option value=""></option>
                                        <option value="">Last Salary</option>
                                        <option value="">Barbados dollar

                                        </option>
                                        <option value="">Australian dollar

                                        </option>
                                        <option value="">Ngultrum</option>
                                        <option value="">CFA Franc

                                        </option>
                                        <option value="">Kwacha</option>
                                        <option value="">Dong</option>
                                        <option value="">Rial</option>
                                    </select>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Fixed Pay *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Variable Pay *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Incentives/ Bonuses *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Total Cash Component *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Stock Options *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Benefits*</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Total CTC *</label>
                                    <input type="text" />

                                </div>



                            </div>

                        </div>
                        }
                        {tabstate === 16 && <div>
                            <h1 className='biographic'>Misc</h1>

                            <div className='formcuinariner'>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <select name="" id="">
                                        <option value=""></option>
                                        <option value="">No</option>
                                        <option value="">yes</option>
                                    </select>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Country Code Personal *</label>
                                    <input type="text" />

                                </div>



                            </div>

                        </div>
                        }
                        {tabstate === 14 && <div>
                            <h1 className='biographic'>Misc</h1>

                            <div className='formcuinariner'>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <select name="" id="">
                                        <option value=""></option>
                                        <option value="">No</option>
                                        <option value="">yes</option>
                                    </select>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Country Code Personal *</label>
                                    <input type="text" />

                                </div>



                            </div>

                        </div>
                        }
                        {tabstate === 13 && <div>
                            <h1 className='biographic'>Misc</h1>

                            <div className='formcuinariner'>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <select name="" id="">
                                        <option value=""></option>
                                        <option value="">No</option>
                                        <option value="">yes</option>
                                    </select>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Country Code Personal *</label>
                                    <input type="text" />

                                </div>



                            </div>

                        </div>
                        }
                        {tabstate === 12 && <div>
                            <h1 className='biographic'>Misc</h1>

                            <div className='formcuinariner'>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <select name="" id="">
                                        <option value=""></option>
                                        <option value="">No</option>
                                        <option value="">yes</option>
                                    </select>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Country Code Personal *</label>
                                    <input type="text" />

                                </div>



                            </div>

                        </div>
                        }
                        {tabstate === 10 && <div>
                            <h1 className='biographic'>Personal</h1>

                            <div className='formcuinariner'>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <div className='uploadfiles'>
                                      <button>
                                        <BiCloudUpload/>
                                        UPLOAD

                                      </button>

                                    </div>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <div className='uploadfiles'>
                                      <button>
                                        <BiCloudUpload/>
                                        UPLOAD

                                      </button>

                                    </div>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <div className='uploadfiles'>
                                      <button>
                                        <BiCloudUpload/>
                                        UPLOAD

                                      </button>

                                    </div>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <div className='uploadfiles'>
                                      <button>
                                        <BiCloudUpload/>
                                        UPLOAD

                                      </button>

                                    </div>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <div className='uploadfiles'>
                                      <button>
                                        <BiCloudUpload/>
                                        UPLOAD

                                      </button>

                                    </div>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <div className='uploadfiles'>
                                      <button>
                                        <BiCloudUpload/>
                                        UPLOAD

                                      </button>

                                    </div>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <div className='uploadfiles'>
                                      <button>
                                        <BiCloudUpload/>
                                        UPLOAD

                                      </button>

                                    </div>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <div className='uploadfiles'>
                                      <button>
                                        <BiCloudUpload/>
                                        UPLOAD

                                      </button>

                                    </div>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <div className='uploadfiles'>
                                      <button>
                                        <BiCloudUpload/>
                                        UPLOAD

                                      </button>

                                    </div>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <div className='uploadfiles'>
                                      <button>
                                        <BiCloudUpload/>
                                        UPLOAD

                                      </button>

                                    </div>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <div className='uploadfiles'>
                                      <button>
                                        <BiCloudUpload/>
                                        UPLOAD

                                      </button>

                                    </div>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <div className='uploadfiles'>
                                      <button>
                                        <BiCloudUpload/>
                                        UPLOAD

                                      </button>

                                    </div>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <div className='uploadfiles'>
                                      <button>
                                        <BiCloudUpload/>
                                        UPLOAD

                                      </button>

                                    </div>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <div className='uploadfiles'>
                                      <button>
                                        <BiCloudUpload/>
                                        UPLOAD

                                      </button>

                                    </div>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <div className='uploadfiles'>
                                      <button>
                                        <BiCloudUpload/>
                                        UPLOAD

                                      </button>

                                    </div>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Country Code Personal *</label>
                                    <input type="text" />

                                </div>



                            </div>

                        </div>
                        }
                        {tabstate === 11 && <div>
                            <h1 className='biographic'>Personal</h1>

                            <div className='formcuinariner'>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <select name="" id="">
                                        <option value=""></option>
                                        <option value="">No</option>
                                        <option value="">yes</option>
                                    </select>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Country Code Personal *</label>
                                    <input type="text" />

                                </div>



                            </div>

                        </div>
                        }
                        {tabstate === 9 && <div>
                            <h1 className='biographic'>Personal Identity</h1>

                            <div className='formcuinariner'>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <select name="" id="">
                                        <option value=""></option>
                                        <option value="">No</option>
                                        <option value="">yes</option>
                                    </select>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">National Insurance (NI) Number (Guernsey) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">National Insurance Scheme (NIS) Number (Grenada) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">National Insurance Scheme (NIS) Number (Grenada) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">National Insurance Scheme (NIS) Number (Grenada) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">National Insurance Scheme (NIS) Number (Grenada) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">National Insurance (NI) Number (Guernsey) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">National Insurance (NI) Number (Guernsey) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">National Insurance (NI) Number (Guernsey) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Passport Number (PAS) (Guinea-Bissau) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Passport Number (PAS) (Guinea-Bissau) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Passport Number (PAS) (Guinea-Bissau) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Passport Number (PAS) (Guinea-Bissau) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Tax Identification Number (NIT) (Guatemala) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Tax Identification Number (NIT) (Guatemala) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Tax Identification Number (NIT) (Guatemala) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Tax Identification Number (NIT) (Guatemala) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">hhhhhhhh *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">hhhhhhhh *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">hhhhhhhh *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">hhhhhhhh *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">hhhhhhhh *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">National Insurance (NI) Number (Guernsey) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">National Insurance (NI) Number (Guernsey) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">National Insurance (NI) Number (Guernsey) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">CASS Number (Andorra) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">National ID Card Number (Algeria) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">IQAMA Number *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Personal ID (Letërnjoftimi) Number(Albania) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">ssue place *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Passport type *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Country Code Personal *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">National Identity Card (CNI) Number (Burkina Faso)*</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">National Identity Card (CNI) Number (Cameroon) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">National Identity Card (CNI) Number (Cameroon) *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Country Code Personal *</label>
                                    <input type="text" />

                                </div>



                            </div>

                        </div>
                        }
                        {tabstate === 8 && <div>
                            <h1 className='biographic'>Misc</h1>

                            <div className='formcuinariner'>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <select name="" id="">
                                        <option value=""></option>
                                        <option value="">No</option>
                                        <option value="">yes</option>
                                    </select>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Country Code Personal *</label>
                                    <input type="text" />

                                </div>



                            </div>

                        </div>
                        }
                        {tabstate === 7 && <div>
                            <h1 className='biographic'>References</h1>

                            <div className='formcuinariner'>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                    Reference Name*</label>
                                    <input type="text" />
                                   
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Reference Company *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Reference Designation *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Reference Phone Country Code *</label>
                                    <select name="" id="">
                                        <option value=""></option>
                                        <option value="">select</option>
                                        <option value="">+91</option>
                                        <option value="">+234</option>
                                        <option value="">None</option>
                                    </select>

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Reference Phone*</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">
Reference Email *</label>
                                    <input type="text" />

                                </div>



                            </div>

                        </div>
                        }
                        {tabstate === 6 && <div>
                            <h1 className='biographic'>Job</h1>

                            <div className='formcuinariner'>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                    Timezone *</label>
                                    <select name="" id="">
                                        <option value=""></option>
                                        <option value="">No</option>
                                        <option value="">yes</option>
                                    </select>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Languages Spoken *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Role Name *</label>
                                    <input type="text" />

                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Spoken *</label>
                                    <input type="text" />

                                </div>



                            </div>

                        </div>
                        }
                        {tabstate === 5 && <div>
                            <h1 className='biographic'>Work Experience</h1>

                            <div className='formcuinariner'>
                                <div className='inpiut'>
                                    <label htmlFor="">
                                        Personal Email ID *</label>
                                    <select name="" id="">
                                        <option value=""></option>
                                        <option value="">No</option>
                                        <option value="">yes</option>
                                    </select>
                                </div>
                                <div className='inpiut'>
                                    <label htmlFor="">Country Code Personal *</label>
                                    <input type="text" />

                                </div>



                            </div>

                        </div>
                        }




                    </div>
                </div>

            </div>

        </Base>
    )
}

export default Profileee