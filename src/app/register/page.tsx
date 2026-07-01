"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
        setLoading(true);

        await api.post(
            "/accounts/register/",
            formData
        );

        alert("Registration successful");

        router.push("/login");
        } catch (error: any) {
        console.error(error);
        alert("Registration failed");
        } finally {
        setLoading(false);
        }
    };

    return (
            <div className="max-w-md mx-auto mt-20">
            <h1 className="text-3xl font-bold mb-5">
                Register
        </h1>

        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <input
            type="text"
            name="username"
            placeholder="Username"
            className="border p-3 w-full"
            onChange={handleChange}
            />

            <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-3 w-full"
            onChange={handleChange}
            />

            <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-3 w-full"
            onChange={handleChange}
            />

                <button
                type="submit"
                disabled={loading}
                className="bg-black text-white p-3 w-full"
                >
            {loading
                ? "Creating..."
                : "Register"}
            </button>
        </form>
        </div>
    );
    }