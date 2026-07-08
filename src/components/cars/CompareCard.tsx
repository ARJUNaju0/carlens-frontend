"use client";

import { X } from "lucide-react";

import { Car } from "@/types/Car";

import {
    useCompareStore,
} from "@/store/compare-store";
import { useAuthStore } from "@/store/auth-store";

interface Props {
    car: Car;
}

export default function CompareCard({
    car,
}: Props) {

    const removeCar =
        useCompareStore(
            (state) =>
                state.removeCar
        );

    const isLoggedIn = useAuthStore(
        (state) => state.isLoggedIn
    );

    return (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

            <img
                src={
                    car.images?.[0]?.image_url ??
                    "/placeholder-car.jpg"
                }
                alt={car.title}
                className="h-52 w-full object-cover"
            />

            <div className="p-5">

                <div className="flex justify-between items-start">

                    <div>

                        <h3 className="font-bold">
                            {car.title}
                        </h3>

                        <p className="text-sm text-gray-500">
                            {car.brand} • {car.model}
                        </p>

                    </div>

                    <button
                        onClick={() => removeCar(car.id, isLoggedIn)}
                        className="
                    text-red-500
                    hover:bg-red-50
                    p-2
                    rounded-full
                "
                    >
                        <X size={18} />
                    </button>

                </div>

                <p className="text-3xl font-bold text-blue-700 mt-5">
                    ₹{Number(car.price).toLocaleString("en-IN")}
                </p>

            </div>


        </div>
    );
}