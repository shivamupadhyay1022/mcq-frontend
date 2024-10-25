import React, { useState, useContext,useEffect } from "react";
import { QContext } from "./context/Context";
import Examcard from "./components/Examcard";
import Backnav from "./components/Backnav";
import FloatNav from "./components/FloatNav";
import { supabase } from "./supabase";

function Exams() {
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
    getExams();
    console.log(quest);
  }, []);

  async function getExams() {
    try {
      const { data, error } = await supabase
        .from("exams")
        .select("*")
        // .limit(10);
      .range(0,10 );
      if (error) {console.log(error)};
      if (data != null) {
        console.log("nonnull")
        setQuest(data);
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
                <Examcard item={item} /> // Adjust based on your data structure
              ))}
            </div>
          </div>
          <FloatNav />
        </div>
      )}
    </div>
  );
}

export default Exams;
