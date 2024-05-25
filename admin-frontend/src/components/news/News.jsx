import React, { useState, useRef } from 'react';
import {
    Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider,
    ButtonGroup, Button, Flex, Input, FormControl, FormLabel,
    AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader,
    AlertDialogContent, AlertDialogOverlay, Modal, ModalOverlay,
    ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton
} from '@chakra-ui/react';
import SidebarWithHeader from '../shared/SidebarWithHeader';

const NewsDashboard = () => {
    const [news, setNews] = useState([
        {
            title: "Travel advisory: Heatwave alert in most parts of North India; places to avoid right now",
            picture: "https://scitechdaily.com/images/Hot-Sun-Thermometer-Heatwave-Concept.jpg",
            description: "A relentless heat wave persisted across large parts of the country for the seventh consecutive day on Thursday, with temperatures soaring to 48.8 degrees Celsius in Rajasthan's Barmer, marking the highest recorded temperature in the country so far this year.",
        },
        {
            title: "Lift 109: First look at Battersea Power Station’s high flying new attraction",
            picture: "https://static.independent.co.uk/2022/11/15/16/newFile-12.jpg?quality=75&width=1250&crop=3%3A2%2Csmart&auto=webp",
            description: "Im often jealous of London tourists. They’re able to see my home city through joy-filled, unjaded eyes: to truly be awestruck by the grandeur of the Houses of Parliament and St Paul’s; to stop on the Millennium Bridge and stare in wonder at a capital split in two by the mighty Thames; to look upon the heaving streets around Leicester Square without scorn..",
        },
        {
            title: "Brooklyn's Prospect Park Zoo reopens after 8-month flood closure",
            picture: "https://www.prospectpark.org/wp-content/uploads/filer_public/8b/e4/8be4d0a2-315e-4fe1-a69b-3cb29343a09f/julie_larsen_maher_3273_sea_lion_pool_with_visitors_ppz_08_20_14.jpg",
            description: "Brooklyn's Prospect Park Zoo is welcoming its first guests since devastating flooding back in September. The zoo has been closed for 239 days, as crews worked to repair exhibits and other infrastructure."


        }
    ]);

    const [newNews, setNewNews] = useState({
        title: "",
        picture: "",
        description: ""
    });

    const [isEditing, setIsEditing] = useState(null);
    const [editedNews, setEditedNews] = useState({
        title: "",
        picture: "",
        description: ""
    });

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const cancelRef = useRef();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNews({ ...newNews, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedNews({ ...editedNews, [name]: value });
    };

    const addNews = () => {
        setNews([...news, newNews]);
        setNewNews({
            title: "",
            picture: "",
            description: ""
        });
    };

    const editNews = (index) => {
        setIsEditing(index);
        setEditedNews(news[index]);
    };

    const saveNews = (index) => {
        const updatedNews = [...news];
        updatedNews[index] = editedNews;
        setNews(updatedNews);
        setIsEditing(null);
        setEditedNews({
            title: "",
            picture: "",
            description: ""
        });
    };

    const openDeleteDialog = (index) => {
        setDeleteIndex(index);
        setIsAlertOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsAlertOpen(false);
        setDeleteIndex(null);
    };

    const confirmDelete = () => {
        const updatedNews = news.filter((_, newsIndex) => newsIndex !== deleteIndex);
        setNews(updatedNews);
        closeDeleteDialog();
    };

    const openModal = (newsItem) => {
        setSelectedNews(newsItem);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedNews(null);
    };

    return (
        <SidebarWithHeader>
            <FormControl mb="4">
                <FormLabel>Title</FormLabel>
                <Input
                    placeholder="Title"
                    name="title"
                    value={newNews.title}
                    onChange={handleInputChange}
                />
                <FormLabel mt="2">Picture URL</FormLabel>
                <Input
                    placeholder="Picture URL"
                    name="picture"
                    value={newNews.picture}
                    onChange={handleInputChange}
                />
                <FormLabel mt="2">Description</FormLabel>
                <Input
                    placeholder="Description"
                    name="description"
                    value={newNews.description}
                    onChange={handleInputChange}
                />
                <Button mt="4" colorScheme='blue' onClick={addNews}>Add News</Button>
            </FormControl>
            <Text>Latest News:</Text>
            <Flex wrap="wrap" spacing='4'>
                {news.map((newsItem, index) => (
                    <Card
                        key={index}
                        maxW='sm'
                        m="2"
                        onClick={() => {
                            if (isEditing === null) {
                                openModal(newsItem);
                            }
                        }}
                        cursor={isEditing === null ? "pointer" : "default"}
                    >
                        <CardBody>
                            {isEditing === index ? (
                                <>
                                    <Input
                                        placeholder="Title"
                                        name="title"
                                        value={editedNews.title}
                                        onChange={handleEditInputChange}
                                        mb="2"
                                    />
                                    <Input
                                        placeholder="Picture URL"
                                        name="picture"
                                        value={editedNews.picture}
                                        onChange={handleEditInputChange}
                                        mb="2"
                                    />
                                    <Input
                                        placeholder="Description"
                                        name="description"
                                        value={editedNews.description}
                                        onChange={handleEditInputChange}
                                        mb="2"
                                    />
                                </>
                            ) : (
                                <>
                                    <Image
                                        src={newsItem.picture}
                                        alt={`Image of ${newsItem.title}`}
                                        borderRadius='lg'
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md'>{newsItem.title}</Heading>
                                        <Text noOfLines={2}>
                                            {newsItem.description}
                                        </Text>
                                    </Stack>
                                </>
                            )}
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                {isEditing === index ? (
                                    <Button
                                        variant='solid'
                                        colorScheme='blue'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            saveNews(index);
                                        }}
                                    >
                                        Save
                                    </Button>
                                ) : (
                                    <Button
                                        variant='solid'
                                        colorScheme='blue'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            editNews(index);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                )}
                                <Button
                                    variant='ghost'
                                    colorScheme='red'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openDeleteDialog(index);
                                    }}
                                >
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                ))}
            </Flex>

            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={closeDeleteDialog}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete News
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this news item? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={closeDeleteDialog}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            {selectedNews && (
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{selectedNews.title}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Image src={selectedNews.picture} alt={`Image of ${selectedNews.title}`} mb={4} />
                            <Text>{selectedNews.description}</Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={closeModal}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </SidebarWithHeader>
    );
}

export default NewsDashboard;
