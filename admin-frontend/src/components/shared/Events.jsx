import React, { useState } from 'react';
import {
  Box,
  Text,
  Button,
  useColorModeValue,
  VStack,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Image,
} from '@chakra-ui/react';


const Events = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([
    { id: "1", name: "Event 1", description: "Description 1", date: "2024-05-24", cost: 10.0, duration: 2, locationId: 1, file: null, imageUrl: 'https://via.placeholder.com/150' },
    { id: "2", name: "Event 2", description: "Description 2", date: "2024-06-24", cost: 20.0, duration: 3, locationId: 2, file: null, imageUrl: 'https://via.placeholder.com/150' },
    { id: "3", name: "Event 3", description: "Description 3", date: "2024-06-24", cost: 20.0, duration: 3, locationId: 2, file: null, imageUrl: 'https://via.placeholder.com/150' },
    { id: "4", name: "Event 4", description: "Description 4", date: "2024-06-24", cost: 20.0, duration: 3, locationId: 2, file: null, imageUrl: 'https://via.placeholder.com/150' },
    { id: "5", name: "Event 5", description: "Description 5", date: "2024-06-24", cost: 20.0, duration: 3, locationId: 2, file: null, imageUrl: 'https://via.placeholder.com/150' },
    { id: "6", name: "Event 6", description: "Description 6", date: "2024-06-24", cost: 20.0, duration: 3, locationId: 2, file: null, imageUrl: 'https://via.placeholder.com/150' },
  ]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCost, setNewCost] = useState('');
  const [newDuration, setNewDuration] = useState('');
  const [newLocationId, setNewLocationId] = useState('');
  const [newFile, setNewFile] = useState(null);

  const onClose = () => {
    setIsOpen(false);
    setNewName('');
    setNewDescription('');
    setNewDate('');
    setNewCost('');
    setNewDuration('');
    setNewLocationId('');
    setNewFile(null);
  };

  const onOpen = (eventId) => {
    setSelectedEventId(eventId);
    setIsOpen(true);
  };

  const deleteEvent = () => {
    const updatedEvents = events.filter(event => event.id !== selectedEventId);
    setEvents(updatedEvents);
    onClose();
  };

  const updateEventDetails = () => {
    const updatedEvents = events.map(event => {
      if (event.id === selectedEventId) {
        return {
          ...event,
          name: newName || event.name,
          description: newDescription || event.description,
          date: newDate || event.date,
          cost: newCost || event.cost,
          duration: newDuration || event.duration,
          locationId: newLocationId || event.locationId,
          file: newFile || event.file,
        };
      }
      return event;
    });
    setEvents(updatedEvents);
    onClose();
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Events Dashboard</Text>
      <Text mb={8}>This is the content for the Events page.</Text>
      <VStack align="start" spacing={4} w="100%">
        <SimpleGrid columns={[1, 2, 3]} spacing={4} w="100%">
          {events.map(event => (
            <CardSection
              key={event.id}
              id={event.id}
              name={event.name}
              description={event.description}
              date={event.date}
              cost={event.cost}
              duration={event.duration}
              locationId={event.locationId}
              imageUrl={event.imageUrl}
              onOpen={() => onOpen(event.id)}
            />
          ))}
        </SimpleGrid>
      </VStack>
      <EventModal
        isOpen={isOpen}
        onClose={onClose}
        onDelete={deleteEvent}
        onUpdate={updateEventDetails}
        newName={newName}
        setNewName={setNewName}
        newDescription={newDescription}
        setNewDescription={setNewDescription}
        newDate={newDate}
        setNewDate={setNewDate}
        newCost={newCost}
        setNewCost={setNewCost}
        newDuration={newDuration}
        setNewDuration={setNewDuration}
        newLocationId={newLocationId}
        setNewLocationId={setNewLocationId}
        newFile={newFile}
        setNewFile={setNewFile}
      />
    </Box>
  );
};

const CardSection = ({ id, name, description, date, cost, duration, locationId, imageUrl, onOpen }) => (
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
    alignItems="center"
    justifyContent="center"
    p={4}
  >
    <Image src={imageUrl} alt={`${name} image`} boxSize="150px" mb={4} />
    <Text fontSize="lg" mb={2}>ID: {id}</Text>
    <Text fontSize="lg" mb={2}>Name: {name}</Text>
    <Text fontSize="lg" color="gray.500" mb={2}>Description: {description}</Text>
    <Text fontSize="lg" color="gray.500" mb={2}>Date: {date}</Text>
    <Text fontSize="lg" color="gray.500" mb={2}>Cost: {cost}</Text>
    <Text fontSize="lg" color="gray.500" mb={2}>Duration: {duration}</Text>
    <Text fontSize="lg" color="gray.500" mb={2}>Location ID: {locationId}</Text>
    <Button
      onClick={onOpen}
      bg={useColorModeValue('#151f21', 'gray.900')}
      color={'white'}
      rounded={'md'}
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
    >
      Details
    </Button>
  </Box>
);

const EventModal = ({ isOpen, onClose, onDelete, onUpdate, newName, setNewName, newDescription, setNewDescription, newDate, setNewDate, newCost, setNewCost, newDuration, setNewDuration, newLocationId, setNewLocationId, newFile, setNewFile }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Event Details</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>Name:</Text>
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
        <Text mt={4}>Description:</Text>
        <Input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        <Text mt={4}>Date:</Text>
        <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
        <Text mt={4}>Cost:</Text>
        <Input type="number" value={newCost} onChange={(e) => setNewCost(e.target.value)} />
        <Text mt={4}>Duration (hours):</Text>
        <Input type="number" value={newDuration} onChange={(e) => setNewDuration(e.target.value)} />
        <Text mt={4}>Location ID:</Text>
        <Input type="number" value={newLocationId} onChange={(e) => setNewLocationId(e.target.value)} />
        <Text mt={4}>File:</Text>
        <Input type="file" onChange={(e) => setNewFile(e.target.files[0])} />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onUpdate}>Update</Button>
        <Button colorScheme="red" onClick={onDelete}>Delete</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default Events;
