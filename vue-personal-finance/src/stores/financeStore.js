import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import CookieHelper from "@/helper/cookie.js";
import {useAuthStore} from "@/stores/authStore.js";


export const useFinanceStore = defineStore('finance', () => {
    const url = 'http://localhost:8080/api/finance';
    const authStore = useAuthStore();
    const token =authStore.token ;

// category endpoint
    const getAllCategories = async () => {
        try {
            const response = await axios.get(`${url}/categories`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }});
            return response.data;
        } catch (error) {
            console.error('Error getting categories:', error);
            throw error;
        }
    }


    // Balances endpoints

    const getAllUserBalance = async (userId) => {
        try {
            const response = await axios.get(`${url}/balances/${userId}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }});

            return response.data ;
        } catch (error) {
            console.error('Error getting user balances:', error);
            throw error;
        }
    };

    const getBalanceById = async (id) => {
        try {
            const response = await axios.get(`${url}/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }});

            return response.data;
        } catch (error) {
            console.error('Error getting balance by id:', error);
            throw error;
        }
    };



    const calculateUserBudget = async (userId) => {
        try {
            const response = await axios.get(`${url}/total-budget/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            });
            return response.data;
        } catch (error) {
            console.error('Error calculating user budget:', error);
            throw error;
        }
    };

    // Expenses endpoints



    const getAllUserExpenses = async (userId) => {
        try {
            const response = await axios.get(`${url}/expenses/user/${userId}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }});
            return response.data;
        } catch (error) {
            console.error('Error getting user expenses:', error);
            throw error;
        }
    };

    const getExpensesById = async (id) => {
        try {
            const response = await axios.get(`${url}/expenses/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }});
            return response.data;
        } catch (error) {
            console.error('Error getting expenses by id:', error);
            throw error;
        }
    };


    const calculateUserExpensesByCategory = async (userId, category) => {
        try {
            const response = await axios.get(`${url}/expenses/total-expenses/${userId}/category/${category}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }});
            return response.data;
        } catch (error) {
            console.error('Error getting user category expenses:', error);
            throw error;
        }
    };



    const calculateUserExpenses = async ( userId) => {
        try {
            const response = await axios.get(`${url}/expenses/total-expenses/${userId}`, {
                headers:{
                    'Authorization': `Bearer ${token}`
                },

            });
            return response.data;
        } catch (error) {
            console.error('Error calculating user expenses:', error);
            throw error;
        }
    };

    const addBalance = async (newBalance) => {
        try {
            await axios.post(`${url}/`, newBalance,{
                headers: {
                    'Authorization': `Bearer ${token}`
                } });
        } catch (error) {
            console.error('Error adding balance:', error);
            throw error;
        }
    };

    const addExpenses = async (newExpenses) => {
        try {
            await axios.post(`${url}/expenses/`, newExpenses,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error adding expenses:', error);
            throw error;
        }
    };

    const updateBalance = async (id, updatedBalance) => {
        try {
            await axios.put(`${url}/${id}`, updatedBalance,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error updating balance:', error);
            throw error;
        }
    };

    const updateExpenses = async (id, updatedExpenses) => {
        try {
            await axios.put(`${url}/expenses/${id}`, updatedExpenses,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error updating expenses:', error);
            throw error;
        }
    };

    const deleteBalance = async (id) => {
        try {
            await axios.delete(`${url}/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error deleting balance:', error);
            throw error;
        }
    };

    const deleteExpenses = async (id) => {
        try {
            await axios.delete(`${url}/expenses/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error deleting expenses:', error);
            throw error;
        }
    };



    return {
        getAllCategories,
        getAllUserBalance,
        getBalanceById,
        calculateUserBudget,
        getAllUserExpenses,
        getExpensesById,
        calculateUserExpensesByCategory,
        calculateUserExpenses,
        addBalance,
        addExpenses,
        updateBalance,
        updateExpenses,
        deleteBalance,
        deleteExpenses

    };
});




