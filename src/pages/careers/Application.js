import React from 'react'
import Base from '../../components/base/Base';
import "./careers.css";
import { AiTwotoneBell } from 'react-icons/ai';

const Application = () => {
    return (
        <Base noFooter={true}>

            <div className='applicatiupward'>
                <div className='applicationn'>
                    <div>
                        <AiTwotoneBell />
                        <p>1. Verify your phone number. Only verified Phones can be used at the time of login</p>
                        <button>verify</button>

                    </div>
                    <div>
                        <AiTwotoneBell />
                        <p>1. Verify your phone number. Only verified Phones can be used at the time of login</p>
                        <button>COMPLETE NOW</button>

                    </div>



                </div>
                <div className='applicationnww'>
                    <div className='applied'>
                        <h1>Applications  </h1>

                    </div>
                    <div className='applied1'>
                        <p>Applied on

                        </p>
                        <p>Applied role

                        </p>
                        <p>Stages</p>

                    </div>
                    <div className='noappli'>
                        <h1>No applications found</h1>
                    </div>
                </div>

            </div>




        </Base>
    )
}

export default Application