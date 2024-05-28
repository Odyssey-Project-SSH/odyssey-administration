import React, { useEffect, useState, useRef } from 'react';
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
import { getLocations } from '../../services/client';
import LocationCard from '../shared/LocationCard';
import { FaPlus } from "react-icons/fa";
import {TextInput, FileInput} from '../shared/FormComponents.jsx';
import {Formik, Form} from "formik";
import { locationRegistrationFormValidation } from '../../services/validation.js';
import { registerLocation } from '../../services/client';
import { successNotification, errorNotification } from '../../services/notification.js';

const LocationRegistrationForm = ( { fetchLocations, onClose } ) => {
	return (
        <Formik
            validateOnMount={true}
            validationSchema={ locationRegistrationFormValidation }
            initialValues={{city: '', country: '', file: null}}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
				registerLocation(values).then(res => {
					successNotification("Success", "Location was successfully added!");
					fetchLocations();
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
						<TextInput label={"City"} name={"city"} type={"text"} placeholder={"City..."} />
                        <TextInput label={"Country"} name={"country"} type={"text"} placeholder={"Country..."} />
						<FileInput label="Picture" name="file" type="file" />
						<Button type="submit" colorScheme={'cyan'} color={'white'} disabled={!isValid || isSubmitting}>Register</Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}

const Locations = () => {

	const [locations, setLocations] = useState([]);
	const [loading, setLoading] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		fetchLocations();
	}, []);

	const fetchLocations = () => {
		setLoading(true);
		getLocations().then(res => {
			setLocations(res.data)
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
			<Text fontSize="3xl" mb={4} fontWeight="bold">Locations Dashboard</Text>
			<Button
				colorScheme='blue'
				mb={4}
				leftIcon={<FaPlus />}
				onClick={() => handleClick()}
			>
				ADD LOCATION
			</Button>
			<VStack align="start" spacing={4} w="100%">
				<SimpleGrid columns={[1, 2, 3]} spacing={4} w="100%">
					{locations.map(location => (
						<LocationCard
							key={location.id}
							id={location.id}
							city={location.city}
							country={location.country}
							picture={location.picture}
							fetchLocations={fetchLocations}
						/>
					))}
				</SimpleGrid>
			</VStack>
			<Drawer onClose={onClose} isOpen={isOpen} size={'lg'}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Register a LOCATION</DrawerHeader>
					<Divider />
					<DrawerBody mt={2}>
						<Stack spacing={4}>
							<LocationRegistrationForm fetchLocations={ fetchLocations } onClose={ onClose } />
						</Stack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default Locations;
