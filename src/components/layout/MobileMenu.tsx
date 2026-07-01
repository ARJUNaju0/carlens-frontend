"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";

export default function MobileMenu() {
    const [open, setOpen] = useState(false);

    const isLoggedIn = useAuthStore(
        (state) => state.isLoggedIn
    );

    const logout = useAuthStore(
        (state) => state.logout
    );

    const handleLogout = () => {
        logout();
        setOpen(false);
        window.location.href = "/login";
    };

    return (
        <div className="md:hidden">

            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="text-2xl font-bold rounded-md border border-white/15 bg-white/10 px-3 py-2 text-white shadow-md shadow-black/20 transition hover:bg-white/15"
                aria-label="Open mobile menu"
            >
                ☰
            </button>

            {open && (
                <>
                    {/* Backdrop */}

                    <div
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={() => setOpen(false)}
                    />

                    {/* Menu */}

                    <div className="absolute top-16 left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/15 shadow-2xl z-50">

                        <div className="flex flex-col gap-1 p-4 text-sm text-white">

                            <Link
                                href="/"
                                className="block rounded-xl px-3 py-3 border-b border-white/10 hover:bg-white/10 transition"
                                onClick={() => setOpen(false)}
                            >
                                Home
                            </Link>

                            <Link
                                href="/cars"
                                className="block rounded-xl px-3 py-3 border-b border-white/10 hover:bg-white/10 transition"
                                onClick={() => setOpen(false)}
                            >
                                Search Cars
                            </Link>

                            <Link
                                href="/compare"
                                className="block rounded-xl px-3 py-3 border-b border-white/10 hover:bg-white/10 transition"
                                onClick={() => setOpen(false)}
                            >
                                Compare Cars
                            </Link>

                            {isLoggedIn ? (
                                <>
                                    <Link
                                        href="/profile"
                                        className="block rounded-xl px-3 py-3 border-b border-white/10 hover:bg-white/10 transition"
                                        onClick={() => setOpen(false)}
                                    >
                                        Profile
                                    </Link>

                                    <Link
                                        href="/favorites"
                                        className="block rounded-xl px-3 py-3 border-b border-white/10 hover:bg-white/10 transition"
                                        onClick={() => setOpen(false)}
                                    >
                                        Favorites
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="block w-full rounded-xl px-3 py-3 text-left text-red-400 transition hover:text-red-300 hover:bg-white/10"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="block rounded-xl px-3 py-3 border-b border-white/10 hover:bg-white/10 transition"
                                        onClick={() => setOpen(false)}
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/register"
                                        className="block rounded-xl px-3 py-3 hover:bg-white/10 transition"
                                        onClick={() => setOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </>
                            )}

                        </div>

                    </div>
                </>
            )}

        </div>
    );
}