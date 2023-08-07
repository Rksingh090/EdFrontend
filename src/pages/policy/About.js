import React from 'react'
import "./pages.css";
import Base from '../../components/base/Base';
import LazyLoad from 'react-lazyload';

const About = () => {
    return (
        <Base>
            <div className='aboutUsPage'>
                <div className='aboutPageGrid'>
                    <div className="aboutGridFirstDiv">
                        <LazyLoad className='fullSizeLazy imgCover'>
                            <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/aboutMainLogo.jpg"} alt="" />
                        </LazyLoad>
                    </div>
                    <div className='aboutTitleDesc'>
                        <h1>About Us​</h1>
                        <p>
                            Let’s Learn a coaching Institute situated in Paschim Vihar, New Delhi, is a great destination for High Quality Education.
                            It was established in 2016 and is one of the fastest growing educational institute in West Delhi.
                            The main focus of the institute is to provide Qualitative and Advance Education to it’s students.
                            Let’s Learn has introduced a new and successful league of teaching in the area of coaching for Foundation Courses and Entrance Examination.
                            At Let’s Learn, all efforts are put in place to provide empowered coaching on one-on-one basis besides group coaching.
                            The study curriculum is designed especially for Foundation courses and Entrance examinations which eventually makes Let’s Learn a unique coaching institute belonging to class of its own.
                        </p>
                    </div>
                </div>
                <div className='aboutPageGrid reverse'>
                    <div className="aboutGridFirstDiv">
                        <LazyLoad className='fullSizeLazy imgCover'>
                            <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/aboutComputerImg.png"} alt="" />
                        </LazyLoad>
                    </div>
                    <div className='aboutTitleDesc'>
                        <h1>Innovative Methods Of Teaching</h1>
                        <p>
                            The education field is evolving so quickly that you need to keep up and adapt to modern strategies. Otherwise, it may be hard for you to fit in.
                            That’s the reason, Let’s Learn is taking a step towards this change by introducing new and innovative learning methods which will enhance the learning experience for the students.
                            As it’s very obvious that 9th, 10th, 11th, and12th classes are the building blocks for a student which decides his/her future and have to be taken seriously.
                            With Let’s Learn’s new and innovative teaching methods we make the learning experience of the students more technologically advance and unique which will help them coping with all of their subjects.
                        </p>
                    </div>
                </div>
                <div className='aboutPageGrid'>
                    <div className="aboutGridFirstDiv">
                        <LazyLoad className='fullSizeLazy imgCover'>
                            <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/aboutSpaceImg.png"} alt="" />
                        </LazyLoad>
                    </div>
                    <div className='aboutTitleDesc'>
                        <h1>Devoted To Early Education​</h1>
                        <p>
                            The goal of early education should be to activate the child’s own natural desire to
                            learn which means early education helps a child to grow his first desire to become a doctor,
                            an engineer, a designer or a teacher at a very young age and Let’s Learn wants to be a part of every child’s
                            journey towards their dreams and wants to provide them with the best teacher with high qualification and
                            amazing study material which will help them to set up the foundation for their future at a vey young age.
                            Having an aim at a young age motivates a child to work hard and be an achiever in their life and Let’s Learn  is having a vision to turn every child’s dream into reality.
                        </p>
                    </div>
                </div>
                <div className='aboutPageGrid reverse'>
                    <div className="aboutGridFirstDiv">
                        <LazyLoad className='fullSizeLazy imgCover'>
                            <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/aboutTutorImg.png"} alt="" />
                        </LazyLoad>
                    </div>
                    <div className='aboutTitleDesc'>
                        <h1>Find A Class For Your Child</h1>
                        <p>A classroom is a place where future leaders with new ideas are born and Let’s Learn is providing the ‘Home Advantage’ to your child in its online program in which Let’s Learn gives you interactive Live Lecture at the comfort your home with highly qualified teachers and their handwritten notes and also the recorded videos of every class you miss. Other than Online classes, Offline classes are also the option for the students in which they will get the hard copies of the notes for every subject with regular tests and tricks to learn their concepts more easily
                            The highly interactive and competitive classes which will challenge the students abilities and motivate them to work hard. This will also make learning much more fun and easy for the students.</p>
                    </div>
                </div>
                <div className='aboutPageGrid'>
                    <div className="aboutGridFirstDiv aboutGoogleMap">
                        <iframe title="Edtech Name google map location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2081.4895836537553!2d77.09014701005228!3d28.6706678702986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d046e3aaaaaab%3A0x95af3293d0363e78!2sLet's%20Learn!5e0!3m2!1sen!2sin!4v1656678706437!5m2!1sen!2sin"
                            className="googlemap" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className='aboutTitleDesc colCentered'>
                        <h1>Visit Us​</h1>
                        <p>Address: 428 , 3rd Floor Bhera Enclave, Paschim Vihar -110087</p>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default About