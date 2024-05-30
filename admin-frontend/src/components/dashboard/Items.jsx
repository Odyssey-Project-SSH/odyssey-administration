import {
    Spinner,
    Text,
    Button,
    Stack,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Divider,
    VStack,
    SimpleGrid
} from '@chakra-ui/react';
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getItems, registerItem } from "../../services/client";
import { Form, Formik } from 'formik';
import { TextInput } from '../shared/FormComponents';
import { itemRegistrationFormValidation } from '../../services/validation';
import {successNotification, errorNotification} from '../../services/notification.js';
import ItemCard from '../shared/ItemCard.jsx';

const Items = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        setLoading(true);
        getItems().then(res => {
            setItems(res.data);
        }).catch(err => {
            console.log(err);
        }).finally(setLoading(false));
    }

    const ItemModal = () => (
        <Modal isOpen={isOpen} onClose={onClose}> 
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Item Registration</ModalHeader>
            
                <ModalBody>
                    <Formik
                        validateOnMount={true}
                        validationSchema={ itemRegistrationFormValidation }
                        initialValues={{name: ''}}
                        onSubmit={(values, {setSubmitting}) => {
                            setSubmitting(true);
                            registerItem(values).then(res => {
                                successNotification("Success", "Item was successfully added!");
                                fetchItems();
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
                                    <TextInput label={"Item Name"} name={"name"} type={"text"} placeholder={"Item..."} />
                                    <Button type="submit" colorScheme={"green"} color="white" disabled={!isValid || isSubmitting} w="50%" my={3}>Register</Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    );

    if (loading) {
		return <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
	}

    return (
        <>
            <Text fontSize="3xl" mb={4} fontWeight="bold">Items Dashboard</Text>
            <Button
                colorScheme='blue'
                mb={4}
                leftIcon={<FaPlus />}
                onClick={onOpen}
            >
                ADD ITEM
            </Button>
            <ItemModal />
            <VStack align="start" spacing={4} w="100%">
                <SimpleGrid columns={[1, 2, 3]} spacing={4} w="100%">
                    { items.map(item => (
                        <ItemCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            fetchItems={fetchItems}
                        />
                    )) }
                </SimpleGrid>
            </VStack>
        </>
    );
}

export default Items;