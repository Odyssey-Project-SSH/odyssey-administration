import { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    Stack,
    Box,
    Text,
    StackDivider,
    Button,
    Drawer, 
    DrawerOverlay, 
    DrawerContent, 
    DrawerCloseButton, 
    DrawerHeader, 
    DrawerBody,
    Divider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { deleteFlight, updateFlight } from "../../services/client";
import { flightUpdateFormValidation } from "../../services/validation";
import { Formik, Form } from 'formik';
import {successNotification, errorNotification} from '../../services/notification.js';
import { TextInput, SelectInput } from "../shared/FormComponents.jsx";

const FlightCard = ({id, name, origin, destination, departure, locations, fetchFlights}) => {

    const date = new Date(departure);

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

    const FlightModal = () => (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirmation</ModalHeader>
                <ModalBody>
                    <Text fontSize="lg">Are you sure you want to delete this flight?</Text>
                </ModalBody>
                <Divider />
                <ModalFooter>
                    <Button
                        ml={4}
                        bg={'red.400'}
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
                            bg={'red.400'}
                            color={'white'}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg'
                            }}
                            _focus={{
                                bg: 'green.500'
                            }}
                            onClick={() => {
                                deleteFlight(id).then(res => {
                                    successNotification("Flight deleted!", `${name} was successfully deleted!`);
                                    fetchFlights();
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

    const FlightUpdateForm = () => (
        <Formik
            validateOnMount={true}
            validationSchema={ flightUpdateFormValidation }
            initialValues={{departure: departure, originId: origin.id, destinationId: destination.id}}
            onSubmit={(values, {setSubmitting}) => {
                const formattedDate = new Date(values.departure).toISOString();
                values.departure = formattedDate;
                setSubmitting(true);
                updateFlight(id, values).then(res => {
                    successNotification("Success", "Successfully updated flight!");
                    fetchFlights();
                    onCloseDrawer();
                }).catch(err => {
                    errorNotification(
						err.code,
						err.message
					);
                }).finally(setSubmitting(false));
                
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
                        <Button type="submit" colorScheme={'cyan'} color={'white'} disabled={!isValid || isSubmitting}>Update</Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );

    return (
        <>
            <Card m={4}>
                <CardHeader>
                    <Heading size='md'>Flight - {name}</Heading>
                </CardHeader>
                    <Text size='md' mt={3} mx={5}><strong>ID</strong> - {id}</Text>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        <Heading size='xs' textTransform='uppercase'>
                            Origin
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            {origin.city}, {origin.country}
                        </Text>
                    </Box>
                    <Box>
                        <Heading size='xs' textTransform='uppercase'>
                            Destination
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            {destination.city}, {destination.country}
                        </Text>
                    </Box>
                    <Box>
                        <Heading size='xs' textTransform='uppercase'>
                            Departure
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            {format(date, 'PPpp')}   
                        </Text>
                    </Box>
                    </Stack>
                </CardBody>
                <CardFooter>
                    <Box>
                        <Button
                            mx={3}
                            bg={'green.400'}
                            color={'white'}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg'
                            }}
                            _focus={{
                                bg: 'green.500'
                            }}
                            onClick={() => {
                                onOpenDrawer();
                            }}
                        >
                            Update
                        </Button>
                        <Button
                            mx={3}
                            bg={'red.400'}
                            color={'white'}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg'
                            }}
                            onClick={() => {
                                onOpen();
                            }}
                        >
                            Delete
                        </Button>
                    </Box>
                </CardFooter>
            </Card>
            <FlightModal />
            <Drawer onClose={onCloseDrawer} isOpen={isOpenDrawer} size={'lg'}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Update a FLIGHT</DrawerHeader>
					<Divider />
					<DrawerBody mt={2}>
						<Stack spacing={4}>
                            <FlightUpdateForm />
						</Stack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
        </>
    );
}

export default FlightCard;