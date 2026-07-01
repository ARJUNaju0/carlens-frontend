export default function MarketplaceLogos() {
    const platforms = [
        "Cars24",
        "CarDekho",
        "Spinny",
        "OLX",
        "True Value",
    ];

    return (
        <section className="border-y py-8">
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-8 text-muted font-semibold">
            {platforms.map((platform) => (
                <span key={platform}>{platform}</span>
            ))}
            </div>
        </div>
        </section>
    );
    }