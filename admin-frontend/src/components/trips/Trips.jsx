import React, { useState, useRef } from 'react';
import { Card, Image, Button, Text, Heading, CardBody, CardFooter, Stack, Box, Input, FormControl, FormLabel, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Icon, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

const Trips = () => {
    const [trips, setTrips] = useState([
        {
            id: 1,
            title: 'Visit Paris',
            description: 'Explore the beautiful city of Paris, the city of light.',
            image: 'https://sa.visamiddleeast.com/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/destinations/paris/marquee-travel-paris-800x450.jpg'
        },
        {
            id: 2,
            title: 'Trip to New York',
            description: 'Discover the amazing city of New York with its skyscrapers and vibrant life.',
            image: 'https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg'
        }
    ]);

    const [newTrip, setNewTrip] = useState({
        title: '',
        description: '',
        image: ''
    });

    const [editTripId, setEditTripId] = useState(null);
    const [deleteTripId, setDeleteTripId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTrip({ ...newTrip, [name]: value });
    };

    const addTrip = () => {
        if (editTripId !== null) {
            setTrips(trips.map(trip => trip.id === editTripId ? { ...trip, ...newTrip } : trip));
            setEditTripId(null);
        } else {
            setTrips([...trips, { ...newTrip, id: trips.length + 1 }]);
        }
        setNewTrip({
            title: '',
            description: '',
            image: ''
        });
    };

    const editTrip = (trip) => {
        setEditTripId(trip.id);
        setNewTrip({
            title: trip.title,
            description: trip.description,
            image: trip.image
        });
    };

    const confirmDeleteTrip = (id) => {
        setDeleteTripId(id);
        setIsOpen(true);
    };

    const deleteTrip = () => {
        setTrips(trips.filter(trip => trip.id !== deleteTripId));
        onClose();
    };

    return (
        <Box p="4">
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton
                            _hover={{
                                bg: 'cyan.400',
                                color: 'white',
                            }}
                            py={4}
                            px={6}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor="cyan.400"
                            cursor="pointer"
                            mb="3"
                        >
                            <Box flex="1" textAlign="left" display="flex" alignItems="center">
                                <Icon as={FaPlus} mr={2} />
                                {editTripId !== null ? 'Update Trip' : 'Add a New Trip'}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input
                                placeholder="Title"
                                name="title"
                                value={newTrip.title}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl mt="4">
                            <FormLabel>Description</FormLabel>
                            <Input
                                placeholder="Description"
                                name="description"
                                value={newTrip.description}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl mt="4">
                            <FormLabel>Image URL</FormLabel>
                            <Input
                                placeholder="Image URL"
                                name="image"
                                value={newTrip.image}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <Button mt="4" colorScheme='blue' onClick={addTrip}>
                            {editTripId !== null ? 'Update Trip' : 'Add Trip'}
                        </Button>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

            {trips.map(trip => (
                <Card key={trip.id} direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline' mb="4">
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                        src={trip.image}
                        alt={trip.title}
                    />

                    <Stack>
                        <CardBody>
                            <Heading size='md'>{trip.title}</Heading>
                            <Text py='2'>
                                {trip.description}
                            </Text>
                        </CardBody>

                        <CardFooter>
                            <Button mr='3' variant='solid' colorScheme='blue' onClick={() => editTrip(trip)}>
                                Update Trip
                            </Button>
                            <Button variant='solid' colorScheme='red' onClick={() => confirmDeleteTrip(trip.id)}>
                                Delete Trip
                            </Button>
                        </CardFooter>
                    </Stack>
                </Card>
            ))}

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Trip
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this trip? This action cannot be undone.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={deleteTrip} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};

export default Trips;
