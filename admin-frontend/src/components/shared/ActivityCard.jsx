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
    Divider, 
    Drawer, 
    DrawerOverlay, 
    DrawerContent, 
    DrawerCloseButton, 
    DrawerHeader, 
    DrawerBody, 
    Stack
} from '@chakra-ui/react';
import { useState } from "react";
import {TextInput, SelectInput} from "../shared/FormComponents.jsx";
import {successNotification, errorNotification} from '../../services/notification.js';
import {Formik, Form} from 'formik';
import { activityRegistrationFormValidation } from '../../services/validation.js';
import { updateActivity, deleteActivity } from '../../services/client.js';

const ActivityUpdateForm = ({id, name, description, duration, cost, selectedLocation, locations, fetchActivities, onClose}) => {
    return (
        <Formik
            validateOnMount={true}
            validationSchema={ activityRegistrationFormValidation }
            initialValues={{name: name, description: description, cost: cost, duration: duration, locationId: selectedLocation.id}}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
                updateActivity(id, values).then(res => {
                    successNotification("Success", "Successfully updated activity!");
                    fetchActivities();
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

const ActivityCard = ({id, name, description, duration, cost, location, locations, fetchActivities}) => {
    
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

    const ActivityModal = () => (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Activity Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontSize="lg" mb={2} mx={5}><strong>Id:</strong> {id}</Text>
                    <Text fontSize="lg" mb={2} mx={5}><strong>Name:</strong> {name}</Text>
                    <Text fontSize="lg" mb={2} mx={5}><strong>Duration:</strong> {duration}</Text>
                    <Divider />
                    <Text fontSize="lg" mb={2} mx={5} my={3}><strong>Description</strong></Text>
                    <Text fontSize="lg" mb={2} mx={5} my={3}>{description}</Text>
                    <Divider />
                    <Text fontSize="lg" mb={2} mx={5} mt={3}><strong>Cost:</strong> {cost}</Text>
                    <Text fontSize="lg" mb={2} mx={5}><strong>Location:</strong> {location.city}, {location.country} - {location.id}</Text>
                </ModalBody>
                <Divider />
                <ModalFooter>
                    <Button
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
                            onClose(true);
                            onOpenDrawer(true);
                        }}
                    >
                        Update
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
                            deleteActivity(id).then(res => {
                                successNotification("Activity deleted!", `${name} was successfully deleted!`);
                                fetchActivities();
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
                <Text fontSize="lg" mb={2} mx={5}><strong>Name:</strong> {name}</Text>
                <Text fontSize="lg" mb={2} mx={5}><strong>Duration:</strong> {duration}</Text>
                <Text fontSize="lg" mb={2} mx={5}><strong>Cost:</strong> {cost}</Text>
                <Text fontSize="lg" mb={2} mx={5}><strong>Location:</strong> {location.city}, {location.country}</Text>
                <Button
                    onClick={onOpen}
                    bg={useColorModeValue('#151f21', 'gray.900')}
                    color={'white'}
                    rounded={'md'}
                    mx={5}
                    mt={5}
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    }}
                >
                    Details
                </Button>
            </Box>

            <ActivityModal/>
            <Drawer onClose={onCloseDrawer} isOpen={isOpenDrawer} size={'lg'}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Update an ACTIVITY</DrawerHeader>
					<Divider />
					<DrawerBody mt={2}>
						<Stack spacing={4}>
                            <ActivityUpdateForm
                                id={id}
                                name={name}
                                description={description}
                                cost={cost}
                                duration={duration}
                                selectedLocation={location}
                                locations={locations}
                                fetchActivities={fetchActivities}
                                onClose={onCloseDrawer} 
                            />
						</Stack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
        </>
    );
}

export default ActivityCard;