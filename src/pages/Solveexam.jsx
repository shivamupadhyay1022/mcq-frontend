import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  memo,
} from "react";
import { QContext } from "../context/Context";
import { MathJaxProvider, MathJaxHtml } from "mathjax3-react";
import { MathJax } from "better-react-mathjax";
import Backnav from "../components/Backnav";
import FloatNav from "../components/FloatNav";
import { supabase } from "../supabase";
import QuestionCard from "../components/QuestionCard";
import Questionblockcomp from "../components/Questionblockcomp";

function Solveexam() {
  const context = useContext(QContext);
  const [option, setOption] = useState("op0");
  const [correct, setCorrect] = useState("");
  const [showsubmit, setShowSubmit] = useState(false);
  const [correctoption, setCorrectoption] = useState("");
  const [seed, setSeed] = useState(7);
  const [seedone, setSeedOne] = useState(9);
  const [currentquestion, setCurrentQuestion] = useState();
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [examquestionlistid, SetexamquestionlistidId] = useState([]);
  const [examquestionlist, Setexamquestionlist] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [examid, setExamid] = useState();
  const [exam, setExam] = useState();
  const [showdelaytext, setShowDelayedText] = useState(false);
  const [counter, setCounter] = useState(10);
  const [correctoptionlist, setCorrectOptionList] = useState([]);
  const [useroptionlist, setUserOptionList] = useState([]);

  useLayoutEffect(() => {
    setTimeout(() => {
      setShowDelayedText(true);
    }, 2000);
    if (examid) {
      console.log("Exam ID set:", examid);
      fetchexam();
    }
  }, [examid]);

  useLayoutEffect(() => {
    if (examquestionlistid.length > 0) {
      console.log("Updated question list:", examquestionlistid);
      fetchQuestion(examquestionlistid[currentQuestionIndex]);
    }
  }, [examquestionlistid]);
  // Now logging examquestionlistid only when it's updated
  useLayoutEffect(() => {
    if (currentQuestionIndex > 0) {
      console.log("Updated Current question Index:", currentQuestionIndex);
      fetchQuestion(examquestionlistid[currentQuestionIndex]);
    }
  }, [currentQuestionIndex]); // Now logging examquestionlistid only when it's updated

  useLayoutEffect(() => {
    process();
  }, []);

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
      return () => clearInterval(timer); // Clear timer on unmount or when counter changes
    } else {
      handleCounterEnd(); // Trigger the function when counter hits 0
    }
  }, [counter]);

  const handleCounterEnd = () => {
    console.log("Counter has ended! Triggering function...");
    onSubmit()
    setShowSubmit(true);
  };

  async function fetchexamid() {
    var id = await window.localStorage.getItem("Exam_question_id");

    if (id !== null) {
      setExamid(parseInt(JSON.parse(id), 10));
    }
  }

  async function fetchQuestionList() {
    const questlist = []; // Temporary array to store the fetched questions

    for (let i = 0; i < examquestionlistid.length; i++) {
      try {
        const { data, error } = await supabase
          .from("questions")
          .select("*")
          .match({ id: examquestionlistid[i] })
          .single(); // Assuming each ID fetches a single question

        if (error) throw error;

        if (data) {
          questlist.push(data); // Push each fetched question to questlist
        }
      } catch (error) {
        console.log(error);
      }
    }

    Setexamquestionlist(questlist); // Set the state once all questions are fetched
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
        setCounter(data[0]?.Duration * 60);
        setShowDelayedText(true);
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
    SetexamquestionlistidId(str_array);
    // console.log(examquestionlistid)
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function onSubmit() {
    const questlist = []; // Temporary array to store the fetched questions

    for (let i = 0; i < examquestionlistid.length; i++) {
      try {
        const { data, error } = await supabase
          .from("questions")
          .select("*")
          .match({ id: examquestionlistid[i] })
          .single(); // Assuming each ID fetches a single question

        if (error) throw error;

        if (data) {
          questlist.push(data);
          if(correctoptionlist.length<examquestionlistid.length){
              correctoptionlist.push(data.correct)
          } // Push each fetched question to questlist
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    if (questlist.length > 0) {
      Setexamquestionlist(questlist);
      console.log(questlist);
    } else {
      console.error("Questlist is empty or null, skipping MathJax render.");
    }


  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleOPtionsChange = () => {
    setUserOptionList((prev) => {
      const newMarkedOptions = [...prev];
      newMarkedOptions[currentQuestionIndex] = option;
      return newMarkedOptions;
    });
    setCorrectOptionList((prev) => {
      const newMarkedOptions = [...prev];
      newMarkedOptions[currentQuestionIndex] = currentquestion?.correct;
      return newMarkedOptions;
    });
    console.log(useroptionlist);
    console.log(correctoptionlist);
  };

  const QuestionBlock = () => {
    return (
      <div>
        {/* quetsion block */}
        <div className="pt-20 pb-20 space-y-4 mx-4">
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
                onChange={() => {
                  setOption("op2");
                  setAttemptedQuestions((prevItems) => [
                    ...prevItems,
                    currentQuestionIndex,
                  ]);
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
                onChange={() => {
                  setOption("op3");
                  setAttemptedQuestions((prevItems) => [
                    ...prevItems,
                    currentQuestionIndex,
                  ]);
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
                onChange={() => {
                  setOption("op4");
                  setAttemptedQuestions((prevItems) => [
                    ...prevItems,
                    currentQuestionIndex,
                  ]);
                  setSeedOne(Math.random());
                }}
              />
            </label>
          </div>
          {/* show sol block */}
        </div>
        {/* footer */}
        <footer className="font-hind flex flex-col z-50 justify-center ">
          <div className="bg-slate-700 flex items-center justify-between mx-1 px-4 left-1 right-1 border-slate-400 fixed inset-x-0 bottom-0 h-12 rounded-t-3xl border-t-2 ">
            {/* previous */}
            <button
              className="flex items-center space-x-4"
              onClick={() => {
                if (currentQuestionIndex > 0) {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                }
                console.log(currentQuestionIndex);
                setSeed(Math.random());
                handleOPtionsChange();
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
            {/* next */}
            <button
              className="flex items-center space-x-4"
              onClick={() => {
                if (currentQuestionIndex < examquestionlistid.length) {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                }
                console.log(currentQuestionIndex);
                setSeed(Math.random());
                handleOPtionsChange();
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
              onClick={() => {
                setShowSubmit((prev) => !prev);
                onSubmit();
              }}
              className="flex flex-col bg-slate-900 rounded-lg  border-slate-400 justify-center absolute bottom-[0.1] left-1/2 transform -translate-x-1/2 -translate-y-1/2  border-2 h-[35px] w-[145px] items-center"
            >
              <p>Submit</p>
            </button>
          </div>
        </footer>
      </div>
    );
  };

  const SubmitBlock = () => {
    if (examquestionlist) {
      return (
        <div>
          <div className="mx-8">
            <div className="my-20">
              {examquestionlist.map((item, index) => (
                <Questionblockcomp
                  key={index}
                  item={item}
                  marked={useroptionlist[index]}
                  correct={correctoptionlist[index]}
                /> // Adjust based on your data structure
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      {!showdelaytext ? (
        <div className="absolute top-[40%] right-[40%] transform -translate-x-1/2 -translate-y-1/2 spinner md:top-1/2 md:left-1/2">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col justify-center text-white ">
            <Backnav timer={formatTime(counter)} />
            <div key={seedone} className="overflow-x-auto mt-20 self-center">
              <ul className="steps">
                {examquestionlistid.map((question, index) => (
                  <li
                    key={index}
                    className={`step ${
                      attemptedQuestions.includes(index)
                        ? "step-accent"
                        : " step-neutral"
                    }`}
                  ></li>
                ))}
              </ul>
            </div>

            {/* quetsion block */}
            {showsubmit || (
              <div>
                {/* quetsion block */}
                <div className="pt-20 pb-20 space-y-4 mx-4">
                  <p className="p-2 ">
                    <MathJax inline dynamic>
                      <span
                        dangerouslySetInnerHTML={{
                          __html:
                            `<p>${currentquestion?.question}</p> `.replace(
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
                        onChange={() => {
                          setOption("op2");
                          setAttemptedQuestions((prevItems) => [
                            ...prevItems,
                            currentQuestionIndex,
                          ]);
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
                        onChange={() => {
                          setOption("op3");
                          setAttemptedQuestions((prevItems) => [
                            ...prevItems,
                            currentQuestionIndex,
                          ]);
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
                        onChange={() => {
                          setOption("op4");
                          setAttemptedQuestions((prevItems) => [
                            ...prevItems,
                            currentQuestionIndex,
                          ]);
                          setSeedOne(Math.random());
                        }}
                      />
                    </label>
                  </div>
                  {/* show sol block */}
                </div>
                {/* footer */}
                <footer className="font-hind flex flex-col z-50 justify-center ">
                  <div className="bg-slate-700 flex items-center justify-between mx-1 px-4 left-1 right-1 border-slate-400 fixed inset-x-0 bottom-0 h-12 rounded-t-3xl border-t-2 ">
                    {/* previous */}
                    {(currentQuestionIndex > 0) ?  (
                      <button
                        className="flex items-center space-x-4"
                        onClick={() => {
                          if (currentQuestionIndex > 0) {
                            setCurrentQuestionIndex(currentQuestionIndex - 1);
                          }
                          console.log(currentQuestionIndex);
                          setSeed(Math.random());
                          handleOPtionsChange();
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
                    ):(<div></div>)}

                    {/* next */}
                    {(currentQuestionIndex < examquestionlistid.length) ? (                    <button
                      className="flex items-center space-x-4"
                      onClick={() => {
                        if (currentQuestionIndex < examquestionlistid.length) {
                          setCurrentQuestionIndex(currentQuestionIndex + 1);
                        }
                        console.log(currentQuestionIndex);
                        setSeed(Math.random());
                        handleOPtionsChange();
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
                    </button>) : (<div></div>)}

                    <button
                      onClick={() => {
                        setShowSubmit((prev) => !prev);
                        onSubmit();
                      }}
                      className="flex flex-col bg-slate-900 rounded-lg  border-slate-400 justify-center absolute bottom-[0.1] left-1/2 transform -translate-x-1/2 -translate-y-1/2  border-2 h-[35px] w-[145px] items-center"
                    >
                      <p>Submit</p>
                    </button>
                  </div>
                </footer>
              </div>
            )}

            {/* submit block */}
            {!showsubmit || <SubmitBlock />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Solveexam;
