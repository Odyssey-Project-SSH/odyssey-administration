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

const Locations = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [locations, setLocations] = useState([
    { id: "1", city: "City 1", country: "Country 1", file: null },
    { id: "2", city: "City 2", country: "Country 2", file: null },
    { id: "3", city: "City 3", country: "Country 3", file: null },
    { id: "4", city: "City 4", country: "Country 4", file: null },
    { id: "5", city: "City 5", country: "Country 5", file: null },
    { id: "6", city: "City 6", country: "Country 6", file: null },
  ]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [newCity, setNewCity] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newFile, setNewFile] = useState(null);

  const onClose = () => {
    setIsOpen(false);
    setNewCity('');
    setNewCountry('');
    setNewFile(null);
  };

  const onOpen = (locationId) => {
    setSelectedLocationId(locationId);
    setIsOpen(true);
  };

  const deleteLocation = () => {
    const updatedLocations = locations.filter(location => location.id !== selectedLocationId);
    setLocations(updatedLocations);
    onClose();
  };

  const updateLocationDetails = () => {
    const updatedLocations = locations.map(location => {
      if (location.id === selectedLocationId) {
        return {
          ...location,
          city: newCity || location.city,
          country: newCountry || location.country,
          file: newFile || location.file,
        };
      }
      return location;
    });
    setLocations(updatedLocations);
    onClose();
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Locations Dashboard</Text>
      <Text mb={8}>This is the content for the Locations page.</Text>
      <VStack align="start" spacing={4} w="100%">
        <SimpleGrid columns={[1, 2, 3]} spacing={4} w="100%">
          {locations.map(location => (
            <CardSection
              key={location.id}
              id={location.id}
              city={location.city}
              country={location.country}
              onOpen={() => onOpen(location.id)}
            />
          ))}
        </SimpleGrid>
      </VStack>
      <LocationModal
        isOpen={isOpen}
        onClose={onClose}
        onDelete={deleteLocation}
        onUpdate={updateLocationDetails}
        newCity={newCity}
        setNewCity={setNewCity}
        newCountry={newCountry}
        setNewCountry={setNewCountry}
        newFile={newFile}
        setNewFile={setNewFile}
      />
    </Box>
  );
};

const CardSection = ({ id, city, country, onOpen }) => (
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
    <Text fontSize="lg" mb={2}>City: {city}</Text>
    <Text fontSize="lg" mb={2}>Country: {country}</Text>
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

const LocationModal = ({ isOpen, onClose, onDelete, onUpdate, newCity, setNewCity, newCountry, setNewCountry, newFile, setNewFile }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Location Details</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>City:</Text>
        <Input value={newCity} onChange={(e) => setNewCity(e.target.value)} />
        <Text mt={4}>Country:</Text>
        <Input value={newCountry} onChange={(e) => setNewCountry(e.target.value)} />
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

export default Locations;
