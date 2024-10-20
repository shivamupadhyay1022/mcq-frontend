import React,{useContext,useState,useEffect} from 'react'
import { AuthContext } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { ref,onValue,get,child } from 'firebase/database';


function TopNav() {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("indisde")
    fetchdata();
  },[currentUser]);

  const fetchdata = async () => {
    console.log("inside2")
    const starCountRef = ref(db, "users/" + currentUser?.uid);
    console.log(starCountRef)
    await onValue(starCountRef, (snapshot) => {
      console.log(snapshot)
      if (snapshot.exists()) {
        console.log("Snapshot exists")
        var data = snapshot.val();
        console.log(data)
        setName(data.name);
      }else{
        console.log("Snapshot null")
      }
    },(error)=>{
      console.log(error)
    })
    // get(child(db, `users/${currentUser?.uid}`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
    // .then(()=>{}).catch(error => console.log(error));
};

  return (
    <div className="fixed z-50 left-1 right-1 h-16 top-1 bg-slate-700 border-b-4 border-slate-500">
        <div className="flex flex-row items-center justify-between">
          <button onClick={()=> navigate("/profile")} className="flex items-center justify-center h-16 mx-4">
            <span>Hey!,</span> {name }
          </button>
          <div className="flex items-center justify-center h-16 mx-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
            <span>| 0</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z"
                clipRule="evenodd"
              />
            </svg>
            <span>|0</span>
          </div>
        </div>
      </div>
  )
}

export default TopNav