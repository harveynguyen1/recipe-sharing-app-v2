import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        role: localStorage.getItem('accessLevel') || null,
        userId: localStorage.getItem('userId') || sessionStorage.getItem('userId') || null, // To store user ID
    }),
    actions: {
        setUser(token: string, role: string, userId: string, rememberMe: boolean) {
            this.token = token;
            this.role = role;
            this.userId = userId;

            // Store token and userId based on "Remember Me" selection
            if (rememberMe) {
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
            } else {
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('userId', userId);
            }
        },
        clearUser() {
            this.token = null;
            this.role = null;
            this.userId = null;

            // Remove from storage
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userId');
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