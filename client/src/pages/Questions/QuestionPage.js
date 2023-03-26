import React, {useState, useEffect} from "react";
import { Container } from '@mui/material';
import Question from "../../components/Question/Question";
//import QuestionHeader from "../../components/Question/QuestionHeader";
//import QuestionAnswers from "../../components/Question/QuestionAnswers";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


//import { getAllQuestions } from "../../api/QuestionRequests";
function QuestionPage() {

// const [question, setQuestion] = useState(null);
// const [allQuestions, setAllQuestions] = useState(null)
// useEffect(() => {
//   const fetchQuestions = async () => {
//     const { data: { data: { data },},} = await getAllQuestions();
//       setAllQuestions(data);
//     };

//   fetchQuestions();

// }, [allQuestions]);

// useEffect(() => {
//   const fetchQuestion = async () => {
//     const { data: { data: { data },},} = await getQuestionById();
//     setQuestion(data);
//   };
//   fetchQuestion();
// }, []);

//console.log("hello", allQuestions);
    return (

    //   <div>
        // {allQuestions ? (
        // <ul> 
        //   {allQuestions.map(question =>{
        //       return (<li key={question.id}>{question.question} </li> );
        //       }
        //     )
        //   }
        // </ul>
        // ) : (
        // <p>Loading questions...</p>
        // )}
    // </div>
        <div className="Question">
            <h2>Let us know about you...</h2>
            {/* <QuestionHeader /> */}
            
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                      m: 1,
                      width: 500,
                      height: 500,
                    },
                    
                  }}
                >
                
                <Question/>
            </Box>
        </div>
    );
}

export default QuestionPage;