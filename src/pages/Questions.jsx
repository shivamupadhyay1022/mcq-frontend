import React, { useContext } from "react";
import { useEffect } from "react";
import { supabase } from "../supabase";
import { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import "./Question.css";
import { QContext } from "../context/Context";
import Backnav from "../components/Backnav";
import FloatNav from "../components/FloatNav";

function Questions() {
  const [quest, setQuest] = useState([]);
  const cont = useContext(QContext);
  const [showdelaytext, setShowDelayedText] = useState(false);

  //   function setAlert() {
  //     alert = !alert;
  //   }

  useEffect(() => {
    setTimeout(() => {
      setShowDelayedText(true);
    }, 2000);
    getQuestions();
    console.log(cont);
  }, []);

  async function getQuestions() {
    try {
      if (cont != null) {
        setQuest(cont.QList);
      }
      setShowDelayedText(false);
    } catch (error) {}
  }

  return (
    <div>
      {!showdelaytext ? (
        <div className="absolute top-[40%] right-[40%] transform -translate-x-1/2 -translate-y-1/2 spinner md:top-1/2 md:left-1/2">
          <div class="loader"></div>
        </div>
      ) : (
        <div>
          <Backnav title={cont.actsub} />
          <div className="mx-8">
            <div className="my-20">
              {quest.map((item) => (
                <QuestionCard item={item} /> // Adjust based on your data structure
              ))}
            </div>
          </div>
          <FloatNav />
        </div>
      )}
    </div>
  );
}

export default Questions;
