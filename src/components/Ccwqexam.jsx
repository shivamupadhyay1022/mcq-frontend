import React from 'react'
import { NavLink } from 'react-router-dom'

function Ccwqexam({name,img}) {
  return (
          <NavLink to={"/questions"} >
            <div className="flex flex-col justify-center items-center" >
              <div className="h-16 w-16 border-[1px] flex items-center justify-center rounded-lg border-slate-400">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src={ img || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                  </div>
                </div>
              </div>
              <p className="text-center my-1" >{name || "JEE Mains"}</p>
            </div>
            </NavLink>
  )
}

export default Ccwqexam