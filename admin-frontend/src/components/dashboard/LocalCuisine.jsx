import React, { useState, useEffect } from 'react';
import {
    Box,
    Text,
    Button,
    VStack,
    SimpleGrid,
    useDisclosure,
    Divider,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Stack,
    Spinner
} from '@chakra-ui/react';
import { FaPlus } from "react-icons/fa";
import { TextInput, FileInput, SelectInput } from '../shared/FormComponents.jsx';
import { Formik, Form } from "formik";
import { localCuisineRegistrationFormValidation } from '../../services/validation.js';
import { registerLocalCuisine, getLocalCuisine, getLocations } from '../../services/client';
import { successNotification, errorNotification } from '../../services/notification.js';
import LocalCuisineCard from "../shared/LocalCuisineCard.jsx";

const LocalCuisineRegistrationForm = ({ fetchLocalCuisines, onClose, locations }) => {
    return (
        <Formik
            validateOnMount={true}
            validationSchema={ localCuisineRegistrationFormValidation }
            initialValues={{ name: null, description: null, image: null, locationId: null }}
            onSubmit={(values, { setSubmitting }) => {
                console.log(1)
                setSubmitting(true);
                registerLocalCuisine(values).then(res => {
                    successNotification("Success", "Local Cuisine was successfully added!");
                    fetchLocalCuisines();
                    onClose();
                }).catch(err => {
                    console.log(err)
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
                        <FileInput label="Picture" name="image" type="file" />
                        <Button type="submit" colorScheme={'cyan'} color={'white'} disabled={!isValid || isSubmitting}>Register</Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}

const LocalCuisine = () => {

    const [localCuisines, setLocalCuisines] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetchLocalCuisines();
        fetchLocations();
    }, []);

    const fetchLocations = () => {
        setLoading(true);
        getLocations().then(res => {
            setLocations(res.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => setLoading(false));
    }

    const fetchLocalCuisines = () => {
        setLoading(true);
        getLocalCuisine().then(res => {
            setLocalCuisines(res.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => setLoading(false));
    }

    const handleClick = () => {
        onOpen();
    }

    if (loading) {
        return <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
    }

    return (
        <>
            <Text fontSize="3xl" mb={4} fontWeight="bold">Local Cuisines Dashboard</Text>
            <Button
                colorScheme='blue'
                mb={4}
                leftIcon={<FaPlus />}
                onClick={() => handleClick()}
            >
                ADD LOCAL CUISINE
            </Button>
            <VStack align="start" spacing={4} w="100%">
                <SimpleGrid columns={[1, 2, 3]} spacing={4} w="100%">
                    { localCuisines.map(localCuisine => (
                        <LocalCuisineCard
                            key={localCuisine.id}
                            id={localCuisine.id}
                            name={localCuisine.name}
                            description={localCuisine.description}
                            image={localCuisine.image}
                            location={localCuisine.location}
                            locations={locations}
                            fetchLocalCuisines={fetchLocalCuisines}
                        />
                    ))}
                </SimpleGrid>
            </VStack>
            <Drawer onClose={onClose} isOpen={isOpen} size={'lg'}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Register a LOCAL CUISINE</DrawerHeader>
                    <Divider />
                    <DrawerBody mt={2}>
                        <Stack spacing={4}>
                            <LocalCuisineRegistrationForm
                                fetchLocalCuisines={fetchLocalCuisines}
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

export default LocalCuisine;
