import React from 'react'
import '../../components/footer/footer.css';

import { Link } from 'react-router-dom'

import { GrFacebookOption } from 'react-icons/gr';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { FiYoutube } from 'react-icons/fi';
import { GrTwitter } from 'react-icons/gr';
import { FaTelegramPlane } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';
import LazyLoad from 'react-lazyload';


const Footer = () => {
    return (
        <div className='footerContainer'>
            <div className='mainFooter'>
                <div className='footerImgIconSection'>
                    <div className='footerdesign'>
                        <div className='logoAndSlogan logon'>
                            <LazyLoad className='h-[60px]'>
                                <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/logoLandscape.png"} alt="Edtech Name Logo" className='h-full' />
                            </LazyLoad>
                        </div>
                        <div>
                            <h2 className='logotitlestan'>
                                <span>Edtech</span>
                                <span>Name</span>
                            </h2>
                            <p className='textline'>ONLINE EDUCATION & LEARNING</p>
                        </div>
                    </div>
                    <p className='footerAboutText'>The purpose of this paper is to detail an exploratory case study which highlights a process to modernize an undergraduate aspects of university ?</p>
                    <div className='footerIcons'>
                        <Link to={"https://www.facebook.com/letslearneducation?mibextid=ZbWKwL"} className='footerIcon bg-[#3b5998]'>
                            <GrFacebookOption />
                        </Link>
                        <Link to={"https://instagram.com/letslearn.live"} className='footerIcon instagramoicons'>
                            <AiOutlineInstagram />
                        </Link>
                        <Link to={"https://twitter.com/LetsLearnIndia"} className='footerIcon bg-[#00acee]' >
                            <GrTwitter />
                        </Link>
                        <Link to={"https://www.youtube.com/channel/UCFHXKjp9fJ_y60mhht1tcHw"} className='footerIcon bg-[#f70000]'>
                            <FiYoutube />
                        </Link>
                        <Link to={"https://t.me/letslearninstitute"} className='footerIcon bg-[#229ED9]' >
                            <FaTelegramPlane />
                        </Link>
                        <Link to={"https://www.linkedin.com/in/letslearneducation"} className='footerIcon bg-[#0072b1]'>
                            <FaLinkedinIn />
                        </Link>
                    </div>
                </div>
                <div className='exploreMenu'>
                    <p className='footerLinkHeading'>Explore</p>
                    <Link to="/about" className='explorep'>About Us</Link>
                    <Link to="/services" className='explorep'>Service</Link>
                    <Link to="/blog" className='explorep'>Blog</Link>
                    <Link to="/contact-us" className='explorep'>Contact Us</Link>
                    <Link to="/affiliate/register" className='explorep'>Associate With Us</Link>
                </div>
                <div className='quickLinkMenu'>
                    <p className='footerLinkHeading'>Quick Links</p>
                    <Link to="/">Home</Link>
                    <Link to="/refund">Refund Policy</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/term-and-conditions">Terms and Conditions</Link>
                    <Link to="/maintenance">Careers</Link>
                </div>

                <div className='footerContactDetails'>
                    <p className='footerLinkHeading'>Contact Us</p>
                    <div className='footerAddress'>
                        <p>428, 3<sup>rd</sup> floor, Bhera Enclave</p>
                        <p>Paschim Vihar, 110087</p>
                        <a href='tel:+91 8506-03-8506'>
                            <BsTelephone size={20} />
                            <span>+91-8506-03-8506</span>
                        </a>
                        <a href='mailto:info.letslearnacademy@gmail.com'>
                            <MdOutlineAlternateEmail size={20} />
                            <span>info.letslearnacademy@gmail.com</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer