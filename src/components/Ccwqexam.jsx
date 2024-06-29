import React,{useState,useContext} from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { QContext } from '../context/Context'
import { supabase } from "../supabase";

function Ccwqexam({name,img}) {
  const [quest, setQuest] = useState([]); 
  const question  = useContext(QContext)
  const navigate = useNavigate()
  //   function setAlert() {
  //     alert = !alert;
  //   }

  // useEffect(() => {
  //   getQuestions();
  // }, []);

  async function getQuestions() {
    try {
      const { data, error } = await supabase.from("questions").select("*").like('tags', '%'+name+'%').limit(10)
      if (error) throw error;
      if (data != null) {question.setQList(data)}
    } catch (error) {}
  }
  
  return (
          <NavLink  onClick={async () => {await getQuestions(); navigate("/questions");}} >
            <div className="flex flex-col justify-center items-center" >
              <div className="h-16 w-16 border-[1px] flex items-center justify-center rounded-lg border-slate-400">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src={ img || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                  </div>
                </div>
              </div>
              <p className="text-center my-1" >{name || "JEE Mains"}</p>
            </div>
            </NavLink>
  )
}

export default Ccwqexam