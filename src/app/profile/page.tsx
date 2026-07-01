"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

interface User {
    username: string;
    email: string;
    date_joined: string;
}

export default function ProfilePage() {
    const router = useRouter();

    const logout = useAuthStore(
        (state) => state.logout
    );

    const [user, setUser] =
        useState<User | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        try {
            const response =
                await api.get(
                    "/accounts/profile/"
                );

            setUser(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        logout();
        router.push("/login");
    }

    if (loading) {
        return (
            <main className="max-w-3xl mx-auto px-4 py-20">
                <p className="text-center text-muted">
                    Loading profile...
                </p>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="max-w-3xl mx-auto px-4 py-20">
                <p className="text-center text-red-400">
                    Failed to load profile. no user found
                </p>
            </main>
        );
    }

    return (
        <main className="min-h-screen">

            <div className="max-w-3xl mx-auto px-4 py-16">

                <div className="card p-8">
                    {/* Avatar */}

                    <div className="flex flex-col items-center">

                        <div
                            className="
                                h-24
                                w-24
                                rounded-full
                                bg-blue-600
                                text-white
                                flex
                                items-center
                                justify-center
                                text-3xl
                                font-bold
                            "
                        >
                            {user.username
                                ?.charAt(0)
                                .toUpperCase()}
                        </div>

                        <h1 className="mt-4 text-3xl font-bold">
                            {user.username}
                        </h1>

                        <p className="text-muted mt-1">
                            {user.email}
                        </p>

                    </div>

                    {/* Account Details */}

                    <div className="mt-10 border-t pt-8">

                        <h2 className="font-semibold text-lg mb-6">
                            Account Information
                        </h2>

                        <div className="space-y-5">

                            <div>
                                <p className="text-sm text-muted">
                                    Username
                                </p>

                                <p className="font-medium text-foreground">
                                    {user.username}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted">
                                    Email
                                </p>

                                <p className="font-medium text-foreground">
                                    {user.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted">
                                    Member Since
                                </p>

                                <p className="font-medium text-foreground">
                                    {new Date(
                                        user.date_joined
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Quick Actions */}

                    <div className="mt-10 flex flex-col sm:flex-row gap-3">

                        <button
                            onClick={() =>
                                router.push(
                                    "/favorites"
                                )
                            }
                            className="btn-secondary flex-1"
                        >
                            Favorites
                        </button>

                        <button
                            onClick={() =>
                                router.push(
                                    "/compare"
                                )
                            }
                            className="btn-secondary flex-1"
                        >
                            Compare Cars
                        </button>

                        <button
                            onClick={handleLogout}
                            className="btn-primary flex-1"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </main>
    );
}