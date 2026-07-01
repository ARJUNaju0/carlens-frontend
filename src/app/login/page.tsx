"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
    const loginStore = useAuthStore((state) => state.login);

    const router = useRouter();

    const [email, setEmail] = useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
        setLoading(true);

        const response = await api.post(
            "/accounts/login/",
            {
            email,
            password,
            }
        );

        localStorage.setItem(
            "access",
            response.data.access
        );

        localStorage.setItem(
            "refresh",
            response.data.refresh
        );
        loginStore();

        router.push("/cars");
        } catch (error: any) {
        console.error(error);
        alert("Invalid credentials");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20">
        <h1 className="text-3xl font-bold mb-5">
            Login
        </h1>

        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <input
            type="email"
            placeholder="Email"
            className="border p-3 w-full"
            value={email}
            onChange={(e) =>
                setEmail(e.target.value)
            }
            />

            <input
            type="password"
            placeholder="Password"
            className="border p-3 w-full"
            value={password}
            onChange={(e) =>
                setPassword(e.target.value)
            }
            />

            <button
            type="submit"
            disabled={loading}
            className="bg-black text-white p-3 w-full"
            >
            {loading
                ? "Signing In..."
                : "Login"}
            </button>
        </form>
        </div>
    );
    }