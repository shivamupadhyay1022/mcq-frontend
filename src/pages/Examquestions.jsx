import React,{useContext} from "react";
import { useEffect } from "react";
import { supabase } from "../supabase";
import { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import './Question.css'
import { QContext } from "../context/Context";

function Questions() {
  const [quest, setQuest] = useState([]);
  const cont = useContext(QContext)
  //   function setAlert() {
  //     alert = !alert;
  //   }

  useEffect(() => {
    getQuestions();
    console.log(cont)
  }, []);

  async function getQuestions() {
    try {
      if (cont != null) {setQuest(cont.QList);}
    } catch (error) {}
  }

  return (
    <div className="mx-8">
      <h1 className="w-full text-center text-xl sm:text-lg">Jee Mains</h1>
      <div>
        {quest.map((item) => (
            <QuestionCard item={item} /> // Adjust based on your data structure
          ))}
      </div>
    </div>
  );
}

export default Questions;
