import {
    Center, 
    Box, 
    Text, 
    Button, 
    useColorModeValue, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalCloseButton, 
    ModalBody,
    Image,
    HStack,
    Divider, 
    Drawer, 
    DrawerOverlay, 
    DrawerContent, 
    DrawerCloseButton, 
    DrawerHeader, 
    DrawerBody, 
    Stack,
    Link,
} from '@chakra-ui/react';
import { useState } from "react";
import {TextInput, SelectInput} from "../shared/FormComponents.jsx";
import {successNotification, errorNotification} from '../../services/notification.js';
import {Formik, Form} from 'formik';
import { deleteHotel, updateHotel } from "../../services/client";
import {hotelUpdateFormValidation} from "../../services/validation.js";
import { FaSketch } from 'react-icons/fa';

const HotelUpdateForm = ({id, name, rating, bookingLink, selectedLocation, locations, fetchHotels, onClose}) => {
    return (
        <Formik
            validateOnMount={true}
            validationSchema={ hotelUpdateFormValidation }
            initialValues={{name: name, locationId: selectedLocation.id, rating: rating, bookingLink: bookingLink}}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
                updateHotel(id, values).then(res => {
                    successNotification("Success", "Successfully updated hotel!");
                    fetchHotels();
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

const HotelCard = ({id, name, location, rating, bookingLink, locations, fetchHotels}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    
    const onClose = () => {
        setIsOpen(false);
    }
    const onOpen = () => {
        setIsOpen(true);
        setIsOpenDrawer(false);
    }
    const onCloseDrawer = () => {
        setIsOpenDrawer(false);
    }
    const onOpenDrawer = () => {
        setIsOpenDrawer(true);
        setIsOpen(false);
    }
    
    const HotelCardModal = () => (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirmation</ModalHeader>
                <ModalBody>
                    <Text fontSize="lg">Are you sure you want to delete this hotel?</Text>
                </ModalBody>
                <Divider />
                <ModalFooter>
                    <Button
                        ml={4}
                        bg={'gray.400'}
                        color={'white'}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg'
                        }}
                        _focus={{
                            bg: 'gray.500'
                        }}
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                            ml={4}
                            bg={'red'}
                            color={'white'}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg'
                            }}
                            _focus={{
                                bg: 'green.500'
                            }}
                            onClick={() => {
                                deleteHotel(id).then(res => {
                                    successNotification("Hotel deleted!", `${name} was successfully deleted!`);
                                    fetchHotels();
                                }).catch(err => {
                                    errorNotification(err.code, err.message);
                                }).finally(() => {
                                    onClose();
                                })
                            }}
                        >
                            Delete
                        </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );

    return (
        <>
            <Box
                w={'100%'}
                h={'100%'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                position="relative"
                display="flex"
                flexDirection="column"
                alignItems="left"
                justifyContent="center"
                p={5}
            >
                <Text fontSize="lg" mb={2} mx={5}><strong>ID:</strong> {id}</Text>
                <Text fontSize="lg" mb={2} mx={5}><strong>Hotel Name:</strong> {name}</Text>
                <Text fontSize="lg" mb={2} mx={5}><strong>Rating:</strong> {rating}</Text>
                <Text fontSize="lg" mb={2} mx={5}><strong>Location:</strong> {location.city}, {location.country}</Text>
                <Text fontSize="lg" mb={2} mx={5}><strong>Bookink link:</strong> <Link isExternal color='teal.500' href={bookingLink}>Book now!</Link></Text>
                <HStack>
                    <Button
                        onClick={onOpenDrawer}
                        bg={'green'}
                        color={'white'}
                        rounded={'md'}
                        mx={5}
                        mt={5}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                        }}
                    >
                        Update
                    </Button>
                    <Button
                        onClick={onOpen}
                        bg={'red'}
                        color={'white'}
                        rounded={'md'}
                        mx={5}
                        mt={5}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                        }}
                    >
                        Delete
                    </Button>
                </HStack>
            </Box>
            <HotelCardModal />
            <Drawer onClose={onCloseDrawer} isOpen={isOpenDrawer} size={'lg'}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Update an ACTIVITY</DrawerHeader>
					<Divider />
					<DrawerBody mt={2}>
						<Stack spacing={4}>
                            <HotelUpdateForm
                                id={id}
                                name={name}
                                rating={rating}
                                bookingLink={bookingLink}
                                selectedLocation={location}
                                locations={locations}
                                fetchHotels={fetchHotels}
                                onClose={onCloseDrawer}
                            />
						</Stack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
        </>
    );
}

export default HotelCard;