import Link from "next/link";

import FavoriteButton from "@/components/cars/FavoriteButton";
import CompareButton from "@/components/cars/CompareButton";

import { Car } from "@/types/Car";

interface CarCardProps {
    car: Car;
}

export default function CarCard({
    car,
}: CarCardProps) {

    const image =
        car.images?.[0]?.image_url ||
        "/placeholder-car.jpg";

    return (
        <article
            className="
                group
                flex
                h-full
                flex-col
                bg-white
                rounded-3xl
                border
                border-blue-100
                overflow-hidden
                hover:shadow-2xl
                hover:shadow-blue-100
                transition-all
                duration-300
            "
        >

            {/* Image */}

            <div className="relative">

                <Link href={`/cars/${car.id}`}>

                    <img
                        src={image}
                        alt={car.title}
                        className="
                            h-60
                            w-full
                            object-cover
                            group-hover:scale-105
                            transition-transform
                            duration-500
                        "
                    />

                </Link>

                <span
                    className="
                        absolute
                        top-4
                        left-4
                        bg-blue-600
                        text-white
                        text-xs
                        px-3
                        py-1
                        rounded-full
                    "
                >
                    {car.marketplace}
                </span>

            </div>

            {/* Content */}

            <div className="flex flex-1 flex-col p-6">

                <Link href={`/cars/${car.id}`}>

                    <h3
                        className="
                            text-xl
                            font-bold
                            line-clamp-2
                            hover:text-blue-600
                            transition
                        "
                    >
                        {car.title}
                    </h3>

                    <p className="text-gray-500 mt-2">
                        {car.brand}
                        {" • "}
                        {car.model}
                        {" • "}
                        {car.variant}
                    </p>

                </Link>

                {/* Price */}

                <div className="mt-4">

                    <p
                        className="
                            text-3xl
                            font-bold
                            text-blue-700
                        "
                    >
                        ₹
                        {Number(
                            car.price
                        ).toLocaleString(
                            "en-IN"
                        )}
                    </p>

                </div>

                {/* Specs */}

                <div
                    className="
                        grid
                        grid-cols-2
                        gap-3
                        mt-5
                        text-sm
                        text-gray-600
                    "
                >

                    <div>
                        {car.manufacture_year}
                    </div>

                    <div>
                        {car.kms_driven.toLocaleString()} km
                    </div>

                    <div>
                        {car.fuel_type}
                    </div>

                    <div>
                        {car.transmission}
                    </div>

                    <div>
                        {car.owner_type}
                    </div>

                    <div>
                        {car.city}
                    </div>

                </div>

                {/* Tags */}

                <div
                    className="
                        flex
                        flex-wrap
                        gap-2
                        mt-5
                    "
                >

                    {car.engine_capacity && (
                        <span
                            className="
                                bg-blue-50
                                text-blue-700
                                text-xs
                                px-3
                                py-1
                                rounded-full
                            "
                        >
                            {car.engine_capacity}
                        </span>
                    )}

                    {car.color && (
                        <span
                            className="
                                bg-gray-100
                                text-xs
                                px-3
                                py-1
                                rounded-full
                            "
                        >
                            {car.color}
                        </span>
                    )}

                    {car.variant && (
                        <span
                            className="
                                bg-gray-100
                                text-xs
                                px-3
                                py-1
                                rounded-full
                            "
                        >
                            {car.variant}
                        </span>
                    )}

                </div>

                <div className="mt-auto">
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            mt-6
                            pt-4
                            border-t
                        "
                    >

                        <div>

                            <p className="text-xs text-gray-500">
                                Insurance
                            </p>

                            <p className="text-sm font-medium">
                                {car.insurance_validity || "N/A"}
                            </p>

                        </div>

                        <Link
                            href={`/cars/${car.id}`}
                            className="
                                text-blue-600
                                font-semibold
                                hover:text-blue-800
                            "
                        >
                            View Details →
                        </Link>

                    </div>

                    <div
                        className="
                            flex
                            items-center
                            justify-end
                            gap-2
                            mt-4
                        "
                    >

                        <CompareButton car={car} />
                        <FavoriteButton car={car} />

                    </div>
                </div>

            </div>

        </article>
    );
}