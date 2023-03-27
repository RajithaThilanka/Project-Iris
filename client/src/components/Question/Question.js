import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stack,
} from "@mui/material";
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import QuestionHeader from "../../components/Question/QuestionHeader";
import QuestionAnswers from "./QuestionAnswers";
import "./Question.css";

import {getQuestionArray } from "../../api/QuestionRequests";

function Question() {
    const [allQuestions, setAllQuestions] = useState(null)
    
    useEffect(() => {
    const fetchQuestions = async () => {
    const { data: { data: { data },},} = await getQuestionArray();
      setAllQuestions(data);
    };

    fetchQuestions();

    }, []);
    //const QuestionAnswersArray = allQuestions.map(allQuestions[1].question);
    
    const QuestionAnswersArray = Object.keys(allQuestions.question).map((key) => {
    return { name: key, answerTags: allQuestions.question[key].answerTags, };
    });
    console.log('hello', QuestionAnswersArray);
    return (
        <div className="question-container">
            <div className="question">
                <Grid container spacing={3} px={3} margin={2} >
                    <Grid sm={12} xs={12}>
                    <h3 className="heading-tertiary question-heading">Let us know about you...</h3>
                    </Grid>
                    <Grid sm={12} xs={12}>
                        <Stack spacing={3}>
                            <div sx={{ marginLeft: "0.7rem" }} >
                                {allQuestions ? (
                                    <Box>
                                        {allQuestions[1].question}
                                    </Box>
                                
                                
                                ) : (
                                <p>Loading questions...</p>
                                )}
                                
                            </div>
                            <Button variant="contained">Answer</Button>
                            <div>
                                {/* {QuestionAnswersArray ? (
                                <div>
                                    {QuestionAnswersArray.map((item, index) => (
                                <Button variant="contained" key={index}>{item}</Button>
                                ))}
                                </div>
                                ) : (
                                <p>Loading answers...</p>
                                )} */}
{/* 
                                {QuestionAnswersArray.map((item, index) => (
                                <Button variant="contained" key={index}>{item}</Button>
                                ))} */}
                            </div>
                        </Stack>
                    </Grid>
                    
        {/* <Card sx={{ minWidth: 275 }} >
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            
            <QuestionHeader />
            </Typography>
            <Typography variant="h5" component="div">
            
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
            </Typography>
            <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
            </Typography>
            </CardContent>
        <CardActions>
            <Button variant="contained">Answer</Button>
            <QuestionAnswers/>
        </CardActions>
        </Card> */}
    </Grid>
            </div>
        

        </div>
    
    );
}
export default Question;