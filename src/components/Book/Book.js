import 'date-fns';
import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { UserContext } from '../../App';
import BookingDetails from './BookingDetails';

const Book = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    })
    const handleCheckIn = (date) => {
        const newDate = { ...selectedDate }
        newDate.checkIn = date
        setSelectedDate(newDate)
    }
    const handleCheckOut = (date) => {
        const newDate = { ...selectedDate }
        newDate.checkOut = date
        setSelectedDate(newDate)
    }

    const handleBooking = ()=>{
      const  bookingData = {...loggedInUser, ...selectedDate}
      fetch('http://localhost:5000/book',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(bookingData)
      })
      .then(res=> res.json())
      .then(data=> console.log(data))
    }

    const { bedType } = useParams();
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Let's book a {bedType} Room.</h1>
            <p>Welcome Programer Nazmul Hdua</p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check In Date"
                        value={selectedDate.checkIn}
                        onChange={handleCheckIn}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check Out Date"
                        format="MM/dd/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOut}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>

            <Button onClick={handleBooking} variant="contained" color="primary">
                Book Room
            </Button>
            <BookingDetails></BookingDetails>
        </div>
    );
};

export default Book;