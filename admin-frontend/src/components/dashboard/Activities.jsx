import React, { useEffect, useState } from 'react';
import {
	Text,
	Button,
	VStack,
	SimpleGrid,
	useDisclosure,
	Stack,
	Drawer, 
	DrawerOverlay,
	DrawerContent, 
	DrawerCloseButton, 
	DrawerHeader, 
	DrawerBody,
	Divider
} from '@chakra-ui/react';
import { FaPlus } from "react-icons/fa";
import { TextInput, SelectInput } from "../shared/FormComponents.jsx";
import { Formik, Form } from "formik";
import { activityRegistrationFormValidation } from '../../services/validation.js';
import { getActivities, registerActivity, getLocations } from "../../services/client";
import ActivityCard from "../shared/ActivityCard.jsx";
import { successNotification, errorNotification } from '../../services/notification.js';

const ActivityRegistrationForm = ({fetchActivities, onClose, locations}) => {
    return (
        <Formik
            validateOnMount={true}
            validationSchema={activityRegistrationFormValidation}
            initialValues={{name: '', description: '', cost: '', duration: '', locationId: 0}}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
				registerActivity(values).then(res => {
					successNotification("Success", "Activity was successfully added!");
					fetchActivities();
					onClose();
				}).console(err => {
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
						<TextInput label={"Cost"} name={"cost"} type={"number"} placeholder={"0.00"} />
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
						<Button type="submit" colorScheme={'cyan'} color={'white'} disabled={!isValid || isSubmitting}>Register</Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}

const Activities = () => {

	const [activities, setActivities] = useState([]);
	const [loading, setLoading] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [locations, setLocations] = useState([]);

	useEffect(() => {
		fetchActivities();
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

	const fetchActivities = () => {
		setLoading(true);
		getActivities().then(res => {
			setActivities(res.data);
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
			<Text fontSize="3xl" mb={4} fontWeight="bold">Activities Dashboard</Text>
			<Button
				colorScheme='blue'
				mb={4}
				leftIcon={<FaPlus />}
				onClick={() => handleClick()}
			>
				ADD ACTIVITY
			</Button>
			<VStack align="start" spacing={4} w="100%">
				<SimpleGrid columns={[1, 2, 3]} spacing={4} w="100%">
					{activities.map(activity => (
						<ActivityCard
							key={activity.id}
							id={activity.id}
							name={activity.name}
							description={activity.description}
							duration={activity.duration}
							cost={activity.cost}
							location={activity.location}
							locations={locations}
							fetchActivities={fetchActivities}
						/>
					))}
				</SimpleGrid>
			</VStack>
			<Drawer onClose={onClose} isOpen={isOpen} size={'lg'}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Register an ACTIVITY</DrawerHeader>
					<Divider />
					<DrawerBody mt={2}>
						<Stack spacing={4}>
							<ActivityRegistrationForm fetchActivities={fetchActivities} onClose={onClose} locations={locations}/>
						</Stack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default Activities;
