import React, { useEffect, useState, useContext } from "react";
import { supabase } from "../supabase";
import { NavLink } from "react-router-dom";
import { QContext } from "../context/Context";
import { MathJax } from "better-react-mathjax";
function QuestionCard(props) {
  const item = props.item;
  const question = useContext(QContext);
  const [subject, setSubject] = useState("");
  const [questiontext, setQuestiontext] = useState("");
  const [tag, setTag] = useState("");
  const [type,setType] = useState("");
  useEffect(()=>{
    setType(item.type)
    setTag(item.tags);
    setSubject(item.subject);
    setQuestiontext(item.question);
  },[])
  return (
    <NavLink
      key={Math.random()}
      to={{
        pathname: "/solvequestion",
      }}
      onClick={() => {
        question?.setquestitem(item);
      }}
    >
      {!item || (
          <div className="card text-white w-full bg-base-100 my-2 shadow-xl">
            <div className="card-body">
              <div className="card-actions justify-end">
                <div className="badge badge-neutral">
                  {type || "Subject"}
                </div>
                <div className="badge badge-neutral">
                  {tag || "Subject"}
                </div>
                <div className="badge badge-neutral">
                  {subject || "Subject"}
                </div>
              </div>
              <div>
                <MathJax inline dynamic>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `<p>${questiontext}</p> `.replace(/\n[\s]*/g, ""),
                    }}
                  />
                </MathJax>
                
              </div>
            </div>
          </div>
      )}
    </NavLink>
  );
}

export default QuestionCard;
