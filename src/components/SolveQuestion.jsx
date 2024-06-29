import React, { useEffect } from "react";
import Backnav from "./Backnav";
import Checknav from "./Checknav";
import { useLocation, useParams } from "react-router-dom";
import { useContext } from "react";
import { QContext } from "../context/Context";
import { MathJaxProvider,MathJaxHtml } from "mathjax3-react";

function SolveQuestion(props) {
  const cont = useContext(QContext)
  const item = cont.QuestItem
  // const {stateParam} = useLocation().state.stateParam
  useEffect(()=>{
    console.log(item)
    // console.log(stateParam)
  })
  return (
    <MathJaxProvider>

    <div className="flex flex-col overflow-y-hidden ">
      <Backnav />
      <div className="mt-20 space-y-4 mx-4">
      <p className="p-2 ">
      {<MathJaxHtml html={item.question}/> || "question"}
      </p>
        <div className="form-control border-2 rounded-2xl border-slate-600  ">
          
          <label className="label cursor-pointer p-4 ">
            <span className="label-text">{<MathJaxHtml html={item.option1}/> || "Option 1"}</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-blue-500"
              defaultChecked
            />
          </label>
        </div>
        <div className="form-control border-2 rounded-2xl border-slate-600">
          <label className="label cursor-pointer p-4">
            <span className="label-text">{<MathJaxHtml html={item.option2}/> || "Option 2"}</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-blue-500"
              defaultChecked
            />
          </label>
        </div>
        <div className="form-control border-2 rounded-2xl border-slate-600">
          <label className="label cursor-pointer p-4">
            <span className="label-text">{<MathJaxHtml html={item.option3}/> || "Option 3"}</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-blue-500"
              defaultChecked
            />
          </label>
        </div>
        <div className="form-control border-2 rounded-2xl border-slate-600">
          <label className="label cursor-pointer p-4">
            <span className="label-text">{<MathJaxHtml html={item.option4}/> || "Option 4"}</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-blue-500"
              defaultChecked
            />
          </label>
        </div>
      </div>

      <Checknav />
    </div>
    </MathJaxProvider>
  );
}

export default SolveQuestion;
