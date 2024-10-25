import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/authentication/Signup";
import Empty from "./components/Empty";
import SolveQuestion from "./pages/SolveQuestion";
import { QuestionProvider } from "./context/Context";
import { MathJaxContext } from "better-react-mathjax";
import { AuthProvider } from "./components/AuthProvider";
import Signin from "./pages/authentication/Signin";
import Profile from "./pages/authentication/Profile";
import Working from "./pages/Working";
import Resetpassword from "./pages/Resetpassword";
import Exams from "./Exams";
import Solveexam from "./pages/Solveexam";
import Questions from "./pages/Questions";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-slate-900">
      <AuthProvider>
        <MathJaxContext>
          <QuestionProvider>
            <Empty />
            <Routes>
              <Route exact path="/" element={<Signin />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/signin" element={<Signin />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/questions" element={<Questions/>} />
              <Route exact path="/solvequestion" element={<SolveQuestion />} />
              <Route exact path="/solveexam" element={<Solveexam />} />
              <Route exact path="/exams" element={<Exams />} />
              <Route exact path="/working" element={<Working />} />
              <Route exact path="/passwordreset" element={<Resetpassword />} />
            </Routes>
          </QuestionProvider>
        </MathJaxContext>
      </AuthProvider>
    </div>
  );
}

export default App;
