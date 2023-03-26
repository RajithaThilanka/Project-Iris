import React, {useState, useEffect} from "react";
import {getAllQuestions } from "../../api/QuestionRequests";


function QuestionHeader(){
    //const [question, setQuestion] = useState(null);
    const [allQuestions, setAllQuestions] = useState(null)
    useEffect(() => {
    const fetchQuestions = async () => {
    const { data: { data: { data },},} = await getAllQuestions();
      setAllQuestions(data);
    };

    fetchQuestions();

    }, [allQuestions]);
    return (

      <div>
        {allQuestions ? (
        <ul> 
          {allQuestions.map(question =>{
              return (<li key={question.id}>{question.question} </li> );
              }
            )
          }
        </ul>
        ) : (
        <p>Loading questions...</p>
        )}
    </div>
    )
}


export default QuestionHeader;