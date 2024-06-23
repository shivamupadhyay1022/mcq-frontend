import React, { useState } from "react";
import FloatNav from "../components/FloatNav";
import TopNav from "../components/TopNav";
import Cutoff from "../components/Cutoff";
import Ccwqexam from "../components/Ccwqexam";

function Home() {
  const [show, setShow] = useState(false);

  return (
    <div className="font-hind flex flex-col justify-center ">
      <TopNav />
      <div className="mt-20 mx-4">
        <Cutoff />
        <div>
          <p className="my-2 font-semibold text-white">
            Chapter-wise Previous Year Questions
          </p>
          <div className="grid grid-cols-3">
            <Ccwqexam name={"JEE Mains"} />
            <Ccwqexam name={"JEE Advanced"} />
            <Ccwqexam name={"VITEE"} />
            <Ccwqexam name={"WEBJEE"} />
            <Ccwqexam name={"SRMJEE"} />
            <Ccwqexam name={"MHT CET"} />
            <Ccwqexam name={"KCET"} />
            <Ccwqexam name={"KEAM"} />
          </div>
        </div>
      </div>
      <FloatNav />
    </div>
  );
}

export default Home;
