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
    // const [displayQuestion, setDisplayQuestion] = useState(null)
    // let len = allQuestions.length;
    // const data = allQuestions[1]
    // setDisplayQuestion (data);

    // useEffect(() => {
    // const displayQuestions = async () => {
    // const { data: { data: { data },},} = await getQuestionArray();
    //   setAllQuestions(data);
    // };

    // fetchQuestions();

    // }, []);
    // console.log('helloDisplay', displayQuestion);
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
            {/* {allQuestions.map(question =>{
              return (<li key={question.id}>{question.question} </li> );
              }
            )
            } */}
            {allQuestions[1].question}
            </div>
            ) : (
            <p>Loading questions...</p>
            )}
        </div>
        
        
    </div>
    )
}


export default QuestionHeader;