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
  //   function setAlert() {
  //     alert = !alert;
  //   }

  useEffect(() => {
    getQuestions();
    console.log(cont);
  }, []);

  async function getQuestions() {
    try {
      if (cont != null) {
        setQuest(cont.QList);
      }
    } catch (error) {}
  }

  return (
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
  );
}

export default Questions;
