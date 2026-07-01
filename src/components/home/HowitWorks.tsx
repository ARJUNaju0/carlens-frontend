export default function HowItWorks() {
    return (
        <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">

            <h2 className="text-3xl md:text-5xl font-bold text-center">
            How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-12">

            <div className="text-center">
                <div className="text-5xl font-bold">1</div>
                <h3 className="mt-4 font-semibold">
                Search
                </h3>
            </div>

            <div className="text-center">
                <div className="text-5xl font-bold">2</div>
                <h3 className="mt-4 font-semibold">
                Compare
                </h3>
            </div>

            <div className="text-center">
                <div className="text-5xl font-bold">3</div>
                <h3 className="mt-4 font-semibold">
                Buy Better
                </h3>
            </div>

            </div>
        </div>
        </section>
    );
    }