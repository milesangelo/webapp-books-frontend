import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Container, Grid, Rating } from '@mui/material';
import { maxWidth } from '@mui/system';

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );


const BookCard = () => {

    const [value, setValue] = useState(1.0);
    return(
        <Box sx={{
            padding: 5.0,
            display: 'inline-flex'
        }}>
            <CardContent sx={{
                bgcolor: 'primary.light',
                minWidth: 200
            }}>
                <Typography variant='h5' color='primary.contrastText' component='div' gutterBottom>
                    Book Title
                </Typography>
                <Typography variant='h6' color='primary.contrastText'>
                    Author
                </Typography>
                <Typography color='text.secondary' sx={{  mb: 0.1 }} variant='body2'>
                    Rating:
                </Typography>
                <Rating 
                    name='simple-controlled' 
                    value={value} 
                    onChange={( event, value ) => {
                        setValue(value || 0.0);
                    }}
                />
            </CardContent>
        </Box>
    )
}

const ReadBookList = () => { 

    return(
        <Grid direction="row" >
        {BookCard()}
        
        {BookCard()}
        {BookCard()}
        
        </Grid>
        
)};

export default ReadBookList;




// const card = (
//   <React.Fragment>
//     <CardContent>
//       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//         Word of the Day
//       </Typography>
//       <Typography variant="h5" component="div">
//         be{bull}nev{bull}o{bull}lent
//       </Typography>
//       <Typography sx={{ mb: 1.5 }} color="text.secondary">
//         adjective
//       </Typography>
//       <Typography variant="body2">
//         well meaning and kindly.
//         <br />
//         {'"a benevolent smile"'}
//       </Typography>
//     </CardContent>
//     <CardActions>
//       <Button size="small">Learn More</Button>
//     </CardActions>
//   </React.Fragment>
// );

// export default function OutlinedCard() {
//   return (
//     <Box sx={{ minWidth: 275 }}>
//       <Card variant="outlined">{card}</Card>
//     </Box>
//   );
// }
