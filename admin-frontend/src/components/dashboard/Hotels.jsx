import {
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    DrawerCloseButton,
    SimpleGrid,
    Stack,
    Text,
    useDisclosure,
    VStack
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import { getHotels, getLocations, registerHotel } from '../../services/client';
import { successNotification, errorNotification } from '../../services/notification.js';
import {Formik, Form} from "formik";
import {TextInput, SelectInput} from "../shared/FormComponents.jsx";
import { hotelRegistrationFormValidation } from "../../services/validation.js";
import HotelCard from '../shared/HotelCard.jsx';

const HotelRegistrationForm = ({fetchHotels, onClose, locations}) => {
    return (
        <Formik
            validateOnMount={true}
            validationSchema={ hotelRegistrationFormValidation }
            initialValues={{name: '', locationId: null, rating: null, bookingLink: ''}}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
				registerHotel(values).then(res => {
					successNotification("Success", "Hotel was successfully added!");
					fetchHotels();
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
						<TextInput label={"Hotel Name"} name={"name"} type={"text"} placeholder={"Hotel Name..."} />
						<TextInput label={"Rating"} name={"rating"} type={"number"} placeholder={"0.00"} />
                        <TextInput label={"Booking Link"} name={"bookingLink"} type={"text"} placeholder={"https://url.here..."} />
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

const Hotels = () => {

    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [locations, setLocations] = useState([]);

    useEffect(() => {
		fetchHotels();
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

	const fetchHotels = () => {
		setLoading(true);
		getHotels().then(res => {
			setHotels(res.data);
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
			<Text fontSize="3xl" mb={4} fontWeight="bold">Hotels Dashboard</Text>
            <Button
				colorScheme='blue'
				mb={4}
				leftIcon={<FaPlus />}
				onClick={() => handleClick()}
			>
				ADD HOTEL
			</Button>
            <VStack align="start" spacing={4} w="100%">
                <SimpleGrid columns={[1, 2, 3]} spacing={4} w="100%">
                    { hotels.map(hotel => (
                        <HotelCard
                            key={hotel.id}
                            id={hotel.id}
                            name={hotel.name}
                            rating={hotel.rating}
                            bookingLink={hotel.bookingLink}
                            location={hotel.location}
                            locations={locations}
                            fetchHotels={fetchHotels}
                        />
                    )) }
                </SimpleGrid>
            </VStack>
            <Drawer onClose={onClose} isOpen={isOpen} size={'lg'}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Register a HOTEL</DrawerHeader>
                    <Divider />
                    <DrawerBody mt={2}>
                        <Stack spacing={4}>
                            <HotelRegistrationForm
                                fetchHotels={fetchHotels}
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

export default Hotels;