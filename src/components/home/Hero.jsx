import Link from "next/link";

export default function Hero() {
    return (
        <section className="hero-bg relative overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36">

                <div className="text-center max-w-5xl mx-auto">

                    {/* Badge */}

                    <span className="inline-flex items-center gap-2 marketplace-badge px-4 py-2 text-sm font-medium">
                        India's AI-Powered Used Car Search Engine
                    </span>

                    {/* Heading */}

                    <h1 className="mt-8 text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                        Search Every
                        <span className="block">
                            Used Car Marketplace
                        </span>

                        <span className="block text-muted">In One Place</span>
                    </h1>

                    {/* Description */}

                    <p className="mt-8 text-lg md:text-xl text-muted max-w-3xl mx-auto">
                        Find the best used cars across OLX, Cars24,
                        CarDekho, Spinny, True Value and more.
                        Compare prices, analyze deals with AI,
                        and discover better listings faster.
                    </p>

                    {/* CTA */}

                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

                        <Link href="/cars" className="btn-primary px-8 py-4 rounded-xl font-medium">Search Cars</Link>

                    

                    </div>

                    {/* Stats */}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">

                        <div>
                            <h3 className="text-3xl font-bold">
                                5+
                            </h3>

                            <p className="text-muted mt-1">
                                Marketplaces
                            </p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold">
                                10K+
                            </h3>

                            <p className="text-muted mt-1">
                                Listings
                            </p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold">
                                AI
                            </h3>

                            <p className="text-muted mt-1">
                                Deal Analysis
                            </p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold">
                                24/7
                            </h3>

                            <p className="text-muted mt-1">
                                Search Engine
                            </p>
                        </div>

                    </div>
                

                </div>

            </div>
        </section>
    );
}