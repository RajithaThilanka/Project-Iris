import React, {useState} from "react";
import { Container } from '@mui/material';
import Question from "../../components/Question/Question";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useEffect } from "react";

const ENDPOINT = "http://localhost:5000";
function QuestionPage() {

const [question, setQuestion] = useState(null)
useEffect(() => {
  const fetchQuestion = async () => {
    const response = await fetch('/api/v1/question')
    const json = await response.json()
      if (response.ok){
      setQuestion(json)
      }
    }

  fetchQuestion()

}, [])

    return (
        <div className="Question">
            <h2>Questions</h2>
            <p> {question.question}</p>
            
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                      m: 1,
                      width: 128,
                      height: 500,
                    },
                    
                  }}
                >
                  Hello-box
                  
                <Paper elevation={3}>
                  Hello-paper
                
                
                
                </Paper>
                {/* <Question>
                  Hello-question
                </Question> */}
            </Box>
        </div>
    )
};

export default QuestionPage;