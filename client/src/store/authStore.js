// store/authStore.js
// Authentication State Management using Zustand

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login, logout, getCurrentUser } from '@/services/auth.service';

const useAuthStore = create(
    persist(
        (set, get) => ({
            // State
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            // Actions

            /**
             * Login user
             */
            login: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await login(credentials);
                    set({
                        user: response.user || response.data,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                    return response;
                } catch (error) {
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: error.message || 'Login failed',
                    });
                    throw error;
                }
            },

            /**
             * Logout user
             */
            logout: async () => {
                set({ isLoading: true });
                try {
                    await logout();
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: null,
                    });
                } catch (error) {
                    set({ isLoading: false, error: error.message });
                    // Still clear local state even if API call fails
                    set({ user: null, isAuthenticated: false });
                    throw error;
                }
            },

            /**
             * Get current user (verify authentication)
             */
            getCurrentUser: async () => {
                set({ isLoading: true });
                try {
                    const response = await getCurrentUser();
                    set({
                        user: response.user || response.data,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                    return response;
                } catch (error) {
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: error.message,
                    });
                    throw error;
                }
            },

            /**
             * Clear error
             */
            clearError: () => {
                set({ error: null });
            },

            /**
             * Set user manually (for signup)
             */
            setUser: (user) => {
                set({ user, isAuthenticated: true });
            },
        }),
        {
            name: 'auth-storage', // name of item in localStorage
            partialize: (state) => ({
                // Only persist user and isAuthenticated
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export default useAuthStore;
