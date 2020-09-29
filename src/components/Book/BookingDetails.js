import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const BookingDetails = () => {
    const [bookedUser, setBookedUser] =useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    useEffect(()=>{
        fetch("http://localhost:5000/getBooked?email="+loggedInUser.email)
        .then(res=>res.json())
        .then(data=> setBookedUser(data))
    },[])

    return (
        <div>
            <h2>You Have {bookedUser.length} in Hand</h2>
            {bookedUser.map(data => <li> <pre>
                                        Name: {data.name}  
                                        email: {data.email} 
                                        Check In: {new Date(data.checkIn).toDateString('dd/MM/YYY')} 
                                        Check Out: {new Date(data.checkOut).toDateString('dd/MM/YYY')} 
                                        </pre></li>)}
        </div>
    );
};

export default BookingDetails;