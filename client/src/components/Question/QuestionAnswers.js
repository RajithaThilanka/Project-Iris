import React, {useState, useEffect} from "react";
import {getQuestionById, getAllQuestions } from "../../api/QuestionRequests";


function QuestionAnswers(){
    const [allQuestions, setAllQuestions] = useState(null)
    useEffect(() => {
    const fetchQuestions = async () => {
        const { data: { data: { data },},} = await getAllQuestions();
        setAllQuestions(data);
        };

    fetchQuestions();

    }, [allQuestions]);
}


export default QuestionAnswers;