import React from 'react'
import {BsFillSuitHeartFill} from 'react-icons/bs'


function Footer() {
  return (
    <div className='bg-white hstack align-items-center justify-content-center py-4'>
      <p className='small mb-0'>Made with <BsFillSuitHeartFill /> by <a href="mailto:officialabhishekpathak@gmail.com" className='text-decoration-none text-dark'>Abhishek Pathak</a></p>
    </div>
  )
}

export default Footer