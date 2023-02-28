import React from 'react'
import { Link } from 'react-router-dom'
import {RiSearchLine} from "react-icons/ri"
import logo from './logo.png'

function Header() {
  return (
    <div className='bg-white'>
        <div className="container py-3">
            <div className="hstack">
                <Link to="/" className='logo'><img src={logo} alt="logo" /></Link>
                <button className="btn ms-auto d-none" style={{backgroundColor: 'var(--color-light-neutral-1)'}}><RiSearchLine size={18} className="position-relative" style={{top: "-3px"}}/></button>
            </div>
        </div>
    </div>
  )
}

export default Header