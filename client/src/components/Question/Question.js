import React, { useState, useEffect } from "react";
import {
  Box,
    Button,
  FormLabel,
  Stack,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
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
import { signupAccountInfo, addAnswer, signupLookingforInfo } from "../../api/AuthRequests";

function Question() {
    const { id } = useParams();
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

    const [newQuestion, setQuestion] = useState();
    // const setNextQuestion = () => {
    //     setQuestion(allQuestions[2].question);
    // }

    const navigate = useNavigate();
    const handleData = (e) => {
        setData({ ...formData, [e.target.name]: e.target.value });
        addAnswer(formData);
        // setQuestion(allQuestions[2].question);
        console.log("handle Data");
        //console.log(newQuestion);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErr(null);
        if (!formData.answer == null) {
        try {
            const {
            data: {
                data: { data },
            },
            } = await signupLookingforInfo(formData);
            setErr(null);
            setLoading(false);
            navigate(`/auth/signup/lookingfor-info/${id}`, { replace: true });
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
    
    // const allAnswersArray = Object.keys(allQuestions.answerTags).map((key) => {
    //     return allQuestions[key].answerTags[key] ;
    // });
    // const QuestionAnswersArray = Object.keys(allQuestions).map((key) => {
    //     return allQuestions[key].answerTags;
    //     });
    // console.log('helloAnswers', allAnswersArray);
   
    //console.log('hello', allQuestions);

    let allAnswersArray;
    //   const answerArray = [allQuestions[0].answerTags];
    // if (allAnswersArray = [...allQuestions.answerTags]) {
    //     console.log('helloAnswers', allAnswersArray);
    // }
    // else {
    //     console.log('array is null');
    // }
    // {allAnswersArray ? (console.log('helloAnswers', allAnswersArray)) : (console.log(err))}
    // console.log('helloAnswers', answerArray);
    const AnswersArray = allQuestions ? [allQuestions[0].answerTags] : '';
    console.log('3rd question', AnswersArray);

    
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
                                        {allQuestions[0].question}
                                    </Box>
                                
                                
                                ) : (
                                <p>Loading questions...</p>
                                )}

                            </FormLabel>
                            
                                    <ButtonGroup
                                        orientation="vertical"
                                        aria-label="vertical contained button group"
                                        variant="text"
                                        onClick={() => handleData()}
                            >
                                {
                                    Array.isArray(AnswersArray) ?
                                    AnswersArray.map((answer, index) => (
                                    <Button variant="contained" sx={{ my: 1 }} key={index} name={index}>{answer}</Button>
                                    ))
                                        : console.log("Not an array")
                                }
                                
                                {/* {
                                    Array.isArray(AnswersArray) ?
                                    AnswersArray.map((answer, index) => {
                                    return <Button variant="contained" sx={{ my: 1 }} key={index}>{answer}</Button>;
                                    })
                                : console.log("Not an array")
                                }   */}
                                {/* {
                                    props.AnswersArray.map((name, index) => {
                                        return <Button key={index}>{name}</Button>;
                                    })

                                  
                                    } */}
                                    
                                         {/* <Button variant="contained" sx={{ my: 1 }} >Answer 2</Button>
                                         <Button variant="contained" sx={{ my: 1 }} >Answer 3</Button>
                                         <Button
                                             variant="contained"
                                             fullWidth
                                             type="submit"
                                        >
                                                 Answer 4
                                        </Button>
                                        
                                            {allQuestions.question.map((answer, index) => (
                                                <Button key={index} onClick={setNextQuestion}>{answer}</Button>
                                            ))} */}
                                         
                                    </ButtonGroup>
                            <div>
                                
                                {/* // {AnswersArray.map((color, index) => (
                                //     <button key={index}>{color}</button>
                                // ))} */}
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