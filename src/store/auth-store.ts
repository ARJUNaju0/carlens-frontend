import { create } from "zustand";

interface AuthStore {
    isLoggedIn: boolean;
    isInitialized: boolean;

    login: () => void;
    logout: () => void;
    initialize: () => void;
}

export const useAuthStore =
    create<AuthStore>((set) => ({
        isLoggedIn: false,
        isInitialized: false,

        login: () =>
            set({
                isLoggedIn: true,
            }),

        logout: () => {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            set({
                isLoggedIn: false,
            });
        },

        initialize: () => {
            const token =
                localStorage.getItem(
                    "access"
                );

            set({
                isLoggedIn: !!token,
                isInitialized: true,
            });
        },
    }));