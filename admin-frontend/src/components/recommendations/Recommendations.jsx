import { useState, useRef } from 'react';
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Flex, Input, FormControl, FormLabel, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react'
import SidebarWithHeader from '../shared/SidebarWithHeader';

const Recommendations = () => {
    const [cards, setCards] = useState([
        {
            city: "Rome",
            image: "https://www.nationalgeographic.it/upload/ngi-hero/colosseum-daylight-rome-italy.jpg",
            description: "Rome, the “Eternal City,” brims with ancient history, from the Colosseum to the port of Ostia Antica to majestic Vatican City and the Sistine Chapel. Because of its history, and beauty – and perhaps its gelato and pasta! – Rome is one of our most popular cities.",
        },
        {
            city: "Amsterdam",
            image: "https://static.independent.co.uk/2021/10/08/17/iStock-516188849.jpg?width=1200&height=900&fit=crop",
            description: "Amsterdam, known for its artistic heritage, elaborate canal system, and narrow houses with gabled facades, is a delightful city. It's also famous for its museums, including the Van Gogh Museum, the Rijksmuseum, and the Anne Frank House.",
        },
        {
            city: "Berlin",
            image: "https://www.visitberlin.de/system/files/image/og_image.jpg",
            description: "Berlin, Germany’s capital, dates to the 13th century. Reminders of the city's turbulent 20th-century history include its Holocaust memorial and the Berlin Wall's graffitied remains. Divided during the Cold War, its 18th-century Brandenburg Gate has become a symbol of reunification.",
        }
    ]);

    const [newCard, setNewCard] = useState({
        city: "",
        image: "",
        description: ""
    });

    const [isEditing, setIsEditing] = useState(null);
    const [editedCard, setEditedCard] = useState({
        city: "",
        image: "",
        description: ""
    });

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const cancelRef = useRef();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCard({ ...newCard, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCard({ ...editedCard, [name]: value });
    };

    const addCard = () => {
        setCards([...cards, newCard]);
        setNewCard({
            city: "",
            image: "",
            description: "",
        });
    };

    const editCard = (index) => {
        setIsEditing(index);
        setEditedCard(cards[index]);
    };

    const saveCard = (index) => {
        const updatedCards = [...cards];
        updatedCards[index] = editedCard;
        setCards(updatedCards);
        setIsEditing(null);
        setEditedCard({
            city: "",
            image: "",
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
        const updatedCards = cards.filter((_, cardIndex) => cardIndex !== deleteIndex);
        setCards(updatedCards);
        closeDeleteDialog();
    };

    return (
        <SidebarWithHeader>
            
            <FormControl mb="4">
                <FormLabel>City</FormLabel>
                <Input
                    placeholder="City"
                    name="city"
                    value={newCard.city}
                    onChange={handleInputChange}
                />
                <FormLabel mt="2">Image URL</FormLabel>
                <Input
                    placeholder="Image URL"
                    name="image"
                    value={newCard.image}
                    onChange={handleInputChange}
                />
                <FormLabel mt="2">Description</FormLabel>
                <Input
                    placeholder="Description"
                    name="description"
                    value={newCard.description}
                    onChange={handleInputChange}
                />
                
                <Button mt="4" colorScheme='blue' onClick={addCard}>Add another card</Button>
            </FormControl>
            <Text>Other people's recommendations:</Text>

            <Flex wrap="wrap" spacing='4'>
                {cards.map((card, index) => (
                    <Card key={index} maxW='sm' m="2">
                        <CardBody>
                            {isEditing === index ? (
                                <>
                                    <Input
                                        placeholder="City"
                                        name="city"
                                        value={editedCard.city}
                                        onChange={handleEditInputChange}
                                        mb="2"
                                    />
                                    <Input
                                        placeholder="Image URL"
                                        name="image"
                                        value={editedCard.image}
                                        onChange={handleEditInputChange}
                                        mb="2"
                                    />
                                    <Input
                                        placeholder="Description"
                                        name="description"
                                        value={editedCard.description}
                                        onChange={handleEditInputChange}
                                        mb="2"
                                    />
                                </>
                            ) : (
                                <>
                                    <Image
                                        src={card.image}
                                        alt={`Image of ${card.city}`}
                                        borderRadius='lg'
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md'>{card.city}</Heading>
                                        <Text>
                                            {card.description}
                                        </Text>
                                    </Stack>
                                </>
                            )}
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                {isEditing === index ? (
                                    <Button variant='solid' colorScheme='blue' onClick={() => saveCard(index)}>
                                        Save
                                    </Button>
                                ) : (
                                    <Button variant='solid' colorScheme='blue' onClick={() => editCard(index)}>
                                        Edit
                                    </Button>
                                )}
                                <Button variant='ghost' colorScheme='red' onClick={() => openDeleteDialog(index)}>Delete</Button>
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
                            Delete Card
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this card? You can't undo this action afterwards.
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
        </SidebarWithHeader>
    );
}

export default Recommendations;
