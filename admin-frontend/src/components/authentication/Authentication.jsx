import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import {Formik, Form} from "formik";
import * as Yup from 'yup';
import {TextInput} from "../shared/FormComponents.jsx";
import { useAuth } from '../context/AuthContext';
import { errorNotification } from '../../services/notification';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const LoginForm = () => {

    const { login, isUserAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserAuthenticated()) {
            navigate("/dashboard");
        }
    });

    return (
        <Formik
            validateOnMount={true}
            validationSchema={
                Yup.object({
                    username: Yup.string().required("Username is required"),
                    password: Yup.string().max(30).required("Password is required")
                })
            }
            initialValues={{username: '', password: ''}}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
                login(values).then(res => {
                    navigate("/dashboard");
                    console.log("Successfully logged in");
                }).catch(err => {
                    errorNotification(
                        err.code,
                        err.message
                    )
                }).finally(() => {
                    setSubmitting(false);
                });
            }}
            >
            {({isValid, isSubmitting}) => (
                <Form>
                    <Stack spacing={5}>
                        <TextInput label={"Username"} name={"username"} type={"text"} placeholder={"johnsmith"} />
                        <TextInput label={"Password"} name={"password"} type={"password"} placeholder={"Type your password..."} />
                        <Button type="submit" disabled={!isValid || isSubmitting}>Login</Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}

const Authentication = () => {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Welcome back... ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <LoginForm />
                    </Stack>
                </Box>
            </Stack>
            </Flex>
      );
}

export default Authentication;