"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { User } from "@/types/User";

interface Favorite {
    id: number;
}

export default function ProfileDropdown() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);

    const logout = useAuthStore((state) => state.logout);

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            Promise.all([fetchProfile(), fetchFavorites()]).then(() => {
                setIsInitialized(true);
            });
        } else {
            setIsInitialized(true);
        }
    }, []);

    async function fetchProfile() {
        try {
            const response = await api.get("/accounts/profile/");
            setUser(response.data);
        } catch (error) {
            console.error("Profile Error:", error);
        }
    }

    async function fetchFavorites() {
        try {
            const response = await api.get("/cars/favorites/");
            setFavoriteCount(response.data.length);
        } catch (error) {
            console.error("Favorites Error:", error);
        }
    }

    function handleLogout() {
        logout();
        window.location.href = "/login";
    }

    if (!isInitialized) {
        return (
            <div className="h-10 w-40 bg-white/5 rounded-xl animate-pulse" />
        );
    }

    if (!user) {
        return (
            <button
                onClick={() => (window.location.href = "/login")}
                className="flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 rounded-xl hover:bg-white/10 transition text-white"
            >
                Login
            </button>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 rounded-xl hover:bg-white/10 transition text-white">
                👤 {user.username}
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-80 surface-contrast border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50">
                    {/* Header */}
                    <div className="p-5 bg-gradient-to-r from-blue-600 to-sky-500 text-white">
                        <h3 className="font-bold text-lg">{user.username}</h3>
                        <p className="text-sm text-blue-100">{user.email}</p>
                    </div>

                    {/* Stats */}
                    <div className="p-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border border-white/10 rounded-xl p-3">
                                <p className="text-xs text-muted">Favorites</p>
                                <p className="text-xl font-bold text-white">{favoriteCount}</p>
                            </div>

                            <div className="border border-white/10 rounded-xl p-3">
                                <p className="text-xs text-muted">Member Since</p>
                                <p className="text-sm font-medium text-muted">
                                    {new Date(user.date_joined).getFullYear()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="border-t">
                        <Link
                            href="/profile"
                            className="block px-5 py-3 hover:bg-white/10"
                            onClick={() => setOpen(false)}
                        >
                            My Profile
                        </Link>

                        <Link
                            href="/favorites"
                            className="block px-5 py-3 hover:bg-white/10"
                            onClick={() => setOpen(false)}
                        >
                            Favorite Cars
                        </Link>

                        <Link
                            href="/compare"
                            className="block px-5 py-3 hover:bg-white/10"
                            onClick={() => setOpen(false)}
                        >
                            Compare Cars
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-5 py-3 text-red-400 hover:text-red-300 hover:bg-white/10"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

