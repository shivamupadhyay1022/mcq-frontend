import React from "react";
import { useEffect } from "react";
import { supabase } from "../supabase";
import { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import './Question.css'


function Questions() {
  const [quest, setQuest] = useState([]); 
  //   function setAlert() {
  //     alert = !alert;
  //   }

  useEffect(() => {
    getQuestions();
  }, []);

  async function getQuestions() {
    try {
      const { data, error } = await supabase.from("questions").select("*").limit(10)
      if (error) throw error;
      if (data != null) {setQuest(data);}
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
