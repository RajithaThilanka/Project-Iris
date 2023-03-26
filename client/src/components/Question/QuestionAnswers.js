import React, {useState, useEffect} from "react";
import Button from '@mui/material/Button';
import {getQuestionArray } from "../../api/QuestionRequests";
//import {QuestionHeader} from "./QuestionHeader";


function QuestionAnswers(){
    const [allQuestions, setAllQuestions] = useState(null)
    useEffect(() => {
    const fetchQuestions = async () => {
    const { data: { data: { data },},} = await getQuestionArray();
      setAllQuestions(data);
    };

    fetchQuestions();

    }, []);
    console.log('hello', allQuestions);
    //const [QuestionAnswersArray] = allQuestions.question.answerTags;
    //const QuestionAnswersArray = QuestionHeader.allQuestions.map(({id, name, address: {city}}) => ({id, name, city}));
    return (
    <div>
        {allQuestions ? (
        <div>
            {allQuestions.map(question => (
                    <Button variant="contained" key={question.id} onClick={() => alert(`You clicked the ${question.answerTags} button`)}>
                        {question.answerTags}
                    </Button>
                    )
                )
            }
        </div>
        ) : (
        <p>Loading answers...</p>
        )}
    </div>
    )
}

export default QuestionAnswers;
