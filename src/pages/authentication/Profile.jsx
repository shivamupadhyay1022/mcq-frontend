import React, { useState, useEffect, useContext } from "react";
import { ref, set, onValue, update } from "firebase/database";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import FloatNav from "../../components/FloatNav";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mob, setMob] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchdata();
  }, [currentUser]);

  const handlelogout = () => {
    if (currentUser) {
      signOut(auth);
      navigate("/signin");
    } else {
      navigate("/signin");
    }
  };

  const fetchdata = async () => {
    const starCountRef = ref(db, "users/" + currentUser.uid);
    await onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        var data = snapshot.val();
        setName(data.name);
        setEmail(data.email);
        setMob(data.mob);
      }
    });
  };

  const handleupdate = () =>{
    console.log(currentUser.uid)
    update(ref(db, "users/" + currentUser.uid), {
      email: email,
      name: name,
      mob: mob,
    }).then ( () => {
      toast.success(name +"'s " + "Details Updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }).catch((error) =>{
      const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(errorMessage);
        toast.error(errorCode, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
    });
    
  };
  return (
    <div className="flex mt-8 flex-col justify-center items-center">
      <ToastContainer/>
      <div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="stat-title">Points</div>
            <div className="stat-value">31</div>
            <div className="stat-desc">Recieved</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="stat-title">All India Rank</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <div className=" flex justify-between inset-x-2">
            <button className="h-8 w-32 rounded-t-xl border-2 border-slate-600 ">
              Profile
            </button>
            <button className="h-8 w-32 rounded-t-xl border-2 border-slate-600 bg-slate-600">
              Statistics
            </button>
          </div>
          <div className="divider mt-0" />
          <label className="form-control my-2 w-full max-w-xs">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              type="text"
              value={name || "name"}
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setName(e.target.value)}
            />
          </label>
          <label className="form-control my-2 w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              value={email || "email"}
              className="input input-bordered w-full max-w-xs"
              readOnly
            />
          </label>
          <label className="form-control w-full my-2 max-w-xs">
            <div className="label">
              <span className="label-text">Mobile No</span>
            </div>
            <input
              type="text"
              value={mob || "mob"}
              className="input  input-bordered w-full max-w-xs"
              onChange={(e)=>setMob(e.target.value)}
            />
          </label>
          <button onClick={()=>{handleupdate()}} className="btn bg-slate-600 my-4">Update</button>
          <button onClick={()=>{handlelogout(); navigate("/signin")}} className="btn bg-slate-600 my-2">Logout</button>
        </div>
      </div>
      <FloatNav />
    </div>
  );
}

export default Profile;
