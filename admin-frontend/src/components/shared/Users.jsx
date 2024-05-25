import React, { useState } from 'react';
import {
  Heading,
  Box,
  Center,
  Text,
  Spacer,
  Button,
  useColorModeValue,
  Divider,
  VStack,
  HStack,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react';

const Users = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([
    { id: "1", fullname: "Fullname1", username: "Username1", password:"Password1", email: "user1@example.com" },
    { id: "2", fullname: "Fullname2", username: "Username2", password:"Password2", email: "user2@example.com" },
    { id: "3", fullname: "Fullname3", username: "Username3", password:"Password3", email: "user3@example.com" },
    { id: "4", fullname: "Fullname4", username: "Username4", password:"Password4", email: "user4@example.com" },
    { id: "5", fullname: "Fullname5", username: "Username5", password:"Password5", email: "user5@example.com" },
    { id: "6", fullname: "Fullname6", username: "Username6", password:"Password6", email: "user6@example.com" },
  ]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newFullname, setNewFullname] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onClose = () => {
    setIsOpen(false);
    setNewUsername('');
    setNewEmail('');
    setNewFullname('');
    setNewPassword('');
  };

  const onOpen = (userId) => {
    setSelectedUserId(userId);
    setIsOpen(true);
  };

const deleteUser = () => {
  const updatedUsers = users.filter(user => user.id !== selectedUserId);
  // Update IDs after deleting a user
  const updatedUsersWithNewIds = updatedUsers.map((user, index) => ({
    ...user,
    id: String(index + 1), // Update ID to match new index
  }));
  setUsers(updatedUsersWithNewIds);
  onClose();
};


  const updateUserDetails = () => {
    const updatedUsers = users.map(user => {
      if (user.id === selectedUserId) {
        return {
          ...user,
          username: newUsername || user.username,
          email: newEmail || user.email,
          fullname: newFullname || user.fullname,
          password: newPassword || user.password,
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    onClose();
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Users Content</Text>
      <Text mb={8}>This is the content for the Users page.</Text>
      <VStack align="start" spacing={4}>
        <Section>
          {users.map(user => (
            <CardSection
              key={user.id}
              id={user.id}
              newFullName={user.fullname} // Corrected prop name
              username={user.username}
              email={user.email}
              password={user.password} // Corrected prop name
              onOpen={() => onOpen(user.id)}
            />

          ))}
        </Section>
      </VStack>
      <UserModal
        isOpen={isOpen}
        onClose={onClose}
        onDelete={deleteUser}
        onUpdate={updateUserDetails}
        newUsername={newUsername}
        setNewUsername={setNewUsername}
        newEmail={newEmail}
        setNewEmail={setNewEmail}
        newFullname={newFullname}
        setNewFullname={setNewFullname}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
      />
    </Box>
  );
};


const Section = ({ children }) => (
  <Box w="100%">
    <HStack align="start" spacing={4} wrap="wrap">
      {children}
    </HStack>
    <Divider my={4} />
  </Box>
);

const CardSection = ({ id, avatarSrc, username, email, newFullName, password, onOpen }) => (
  <Center py={2} w="100%">
    <Box
      w={'100%'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={4}
    >
      <HStack spacing={4} align="center" w="100%">
        <Text fontSize="lg">{id}</Text>
        <Avatar size="sm" src={avatarSrc} />
        <Text fontSize="lg" ml="12%">{username}</Text>
        <Spacer />
        <Text fontSize="lg" color="gray.500" mr="10%">{email}</Text>
        <Text fontSize="lg" color="gray.500" mr="5%">{newFullName}</Text>
        <Text fontSize="lg" color="gray.500" mr="10%">{password}</Text>
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
      </HStack>
    </Box>
  </Center>
);


const UserModal = ({ isOpen, onClose, onDelete, onUpdate, newUsername, setNewUsername, newEmail, setNewEmail, newFullname, setNewFullname, newPassword, setNewPassword }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>User Details</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>Username:</Text>
        <Input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
        <Text mt={4}>Email:</Text>
        <Input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        <Text mt={4}>Full Name:</Text>
        <Input value={newFullname} onChange={(e) => setNewFullname(e.target.value)} />
        <Text mt={4}>Password:</Text>
        <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onUpdate}>Update</Button>
        <Button colorScheme="red" onClick={onDelete}>Delete</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default Users;
