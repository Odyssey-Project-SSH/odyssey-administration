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
import { deleteLocation, updateLocation } from '../../services/client';
import { useState } from 'react';
import {TextInput, FileInput} from "../shared/FormComponents.jsx";
import {successNotification, errorNotification} from '../../services/notification.js';
import {Formik, Form} from 'formik';
import { locationUpdateFormValidation } from '../../services/validation.js';

const LocationUpdateForm = ({ id, city, country, fetchLocations, onClose }) => {
    return (
        <Formik
            validateOnMount={true}
            validationSchema={locationUpdateFormValidation}
            initialValues={{city: city, country: country, file: null}}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
                updateLocation(id, values).then(res => {
                    successNotification("Success", "Successfully updated location!");
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
						<Button type="submit" colorScheme={'cyan'} color={'white'} disabled={!isValid || isSubmitting}>Update</Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}

const LocationCard = ({ id, city, country, picture, fetchLocations }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const onClose = () => {
		setIsOpen(false);
	};
    const onOpen = () => {
		setIsOpen(true);
	};
    const onCloseDrawer = () => {
        setIsOpenDrawer(false);
    }
    const onOpenDrawer = () => {
        setIsOpenDrawer(true);
    }

    const LocationModal = () => (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Location Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Center>
                        <Image
                            boxSize='400px'
                            objectFit='cover'
                            src={picture}
                            mb={2}
                        />
                    </Center>
                    <Text><strong>Id:</strong> {id}</Text>
                    <Text mt={4}><strong>City:</strong> {city}</Text>
                    <Text mt={4}><strong>Country:</strong> {country}</Text>
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
                            onOpenDrawer(true)
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
                            deleteLocation(id).then(res => {
                                successNotification("Location deleted!", `${city},${country} was successfully deleted!`);
                                fetchLocations();
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
                <Center>
                        <Image
                            boxSize='200px'
                            objectFit='cover'
                            src={picture}
                            mb={5}
                        />
                </Center>
                <Text fontSize="lg" mb={2} mx={5}><strong>ID:</strong> {id}</Text>
                <Text fontSize="lg" mb={2} mx={5}><strong>City:</strong> {city}</Text>
                <Text fontSize="lg" mb={2} mx={5}><strong>Country:</strong> {country}</Text>
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

            <LocationModal/>
            <Drawer onClose={onCloseDrawer} isOpen={isOpenDrawer} size={'lg'}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Update a LOCATION</DrawerHeader>
					<Divider />
					<DrawerBody mt={2}>
						<Stack spacing={4}>
                            <LocationUpdateForm 
                                id={id}
                                city={city} 
                                country={country}
                                onClose={onCloseDrawer}
                                fetchLocations={fetchLocations}
                            />
						</Stack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
        </>
    );
};

export default LocationCard;