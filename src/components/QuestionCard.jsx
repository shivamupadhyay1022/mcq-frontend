import React, { useEffect, useState,useContext } from "react";
import { supabase } from "../supabase";
import { MathJaxProvider, MathJaxHtml, MathJaxFormula } from "mathjax3-react";
import { NavLink } from "react-router-dom";
import { QContext } from "../context/Context";

function QuestionCard(props) {
  const item = props.item;
 const question  = useContext(QContext)
  return (
    <NavLink to={{
      pathname:"/solvequestion/parameter-data",
      state:{stateParam: item}}} onClick={() =>{
        question.setquestitem(item)
      }} >
    <MathJaxProvider>
    <div className="card w-full bg-base-100 my-2 shadow-xl">
      <div className="card-body">
        <div className="card-actions justify-end">
          <div className="badge badge-neutral">{item.type || "Subject"}</div>
          <div className="badge badge-neutral">{item.tags || "Subject"}</div>
          <div className="badge badge-neutral">{item.subject || "Subject"}</div>
        </div>
        <div>
          <p>{<MathJaxHtml html={item.question}/> || "question"}</p>
        </div>
      </div>
    </div>
    </MathJaxProvider>
    </NavLink>
  );
}

export default QuestionCard;
