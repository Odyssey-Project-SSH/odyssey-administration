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

const PostsDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([
    { id: "1", title: "Post 1", content: "Content 1", date: "2024-05-24", imageUrl: 'https://via.placeholder.com/150' },
    { id: "2", title: "Post 2", content: "Content 2", date: "2024-06-24", imageUrl: 'https://via.placeholder.com/150' },
    { id: "3", title: "Post 3", content: "Content 3", date: "2024-05-24", imageUrl: 'https://via.placeholder.com/150' },
    { id: "4", title: "Post 4", content: "Content 4", date: "2024-06-24", imageUrl: 'https://via.placeholder.com/150' },

  ]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const onClose = () => {
    setIsOpen(false);
    setNewTitle('');
    setNewContent('');
    setNewDate('');
    setNewImageUrl('');
  };

  const onOpen = (postId) => {
    setSelectedPostId(postId);
    setIsOpen(true);
  };

  const deletePost = () => {
    const updatedPosts = posts.filter(post => post.id !== selectedPostId);
    setPosts(updatedPosts);
    onClose();
  };

  const updatePostDetails = () => {
    const updatedPosts = posts.map(post => {
      if (post.id === selectedPostId) {
        return {
          ...post,
          title: newTitle || post.title,
          content: newContent || post.content,
          date: newDate || post.date,
          imageUrl: newImageUrl || post.imageUrl,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    onClose();
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Posts Dashboard</Text>
      <Text mb={8}>This is the content for the Posts page.</Text>
      <VStack align="start" spacing={4} w="100%">
        <SimpleGrid columns={[1, 2, 3]} spacing={4} w="100%">
          {posts.map(post => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              date={post.date}
              imageUrl={post.imageUrl}
              onOpen={() => onOpen(post.id)}
            />
          ))}
        </SimpleGrid>
      </VStack>
      <PostModal
        isOpen={isOpen}
        onClose={onClose}
        onDelete={deletePost}
        onUpdate={updatePostDetails}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newContent={newContent}
        setNewContent={setNewContent}
        newDate={newDate}
        setNewDate={setNewDate}
        newImageUrl={newImageUrl}
        setNewImageUrl={setNewImageUrl}
      />
    </Box>
  );
};

const PostCard = ({ id, title, content, date, imageUrl, onOpen }) => (
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
    <Image src={imageUrl} alt={`${title} image`} boxSize="150px" mb={4} />
    <Text fontSize="lg" mb={2}>ID: {id}</Text>
    <Text fontSize="lg" mb={2}>Title: {title}</Text>
    <Text fontSize="lg" color="gray.500" mb={2}>Content: {content}</Text>
    <Text fontSize="lg" color="gray.500" mb={2}>Date: {date}</Text>
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

const PostModal = ({ isOpen, onClose, onDelete, onUpdate, newTitle, setNewTitle, newContent, setNewContent, newDate, setNewDate, newImageUrl, setNewImageUrl }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Post Details</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>Title:</Text>
        <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <Text mt={4}>Content:</Text>
        <Input value={newContent} onChange={(e) => setNewContent(e.target.value)} />
        <Text mt={4}>Date:</Text>
        <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
        <Text mt={4}>Image URL:</Text>
        <Input value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onUpdate}>Update</Button>
        <Button colorScheme="red" onClick={onDelete}>Delete</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default PostsDashboard;
