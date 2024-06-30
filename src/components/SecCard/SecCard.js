// components/SecCard/SecCard.js
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard({ name, code, credits, onClick, isCourseSelected }) {
    return (
        <Card sx={{ width: 350 }} onClick={onClick}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name} {code}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Course Credits: {credits}
                    </Typography>
                    {
                        isCourseSelected && <svg xmlns="http://www.w3.org/2000/svg" fill="#03fc0f" viewBox="0 0 24 24" width="22px" className='checkmark' strokeWidth="1.5" stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    }

                </CardContent>
            </CardActionArea>
        </Card>
    );
}
