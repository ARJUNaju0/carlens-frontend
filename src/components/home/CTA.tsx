import Link from "next/link";

export default function CTA() {
    return (
        <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="card p-10 text-center">

            <h2 className="text-3xl md:text-5xl font-bold">
            Find Better Used Cars
            </h2>

            <p className="mt-4 text-muted">Search once. Compare everywhere.</p>

            <Link href="/cars" className="inline-block mt-8 btn-primary px-6 py-3 rounded-lg">Start Searching</Link>

        </div>
        </section>
    );
    }