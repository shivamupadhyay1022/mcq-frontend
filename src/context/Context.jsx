import { createContext, useState } from "react";

export const QContext = createContext(null)

export const QuestionProvider = (props) => {
    const [QuestItem,setquestitem] = useState("Quest");
    return (
        <QContext.Provider value={{QuestItem,setquestitem}}>
            {props.children}
        </QContext.Provider>
    )
}