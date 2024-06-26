import React from 'react'
import { bit, iit, nta, vit, wb } from '../assets'

function Cutoff() {
  return (
    <div><p className="text-white my-2">Previous Year Cut-off</p>
    <div className=" flex flex-row overflow-x-scroll space-x-4 ">
      <div className="h-18 w-[120px] bg-blue-200 rounded-xl flex-shrink-0 flex-col flex items-start pl-4 justify-center ">
        <div className="avatar mt-2">
          <div className="w-8 rounded-full">
            <img src={nta} />
          </div>
        </div>
        <span className="text-blue-500 mb-2 mt-1 font-semibold">
          JEE Mains
        </span>
      </div>

      <div className="h-18 w-[120px] bg-violet-200 rounded-xl flex-shrink-0 flex-col flex items-start pl-4 justify-center ">
        <div className="avatar mt-2">
          <div className="w-8 rounded-full">
            <img src={iit} />
          </div>
        </div>
        <span className="text-violet-500 mb-2 mt-1 font-semibold">
          Advanced
        </span>
      </div>

      <div className="h-18 w-[120px] bg-blue-200 rounded-xl flex-shrink-0 flex-col flex items-start pl-4 justify-center ">
        <div className="avatar mt-2">
          <div className="w-8 rounded-full">
            <img src={bit} />
          </div>
        </div>
        <span className="text-blue-500 mb-2 mt-1 font-semibold">
          BITSAT
        </span>
      </div>

      <div className="h-18 w-[120px] bg-violet-200 rounded-xl flex-shrink-0 flex-col flex items-start pl-4 justify-center ">
        <div className="avatar mt-2">
          <div className="w-8 rounded-full">
            <img src={vit} />
          </div>
        </div>
        <span className="text-violet-500 mb-2 mt-1 font-semibold">
          VITEEE
        </span>
      </div>

      <div className="h-18 w-[120px] bg-blue-200 rounded-xl flex-shrink-0 flex-col flex items-start pl-4 justify-center ">
        <div className="avatar mt-2">
          <div className="w-8 rounded-full">
            <img src={wb} />
          </div>
        </div>
        <span className="text-blue-500 mb-2 mt-1 font-semibold">
          WEBJEE
        </span>
      </div>
    </div></div>
  )
}

export default Cutoff