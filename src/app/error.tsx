"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-6">

            <h1 className="text-5xl font-bold">
                Something went wrong
            </h1>

            <p className="text-gray-500">
                {error.message}
            </p>

            <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl">
                Reload Page
            </button>

        </main>
    );
}