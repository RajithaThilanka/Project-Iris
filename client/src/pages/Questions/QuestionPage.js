import React, {useState} from "react";
import { Container } from '@mui/material';
import Navbar from "../../components/Appbar/Navbar";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


function QuestionPage() {
    return (
        <div className="Question">
            <h2>Questions</h2>
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
                <Paper elevation={3} />

            </Box>
        </div>
    )
};

export default QuestionPage;