import React, { useState, useEffect } from "react";
import {
  Box,
    Button,
  FormLabel,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import QuestionHeader from "../../components/Question/QuestionHeader";
import QuestionAnswers from "./QuestionAnswers";
import "./Question.css";

import { getQuestionArray } from "../../api/QuestionRequests";
import { signupAccountInfo } from "../../api/AuthRequests";

function Question() {
    const [allQuestions, setAllQuestions] = useState(null)
    
    useEffect(() => {
    const fetchQuestions = async () => {
    const { data: { data: { data },},} = await getQuestionArray();
      setAllQuestions(data);
    };

    fetchQuestions();

    }, []);
    const [formData, setData] = useState({
        answer: "",
    });
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const handleData = (e) => {
        setData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErr(null);
        if (!formData.answer === null) {
        try {
            const {
            data: {
                data: { data },
            },
            } = await signupAccountInfo(formData);
            setErr(null);
            setLoading(false);
            navigate(`/auth/signup/user-info/${data._id}`);
        } catch (error) {
            console.log(error);
            setErr(error);
            setLoading(false);
        }
        } else {
        console.log("Answer is not given");
        }
    };
    // const QuestionAnswersArray = allQuestions[1].question;
    
    // const QuestionAnswersArray = Object.keys(allQuestions).map((key) => {
    // return allQuestions[key].answerTags ;
    // });
    const QuestionAnswersArray = Object.keys(allQuestions).map((key) => {
        return allQuestions[key].answerTags;
        });
    console.log('hello', QuestionAnswersArray);
    return (    
        <div className="question-container">
                <form onSubmit={handleSubmit} className="question" method="post">
                  
                <Grid container spacing={3} px={3} margin={2} >
                    <Grid sm={12} xs={12}>
                    <h3 className="heading-tertiary question-heading">Let us know about you...</h3>
                    </Grid>
                    <Grid sm={12} xs={12}>
                        <Stack spacing={3}>
                            <FormLabel sx={{ marginLeft: "0.7rem" }}>
                                {allQuestions ? (
                                    <Box>
                                        {allQuestions[1].question}
                                    </Box>
                                
                                
                                ) : (
                                <p>Loading questions...</p>
                                )}

                            </FormLabel>
                            
                                    <ButtonGroup
                                        orientation="vertical"
                                        aria-label="vertical contained button group"
                                        variant="text" 
                                    >
                                        <Button variant="contained" sx={{ my: 1 }} onClick={handleData}>Answer</Button>
                                        <Button variant="contained" sx={{ my: 1 }} onClick={handleData}>Answer 1</Button>
                                        <Button variant="contained" sx={{ my: 1 }} onClick={handleData}>Answer 2</Button>

                                    </ButtonGroup>
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
                    </form>
        

        </div>
    
    );
}
export default Question;