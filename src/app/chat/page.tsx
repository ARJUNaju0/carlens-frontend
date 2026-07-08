"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
    AlertCircle,
    Bot,
    Car,
    Check,
    ExternalLink,
    Loader2,
    Scale,
    Send,
    Sparkles,
    User,
    X,
} from "lucide-react";

import api from "@/lib/api";
import { Car as CarType } from "@/types/Car";

type ChatMessage = {
    id: number;
    role: "user" | "assistant";
    text: string;
    cars?: ChatCar[];
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
    "Hi, I am CarLens AI. Tell me your budget, city, preferred body style, fuel type, or must-have features, and I will shortlist used cars for you.";

const promptIdeas = [
    "Automatic under 8 lakh in Kochi",
    "Low KM petrol family SUV",
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
        { id: 1, role: "assistant", text: starterMessage },
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [compareSelected, setCompareSelected] = useState<ChatCar[]>([]);
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function loadHistory() {
            const token = localStorage.getItem("access");
            if (!token) return;
            try {
                const res = await api.get("/ai/history/");
                const chatItems = res.data.filter((item: any) => item.type === "chat");
                if (chatItems.length > 0) {
                    const formatted: ChatMessage[] = [];
                    const chronological = [...chatItems].reverse();
                    chronological.forEach((item: any) => {
                        formatted.push({
                            id: item.id * 2,
                            role: "user",
                            text: item.query,
                        });
                        formatted.push({
                            id: item.id * 2 + 1,
                            role: "assistant",
                            text: item.response?.reply || "No response details generated.",
                            cars: item.response?.cars_found || [],
                        });
                    });
                    setChatHistory([
                        { id: 1, role: "assistant", text: starterMessage },
                        ...formatted,
                    ]);
                }
            } catch (err) {
                console.error("Failed to load chat history:", err);
            }
        }
        loadHistory();
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory, loading]);

    async function handleSendMessage(event?: FormEvent<HTMLFormElement>) {
        if (event) event.preventDefault();

        const userMessage = message.trim();
        if (!userMessage || loading) return;

        setChatHistory((current) => [
            ...current,
            { id: Date.now(), role: "user", text: userMessage },
        ]);
        setMessage("");
        setLoading(true);
        setError(null);

        try {
            const response = await api.post("/ai/chat/", { message: userMessage });
            const cars = response.data.cars_found || response.data.cars || [];
            const reply =
                response.data.reply ||
                response.data.message ||
                (cars.length
                    ? `I found ${cars.length} matching car${cars.length === 1 ? "" : "s"} for you.`
                    : "I could not find an exact match. Try adjusting your preferences.");

            setChatHistory((current) => [
                ...current,
                { id: Date.now() + 1, role: "assistant", text: reply, cars: cars },
            ]);
        } catch (caughtError) {
            console.error(caughtError);
            setError("Could not reach the AI service. Please check your connection.");
        } finally {
            setLoading(false);
        }
    }

    function toggleCompare(car: ChatCar) {
        setCompareSelected((prev) => {
            const isSelected = prev.some((c) => c.id === car.id);
            if (isSelected) return prev.filter((c) => c.id !== car.id);
            if (prev.length >= 3) {
                alert("You can only compare up to 3 cars at once.");
                return prev;
            }
            return [...prev, car];
        });
    }

    return (
        <main className="flex h-[100dvh] flex-col bg-gray-50 font-sans text-gray-900 relative">
            {/* Header */}
            <header className="sticky top-0 z-50 flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5 py-4 shadow-sm">
                <div className="flex items-center gap-2 font-bold tracking-tight text-lg text-gray-900">
                    <Sparkles className="h-5 w-5 text-indigo-600" />
                    CarLens AI
                </div>
                {chatHistory.length > 1 && (
                    <button
                        onClick={() => {
                            setChatHistory([{ id: 1, role: "assistant", text: starterMessage }]);
                            setCompareSelected([]);
                        }}
                        className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
                    >
                        Clear Chat
                    </button>
                )}
            </header>

            {/* Scrollable Chat Feed */}
            <div className="flex-1 overflow-y-auto px-4 pb-48 pt-6 sm:px-6">
                <div className="mx-auto flex max-w-4xl flex-col space-y-8">
                    {chatHistory.map((chat) => (
                        <div
                            key={chat.id}
                            className={`flex gap-4 ${chat.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                            {/* Avatars */}
                            <div className={`flex shrink-0 h-9 w-9 items-center justify-center rounded-full shadow-sm ${chat.role === "assistant" ? "bg-white border border-gray-200 text-indigo-600" : "bg-gray-200 text-gray-600"}`}>
                                {chat.role === "assistant" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                            </div>

                            {/* Message Content */}
                            <div className={`flex flex-col gap-3 w-full ${chat.role === "user" ? "items-end" : "items-start"}`}>
                                <div
                                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ${chat.role === "user"
                                        ? "bg-indigo-600 text-white rounded-tr-sm"
                                        : "bg-white text-gray-800 rounded-tl-sm border border-gray-200"
                                        }`}
                                >
                                    {chat.text}
                                </div>

                                {/* Inline Car Listings */}
                                {chat.cars && chat.cars.length > 0 && (
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-2 w-full">
                                        {chat.cars.map((car) => {
                                            const isSelected = compareSelected.some((c) => c.id === car.id);
                                            const sourceUrl = car.source_url || car.url;
                                            return (
                                                <div
                                                    key={car.id}
                                                    className={`flex flex-col justify-between overflow-hidden rounded-2xl border bg-white transition-all ${isSelected
                                                        ? "border-indigo-600 ring-1 ring-indigo-600 shadow-md"
                                                        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                                                        }`}
                                                >
                                                    <div className="p-4">
                                                        <div className="mb-3 flex items-center justify-between">
                                                            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-600">
                                                                {getMarketplace(car)}
                                                            </span>
                                                            <button
                                                                onClick={() => toggleCompare(car)}
                                                                className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${isSelected
                                                                    ? "border-indigo-600 bg-indigo-600 text-white"
                                                                    : "border-gray-300 bg-gray-50 text-transparent hover:border-gray-400 hover:bg-gray-100"
                                                                    }`}
                                                            >
                                                                <Check className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                        <h3 className="line-clamp-2 text-base font-bold leading-tight text-gray-900">
                                                            {car.title || `${car.brand || ""} ${car.model || "Vehicle"}`}
                                                        </h3>
                                                        <p className="mt-2 text-xl font-extrabold tracking-tight text-gray-900">
                                                            {formatPrice(car.price)}
                                                        </p>
                                                        <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-gray-600">
                                                            <span className="rounded-md bg-gray-50 px-2 py-1 border border-gray-200">{getYear(car)}</span>
                                                            <span className="rounded-md bg-gray-50 px-2 py-1 border border-gray-200">{getKilometres(car)}</span>
                                                            <span className="rounded-md bg-gray-50 px-2 py-1 border border-gray-200">{car.fuel_type || "N/A"}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex border-t border-gray-100 bg-gray-50/50">
                                                        <Link
                                                            href={`/cars/${car.id}`}
                                                            className="flex-1 px-4 py-3 text-center text-sm font-semibold text-gray-800 hover:bg-gray-100 hover:text-indigo-600 transition-colors"
                                                        >
                                                            View Details
                                                        </Link>
                                                        {sourceUrl && (
                                                            <a
                                                                href={sourceUrl}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="flex items-center justify-center border-l border-gray-100 px-4 py-3 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                                                title="View Original Listing"
                                                            >
                                                                <ExternalLink className="h-4 w-4" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex gap-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm">
                                <Bot className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="flex items-center gap-2 rounded-2xl bg-white border border-gray-200 px-5 py-3 text-sm text-gray-500 shadow-sm">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Searching inventory...
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mx-auto max-w-lg rounded-2xl bg-red-50 p-4 text-sm text-red-700 flex items-center gap-2 border border-red-100">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            {error}
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
            </div>

            {/* Floating Comparison Action Bar */}
            {compareSelected.length > 0 && (
                <div className="fixed bottom-[130px] sm:bottom-[110px] left-1/2 z-40 flex -translate-x-1/2 animate-in slide-in-from-bottom-4 items-center gap-4 rounded-full bg-gray-900 px-6 py-3.5 text-white shadow-2xl">
                    <span className="text-sm font-medium whitespace-nowrap">
                        {compareSelected.length} selected
                    </span>
                    <div className="h-5 w-[1px] bg-gray-700" />
                    <button
                        onClick={() => setIsCompareModalOpen(true)}
                        disabled={compareSelected.length < 2}
                        className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
                    >
                        <Scale className="h-4 w-4" />
                        Compare
                    </button>
                    <button
                        onClick={() => setCompareSelected([])}
                        className="rounded-full bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                        aria-label="Clear selection"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* Solid Sticky Dock for Chat Input */}
            <div className="absolute bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 pb-6 pt-4 px-4 sm:px-6 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="mx-auto max-w-3xl">
                    {/* Prompt Suggestions */}
                    {chatHistory.length === 1 && (
                        <div className="mb-4 hidden sm:flex flex-wrap justify-center gap-2">
                            {promptIdeas.map((prompt) => (
                                <button
                                    key={prompt}
                                    onClick={() => setMessage(prompt)}
                                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    )}

                    <form
                        onSubmit={handleSendMessage}
                        className="relative flex items-end gap-2 rounded-3xl border border-gray-300 bg-gray-100 p-2 pl-4 shadow-sm focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-50 transition-all duration-200"
                    >
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            disabled={loading}
                            placeholder="Message CarLens AI..."
                            rows={1}
                            className="max-h-32 min-h-[44px] w-full resize-none bg-transparent py-3 text-[15px] outline-none placeholder:text-gray-500 disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={loading || !message.trim()}
                            className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-100"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>

                </div>
            </div>

            {/* Comparison Modal */}
            {isCompareModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm z-[100] animate-in fade-in">
                    <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-8">
                        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Compare Vehicles</h2>
                                <p className="text-sm text-gray-500 mt-1">Side-by-side spec comparison</p>
                            </div>
                            <button
                                onClick={() => setIsCompareModalOpen(false)}
                                className="rounded-full bg-gray-100 p-2.5 text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="overflow-x-auto pb-4">
                            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                                <thead>
                                    <tr>
                                        <th className="border-b border-gray-200 py-4 font-semibold text-gray-500 w-[20%]">Features</th>
                                        {compareSelected.map((car) => (
                                            <th key={car.id} className="border-b border-gray-200 py-4 font-bold text-gray-900 w-[26%] align-bottom">
                                                <div className="text-base line-clamp-2">{car.title || `${car.brand} ${car.model}`}</div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="py-4 font-medium text-gray-500">Price</td>
                                        {compareSelected.map((car) => (
                                            <td key={car.id} className="py-4 font-extrabold text-gray-900 text-lg">{formatPrice(car.price)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className="py-4 font-medium text-gray-500">Year</td>
                                        {compareSelected.map((car) => <td key={car.id} className="py-4 text-gray-800">{getYear(car)}</td>)}
                                    </tr>
                                    <tr>
                                        <td className="py-4 font-medium text-gray-500">Kilometres</td>
                                        {compareSelected.map((car) => <td key={car.id} className="py-4 text-gray-800">{getKilometres(car)}</td>)}
                                    </tr>
                                    <tr>
                                        <td className="py-4 font-medium text-gray-500">Fuel & Trans</td>
                                        {compareSelected.map((car) => <td key={car.id} className="py-4 text-gray-800">{car.fuel_type || "N/A"} • {car.transmission || "N/A"}</td>)}
                                    </tr>
                                    <tr>
                                        <td className="py-4 font-medium text-gray-500">Location</td>
                                        {compareSelected.map((car) => <td key={car.id} className="py-4 text-gray-800">{getLocation(car)}</td>)}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}