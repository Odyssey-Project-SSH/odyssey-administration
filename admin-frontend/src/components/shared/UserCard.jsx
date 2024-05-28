import {Center, Box, HStack, Text, Avatar, Spacer, Button, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, ModalBody} from '@chakra-ui/react';
import { deleteUser } from '../../services/client';
import { useState } from 'react';
import {successNotification, errorNotification} from '../../services/notification.js';

const UserCard = ({ id, fullname, username, email, avatar, role, fetchUsers }) => {

    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
		setIsOpen(false);
	};
    const onOpen = () => {
		setIsOpen(true);
	};

    const UserModal = () => (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>User Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Center>
                        <Avatar src={avatar} size={'xl'} my={3}></Avatar>
                    </Center>
                    <Text><strong>Id:</strong> {id}</Text>
                    <Text mt={4}><strong>Fullname:</strong> {fullname}</Text>
                    <Text mt={4}><strong>Username:</strong> {username}</Text>
                    <Text mt={4}><strong>Email:</strong> {email}</Text>
                    <Text mt={4}><strong>Role:</strong> {role}</Text>
                </ModalBody>
                <ModalFooter>
                    <Button 
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
                            deleteUser(id).then(res => {
                                successNotification("User deleted!", `${username} was successfully deleted!`);
                                fetchUsers();
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
                    <Avatar size="sm" src={avatar} />
                    <Text fontSize="lg">{fullname}</Text>
                    <Spacer />
                    <Text fontSize="lg" color="gray.500">@{username}</Text>
                    <Spacer />
                    <Text fontSize="lg" color="gray.500">{email}</Text>
                    <Spacer />
                    <Text fontSize="lg" color="red.500">{role}</Text>
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

            <UserModal/>
        </>
    );
};

export default UserCard;