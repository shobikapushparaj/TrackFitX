import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom';
import img1 from '../images/img1.jpg';
const Firstpage = () => {
  return (
    <div className='fp-nav'>
      <div className='firstpage_nav'>
        <span>Already a User...?</span>
        <Link to ="./login" className='loginbtn1'>Login</Link>
      </div>
      <div className='firstpage_body'>
        <div className='firstpage_left'>
        <h1 className='gradient-text1'style={{marginLeft: '145px'}}>TrackFitX</h1>
        <h3 style={{marginLeft: '150px',marginBottom:'0px'}}className='gradient-text2'>Your Fitness,</h3>
        <h3 className='gradient-text3'style={{marginLeft: '210px',marginBottom:'0px'}}>Your Focus,</h3>
        <h3 className='gradient-text4'style={{marginLeft: '260px',marginBottom:'0px'}}>Your Future...</h3>
        <Link to ="./register"className='get_started'>Get Started</Link>
        </div>
        <div className='firstpage_right'>
         <img src={img1} alt="Your Image" />
        </div>
      </div>
    </div>
  )
}

export default Firstpage