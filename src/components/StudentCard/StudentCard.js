import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const StudentCard = ({ firstName, lastName, registrationNumber, studentId }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/submit-grades/${studentId}`);
    };

    return (
        <Card sx={{ width: 400 }} onClick={handleCardClick}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {firstName} {lastName}
                    </Typography>
                    <Typography variant="body" color="text" sx={{ textAlign: 'right' }}>
                        Registration Number: {registrationNumber}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default StudentCard;
