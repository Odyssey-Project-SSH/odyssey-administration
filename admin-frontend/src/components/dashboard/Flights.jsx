import { 
    useDisclosure,
    Text,
    Spinner,
    Button,
    Divider, 
    Drawer, 
    DrawerOverlay, 
    DrawerContent, 
    DrawerCloseButton, 
    DrawerHeader, 
    DrawerBody,
    Stack,
    VStack,
    SimpleGrid
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import {TextInput, SelectInput} from "../shared/FormComponents"
import { useEffect, useState } from "react";
import { getFlights, getLocations, registerFlight } from "../../services/client";
import { Form, Formik } from "formik";
import { flightRegistrationFormValidation } from "../../services/validation";
import { successNotification, errorNotification } from '../../services/notification.js';
import FlightCard from "../shared/FlightCard.jsx";

const FlightRegistrationForm = ({fetchFlights, onClose, locations}) => {
    return (
        <Formik
            validateOnMount={true}
            validationSchema={ flightRegistrationFormValidation }
            initialValues={{departure: null, originId: null, destinationId: null}}
            onSubmit={(values, {setSubmitting}) => {
                const formattedDate = new Date(values.departure).toISOString();
                values.departure = formattedDate;
                setSubmitting(true);
                registerFlight(values).then(res => {
                    successNotification("Success", "Flight was successfully added!");
                    fetchFlights();
                    onClose();
                }).catch(err => {
					errorNotification(
						err.code,
						err.message
					);
				}).finally(() => {
					setSubmitting(false);
				});
            }}
        >
            {({isValid, isSubmitting}) => (
                <Form>
                    <Stack spacing={5}>
                        <TextInput label={"Departure"} name={'departure'} type={"datetime-local"} />
                        <SelectInput label={"Origin"} name={"originId"}>
							<option value="">Select Origin</option>
							{ locations.map(location => (
								<option 
									key={location.id}
									value={`${location.id}`}
								>
									{location.city}, {location.country}
								</option>
							)) }
						</SelectInput>
                        <SelectInput label={"Destination"} name={"destinationId"}>
							<option value="">Select Destination</option>
							{ locations.map(location => (
								<option 
									key={location.id}
									value={`${location.id}`}
								>
									{location.city}, {location.country}
								</option>
							)) }
						</SelectInput>
                        <Button type="submit" colorScheme={'cyan'} color={'white'} disabled={!isValid || isSubmitting}>Register</Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}

const Flights = () => {

    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetchFlights();
        fetchLocations();
    }, []);

    const fetchLocations = () => {
        setLoading(true);
		getLocations().then(res => {
			setLocations(res.data);
		}).catch(err => {
			console.log(err);
		}).finally(setLoading(false));
    }
    const fetchFlights = () => {
        setLoading(true);
        getFlights().then(res => {
            setFlights(res.data);
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
            <Text fontSize="3xl" mb={4} fontWeight="bold">Flights Dashboard</Text>
            <Button
				colorScheme='blue'
				mb={4}
				leftIcon={<FaPlus />}
				onClick={() => handleClick()}
			>
				ADD FLIGHT
			</Button>
            
            <VStack align="start" spacing={4} w="100%">
                <SimpleGrid columns={[1, 2]} spacin={4} w="100%">
                    { flights.map(flight => (
                        <FlightCard
                            key={flight.id}
                            id={flight.id}
                            name={flight.name}
                            departure={flight.time}
                            origin={flight.origin}
                            destination={flight.destination}
                            locations={locations}
                            fetchFlights={fetchFlights}
                        />
                    )) }
                </SimpleGrid>
            </VStack>

            <Drawer onClose={onClose} isOpen={isOpen} size={'lg'}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Register a FLIGHT</DrawerHeader>
					<Divider />
					<DrawerBody mt={2}>
						<Stack spacing={4}>
							<FlightRegistrationForm
                                fetchFlights={fetchFlights}
                                onClose={onClose}
                                locations={locations}
                            />
						</Stack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
        </>
    );
}

export default Flights;