import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
    Button,
  FormLabel,
  Stack,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import QuestionHeader from "../../Question/QuestionHeader";
import QuestionAnswers from "../../Question/QuestionAnswers";
import "./Question.css";
import { getQuestionArray } from "../../../api/QuestionRequests";
import { signupAccountInfo, addAnswer, signupLookingforInfo, signupProfileView } from "../../../api/AuthRequests";

function Question() {
    // const {
    //     state: { id },
    // } = useLocation();
    const dispatch = useDispatch();
    const [allQuestions, setAllQuestions] = useState(null)
    
    useEffect(() => {
    const fetchQuestions = async () => {
    const { data: { data: { data },},} = await getQuestionArray();
      setAllQuestions(data);
    };

    fetchQuestions();

    }, []);
    
    const [newQuestion, setQuestion] = useState(null);

    const [formData, setData] = useState({
        answerIndex: "",
    });
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    const arrayLength = allQuestions ? allQuestions.length : '';
    
    const allQuestionArray = [];
    const allAnswersArray = [];
    for (var i=0; i < arrayLength; i++) {
        const questionArray = [allQuestions[i].question];
        const answersArray = [allQuestions[i].answerTags];
        allQuestionArray.push(questionArray);
        allAnswersArray.push(answersArray);
    }
       
    const questionArrayLength = allQuestionArray ? allQuestionArray.length : '';
    const answerArrayLength = allAnswersArray ? allAnswersArray.length : '';

    // State to store count value
    const [count, setCount] = useState(0);
    
    // Function to increment count by 1
    const incrementCount = () => {
        setCount(count + 1);
        console.log('incrementCount after update:', count); // Debug statement
    };
    console.log('incrementCount after update function:', count); // Debug statement


    const navigate = useNavigate();
    const handleData = (e) => {
        console.log('formData before update:', formData); // Debug statement
        setData(e);
        console.log('formData after update:', formData); // Debug statement
        
        // addAnswer(allQuestions[0]._id);
        console.log('Inside Handle data function', count,questionArrayLength); // Debug statement
        if (count+1 === questionArrayLength) {
            console.log('Question array len inside if statement', questionArrayLength);
            console.log('Answers array len inside if statement', answerArrayLength);
            console.log('count inside if statement', count);
        console.log('count increased to questionArrayLength which is:', questionArrayLength); // Debug statement
        try {
        console.log('Inside the try block'); // Debug statement
        // const {
        //     data: {data: { data },},
        //     } = addAnswer(formData);
        console.log('formData submitted:', formData); // Debug statement
        navigate(`/auth/signup/lookingfor-info`, {
            replace: true,
            state: {
            id: allQuestions[count]._id,
            },
        });
        } catch (error) {
        console.log(error);
        }
    }
        console.log("handle Data");

        
    };

    
    // if (count === questionArrayLength) {
    //     console.log('count increased to questionArrayLength which is:', questionArrayLength); // Debug statement
    //     try {
    //     console.log('Inside the try block'); // Debug statement
    //     const {
    //         data: {data: { data },},
    //         } = addAnswer(formData);
    //     console.log('formData submitted:', formData); // Debug statement
    //     navigate(`/auth/signup/lookingfor-info`, {
    //         replace: true,
    //         state: {
    //         id: data._id,
    //         },
    //     });
    //     } catch (error) {
    //     console.log(error);
    //     }
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErr(null);
        if (!formData.answer == null) {
            console.log('formData.answer is not null'); // Debug statement
        try {
            const {
            data: {
                data: { data },
            },
            } = await signupLookingforInfo(formData);
            setErr(null);
            setLoading(false);
            //navigate(`/auth/signup/lookingfor-info/${id}`, { replace: true });
        } catch (error) {
            console.log(error);
            setErr(error);
            setLoading(false);
        }
        } else {
        console.log("Answer is not given");
        }
    };
  
    const answersArrayForOneQuestion = allAnswersArray ? allAnswersArray[count] : console.log("allAnswersArray is null");
    const atomAnswerArray = answersArrayForOneQuestion ? answersArrayForOneQuestion[0] : console.log("answersArrayForOneQuestion is null");

    console.log('All Question array', allQuestionArray);
    console.log('Full Question array', allQuestions);
    
    console.log('All Answers array', allAnswersArray);
    console.log('Answers array', allAnswersArray[count]);
    console.log('Question array len', questionArrayLength);
    console.log('Answers array len', answerArrayLength);
    console.log('count', count);
    console.log('AnswersArrayForOneQuestion', answersArrayForOneQuestion);
    console.log('atomAnswerArray', atomAnswerArray);
    // console.log('atomAnswerArray', allQuestions[count]._id);
    
    
    
    
    

    
    return (    
        <div className="question-container">
                <form className="question" method="post">
                  
                <Grid container spacing={3} px={3} margin={2} >
                    <Grid sm={12} xs={12}>
                    <h3 className="heading-tertiary question-heading">Let us know about you...</h3>
                    </Grid>
                    <Grid sm={12} xs={12}>
                        <Stack spacing={3}>
                            <FormLabel sx={{ marginLeft: "0.7rem" }}>
                                {allQuestionArray ? (
                                    <Box>
                                        {allQuestionArray[count]}
                                    </Box>
                                
                                
                                ) : 
                                <p>Loading questions...</p>
                                }

                            </FormLabel>
                            
                                    <ButtonGroup
                                        orientation="vertical"
                                        aria-label="vertical contained button group"
                                        variant="text"
                                        onClick={() => incrementCount()}
                            >
                                {
                                    atomAnswerArray ?
                                    atomAnswerArray.map((answer, index) => (
                                        <Button variant="contained" sx={{ my: 1 }} key={index} onClick={() => { handleData(index) }}>{answer}</Button>
                                    ))
                                        : <p>Loading answers...</p>
                                } 
                                    </ButtonGroup>
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