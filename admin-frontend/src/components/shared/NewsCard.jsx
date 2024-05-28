import {
    Card,
    Image,
    Stack,
    CardBody,
    Heading,
    Text,
    CardFooter,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Divider,
    ModalFooter, 
    Drawer,
    DrawerOverlay,
	DrawerContent, 
	DrawerCloseButton, 
	DrawerHeader, 
	DrawerBody,
    Box,
} from '@chakra-ui/react';
import { Formik, Form} from 'formik';
import {successNotification, errorNotification} from '../../services/notification.js';
import { useState } from 'react';
import { updateNews, deleteNews } from '../../services/client';
import { newsUpdateFormValidation } from '../../services/validation.js';
import {TextInput, FileInput} from "../shared/FormComponents.jsx";


const NewsUpdateForm = ({ id, title, description, fetchNews, onClose }) => {
    return (
        <>
            <Formik
            validateOnMount={true}
            validationSchema={newsUpdateFormValidation}
            initialValues={{ title: title, description: description, file: null }}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
                updateNews(id, values).then(res => {
                    successNotification("Success", "Successfully updated news!");
                    fetchNews();
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
						<TextInput label={"Title"} name={"title"} type={"text"} placeholder={"Title..."} />
                        <TextInput label={"Description"} name={"description"} type={"textarea"} placeholder={"Description..."} />
						<FileInput label="Picture" name="file" type="file" />
						<Button type="submit" colorScheme={'cyan'} color={'white'} disabled={!isValid || isSubmitting}>Update</Button>
                    </Stack>
                </Form>
            )}
        </Formik>
        </>
    );
}

const ConfirmationModal = ({id, isOpen, onClose, fetchNews}) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Confirmation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>Are you sure you want to delete this news?</Text>
            </ModalBody>
            <Divider />
            <ModalFooter>
                <Button
                    bg={'grey.400'}
                    color={'white'}
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg'
                    }}
                    _focus={{
                        bg: 'green.500'
                    }}
                    onClick={() => {
                        onClose(true);
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
                            deleteNews(id).then(res => {
                                successNotification("News deleted!", `News was successfully deleted!`);
                                fetchNews();
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
)

const NewsCard = ({ id, author, title, description, picture, fetchNews }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const onClose = () => {
		setIsOpen(false);
	};
    const onOpen = () => {
		setIsOpen(true);
	};
    const onCloseDrawer = () => {
        setIsOpenDrawer(false);
    }
    const onOpenDrawer = () => {
        setIsOpenDrawer(true);
    }

    return (
        <>
            <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline' w='100%' mb="4">
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={picture}
                    alt={title}
                />

                <Stack>
                    <CardBody>
                        <Heading size='md'>{title}</Heading>
                        <Text size='sm'><i>By: @{author}</i></Text>
                        <Divider my={3} />
                        <Text py='2'>
                            {description}
                        </Text>
                    </CardBody>

                    <CardFooter>
                        <Button 
                            mr='3' variant='solid' colorScheme='blue' 
                        onClick={() => onOpenDrawer(true)}
                        >
                            Update News
                        </Button>
                        <Button 
                            variant='solid' colorScheme='red' 
                            onClick={() => {
                                onOpen(true);
                            }}
                        >
                            Delete News
                        </Button>
                    </CardFooter>
                </Stack>
            </Card>
            <ConfirmationModal
                id={id}
                isOpen={isOpen}
                onClose={onClose}
                fetchNews={fetchNews}
            />
            <Drawer onClose={onCloseDrawer} isOpen={isOpenDrawer} size={'lg'}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Update NEWS</DrawerHeader>
					<Divider />
					<DrawerBody mt={2}>
						<Stack spacing={4}>
                            <NewsUpdateForm 
                                id={id}
                                title={title} 
                                description={description}
                                onClose={onCloseDrawer}
                                fetchNews={fetchNews}
                            />
						</Stack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
        </> 
    );
}

export default NewsCard;