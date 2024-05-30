import { 
    HStack, 
    Spacer, 
    useDisclosure,
    Card,
    CardBody,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Divider,
} from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteItem } from "../../services/client";
import {successNotification, errorNotification} from '../../services/notification.js';

const ItemCard = ({id, name, fetchItems}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const ItemCardModal = () => (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirmation</ModalHeader>
                <ModalBody>
                    <Text fontSize="lg">Are you sure you want to delete this item?</Text>
                </ModalBody>
                <Divider />
                <ModalFooter>
                    <Button
                        ml={4}
                        bg={'gray.400'}
                        color={'white'}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg'
                        }}
                        _focus={{
                            bg: 'gray.500'
                        }}
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                            ml={4}
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
                                deleteItem(id).then(res => {
                                    successNotification("Item deleted!", `${name} was successfully deleted!`);
                                    fetchItems();
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
            <Card>
                <CardBody>
                    <HStack>
                        <Text fontSize="lg" color="grey">{id}</Text>
                        <Text fontSize="md">{name}</Text>
                        <Spacer />
                        <Button
                            onClick={onOpen}
                            colorScheme="red"
                        >
                            <FaRegTrashAlt />
                        </Button>
                    </HStack>
                    
                </CardBody>
            </Card>
            <ItemCardModal />
        </>
    );
}

export default ItemCard;