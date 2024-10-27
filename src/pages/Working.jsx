import React from 'react'
import TopNav from '../components/TopNav'
import Backnav from '../components/Backnav'
import FloatNav from '../components/FloatNav'
import './Hamster.css'

function Working() {
  return (
    <div className='flex flex-col h-[100vh] justify-center items-center text-center' >
        <div className='flex flex-col items-center' >
        <div
              aria-label="Orange and tan hamster running in a metal wheel"
              role="img"
              className="wheel-and-hamster"
            >
              <div className="wheel"></div>
              <div className="hamster">
                <div className="hamster__body">
                  <div className="hamster__head">
                    <div className="hamster__ear"></div>
                    <div className="hamster__eye"></div>
                    <div className="hamster__nose"></div>
                  </div>
                  <div className="hamster__limb hamster__limb--fr"></div>
                  <div className="hamster__limb hamster__limb--fl"></div>
                  <div className="hamster__limb hamster__limb--br"></div>
                  <div className="hamster__limb hamster__limb--bl"></div>
                  <div className="hamster__tail"></div>
                </div>
              </div>
              <div className="spoke"></div>
            </div>
            <p className='my-2 text-2xl' >We are actively working on the feature</p>
            <p className=' text-2xl' >Stay Tuned!</p>
        </div>
        <Backnav/>
        <FloatNav/>
    </div>
  )
}

export default Working