"use client";

import { Scale } from "lucide-react";
import { Car } from "@/types/Car";
import { useCompareStore } from "@/store/compare-store";

interface CompareButtonProps {
    car: Car;
}

export default function CompareButton({
    car,
}: CompareButtonProps) {

    const addCar =
        useCompareStore(
            (state) => state.addCar
        );

    const removeCar =
        useCompareStore(
            (state) => state.removeCar
        );

    const cars =
        useCompareStore(
            (state) => state.cars
        );

    const exists = cars.some(
        (c) => c.id === car.id
    );

    return (
        <button
            type="button"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (exists) {
                    removeCar(car.id);
                } else {
                    addCar(car);
                }
            }}
            className={`
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                transition
                ${exists ? "bg-cyan-600 text-black" : "border border-cyan-600 text-cyan-300 hover:bg-cyan-600/10"}
            `}
        >
            <Scale size={16} />

            {exists ? "Added" : "Compare"}
        </button>
    );
}