import React, { useEffect, useState } from 'react';
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
  useDisclosure,
  Spinner
} from '@chakra-ui/react';
import { getPosts } from "../../services/client.js"
import PostCard from '../shared/PostCard.jsx';

const Posts = () => {
  
	const [posts, setPosts] = useState([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = () => {
		setLoading(true);
		getPosts().then(res => {
			setPosts(res.data);
		}).catch(err => {
			console.log(err);
		}).finally(setLoading(false));
	}

	if (loading) {
		return <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
	}

	return (
		<>
			<Text fontSize="3xl" mb={4} fontWeight="bold">Posts Dashboard</Text>
			<VStack align="start" spacing={4} w="100%">
				<SimpleGrid columns={[1, 2, 3]} spacing={4} w="100%">
					{ posts.map(post => (
						<PostCard
							post={post}
							fetchPosts={fetchPosts}
						/>
					)) }
				</SimpleGrid>
			</VStack>
		</>
	);
};

export default Posts;
