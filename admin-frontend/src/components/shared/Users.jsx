import React from 'react';
import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Divider,
  VStack,
  HStack,
} from '@chakra-ui/react';

const Users = () => {
  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Users Content</Text>
      <Text mb={8}>This is the content for the Users page.</Text>
      <VStack align="start" spacing={8}>
        <Section title="Profile">
          <CardSection>Profile</CardSection>
          <CardSection>Edit Profile</CardSection>
          <CardSection>Change Password</CardSection>
          <CardSection>Logout</CardSection>
        </Section>
        <Section title="My Trips">
          <CardSection>Upcoming Trips</CardSection>
          <CardSection>Past Trips</CardSection>
          <CardSection>Cancelled Trips</CardSection>
        </Section>
        <Section title="Bookings">
          <CardSection>Flights</CardSection>
          <CardSection>Hotels</CardSection>
          <CardSection>Car Rentals</CardSection>
          <CardSection>Activities & Tours</CardSection>
        </Section>
        <Section title="Wishlist">
          <CardSection>Saved Destinations</CardSection>
          <CardSection>Saved Itineraries</CardSection>
        </Section>
        <Section title="Travel Planner">
          <CardSection>Create New Trip</CardSection>
          <CardSection>Itinerary Planner</CardSection>
          <CardSection>Budget Tracker</CardSection>
        </Section>
        <Section title="Notifications">
          <CardSection>Travel Alerts</CardSection>
          <CardSection>Price Alerts</CardSection>
          <CardSection>Messages</CardSection>
        </Section>
        <Section title="Rewards and Offers">
          <CardSection>Reward Points</CardSection>
          <CardSection>Special Offers</CardSection>
          <CardSection>Redeem Points</CardSection>
        </Section>
        <Section title="Support">
          <CardSection>Contact Support</CardSection>
          <CardSection>FAQs</CardSection>
          <CardSection>Travel Insurance</CardSection>
        </Section>
        <Section title="Preferences">
          <CardSection>Language Settings</CardSection>
          <CardSection>Currency Settings</CardSection>
          <CardSection>Notification Preferences</CardSection>
        </Section>
        <Section title="Community">
          <CardSection>Travel Blog</CardSection>
          <CardSection>User Reviews</CardSection>
          <CardSection>Travel Forums</CardSection>
        </Section>
      </VStack>
    </Box>
  );
};

const Section = ({ title, children }) => (
  <Box w="100%">
    <Heading size="md" mb={2}>{title}</Heading>
    <HStack align="start" spacing={4} wrap="wrap">
      {children}
    </HStack>
    <Divider my={4} />
  </Box>
);

const CardSection = ({ children }) => (
  <Center py={2}>
    <Box
      maxW={'270px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}>
      <Box p={6}>
        <Stack spacing={0} align={'center'} mb={5}>
          <Heading fontSize={'md'} fontWeight={500} fontFamily={'body'}>
            {children}
          </Heading>
        </Stack>
        <Button
          w={'full'}
          mt={4}
          bg={useColorModeValue('#151f21', 'gray.900')}
          color={'white'}
          rounded={'md'}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}>
          View Details
        </Button>
      </Box>
    </Box>
  </Center>
);

export default Users;
