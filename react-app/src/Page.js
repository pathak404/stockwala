import React from 'react'
import Footer from "./Components/Footer"
import Header from "./Components/Header"


function Page({Component}) {
  return (
    <>
        <Header />
        <div className="page">
        {Component}
        </div>
        <Footer />
    </>
  )
}

export default Page