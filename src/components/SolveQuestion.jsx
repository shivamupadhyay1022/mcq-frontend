import React, { useEffect, useState } from "react";
import Backnav from "./Backnav";
import Checknav from "./Checknav";
import { useLocation, useParams } from "react-router-dom";
import { useContext } from "react";
import { QContext } from "../context/Context";
import { MathJaxProvider, MathJaxHtml } from "mathjax3-react";
import { MathJax } from "better-react-mathjax";

function SolveQuestion(props) {
  const cont = useContext(QContext);
  const [option, setOption] = useState();
  const [correct, setCorrect] = useState();
  const [showSol, setShowsol] = useState(false);
  const [correctoption, setCorrectoption] = useState();
  const [question, setQuestion] = useState();
  const [tag, setTag] = useState();
  const [op1, setOp1] = useState();
  const [op2, setOp2] = useState();
  const [op3, setOp3] = useState();
  const [op4, setOp4] = useState();
  const [correctopt, setCorrectopt] = useState();
  const [subject, setSubject] = useState();
  const [explanation, setExplanation] = useState();
  const item = cont.QuestItem;
  // const {stateParam} = useLocation().state.stateParam
  useEffect(() => {
    setQuestion(item.question);
    setOp1(item.option1);
    setOp2(item.option2);
    setOp3(item.option3);
    setOp4(item.option4);
    setExplanation(item.explanation);
    // console.log(stateParam)
  });

  function checkanswer() {
    setShowsol(true);
    if (item.correct == option) setCorrect(true);
    else setCorrect(false);

    switch (item.correct) {
      case "op1":
        setCorrectoption("Option 1");
        break;
      case "op2":
        setCorrectoption("Option 2");
        break;
      case "op3":
        setCorrectoption("Option 3");
        break;
      case "op4":
        setCorrectoption("Option 4");
        break;

      default:
      // code block
    }
  }
  return (
    <MathJaxProvider>
      <div className="flex flex-col text-white ">
        <Backnav timer={true} />
        <div className=" pt-20 pb-20 space-y-4 mx-4">
          <p className="p-2 ">
          <MathJax inline dynamic>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `<p>${question}</p> `.replace(/\n[\s]*/g, ""),
                    }}
                  />
                </MathJax>
          </p>
          <div className="form-control border-2 rounded-2xl border-slate-600  ">
            <label className="label cursor-pointer p-4 ">
              <span className="label-text">
              <MathJax inline dynamic>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `<p>Option 1: ${op1}</p> `.replace(/\n[\s]*/g, ""),
                    }}
                  />
                </MathJax>
              </span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-blue-500"
                onChange={() => setOption("op1")}
              />
            </label>
          </div>
          <div className="form-control border-2 rounded-2xl border-slate-600">
            <label className="label cursor-pointer p-4">
              <span className="label-text">
              <MathJax inline dynamic>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `<p>Option 2: ${op2}</p> `.replace(/\n[\s]*/g, ""),
                    }}
                  />
                </MathJax>
              </span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-blue-500"
                onChange={() => setOption("op2")}
              />
            </label>
          </div>
          <div className="form-control border-2 rounded-2xl border-slate-600">
            <label className="label cursor-pointer p-4">
              <span className="label-text">
              <MathJax inline dynamic>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `<p>Option 3: ${op3}</p> `.replace(/\n[\s]*/g, ""),
                    }}
                  />
                </MathJax>
              </span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-blue-500"
                onChange={() => setOption("op3")}
              />
            </label>
          </div>
          <div className="form-control border-2 rounded-2xl border-slate-600">
            <label className="label cursor-pointer p-4">
              <span className="label-text">
              <MathJax inline dynamic>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `<p>Option 4: ${op4}</p> `.replace(/\n[\s]*/g, ""),
                    }}
                  />
                </MathJax>
              </span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-blue-500"
                onChange={() => setOption("op4")}
              />
            </label>
          </div>
          {showSol && (
            <div>
              {correct ? (
                <div className="bg-green-500 h-8 rounded-xl text-center flex justify-center text-white">
                  <p>You are correct</p>
                </div>
              ) : (
                <div className="bg-red-500 h-8 rounded-xl text-center flex justify-center text-white">
                  {" "}
                  You are incorrect
                </div>
              )}
            </div>
          )}
          {showSol && (
            <div className="flex flex-col items-center border-2 border-slate-600 rounded-2xl ">
              <p>Correct option is: {correctoption || "null"}</p>
              <p className="px-2">
                <MathJax inline dynamic>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `<p>Explanation:${explanation}</p> `.replace(/\n[\s]*/g, ""),
                    }}
                  />
                </MathJax>
              </p>
            </div>
          )}
        </div>

        {/* checknav */}
        <footer className="font-hind flex flex-col z-50 justify-center ">
          <div className="bg-slate-700 flex items-center justify-between mx-1 px-4 left-1 right-1 border-slate-400 fixed inset-x-0 bottom-0 h-12 rounded-t-3xl border-t-2 ">
            <button className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              <p>Prev</p>
            </button>
            <button className="flex items-center space-x-4">
              <p>Next</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
            <button
              onClick={() => checkanswer()}
              className="flex flex-col bg-slate-900 rounded-lg  border-slate-400 justify-center absolute bottom-[0.1] left-1/2 transform -translate-x-1/2 -translate-y-1/2  border-2 h-[35px] w-[145px] items-center"
            >
              <p>Check Answer</p>
            </button>
          </div>
        </footer>
      </div>
    </MathJaxProvider>
  );
}

export default SolveQuestion;
