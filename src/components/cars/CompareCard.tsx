"use client";

import { X } from "lucide-react";

import { Car } from "@/types/Car";

import {
    useCompareStore,
} from "@/store/compare-store";

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

    return (
        <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">

            <img
                src={
                    car.images?.[0]
                        ?.image_url
                }
                alt={car.title}
                className="h-48 w-full object-cover"
            />

            <div className="p-4">

                <div className="flex justify-between">

                    <h3 className="font-bold">
                        {car.title}
                    </h3>

                    <button
                        onClick={() =>
                            removeCar(
                                car.id
                            )
                        }
                    >
                        <X size={18} />
                    </button>

                </div>

                <p className="text-2xl font-bold mt-3">
                    ₹
                    {Number(
                        car.price
                    ).toLocaleString(
                        "en-IN"
                    )}
                </p>

            </div>

        </div>
    );
}