"use client";

import Link from "next/link";

import {
    useCompareStore,
} from "@/store/compare-store";

export default function CompareBar() {

    const cars =
        useCompareStore(
            (state) =>
                state.cars
        );

    if (cars.length < 2)
        return null;

    return (
        <Link
            href="/compare"
            className="
                fixed
                bottom-6
                right-6
                bg-black
                text-white
                px-6
                py-4
                rounded-xl
                shadow-xl
                z-50
            "
        >
            Compare {cars.length} Cars
        </Link>
    );
}