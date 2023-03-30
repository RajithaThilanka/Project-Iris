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
import QuestionHeader from "../../components/Question/QuestionHeader";
import QuestionAnswers from "./QuestionAnswers";
import "./Question.css";
import { getQuestionArray } from "../../api/QuestionRequests";
import { signupAccountInfo, addAnswer, signupLookingforInfo } from "../../api/AuthRequests";

function Question() {
    const {
        state: { id },
    } = useLocation();
    const dispatch = useDispatch();
    const [allQuestions, setAllQuestions] = useState(null)
    
    useEffect(() => {
    const fetchQuestions = async () => {
    const { data: { data: { data },},} = await getQuestionArray();
      setAllQuestions(data);
    };

    fetchQuestions();

    }, []);
    
    //const [newQuestion, setQuestion] = allQuestions ? useState(allQuestions[0].question) : console.log("Questions are not fetched");
    const [newQuestion, setQuestion] = useState(null);
    // const setQuestionUpdate = allQuestions ? allQuestions[0].question : console.log("Questions are not fetched");
    // setQuestion(setQuestionUpdate);

    const [formData, setData] = useState({
        answerIndex: "",
    });
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    
    // const setNextQuestion = () => {
    //     setQuestion(allQuestions[2].question);
    // }
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
    
    //const answersArrayForOneQuestion = allAnswersArray[count];

    //const atomAnswerArray = answersArrayForOneQuestion[count];

    const navigate = useNavigate();
    const handleData = (e) => {
        console.log('formData before update:', formData); // Debug statement
        setData(e);
        console.log('formData after update:', formData); // Debug statement
        
        addAnswer(allQuestions[0]._id);
        console.log('handle Data called'); // Debug statement
        // setQuestion(allQuestions[1].question);
        console.log("handle Data");
        //console.log(newQuestion);
        
    };

    if (count === questionArrayLength) {
        navigate(`/auth/signup/lookingfor-info/${id}`, { replace: true });
    }
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
    // const QuestionAnswersArray = allQuestions[1].question;
    
    // const allAnswersArray = Object.keys(allQuestions.answerTags).map((key) => {
    //     return allQuestions[key].answerTags[key] ;
    // });
    // const QuestionAnswersArray = Object.keys(allQuestions).map((key) => {
    //     return allQuestions[key].answerTags;
    //     });
    // console.log('helloAnswers', allAnswersArray);
   
    //console.log('hello', allQuestions);

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
    // console.log('3rd question', AnswersArray);
    // console.log('Lengthof the array', arrayLength);


    const answersArrayForOneQuestion = allAnswersArray ? allAnswersArray[count] : console.log("allAnswersArray is null");
    const buttonCount = answersArrayForOneQuestion ? answersArrayForOneQuestion.length : console.log("buttonCount");
    const atomAnswerArray = answersArrayForOneQuestion ? answersArrayForOneQuestion[count] : console.log("answersArrayForOneQuestion is null");


    console.log('Question array', allQuestionArray);
    console.log('Answers array', allAnswersArray);
    console.log('Answers array', allAnswersArray[0]);
    console.log('Question array len', questionArrayLength);
    console.log('Answers array len', answerArrayLength);
    console.log('count', count);
    console.log('Answers', answersArrayForOneQuestion);
    console.log('atomAnswerArray', atomAnswerArray);
    
    
    
    

    
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
                                {allQuestionArray ? (
                                    <Box>
                                        {allQuestionArray[count]}
                                    </Box>
                                
                                
                                ) : (
                                <p>Loading questions...</p>
                                )}

                            </FormLabel>
                            
                                    <ButtonGroup
                                        orientation="vertical"
                                        aria-label="vertical contained button group"
                                        variant="text"
                                        onClick={() => incrementCount()}
                            >
                                {/* {for (var i = 0; i < buttonCount; i++) {
                                        buttonArray.push(
                                        <Button key={i}>
                                            {atomAnswerArray[i]}
                                        </Button>
                                        )
                                    }
                                } */}
                                {
                                    atomAnswerArray ?
                                    atomAnswerArray.map((answer, index) => (
                                        <Button variant="contained" sx={{ my: 1 }} key={index} onClick={() => { handleData(index) }}>{answer}</Button>
                                    ))
                                        : console.log("atomAnswerArray is not an array")
                                }
                                <Button>Submit</Button>
                                
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