import axios from 'axios';

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

const getAuthConfigWithMultipartFiles = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        'Content-Type': 'multipart/form-data'
    }
})

// GET REQUESTS

export const getUsers = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/users`,
            getAuthConfig()
        );
    }
    catch (e) {
        throw e;
    }
}

export const getUserByUsername = async (username) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/username/${username}`,
            getAuthConfig()
        );
    }
    catch (e) {
        throw e;
    }
}

export const getLocations = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/locations`
        );
    }
    catch (e) {
        throw e;
    }
}

export const getActivities = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/activities`
        );
    }
    catch (e) {
        throw e;
    }
}

export const getEvents = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/events`
        );
    }
    catch (e) {
        throw e;
    }
}

export const getNews = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/news`
        );
    }
    catch (e) {
        throw e;
    }
}

// DELETE REQUESTS

export const deleteUser = async (userId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${userId}`,
            getAuthConfig()
        );
    }
    catch (e) {
        throw e;
    }
}

export const deleteLocation = async (locationId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/locations/${locationId}`,
            getAuthConfig()
        );
    }
    catch (e) {
        throw e;
    }
}

export const deleteActivity = async (activityId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/activities/${activityId}`,
            getAuthConfig()
        );
    }
    catch (e) {
        throw e;
    }
}

export const deleteEvent = async (eventId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/events/${eventId}`,
            getAuthConfig()
        );
    }
    catch (e) {
        throw e;
    }
}

export const deleteNews = async (newsId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/news/${newsId}`,
            getAuthConfig()
        );
    }
    catch (e) {
        throw e;
    }
}

// POST REQUESTS

export const registerAdmin = async (admin) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/admin`,
            admin,
            getAuthConfig()
        );
    }
    catch (e) {
        throw e;
    }
}

export const registerLocation = async (location) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/locations`,
            location,
            getAuthConfigWithMultipartFiles()
        );
    }
    catch (e) {
        throw e;
    }
}

export const registerActivity = async (activity) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/activities`,
            activity,
            getAuthConfig()
        );
    }
    catch (e) {
        throw e;
    }
}

export const registerEvent = async (event) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/events`,
            event,
            getAuthConfigWithMultipartFiles()
        );
    }
    catch (e) {
        throw e;
    }
}

export const registerNews = async (news) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/news`,
            news,
            getAuthConfigWithMultipartFiles()
        );
    }
    catch (e) {
        throw e;
    }
}

// PUT REQUESTS
export const updateLocation = async (id, location) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/locations/${id}`,
            location,
            getAuthConfigWithMultipartFiles()
        );
    }
    catch (e) {
        throw e;
    }
}
export const updateActivity = async (id, activity) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/activities/${id}`,
            activity,
            getAuthConfig()
        );
    }
    catch (e) {
        throw e;
    }
}
export const updateEvent = async (id, event) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/events/${id}`,
            event,
            getAuthConfigWithMultipartFiles()
        );
    }
    catch (e) {
        throw e;
    }
}
export const updateNews = async (id, news) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/news/${id}`,
            news,
            getAuthConfigWithMultipartFiles()
        );
    }
    catch (e) {
        throw e;
    }
}

// AUTH REQUESTS

export const login = async (usernameAndPassword) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
            usernameAndPassword
        )
    }
    catch (e) {
        throw e;
    }
}