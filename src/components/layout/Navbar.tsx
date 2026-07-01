"use client";

import Link from "next/link";
import { useEffect } from "react";

import MobileMenu from "./MobileMenu";
import ProfileDropdown from "./ProfileDropdown";
import { useAuthStore } from "@/store/auth-store";

export default function Navbar() {
    const isLoggedIn = useAuthStore(
    (state) => state.isLoggedIn
    );

    const isInitialized = useAuthStore(
        (state) => state.isInitialized
    );

    const initialize = useAuthStore(
        (state) => state.initialize
    );

    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">

                {/* Logo */}

                <Link
                    href="/"
                    className="flex items-center gap-2"
                >
                    <span className="text-2xl font-bold">
                        CarLens
                    </span>

                    <span className="bg-black text-white text-xs px-2 py-1 rounded">
                        AI
                    </span>
                </Link>

                {/* Desktop Navigation */}

                <nav className="hidden md:flex items-center gap-8">

                    <Link
                        href="/"
                        className="hover:text-gray-600 transition"
                    >
                        Home
                    </Link>

                    <Link
                        href="/cars"
                        className="hover:text-gray-600 transition"
                    >
                        Search Cars
                    </Link>

                    <Link
                        href="/compare"
                        className="hover:text-gray-600 transition"
                    >
                        Compare
                    </Link>

                </nav>

                {/* Right Side */}

                <div className="flex items-center gap-3">

                    {/* Desktop Auth */}

                    <div className="hidden md:flex items-center gap-3">
                    

                        {!isInitialized ? (
                            <div className="w-24 h-10" />
                        ) : isLoggedIn ? (
                            <ProfileDropdown />
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-4 py-2"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="
                                        px-4
                                        py-2
                                        bg-black
                                        text-white
                                        rounded-lg
                                    "
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}

                    </div>

                    {/* Mobile Menu */}

                    <MobileMenu />

                </div>

            </div>
        </header>
    );
}