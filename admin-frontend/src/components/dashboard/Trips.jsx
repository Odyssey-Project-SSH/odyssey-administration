import React, { useState, useEffect } from 'react';
import {
    Text,  
    Box, 
    useDisclosure
} from '@chakra-ui/react';
import { getTrips } from '../../services/client';
import { successNotification, errorNotification } from '../../services/notification.js';
import TripCard from '../shared/TripCard.jsx';

const Trips = () => {

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const {isOpen, onOpen, onClose} = useDisclosure();

    useEffect(() => {
		fetchTrips();
	}, []);

    const fetchTrips = () => {
		setLoading(true);
		getTrips().then(res => {
			setTrips(res.data);
		}).catch(err => {
			console.log(err);
		}).finally(setLoading(false));
	}

    const handleClick = () => {
		onOpen();
	}

    if (loading) {
		return <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
	}

    return (
        <>
            <Text fontSize="3xl" mb={4} fontWeight="bold">Trips Dashboard</Text>
            <Box p="4">
                { trips.map(trip => (
                    <TripCard
                        key={trip.id}
                        trip={trip}
                        fetchTrips={fetchTrips}
                    /> 
                )) }
            </Box>
        </>
    );
};

export default Trips;
