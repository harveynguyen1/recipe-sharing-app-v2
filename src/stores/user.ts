import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        role: localStorage.getItem('accessLevel') || null,
        userId: localStorage.getItem('userId') || sessionStorage.getItem('userId') || null, // To store user ID
        username: localStorage.getItem('username') || '', // Retrieve username from localStorage
    }),
    actions: {
        setUser(token: string, role: string, userId: string, username: string, rememberMe: boolean) {
            this.token = token;
            this.role = role;
            this.userId = userId;
            this.username = username;
            // Store token and userId based on "Remember Me" selection
            if (rememberMe) {
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                localStorage.setItem('username', username);
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('username');
                localStorage.removeItem('rememberMe');

            }
        },
        clearUser() {
            this.token = null;
            this.role = null;
            this.userId = null;
            if (localStorage.getItem('rememberMe') !== 'true') {
                // Clear username if Remember Me wasn't selected
                localStorage.removeItem('username');
            }

            // Remove from storage
            localStorage.removeItem('token');
            localStorage.removeItem('userId');

        },

        login(token, role) {
            this.token = token;
            this.role = role;
            localStorage.setItem('token', token);
            localStorage.setItem('accessLevel', role);
        },
        logout() {
            this.token = null;
            this.role = null;
            localStorage.removeItem('token');
            localStorage.removeItem('accessLevel');
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token, // Check if user is authenticated
        isAdmin: (state) => state.role === 'admin', // Check if user is admin
        isWriter: (state) => state.role === 'write', // Check if user is writer
        isReader: (state) => state.role === 'read', // Check if user is reader
    }
});