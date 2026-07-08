"use client";

import { Scale } from "lucide-react";
import { Car } from "@/types/Car";
import { useCompareStore } from "@/store/compare-store";
import { useAuthStore } from "@/store/auth-store";
import api from "@/lib/api";


interface CompareButtonProps {
    car: Car;
}

export default function CompareButton({
    car,
}: CompareButtonProps) {

    const addCar = useCompareStore((state) => state.addCar);
    const removeCar = useCompareStore((state) => state.removeCar);
    const cars = useCompareStore((state) => state.cars);

    const isLoggedIn = useAuthStore(
        (state) => state.isLoggedIn
    );

    const exists = cars.some(
        (c) => c.id === car.id
    );

    const disabled = !exists && cars.length >= 3;

    const handleCompare = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        e.stopPropagation();

        if (disabled) return;

        try {
            // Logged-in user
            if (isLoggedIn) {

                if (exists) {

                    await api.delete(
                        `/cars/compare/${car.id}/`
                    );

                    removeCar(car.id);

                } else {

                    await api.post(
                        "/cars/compare/add/",
                        {
                            car: car.id,
                        }
                    );

                    addCar(car);
                }

                return;
            }

            // Guest user
            if (exists) {
                removeCar(car.id);
            } else {
                addCar(car);
            }

        } catch (error: any) {

            console.error(error);

            const message =
                error.response?.data?.non_field_errors?.[0] ||
                error.response?.data?.detail ||
                "Unable to update compare list.";

            alert(message);
        }
    };

    return (
        <button
            type="button"
            disabled={disabled}
            title={
                disabled
                    ? "You can compare up to 3 cars."
                    : ""
            }
            onClick={handleCompare}
            className={`
                flex items-center gap-2 px-4 py-2 rounded-xl transition

                ${exists
                    ? "bg-blue-600 text-white"
                    : disabled
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                }
            `}
        >
            <Scale size={16} />

            {
                exists
                    ? "Added"
                    : disabled
                        ? "Limit Reached"
                        : "Compare"
            }
        </button>
    );
}