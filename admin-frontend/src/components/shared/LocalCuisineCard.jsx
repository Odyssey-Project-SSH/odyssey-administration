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
import { TextInput, SelectInput, FileInput } from "../shared/FormComponents.jsx";
import { successNotification, errorNotification } from '../../services/notification.js';
import { Formik, Form } from 'formik';
import { localCuisineUpdateFormValidation } from '../../services/validation.js';
import { updateLocalCuisine, deleteLocalCuisine } from '../../services/client.js';

const LocalCuisineUpdateForm = ({ id, name, description, image, selectedLocation, locations, fetchLocalCuisines, onClose }) => {
    return (
        <Formik
            validateOnMount={true}
            validationSchema={localCuisineUpdateFormValidation}
            initialValues={{ name: name, description: description, file: null, locationId: selectedLocation.id }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                updateLocalCuisine(id, values).then(res => {
                    successNotification("Success", "Successfully updated local cuisine!");
                    fetchLocalCuisines();
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
            {({ isValid, isSubmitting }) => (
                <Form>
                    <Stack spacing={5}>
                        <TextInput label={"Name"} name={"name"} type={"text"} placeholder={"Name..."} />
                        <TextInput label={"Description"} name={"description"} type={"textarea"} placeholder={"Description..."} />
                        <SelectInput label={"Location"} name={"locationId"}>
                            <option value="">Select Location</option>
                            {locations.map(location => (
                                <option
                                    key={location.id}
                                    value={`${location.id}`}
                                >
                                    {location.city}, {location.country}
                                </option>
                            ))}
                        </SelectInput>
                        <FileInput label="Picture" name="file" type="file" />
                        <Button type="submit" colorScheme={'cyan'} color={'white'} disabled={!isValid || isSubmitting}>Update</Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}

const LocalCuisineCard = ({ id, name, description, image, location, locations, fetchLocalCuisines }) => {

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

    const LocalCuisineModal = () => (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Local Cuisine Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Center>
                        <Image
                            boxSize='200px'
                            objectFit='cover'
                            src={image}
                            mb={5}
                        />
                    </Center>
                    <Text fontSize="lg" mb={2} mx={5}><strong>Id:</strong> {id}</Text>
                    <Text fontSize="lg" mb={2} mx={5}><strong>Name:</strong> {name}</Text>
                    <Divider />
                    <Text fontSize="lg" mb={2} mx={5} my={3}><strong>Description</strong></Text>
                    <Text fontSize="lg" mb={2} mx={5} my={3}>{description}</Text>
                    <Divider />
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
                            bg: 'red.500'
                        }}
                        onClick={() => {
                            deleteLocalCuisine(id).then(res => {
                                successNotification("Local cuisine deleted!", `${name} was successfully deleted!`);
                                fetchLocalCuisines();
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
                        src={image}
                        mb={5}
                    />
                </Center>
                <Text fontSize="lg" mb={2} mx={5}><strong>ID:</strong> {id}</Text>
                <Text fontSize="lg" mb={2} mx={5}><strong>Name:</strong> {name}</Text>
                <Text fontSize="lg" mb={2} mx={5}><strong>Description:</strong> {description}</Text>
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

            <LocalCuisineModal />
            <Drawer onClose={onCloseDrawer} isOpen={isOpenDrawer} size={'lg'}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Update Local Cuisine</DrawerHeader>
                    <Divider />
                    <DrawerBody mt={2}>
                        <Stack spacing={4}>
                            <LocalCuisineUpdateForm
                                id={id}
                                name={name}
                                description={description}
                                image={image}
                                selectedLocation={location}
                                locations={locations}
                                fetchLocalCuisines={fetchLocalCuisines}
                                onClose={onCloseDrawer}
                            />
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default LocalCuisineCard;
