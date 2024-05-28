import React, { useState, useEffect } from 'react';
import {
    Text,
	Button,
	VStack,
	SimpleGrid,
	useDisclosure,
	Stack,
	Drawer, 
	DrawerOverlay,
	DrawerContent, 
	DrawerCloseButton, 
	DrawerHeader, 
	DrawerBody,
	Divider,
} from '@chakra-ui/react';
import { getNews, registerNews, getUserByUsername } from '../../services/client';
import { FaPlus } from "react-icons/fa";
import NewsCard from '../shared/NewsCard';
import { newsRegistrationFormValidation } from '../../services/validation';
import {Formik, Form} from "formik";
import {TextInput, FileInput} from '../shared/FormComponents.jsx';
import { successNotification, errorNotification } from '../../services/notification.js';
import {getAuthenticatedUser} from "../../services/auth.js";

const NewsRegistrationRequest = ({ fetchNews, onClose }) => {
    return (
        <>
            <Formik
                validateOnMount={true}
                validationSchema={newsRegistrationFormValidation}
                initialValues={{ title: '', description: '', image: null }}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);
                    getUserByUsername(getAuthenticatedUser())
                    .then(res => {
                        values['authorId'] = res.data.id;
                        registerNews(values).then(result => {
                            successNotification("Success", "Successfully registered news!");
                            fetchNews();
                            onClose();
                        }).catch(err => {
                            errorNotification(
                                err.code,
                                err.message
                            );
                        })
                    })
                    .catch(error => {
                        errorNotification(
                            error.code,
                            error.message
                        );
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
                }}
                >
                {({isValid, isSubmitting}) => (
                    <Form>
                        <Stack spacing={5}>
                            <TextInput label={"Title"} name={"title"} type={"text"} placeholder={"Title..."} />
                            <TextInput label={"Description"} name={"description"} type={"textarea"} placeholder={"Description..."} />
                            <FileInput label="Picture" name="image" type="file" />
                            <Button type="submit" colorScheme={'cyan'} color={'white'} disabled={!isValid || isSubmitting}>Register</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
}  

const News = () => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

    const handleClick = () => {
		onOpen();
	}

    useEffect(() => {
		fetchNews();
	}, []);

    const fetchNews = () => {
		setLoading(true);
		getNews().then(res => {
			setNews(res.data)
		}).catch(err => {
			console.log(err);
		}).finally(setLoading(false));
	}

    if (loading) {
		return <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
	}

    return (
        <>
            <Text fontSize="3xl" mb={4} fontWeight="bold">News Dashboard</Text>
            <Button
				colorScheme='blue'
				mb={4}
				leftIcon={<FaPlus />}
				onClick={() => handleClick()}
			>
				ADD NEWS
			</Button>
            <VStack align="start" spacing={4} w="100%">
					{ news.map(n => (
                        <NewsCard
                            key={n.id}
                            id={n.id}
                            title={n.title}
                            description={n.description}
                            picture={n.picture}
                            author={n.authorUsername}
                            fetchNews={fetchNews}
                        />
                    )) }
			</VStack>
            <Drawer onClose={onClose} isOpen={isOpen} size={'lg'}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Write NEWS</DrawerHeader>
					<Divider />
					<DrawerBody mt={2}>
						<Stack spacing={4}>
                            <NewsRegistrationRequest
                                fetchNews={fetchNews}
                                onClose={onClose}
                            />
						</Stack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
        </>
    );
}

export default News;
