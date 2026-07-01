import api from "@/lib/api";
import { Car } from "@/types/Car";
import FavoriteButton from "@/components/cars/FavoriteButton";
import CompareButton from "@/components/cars/CompareButton";
import ImageGallery from "@/components/cars/ImageGallery";
import Link from "next/link";


async function getCar(id: string): Promise<Car> {
    const response = await api.get(`/cars/${id}/`);
    return response.data;
}

export default async function CarDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const car = await getCar(id);

    const hasQuickSpecs = [
        car.manufacture_year,
        car.kms_driven,
        car.fuel_type,
        car.transmission,
        car.owner_type,
        car.engine_capacity,
    ].some((v) => v !== null && v !== undefined && String(v).trim() !== "");

    const hasDescription =
        !!car.description &&
        String(car.description).trim().length > 0;

    const hasFeatures =
        Array.isArray(car.features) && car.features.length > 0;

    const hasSpecifications =
        !!car.specifications &&
        !!car.specifications.data &&
        Object.keys(car.specifications.data || {}).length > 0;

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-900 via-neutral-900 to-black text-white">

    <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Top Section */}

        <div className="grid lg:grid-cols-3 gap-8">

            {/* Gallery */}

            <div className="lg:col-span-2">
                <ImageGallery images={car.images || []} />
            </div>

            {/* Right Card */}

            <div>

                <div className="bg-white/3 backdrop-blur-md rounded-3xl border border-cyan-800/30 p-6 sticky top-24 shadow-[0_20px_60px_rgba(2,6,23,0.6)]">

                    <p className="text-sm text-cyan-200/70 tracking-wide uppercase font-medium">
                        {car.marketplace}
                    </p>

                    <h1 className="text-3xl font-bold mt-2 text-cyan-100 drop-shadow-[0_0_14px_rgba(34,211,238,0.12)]">
                        {car.title}
                    </h1>

                    <p className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-green-500 mt-4">
                        ₹{Number(car.price).toLocaleString("en-IN")}
                    </p>

                    <div className="space-y-3 mt-6 text-slate-200">

                        <Info
                            label="Brand"
                            value={car.brand}
                        />

                        <Info
                            label="Model"
                            value={car.model}
                        />

                        <Info
                            label="Variant"
                            value={car.variant}
                        />

                        <Info
                            label="City"
                            value={car.city}
                        />

                    </div>

                    <div className="flex gap-3 mt-8 items-center">

                        <div className="flex gap-2 items-center">
                            <FavoriteButton car={car} />
                            <CompareButton car={car} />
                        </div>

                        <Link
                            href={car.source_url}
                            target="_blank"
                            className="ml-auto inline-block px-4 py-2 rounded-xl bg-cyan-600/10 border border-cyan-600 text-cyan-300 hover:bg-cyan-600/20 transition"
                        >
                            View Original Listing
                        </Link>

                    </div>

                </div>

            </div>

        </div>

        {/* Quick Specs */}

        {hasQuickSpecs && (
            <section className="
                bg-white
                text-gray-800
                border
                rounded-3xl
                p-6
                mt-8
            ">

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

                    <Spec
                        label="Year"
                        value={car.manufacture_year}
                    />

                    <Spec
                        label="KM Driven"
                        value={car.kms_driven}
                    />

                    <Spec
                        label="Fuel"
                        value={car.fuel_type}
                    />

                    <Spec
                        label="Transmission"
                        value={car.transmission}
                    />

                    <Spec
                        label="Owner"
                        value={car.owner_type}
                    />

                    <Spec
                        label="Engine"
                        value={car.engine_capacity}
                    />

                </div>

            </section>
        )}

        {/* Description */}

        {hasDescription && (
            <section className="
                bg-white
                text-gray-800
                border
                rounded-3xl
                p-6
                mt-8
            ">

                <h2 className="text-2xl font-bold mb-4">
                    Description
                </h2>

                <p className="leading-8 text-gray-700">
                    {car.description}
                </p>

            </section>
        )}

        {/* Features */}

        {hasFeatures && (
            <section className="
                bg-white
                text-gray-800
                border
                rounded-3xl
                p-6
                mt-8
            ">

                <h2 className="text-2xl font-bold mb-6">
                    Features
                </h2>

                <div className="grid md:grid-cols-3 gap-3">

                    {car.features?.map((feature) => (
                        <div
                            key={feature.id}
                            className="
                                bg-gray-50
                                rounded-xl
                                p-3
                            "
                        >
                            ✓ {feature.name}
                        </div>
                    ))}

                </div>

            </section>
        )}

        {/* Specifications */}

        {hasSpecifications && (
            <section className="
                bg-white
                text-gray-800
                border
                rounded-3xl
                p-6
                mt-8
            ">

                <h2 className="text-2xl font-bold mb-6">
                    Specifications
                </h2>

                <div className="grid md:grid-cols-2 gap-4">

                    {Object.entries(
                        car.specifications?.data || {}
                    ).map(([key, value]) => (
                        <div
                            key={key}
                            className="
                                flex
                                justify-between
                                border-b
                                pb-2
                            "
                        >
                            <span>{key}</span>

                            <span>
                                {String(value)}
                            </span>
                        </div>
                    ))}

                </div>

            </section>
        )}

        {/* Service History */}

        {car.service_history && (
            <section className="
                bg-white
                text-gray-800
                border
                rounded-3xl
                p-6
                mt-8
            ">

                <h2 className="text-2xl font-bold mb-6">
                    Service History
                </h2>

                <div className="space-y-3">

                    <p>
                        Last Service:
                        {" "}
                        {car.service_history.last_service_date}
                    </p>

                    <p>
                        Authorized:
                        {" "}
                        {car.service_history.authorized_service
                            ? "Yes"
                            : "No"}
                    </p>

                    <p>
                        {car.service_history.notes}
                    </p>

                </div>

            </section>
        )}

    </div>

</main>
    );
}

function Spec({
    label,
    value,
}: {
    label: string;
    value: any;
}) {
    return (
        <div>
            <p className="text-sm text-gray-500">
                {label}
            </p>

            <p className="font-bold mt-1">
                {value}
            </p>
        </div>
    );
}

function Info({
    label,
    value,
}: {
    label: string;
    value: any;
}) {
    return (
        <div className="flex justify-between">
            <span className="text-gray-500">
                {label}
            </span>

            <span className="font-medium">
                {value}
            </span>
        </div>
    );
}