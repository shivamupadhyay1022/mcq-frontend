import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { QContext } from "../context/Context";
import { MathJaxProvider, MathJaxHtml } from "mathjax3-react";
import { MathJax } from "better-react-mathjax";
import Backnav from "../components/Backnav";
import FloatNav from "../components/FloatNav";
import { supabase } from "../supabase";

function Solveexam() {
  const context = useContext(QContext);
  const [option, setOption] = useState("");
  const [correct, setCorrect] = useState("");
  const [showSol, setShowsol] = useState(false);
  const [correctoption, setCorrectoption] = useState("");
  const [question, setQuestion] = useState("");
  const [tag, setTag] = useState("");
  const [op1, setOp1] = useState("");
  const [op2, setOp2] = useState("");
  const [op3, setOp3] = useState("");
  const [op4, setOp4] = useState("");
  const [correctopt, setCorrectopt] = useState("");
  const [subject, setSubject] = useState("");
  const [explanation, setExplanation] = useState("");
  const [seed, setSeed] = useState(7);
  const [seedone, setSeedOne] = useState(9);
  const [currentquestion, setCurrentQuestion] = useState();
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [examquestionlist, SetExamQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [examid, setExamid] = useState();
  const [exam, setExam] = useState();

  useLayoutEffect(() => {
    if (examid) {
      console.log("Exam ID set:", examid);
      fetchexam();
    }
  }, [examid]);

  useLayoutEffect(() => {
    if (examquestionlist.length > 0) {
      console.log("Updated question list:", examquestionlist);
      fetchQuestion(examquestionlist[currentQuestionIndex]);
    }
  }, [examquestionlist]);
  // Now logging examquestionlist only when it's updated
  useLayoutEffect(() => {
    if (currentQuestionIndex > 0) {
      console.log("Updated Current question Index:", currentQuestionIndex);
      fetchQuestion(examquestionlist[currentQuestionIndex]);
    }
  }, [currentQuestionIndex]); // Now logging examquestionlist only when it's updated

  useLayoutEffect(() => {
    process();
  }, []);

  async function fetchexamid() {
    var id = await window.localStorage.getItem("Exam_question_id");

    if (id !== null) {
      setExamid(parseInt(JSON.parse(id), 10));
    }
  }

  async function process() {
    await fetchexamid();
  }

  async function fetchexam() {
    if (!examid) return;
    try {
      const { data, error } = await supabase
        .from("exams")
        .select("*")
        .match({ id: examid })
        .limit(1);
      if (error) throw error;
      if (data && data.length > 0) {
        setExam(data[0]);
        splitstring(data[0]?.Questions);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function splitstring(questionlist) {
    var str_array = questionlist.split(",");
    for (var i = 0; i < str_array.length; i++) {
      // Trim the excess whitespace.
      str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
      // Add additional code here, such as:
    }
    SetExamQuestionList(str_array);
    // console.log(examquestionlist)
  }

  const fetchQuestion = async (index) => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .match({ id: index });
      if (error) throw error;
      if (data) {
        setCurrentQuestion(...data);
        console.log(data);
        console.log(currentquestion);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function checkanswer() {
    setShowsol(true);
    if (currentquestion.correct === option) {
      setCorrect(true);
      setAttemptedQuestions((prev) => [...prev, currentQuestionIndex]);
    } else {
      setCorrect(false);
    }

    switch (currentquestion.correct) {
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
    }
  }

  return (
    <div>
      {" "}
      <div>
        <div className="flex flex-col justify-center text-white ">
          <Backnav timer={true} />
          <div key={seedone} className="overflow-x-auto mt-20 self-center">
            <ul className="steps">
              {examquestionlist.map((question, index) => (
                <li
                  key={index}
                  className={`step ${
                    attemptedQuestions.includes(index) ? "step-accent" : " step-neutral"
                  }`}
                ></li>
              ))}
            </ul>
          </div>

          {/* quetsion block */}
          <div key={seed} className="pt-20 pb-20 space-y-4 mx-4">
            <p className="p-2 ">
              <MathJax inline dynamic>
                <span
                  dangerouslySetInnerHTML={{
                    __html: `<p>${currentquestion?.question}</p> `.replace(
                      /\n[\s]*/g,
                      ""
                    ),
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
                        __html:
                          `<p>Option 1: ${currentquestion?.option1}</p> `.replace(
                            /\n[\s]*/g,
                            ""
                          ),
                      }}
                    />
                  </MathJax>
                </span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-500"
                  onChange={() => {
                    setOption("op1");
                    setAttemptedQuestions((prevItems) => [
                      ...prevItems,
                     currentQuestionIndex,
                    ]);
                    console.log(attemptedQuestions);
                    setSeedOne(Math.random());
                  }}
                />
              </label>
            </div>
            <div className="form-control border-2 rounded-2xl border-slate-600">
              <label className="label cursor-pointer p-4">
                <span className="label-text">
                  <MathJax inline dynamic>
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          `<p>Option 2: ${currentquestion?.option2}</p> `.replace(
                            /\n[\s]*/g,
                            ""
                          ),
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
                        __html:
                          `<p>Option 3: ${currentquestion?.option3}</p> `.replace(
                            /\n[\s]*/g,
                            ""
                          ),
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
                        __html:
                          `<p>Option 4: ${currentquestion?.option4}</p> `.replace(
                            /\n[\s]*/g,
                            ""
                          ),
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
                <p>Correct option is: {currentquestion?.correct || "null"}</p>
                <p className="px-2">
                  <MathJax inline dynamic>
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          `<p>Explanation:${currentquestion?.explanation}</p> `.replace(
                            /\n[\s]*/g,
                            ""
                          ),
                      }}
                    />
                  </MathJax>
                </p>
              </div>
            )}
          </div>

          <footer className="font-hind flex flex-col z-50 justify-center ">
            <div className="bg-slate-700 flex items-center justify-between mx-1 px-4 left-1 right-1 border-slate-400 fixed inset-x-0 bottom-0 h-12 rounded-t-3xl border-t-2 ">
              <button
                className="flex items-center space-x-4"
                onClick={() => {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                  console.log(currentQuestionIndex);
                  setSeed(Math.random());
                }}
              >
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
              <button
                className="flex items-center space-x-4"
                onClick={() => {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                  console.log(currentQuestionIndex);
                  setSeed(Math.random());
                }}
              >
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
      </div>
    </div>
  );
}

export default Solveexam;
