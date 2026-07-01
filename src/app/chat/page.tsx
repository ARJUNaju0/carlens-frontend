"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
    AlertCircle,
    Bot,
    Car,
    ExternalLink,
    Loader2,
    RefreshCcw,
    Send,
    Sparkles,
} from "lucide-react";

import api from "@/lib/api";
import { Car as CarType } from "@/types/Car";

type ChatMessage = {
    id: number;
    role: "user" | "assistant";
    text: string;
};

type ChatCar = Partial<CarType> & {
    id: string | number;
    model_year?: number;
    km_driven?: number;
    kms_driven?: number;
    location?: string;
    platform?: string;
    marketplace?: string;
    url?: string;
    source_url?: string;
};

const starterMessage =
    "Hi, I am CarLens AI. Tell me your budget, city, preferred body style, fuel type, or must-have features, and I will shortlist used cars that fit.";

const promptIdeas = [
    "Automatic cars under 8 lakh in Kochi",
    "Family SUV with petrol engine and low kilometres",
    "Best first car under 5 lakh",
    "Diesel sedan with service history",
];

function formatPrice(price?: number) {
    if (!price) return "Price on request";

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(price));
}

function getYear(car: ChatCar) {
    return car.manufacture_year || car.model_year || "Year N/A";
}

function getKilometres(car: ChatCar) {
    const value = car.kms_driven || car.km_driven;

    if (!value) return "KM N/A";

    return `${Number(value).toLocaleString("en-IN")} km`;
}

function getLocation(car: ChatCar) {
    return car.city || car.location || "Location N/A";
}

function getMarketplace(car: ChatCar) {
    return car.marketplace || car.platform || "Marketplace";
}

export default function ChatPage() {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
        {
            id: 1,
            role: "assistant",
            text: starterMessage,
        },
    ]);
    const [matchedCars, setMatchedCars] = useState<ChatCar[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [chatHistory, loading]);

    async function handleSendMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const userMessage = message.trim();

        if (!userMessage || loading) return;

        setChatHistory((current) => [
            ...current,
            {
                id: Date.now(),
                role: "user",
                text: userMessage,
            },
        ]);
        setMessage("");
        setLoading(true);
        setError(null);

        try {
            const response = await api.post("/ai/chat/", {
                message: userMessage,
            });

            const cars = response.data.cars_found || response.data.cars || [];
            const reply =
                response.data.reply ||
                response.data.message ||
                (cars.length
                    ? `I found ${cars.length} matching car${cars.length === 1 ? "" : "s"}. The best options are ready on the right.`
                    : "I could not find an exact match yet. Try changing the budget, city, fuel type, or model preference.");

            setMatchedCars(cars);
            setChatHistory((current) => [
                ...current,
                {
                    id: Date.now() + 1,
                    role: "assistant",
                    text: reply,
                },
            ]);
        } catch (caughtError) {
            console.error(caughtError);
            setError(
                "I could not reach the AI search service. Please check that the backend is running and try again."
            );
        } finally {
            setLoading(false);
        }
    }

    function resetChat() {
        setMessage("");
        setMatchedCars([]);
        setError(null);
        setChatHistory([
            {
                id: 1,
                role: "assistant",
                text: starterMessage,
            },
        ]);
    }

    return (
        <main className="min-h-screen">
            <section className="border-b navbar-blur">
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full marketplace-badge px-4 py-2 text-sm font-medium">
                                <Sparkles className="h-4 w-4" />
                                AI car search
                            </div>

                            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
                                Find the right used car by chatting naturally.
                            </h1>

                            <p className="mt-4 max-w-2xl text-muted">
                                Ask for cars by budget, city, fuel type,
                                transmission, family needs, or ownership
                                preferences.
                            </p>
                        </div>

                        <button type="button" onClick={resetChat} className="btn-secondary">
                            <RefreshCcw className="h-4 w-4" />
                            New search
                        </button>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
                <div className="flex min-h-[720px] flex-col overflow-hidden rounded-3xl card">
                    <div className="flex items-center justify-between border-b px-5 py-4">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white">
                                <Bot className="h-5 w-5" />
                            </span>
                            <div>
                                <h2 className="font-bold">
                                    CarLens Assistant
                                </h2>
                                <p className="text-sm text-muted">
                                    Budget, model and city aware
                                </p>
                            </div>
                        </div>

                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                            Online
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto px-5 py-6">
                        <div className="space-y-5">
                            {chatHistory.map((chat) => (
                                <div
                                    key={chat.id}
                                    className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[82%] rounded-3xl px-4 py-3 text-sm leading-6 ${
                                            chat.role === "user"
                                                ? "bg-black text-white"
                                                : "border border-gray-200 bg-gray-50 text-gray-800"
                                        }`}
                                    >
                                        {chat.text}
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="flex justify-start">
                                    <div className="inline-flex items-center gap-2 rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Searching inventory...
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <div ref={chatEndRef} />
                        </div>
                    </div>

                    <div className="border-t border-gray-200 bg-white p-5">
                        <div className="mb-4 flex flex-wrap gap-2">
                            {promptIdeas.map((prompt) => (
                                <button
                                    key={prompt}
                                    type="button"
                                    onClick={() => setMessage(prompt)}
                                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-gray-300 hover:bg-white"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>

                        <form
                            onSubmit={handleSendMessage}
                            className="flex gap-3"
                        >
                            <input
                                type="text"
                                value={message}
                                onChange={(event) =>
                                    setMessage(event.target.value)
                                }
                                disabled={loading}
                                placeholder="Example: I need an automatic hatchback under 7 lakh in Bangalore"
                                className="min-w-0 flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white disabled:opacity-60"
                            />

                            <button
                                type="submit"
                                disabled={loading || !message.trim()}
                                className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Send message"
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </form>
                    </div>
                </div>

                <aside className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-4">
                        <div>
                            <h2 className="font-bold">
                                Matching Cars
                            </h2>
                            <p className="text-sm text-muted">
                                Shortlisted from your chat
                            </p>
                        </div>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                            {matchedCars.length}
                        </span>
                    </div>

                    {matchedCars.length === 0 ? (
                        <div className="flex min-h-[520px] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50 px-6 text-center">
                            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-gray-500 shadow-sm">
                                <Car className="h-7 w-7" />
                            </span>
                            <h3 className="font-bold">
                                No cars selected yet
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-muted">
                                Start with your budget, city, and a few
                                preferences. Matching cars will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {matchedCars.map((car) => {
                                const detailUrl = `/cars/${car.id}`;
                                const sourceUrl = car.source_url || car.url;

                                return (
                                    <article
                                        key={car.id}
                                        className="rounded-3xl border border-gray-200 p-4 transition hover:border-gray-300 hover:shadow-md"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                                                {getMarketplace(car)}
                                            </span>
                                            <span className="text-right text-xs font-medium text-gray-500">
                                                {getLocation(car)}
                                            </span>
                                        </div>

                                        <h3 className="mt-3 line-clamp-2 text-lg font-bold text-gray-950">
                                            {car.title ||
                                                `${car.brand || "Used"} ${car.model || "Car"}`}
                                        </h3>

                                        <p className="mt-2 text-2xl font-bold text-gray-950">
                                            {formatPrice(car.price)}
                                        </p>

                                        <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
                                            <span className="rounded-2xl bg-gray-50 px-3 py-2">
                                                {getYear(car)}
                                            </span>
                                            <span className="rounded-2xl bg-gray-50 px-3 py-2">
                                                {getKilometres(car)}
                                            </span>
                                            <span className="rounded-2xl bg-gray-50 px-3 py-2">
                                                {car.fuel_type || "Fuel N/A"}
                                            </span>
                                            <span className="rounded-2xl bg-gray-50 px-3 py-2">
                                                {car.transmission ||
                                                    "Transmission N/A"}
                                            </span>
                                        </div>

                                        <div className="mt-4 flex gap-2">
                                            <Link
                                                href={detailUrl}
                                                className="flex-1 rounded-2xl bg-black px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
                                            >
                                                Details
                                            </Link>

                                            {sourceUrl && (
                                                <a
                                                    href={sourceUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
                                                    aria-label="Open source listing"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            )}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </aside>
            </section>
        </main>
    );
}
