import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function SecCard({ firstName, lastName, registrationNumber, onClick }) {
    return (
        <Card sx={{ width: 400 }} onClick={onClick}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {firstName} {lastName}
                    </Typography>
                    <Typography variant="body" color="text" sx={{textAlign:'right'}}>
                        Registration Number: {registrationNumber}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
