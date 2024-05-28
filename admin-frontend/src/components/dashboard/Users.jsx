import React, { useEffect, useState } from 'react';
import {
	Box,
	Text,
	Spacer,
	Button,
	Divider,
	VStack,
	HStack,
	Spinner,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Stack
} from '@chakra-ui/react';
import { getUsers, registerAdmin } from '../../services/client.js';
import UserCard from '../shared/UserCard.jsx';
import { FaPlus } from "react-icons/fa";
import {TextInput} from '../shared/FormComponents.jsx';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { successNotification, errorNotification } from '../../services/notification.js';
import { getAuthenticatedUser } from '../../services/auth.js';
import { adminRegistrationFormValidation } from '../../services/validation.js';

const Section = ({ children }) => (
	<Box w="100%">
		<HStack align="start" spacing={4} wrap="wrap">
			{children}
		</HStack>
		<Divider my={4} />
	</Box>
);

const AdminRegistrationForm = ( { fetchUsers, onClose } ) => {
    return (
        <Formik
            validateOnMount={true}
            validationSchema={ adminRegistrationFormValidation }
            initialValues={{fullname: '', username: '', email: '', password: ''}}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
				registerAdmin(values).then(res => {
					successNotification("Success", "Admin was successfully created!");
					fetchUsers();
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
						<TextInput label={"Fullname"} name={"fullname"} type={"text"} placeholder={"John Smith"} />
                        <TextInput label={"Username"} name={"username"} type={"text"} placeholder={"johnsmith"} />
                        <TextInput label={"Email"} name={"email"} type={"email"} placeholder={"johnsmith@gmail.com"} />
                        <TextInput label={"Password"} name={"password"} type={"password"} placeholder={"Type your password..."} />
                        <Button type="submit" colorScheme={'cyan'} color={'white'} disabled={!isValid || isSubmitting}>Register</Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}

const Users = () => {

	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		fetchUsers();
	}, []);

	const handleClick = () => {
		onOpen();
	}

	const fetchUsers = () => {
		setLoading(true);
		getUsers().then(res => {
			setUsers(res.data)
		}).catch(err => {
			console.log(err);
		}).finally(setLoading(false));
	}

	if (loading) {
		return <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
	}
	if (users.length <= 0) {
		return (
			<Text>No users available</Text>
		)
	}
	return (
		<>
			<Text fontSize="3xl" mb={4} fontWeight="bold">Users</Text>
			<Button
				colorScheme='blue'
				mb={4}
				leftIcon={<FaPlus />}
				onClick={() => handleClick()}
			>
				ADD ADMIN
			</Button>
			<VStack align="start" spacing={4}>
				<Section>
					{users
					.filter(user => user.username != getAuthenticatedUser())
					.filter(user => user.username != 'superuser')
					.map(user => (
						<UserCard
							key={user.id}
							id={user.id}
							fullname={user.fullname}
							username={user.username}
							email={user.email}
							avatar={user.avatar}
							role={user.role.name}
							fetchUsers={fetchUsers}
						/>
					))}
				</Section>
			</VStack>
			<Drawer onClose={onClose} isOpen={isOpen} size={'lg'}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Register an ADMIN</DrawerHeader>
					<Divider />
					<DrawerBody mt={2}>
						<Stack spacing={4}>
							<AdminRegistrationForm fetchUsers={ fetchUsers } onClose={ onClose } />
						</Stack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default Users;
