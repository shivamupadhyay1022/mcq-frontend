import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Backnav from "../components/Backnav";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Resetpassword() {
  const auth = getAuth();
  const [email, setEmail] = useState();
    const navigate = useNavigate();
  function resetfunc() {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      toast.success("Password reset link sent on "+email, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error("Error" + errorMessage, {
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
  }

  

  function checkinput  ()  {
    if (email == null) {
      toast.error("Fill All Fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      resetfunc()
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkinput();
  };
  return (
    <div className="font-hind flex flex-col justify-center ">
      <ToastContainer />
      {/* header */}
      <div className="ml-8 mt-8">
        <span className="text-4xl">Prepify</span>
        <br />
        <span className="text-xl font-semibold flex space-x-2 my-2">
          <p>Password reset</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
        </span>
      </div>
      {/* contents */}
      <div className="bg-slate-800  border-r-8 mt-20 rounded-r-[50px] border-gray-800 mb-8  overflow-y-hidden">
        <div className="mx-8 flex flex-col">
          <p className="mt-8 mb-4 text-2xl font-semibold">Reset password</p>
          <label className="input mb-4 input-bordered flex h-14 bg-inherit border-slate-500 items-center gap-2">
            Email
            <input
              type="text"
              className="grow"
              placeholder="example@site.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="flex flex-col mt-4 items-center">
          <button
            onClick ={(e)=>handleSubmit(e)}
            className="btn btn-active  bg-slate-900 rounded-3xl border-slate-500 font-semibold btn-neutral"
          >
            Send Password Reset Link
          </button>
          <p className="mt-4">
            <span> New to Marks?</span>
            <span className="underline" onClick={() => navigate("/signin")}>
              {" "}
              Signin
            </span>
          </p>
          <p className="my-4">
            <span> Already Registered?</span>
            <span className="underline" onClick={() => navigate("/signup")}>
              {" "}
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Resetpassword;
