import { createContext, useState } from "react";

export const QContext = createContext(null)

export const QuestionProvider = (props) => {
    const [QuestItem,setquestitem] = useState("Quest");
    const [QList, setQList] = useState(["qlist"]);
    const [actsub,setActSub] = useState();
    const [examqlist,setExamqlist] = useState(["ExamQlist"])
    return (
        <QContext.Provider value={{QuestItem,setquestitem,QList,setQList,actsub,setActSub,examqlist,setExamqlist}}>
            {props.children}
        </QContext.Provider>
    )
}