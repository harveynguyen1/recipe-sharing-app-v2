import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        role: localStorage.getItem('accessLevel') || null,
    }),
    actions: {
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
});