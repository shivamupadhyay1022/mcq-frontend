import React,{useState,useContext} from 'react'
import { QContext } from '../context/Context';
import { NavLink } from 'react-router-dom';
function Examcard(props) {
    const item = props.item;
    const context  = useContext(QContext)

    async function handleclick(params) {
        var list  = await splitstring()
        console.log(list)
        context.setExamqlist(list)
        await window.localStorage.setItem(
          "Exam_question_id",
          JSON.stringify(item.id)
        );
    }

    
  async function splitstring() {
    var str_array = item.Questions.split(",");
    for (var i = 0; i < str_array.length; i++) {
      // Trim the excess whitespace.
      str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
      // Add additional code here, such as:
    }
    console.log(str_array);
    return str_array;
  }
     return (
       <NavLink to={{
         pathname:"/solveexam"}} onClick={() =>{
           handleclick();
         }} >
       <div className="card text-white w-full bg-base-100 my-2 shadow-xl">
         <div className="card-body">
           <div className="card-actions justify-end">
             <div className="badge badge-neutral">{item.Tags || "Subject"}</div>
           </div>
           <div>
             <p className=' font-semibold text-xl' >{item.Name || "Exam name"}</p>
             <p>Duration: {item.Duration || "000"} Minutes</p>
           </div>
         </div>
       </div>
       </NavLink>
     )
}

export default Examcard