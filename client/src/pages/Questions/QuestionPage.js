import React, {useState, useEffect} from "react";
import { Container } from '@mui/material';
import Question from "../../components/Question/Question";
//import QuestionHeader from "../../components/Question/QuestionHeader";
//import QuestionAnswers from "../../components/Question/QuestionAnswers";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Unstable_Grid2";
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
        <div className="question">
            <h2>Let us know about you...</h2>
            {/* <QuestionHeader /> */}
            
            {/* <Box
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
                
                
            </Box> */}
            {/* <Grid container rowSpacing={3} px={3} margin={2} alignItems="flex-end" justify="center">
                
            </Grid> */}
            <Grid className="question-container">
                
            <Grid  container spacing={3} px={3} margin={2}>
                <Question/>
            </Grid >   
            
            </Grid> 
            
        </div>
    );
}

export default QuestionPage;