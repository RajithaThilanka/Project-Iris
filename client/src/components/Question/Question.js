import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import QuestionHeader from "../../components/Question/QuestionHeader";
import QuestionAnswers from "./QuestionAnswers";

function Question(){
    return(
    <Paper elevation={3} >
        <Card sx={{ minWidth: 275 }} >
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            
            <QuestionHeader />
            </Typography>
            <Typography variant="h5" component="div">
            
            </Typography>
            {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
            </Typography>
            <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
            </Typography> */}
        </CardContent>
        <CardActions>
            <Button variant="contained">Answer</Button>
            {/* <QuestionAnswers/> */}
        </CardActions>
        </Card>
    </Paper>
    );
}
export default Question;