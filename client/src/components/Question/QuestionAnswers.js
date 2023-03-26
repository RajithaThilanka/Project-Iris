import React, {useState, useEffect} from "react";
import Button from '@mui/material/Button';
import {getQuestionArray } from "../../api/QuestionRequests";


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
    const [QuestionAnswersArray] = allQuestions.question.answerTags;
    //const QuestionAnswersArray = allQuestions.map(({id, name, address: {city}}) => ({id, name, city}));
    return (
    <div>
        {QuestionAnswersArray ? (
        <div>
            {QuestionAnswersArray.map((answerTags, index) => (
                    <Button variant="contained" key={index} onClick={() => alert(`You clicked the ${answerTags} button`)}>
                        {answerTags}
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
