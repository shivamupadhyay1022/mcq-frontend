import React, { useState } from "react";
import FloatNav from "../components/FloatNav";
import TopNav from "../components/TopNav";
import Cutoff from "../components/Cutoff";
import Ccwqexam from "../components/Ccwqexam";
import { bit, chem, iit, math, mht, nta, phy, srm, vit, wb } from "../assets";

function Home() {
  const [show, setShow] = useState(false);

  return (
    <div className="font-hind flex flex-col justify-center ">
      <TopNav />
      <div className="mt-20 mx-4">
        <Cutoff />
          <p className="my-2 font-semibold text-white">
            Exam-wise Previous Year Questions
          </p>
          <div className="grid grid-cols-3">
            <Ccwqexam name={"JEE Mains"} img={nta} />
            <Ccwqexam name={"JEE Advanced"} img={iit} />
            <Ccwqexam name={"NEET"}  img={nta}/>
            <Ccwqexam name={"BITSAT"}  img={bit}/>
            <Ccwqexam name={"VITEE"} img={vit}/>
            <Ccwqexam name={"WEBJEE"} img={wb}/>
            <Ccwqexam name={"SRMJEE"} img={srm}/>
            <Ccwqexam name={"MHT CET"} img={mht}/>
          </div>
          <p className="my-2 font-semibold text-white">
            Subject-wise Previous Year Questions
          </p>
          <div className="grid grid-cols-3">
            <Ccwqexam name={"Physics"} img={phy} sub={true}/>
            <Ccwqexam name={"Chemistry"} img={chem} sub={true}/>
            <Ccwqexam name={"Maths"}  img={math} sub={true}/>
          </div>
          
      </div>
      <FloatNav />
    </div>
  );
}

export default Home;
