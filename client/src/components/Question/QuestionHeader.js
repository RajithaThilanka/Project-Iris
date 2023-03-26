import React, {useState, useEffect} from "react";
import {getQuestionArray } from "../../api/QuestionRequests";


function QuestionHeader(){
    //const [question, setQuestion] = useState(null);
    const [allQuestions, setAllQuestions] = useState(null)
    useEffect(() => {
    const fetchQuestions = async () => {
    const { data: { data: { data },},} = await getQuestionArray();
      setAllQuestions(data);
    };

    fetchQuestions();

    }, []);

    // const [randomQuestion, setQuestionArray] = useState(null)
    // const randomQuestons = e => {
    // const len = allQuestions.length;
    // setQuestionArray(Math.floor(Math.random() * len));
    // };

    return (

      <div>
        {/* {randomQuestion ? (
        // <ul> 
        //   {randomQuestion.map(question =>{
        //       return (<li key={question.id}>{question.question} </li> );
        //       }
        //     )
        //   }
        // </ul>
        <h2>{randomQuestion}</h2>
        ) : (
        <p>Loading questions...</p>
        )} */}

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