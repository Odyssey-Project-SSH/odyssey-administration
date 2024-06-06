import React, { useEffect, useState } from 'react';
import Trips from '../dashboard/Trips.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import logo from '../../assets/odyssey-logo.png'
import { ImSpoonKnife } from "react-icons/im";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Divider
} from '@chakra-ui/react';
import {
    FiUsers,
    FiStar,
    FiMenu,
    FiBell,
    FiChevronDown,
    FiDribbble
} from 'react-icons/fi';
import { BsSignpostSplit } from "react-icons/bs";
import { GiJourney } from "react-icons/gi";
import { MdEventAvailable } from "react-icons/md";
import { BsSunglasses } from "react-icons/bs";
import { FaPlane, FaHotel } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import Users from '../dashboard/Users.jsx';
import Locations from '../dashboard/Locations.jsx'
import Events from '../dashboard/Events.jsx';
import Posts from '../dashboard/Posts.jsx';
import Activities from '../dashboard/Activities.jsx';
import News from '../dashboard/News.jsx';
import AdminProfile from '../profile/AdminProfile.jsx';
import Flights from '../dashboard/Flights.jsx';
import Items from '../dashboard/Items.jsx';
import Hotels from '../dashboard/Hotels.jsx';
import LocalCuisine from '../dashboard/LocalCuisine.jsx';

const LinkItems = [
    { name: 'Users', icon: FiUsers },
    { name: 'Posts', icon: BsSignpostSplit },
    { name: 'Locations', icon: IoLocationOutline },
    { name: 'Activities', icon: FiDribbble },
    { name: 'Events', icon: MdEventAvailable },
    { name: 'News', icon: FaRegNewspaper },
    { name: 'Trips', icon: GiJourney },
    { name: 'Flights', icon: FaPlane },
    { name: 'Hotels', icon: FaHotel },
    { name: 'Items', icon: BsSunglasses},
    { name: 'Local Cuisine', icon: ImSpoonKnife}
];

export default function SidebarWithHeader({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedContent, setSelectedContent] = useState('Users');

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                onSelectContent={setSelectedContent}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} onSelectContent={setSelectedContent} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {selectedContent === 'Users' && <Users />}
                {selectedContent === 'Locations' && <Locations />}
                {selectedContent === 'Posts' && <Posts />}
                {selectedContent === 'Activities' && <Activities/>}
                {selectedContent === 'Events' && <Events />}
                {selectedContent === 'News' && <News /> }
                {selectedContent === 'Trips' && <Trips />}
                {selectedContent === 'Profile' && <AdminProfile />}
                {selectedContent === 'Flights' && <Flights />}
                {selectedContent === 'Hotels' && <Hotels />}
                {selectedContent === 'Items' && <Items />}
                {selectedContent === 'Local Cuisine' && <LocalCuisine />}
                {children}
            </Box>
        </Box>
    );
}

const SidebarContent = ({ onClose, onSelectContent, ...rest }) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="3" justifyContent="left">
                <Image src={logo} boxSize='75px' />
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Odyssey
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} onClick={() => onSelectContent(link.name)}>
                    {link.name}
                </NavItem>
            ))}
            <Divider borderColor={'black.100'} w={'85%'} ml={4} my={1} />
            <NavItem key={'Profile'} icon={RiAdminLine} onClick={() => onSelectContent('Profile')}>
                Profile
            </NavItem>
        </Box>
    );
};

const NavItem = ({ icon, children, ...rest }) => {
    return (
        <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

const MobileNav = ({ onOpen, ...rest }) => {
    const {logOut, user} = useAuth();

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Logo
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={''}
                                    // src={`'${user?.avatar}'`}
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">{user?.username}</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        {user?.role}
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem onClick={logOut}>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
