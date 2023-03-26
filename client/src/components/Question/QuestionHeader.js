import React, {useState, useEffect} from "react";
import {getQuestionArray } from "../../api/QuestionRequests";
import Button from '@mui/material/Button';


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
 console.log('hello', allQuestions);
     const QuestionAnswersArray = allQuestions.map(({question: {answerTags}}) => ({answerTags}));

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
        <div>
            {allQuestions ? (
            <div> 
            {allQuestions.map(question =>{
              return (<li key={question.id}>{question.question} </li> );
              }
            )
            }
            </div>
            ) : (
            <p>Loading questions...</p>
            )}
        </div>
        
        
    </div>
    )
}


export default QuestionHeader;