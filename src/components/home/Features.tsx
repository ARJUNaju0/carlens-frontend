export default function Features() {
    const features = [
        {
        title: "Unified Search",
        desc: "Search multiple marketplaces from one place.",
        },
        {
        title: "AI Comparison",
        desc: "Compare listings intelligently.",
        },
        {
        title: "Best Deal Detection",
        desc: "Find better value for money vehicles.",
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold text-center">Why CarLens AI?</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
            {features.map((feature) => (
            <div key={feature.title} className="card p-6">
                <h3 className="font-semibold text-xl">{feature.title}</h3>

                <p className="text-muted mt-3">{feature.desc}</p>
            </div>
            ))}
        </div>
        </section>
    );
    }