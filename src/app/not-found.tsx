import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-100 flex items-center justify-center px-6">

            <div className="max-w-xl text-center">

                <div className="flex justify-center mb-6">
                    <div className="bg-blue-100 p-6 rounded-full">
                        <SearchX
                            size={72}
                            className="text-blue-600"
                        />
                    </div>
                </div>

                <p className="text-blue-600 font-semibold tracking-wide uppercase">
                    Error 404
                </p>

                <h1 className="mt-4 text-5xl font-bold text-gray-900">
                    Page Not Found
                </h1>

                <p className="mt-6 text-lg text-gray-600 leading-8">
                    Sorry, the page you're looking for doesn't exist,
                    has been moved, or the URL is incorrect.
                </p>

                <div className="mt-10 flex justify-center gap-4">

                    <Link
                        href="/"
                        className="
                            px-6
                            py-3
                            rounded-xl
                            bg-blue-600
                            text-white
                            hover:bg-blue-700
                            transition
                        "
                    >
                        Go Home
                    </Link>

                    <Link
                        href="/cars"
                        className="
                            px-6
                            py-3
                            rounded-xl
                            border
                            border-blue-200
                            bg-white
                            hover:bg-blue-50
                            transition
                        "
                    >
                        Browse Cars
                    </Link>

                </div>

                <div className="mt-12 border-t border-blue-100 pt-6 text-sm text-gray-500">
                    CarLens • Find, Compare & Save Used Cars
                </div>

            </div>

        </main>
    );
}