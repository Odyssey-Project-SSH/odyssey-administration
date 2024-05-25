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
} from '@chakra-ui/react';

const Activities = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activities, setActivities] = useState([
    { id: "1", name: "Activity 1", cost: 10, duration: 2, locationId: 1 },
    { id: "2", name: "Activity 2", cost: 20, duration: 3, locationId: 2 },
    { id: "3", name: "Activity 3", cost: 30, duration: 4, locationId: 3 },
    { id: "4", name: "Activity 4", cost: 40, duration: 5, locationId: 4 },
    { id: "5", name: "Activity 5", cost: 50, duration: 6, locationId: 5 },
    { id: "6", name: "Activity 6", cost: 60, duration: 7, locationId: 6 },
  ]);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [newName, setNewName] = useState('');
  const [newCost, setNewCost] = useState('');
  const [newDuration, setNewDuration] = useState('');
  const [newLocationId, setNewLocationId] = useState('');

  const onClose = () => {
    setIsOpen(false);
    setNewName('');
    setNewCost('');
    setNewDuration('');
    setNewLocationId('');
  };

  const onOpen = (activityId) => {
    setSelectedActivityId(activityId);
    setIsOpen(true);
  };

  const deleteActivity = () => {
    const updatedActivities = activities.filter(activity => activity.id !== selectedActivityId);
    setActivities(updatedActivities);
    onClose();
  };

  const updateActivityDetails = () => {
    const updatedActivities = activities.map(activity => {
      if (activity.id === selectedActivityId) {
        return {
          ...activity,
          name: newName || activity.name,
          cost: newCost || activity.cost,
          duration: newDuration || activity.duration,
          locationId: newLocationId || activity.locationId,
        };
      }
      return activity;
    });
    setActivities(updatedActivities);
    onClose();
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Activities Dashboard</Text>
      <Text mb={8}>This is the content for the Activities page.</Text>
      <VStack align="start" spacing={4} w="100%">
        <SimpleGrid columns={[1, 2, 3]} spacing={4} w="100%">
          {activities.map(activity => (
            <CardSection
              key={activity.id}
              id={activity.id}
              name={activity.name}
              cost={activity.cost}
              duration={activity.duration}
              locationId={activity.locationId}
              onOpen={() => onOpen(activity.id)}
            />
          ))}
        </SimpleGrid>
      </VStack>
      <ActivityModal
        isOpen={isOpen}
        onClose={onClose}
        onDelete={deleteActivity}
        onUpdate={updateActivityDetails}
        newName={newName}
        setNewName={setNewName}
        newCost={newCost}
        setNewCost={setNewCost}
        newDuration={newDuration}
        setNewDuration={setNewDuration}
        newLocationId={newLocationId}
        setNewLocationId={setNewLocationId}
      />
    </Box>
  );
};

const CardSection = ({ id, name, cost, duration, locationId, onOpen }) => (
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
    <Text fontSize="lg" mb={2}>ID: {id}</Text>
    <Text fontSize="lg" mb={2}>Name: {name}</Text>
    <Text fontSize="lg" mb={2}>Cost: {cost}</Text>
    <Text fontSize="lg" mb={2}>Duration: {duration} hours</Text>
    <Text fontSize="lg" mb={2}>Location ID: {locationId}</Text>
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

const ActivityModal = ({ isOpen, onClose, onDelete, onUpdate, newName, setNewName, newCost, setNewCost, newDuration, setNewDuration, newLocationId, setNewLocationId }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Activity Details</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>Name:</Text>
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
        <Text mt={4}>Cost:</Text>
        <Input type="number" value={newCost} onChange={(e) => setNewCost(e.target.value)} />
        <Text mt={4}>Duration (hours):</Text>
        <Input type="number" value={newDuration} onChange={(e) => setNewDuration(e.target.value)} />
        <Text mt={4}>Location ID:</Text>
        <Input type="number" value={newLocationId} onChange={(e) => setNewLocationId(e.target.value)} />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onUpdate}>Update</Button>
        <Button colorScheme="red" onClick={onDelete}>Delete</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default Activities;
