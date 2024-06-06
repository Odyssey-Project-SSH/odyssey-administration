import { 
    Avatar,
    Center,
    Box,
    Stack,
    useColorModeValue,
    Heading,
    Text,
    Image,
    Divider,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalFooter,
    ModalBody,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { deletePost } from "../../services/client";
import { successNotification, errorNotification } from '../../services/notification.js';


const PostCard = ({post, fetchPosts}) => {

    const {isOpen, onOpen, onClose} = useDisclosure();

    const ConfirmationModal = () => (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirmation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Are you sure you want to delete this post?</Text>
                </ModalBody>
                <Divider />
                <ModalFooter>
                    <Button
                        bg={'grey'}
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
                                deletePost(post.id).then(res => {
                                    successNotification("Post deleted!", `Post was successfully deleted!`);
                                    fetchPosts();
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

    return (
        <>
            <Center py={6}>
                <Box
                    maxW={'445px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    p={6}
                    overflow={'hidden'}>
                    <Box
                        h={'210px'}
                        bg={'gray.100'}
                        mt={-6}
                        mx={-6}
                        mb={6}
                        pos={'relative'}
                    >
                        <Image
                            src={post.image}
                            layout={'fill'}
                        />
                    </Box>
                    <Stack>
                        <Text
                            color={'green.500'}
                            textTransform={'uppercase'}
                            fontWeight={800}
                            fontSize={'sm'}
                            letterSpacing={1.1}>
                            POST
                        </Text>
                        <Heading
                            color={useColorModeValue('gray.700', 'white')}
                            fontSize={'2xl'}
                            fontFamily={'body'}>
                            Trip - #{post.tripDto.id}
                        </Heading>
                        <Text color={'gray.500'}>
                            {post.text}
                        </Text>
                    </Stack>
                    <Stack my={6} direction={'row'} spacing={4} align={'center'}>
                        <Avatar
                            src={post.userDto.avatar}
                            alt={'Author'}
                        />
                        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                            <Text fontWeight={600}>{post.userDto.fullname} - @{post.userDto.username}</Text>
                            <Text color={'gray.500'}>{format(post.postedTime, 'Pp')}</Text>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack mt={6}>
                        <Button
                            variant='solid' colorScheme='red' 
                            onClick={() => {
                                onOpen(true);
                            }}
                        >
                            Delete Post
                        </Button>
                    </Stack>
                </Box>
            </Center>
            <ConfirmationModal />
        </>
    );
}
export default PostCard;