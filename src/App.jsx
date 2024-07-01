import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/authentication/Signup";
import Empty from "./components/Empty";
import Examquestions from "./pages/Examquestions";
import SolveQuestion from "./components/SolveQuestion";
import { QuestionProvider } from "./context/Context";
import { MathJaxContext } from "better-react-mathjax";
import { AuthProvider } from "./components/AuthProvider";
import Signin from "./pages/authentication/Signin";
import Profile from "./pages/authentication/Profile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-slate-900">
      <AuthProvider>
        <MathJaxContext>
          <QuestionProvider>
            <Empty />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/signin" element={<Signin />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/questions" element={<Examquestions />} />
              <Route exact path="/solvequestion" element={<SolveQuestion />} />
            </Routes>
          </QuestionProvider>
        </MathJaxContext>
      </AuthProvider>
    </div>
  );
}

export default App;
