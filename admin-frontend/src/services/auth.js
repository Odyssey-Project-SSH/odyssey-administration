import { jwtDecode } from 'jwt-decode';
import { getUserByUsername } from './client';
import { errorNotification } from './notification';

export const getAuthenticatedUser = () => {
    const token = localStorage.getItem("access_token");
    const decodedToken = jwtDecode(token);
    return decodedToken.sub;
}

export const getAuthenticatedUserId = () => {
    const username = getAuthenticatedUser();
    
}