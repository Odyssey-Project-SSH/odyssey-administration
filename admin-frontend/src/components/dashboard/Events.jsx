import React, { useState, useEffect } from 'react';
import {
	Box,
	Text,
	Button,
	useColorModeValue,
	VStack,
	SimpleGrid,
	Stack,
	useDisclosure,
	Divider, 
    Drawer, 
    DrawerOverlay, 
    DrawerContent, 
    DrawerCloseButton, 
    DrawerHeader, 
    DrawerBody, 
} from '@chakra-ui/react';
import { FaPlus } from "react-icons/fa";
import {TextInput, FileInput, SelectInput} from '../shared/FormComponents.jsx';
import {Formik, Form} from "formik";
import { eventRegistrationFormValidation } from '../../services/validation.js';
import { registerEvent, getEvents, getLocations } from '../../services/client';
import { successNotification, errorNotification } from '../../services/notification.js';
import EventCard from '../shared/EventCard.jsx';


const EventRegistrationForm = ({fetchEvents, onClose, locations}) => {
    return (
        <Formik
            validateOnMount={true}
            validationSchema={ eventRegistrationFormValidation }
            initialValues={{name: '', description: '', file: null, date: null, cost: '', duration: '', locationId: 0}}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
				registerEvent(values).then(res => {
					successNotification("Success", "Event was successfully added!");
					fetchEvents();
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
						<TextInput label={"Name"} name={"name"} type={"text"} placeholder={"Name..."} />
                        <TextInput label={"Description"} name={"description"} type={"textarea"} placeholder={"Description..."} />
						<TextInput label={"Duration"} name={"duration"} type={"number"} placeholder={"0"} />
						<TextInput label={"Cost"} name={"cost"} type={"number"} placeholder={"0"} />
						<TextInput label={"Date"} name={"date"} type={"date"} placeholder="yyyy-MM-dd" />
						<SelectInput label={"Location"} name={"locationId"}>
							<option value="">Select Location</option>
							{ locations.map(location => (
								<option 
									key={location.id}
									value={`${location.id}`}
								>
									{location.city}, {location.country}
								</option>
							)) }
						</SelectInput>
						<FileInput label="Picture" name="file" type="file" />
						<Button type="submit" colorScheme={'cyan'} color={'white'} disabled={!isValid || isSubmitting}>Register</Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}

const Events = () => {

	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [locations, setLocations] = useState([]);

	useEffect(() => {
		fetchEvents();
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

	const fetchEvents = () => {
		setLoading(true);
		getEvents().then(res => {
			setEvents(res.data);
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
			<Text fontSize="3xl" mb={4} fontWeight="bold">Events Dashboard</Text>
			<Button
				colorScheme='blue'
				mb={4}
				leftIcon={<FaPlus />}
				onClick={() => handleClick()}
			>
				ADD EVENT
			</Button>
			<VStack align="start" spacing={4} w="100%">
				<SimpleGrid columns={[1, 2, 3]} spacing={4} w="100%">
					{ events.map(event => (
						<EventCard
							key={event.id}
							id={event.id}
							name={event.name}
							description={event.description}
							picture={event.image}
							duration={event.duration}
							date={event.date}
							cost={event.cost}
							location={event.location}
							locations={locations}
							fetchEvents={fetchEvents}
						/>
					)) }
				</SimpleGrid>
			</VStack>
			<Drawer onClose={onClose} isOpen={isOpen} size={'lg'}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Register an EVENT</DrawerHeader>
					<Divider />
					<DrawerBody mt={2}>
						<Stack spacing={4}>
							<EventRegistrationForm
								fetchEvents={fetchEvents}
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

export default Events;
