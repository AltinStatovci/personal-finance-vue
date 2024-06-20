import { defineStore } from 'pinia';
import { ref } from 'vue';
import client from "@/helper/client.js";

export const useUserStore = defineStore('user', () => {

    const user = ref(null);
    const users = ref([]);

    // Method to update a user by ID
    const updateUser = async (userId, updatedUserData) => {
        try {
            await client.put(`finance/user/${userId}`, updatedUserData);

        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    };

    // Method to delete a user by ID
    const deleteUser = async (userId) => {
        try {
            await client.delete(`finance/user/${userId}`);
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    };

    // Method to get all users
    const getUsers = async () => {
        try {
            const response = await client.get(`finance/user/`);
            users.value = response.data;
            return users;
        } catch (error) {
            console.error('Error getting users:', error);
            throw error;
        }
    };

    // Method to get a user by ID
    const getUserById = async (userId) => {
        try {
            const response = await client.get(`finance/user/${userId}`);
            const userData = response.data;

            const fetchedUser = {
                id: userData.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password,
                role: userData.role
            };

            user.value = fetchedUser; // store the user in the ref if needed

            return fetchedUser; // return the direct object
        } catch (err) {
            console.error('Error fetching user:', err);
            return null;
        }
    };


    const checkOldPassword = async (userId, rawPassword) => {
        try {
            const response = await client.post(`finance/user/check-password`, {
                id: userId,
                rawPassword: rawPassword
            });
            return response.data;
        } catch (error) {
            console.error('Error checking old password:', error);
            throw error;
        }
    };

    return {
        user,
        users,
        updateUser,
        deleteUser,
        getUsers,
        getUserById,
        checkOldPassword
    };
});

