"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { Shield } from "lucide-react";

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
        }
        catch (error: any) {
            console.error(error);

            if (error.response.status === 404) {

                router.push("/not-found");


            }

            else if (error.response.status === 400) {
                alert("Please enter a valid email and password.");
            }

            else if (error.response.status === 401) {
                alert("Invalid email or password.");
            }

            else if (error.response.status === 403) {
                alert("You don't have permission to access this resource.");

            }

            else if (error.response.status === 429) {
                alert("Too many login attempts. Please try again later.");
            }

            else if (error.response.status >= 500) {
                alert(
                    "Server error.\n\nPlease try again in a few minutes."
                );
            }
            else if (!error.response) {
                alert("Unable to connect to the server.\n\nPlease make sure the backend is running and try again.")

            }

            else {
                alert("Something went wrong.");
            }
        }
        finally {
            setLoading(false);
        }
    };
    function handleAdminLogin() {
        router.push("/admin");
    }

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
                <div className="flex justify-end mt-3">
                    <button
                        type="button"
                        onClick={handleAdminLogin}
                        className="
            flex
            items-center
            gap-2
            text-xs
            text-gray-500
            hover:text-blue-600
            transition
        "
                    >
                        <Shield size={14} />
                        Admin
                    </button>
                </div>


            </form>
        </div>
    );
}