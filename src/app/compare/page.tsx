"use client";

import { useEffect, useState } from "react";
import { useCompareStore } from "@/store/compare-store";
import { useAuthStore } from "@/store/auth-store";
import CompareCard from "@/components/cars/CompareCard";
import { Car } from "@/types/Car";
import api from "@/lib/api";
import {
    Sparkles,
    AlertCircle,
    Loader2,
} from "lucide-react";

export default function ComparePage() {

    const {
        cars,
        setCars,
        clearCars,
    } = useCompareStore();

    const isLoggedIn = useAuthStore(
        (state) => state.isLoggedIn
    );

    const [loading, setLoading] =
        useState(true);

    const [aiLoading, setAiLoading] =
        useState(false);

    const [aiComparison, setAiComparison] =
        useState<any>(null);

    const [aiError, setAiError] =
        useState<string | null>(null);

    // ----------------------------
    // Load compare list from backend
    // ----------------------------

    useEffect(() => {

        async function loadCompareList() {

            if (!isLoggedIn) {
                setLoading(false);
                return;
            }

            try {

                const response =
                    await api.get(
                        "/cars/compare/"
                    );

                const backendCars =
                    response.data.map(
                        (item: any) => item.car
                    );

                setCars(backendCars);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        }

        loadCompareList();

    }, [isLoggedIn]);



    // ----------------------------
    // AI Compare
    // ----------------------------

    useEffect(() => {

        async function fetchComparison() {

            if (cars.length < 2) {
                setAiComparison(null);
                return;
            }

            try {

                setAiLoading(true);

                setAiError(null);

                const response =
                    await api.post(
                        "/ai/compare/",
                        {
                            car_ids:
                                cars.map(
                                    (c) => c.id
                                ),
                        }
                    );

                setAiComparison(
                    response.data.comparison
                );

            } catch {

                setAiError(
                    "AI Comparison unavailable."
                );

            } finally {

                setAiLoading(false);

            }

        }

        fetchComparison();

    }, [cars]);



    if (loading) {

        return (
            <main className="max-w-7xl mx-auto py-20 flex justify-center">

                <Loader2
                    className="animate-spin"
                    size={40}
                />

            </main>
        );

    }



    if (cars.length === 0) {

        return (

            <main className="max-w-7xl mx-auto py-20 text-center">

                <h1 className="text-4xl font-bold">
                    Compare Cars
                </h1>

                <p className="mt-5 text-gray-500">

                    No cars selected.

                </p>

            </main>

        );

    }



    return (

        <main className="max-w-7xl mx-auto px-4 py-10">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-4xl font-bold">

                        Compare Cars

                    </h1>

                    <p className="text-gray-500">

                        Compare specifications side-by-side.

                    </p>

                </div>

                <button

                    onClick={clearCars}

                    className="bg-red-600 text-white px-5 py-2 rounded-xl"

                >

                    Clear All

                </button>

            </div>



            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

                {cars.map((car) => (

                    <CompareCard

                        key={car.id}

                        car={car}

                    />

                ))}

            </div>



            {cars.length >= 2 && (

                <div className="mt-10">

                    {aiLoading && (

                        <div className="border rounded-2xl p-10 text-center">

                            <Loader2
                                className="animate-spin mx-auto mb-4"
                            />

                            AI is comparing cars...

                        </div>

                    )}



                    {aiError && (

                        <div className="border rounded-2xl p-10 text-center">

                            <AlertCircle
                                className="mx-auto mb-3 text-red-500"
                            />

                            {aiError}

                        </div>

                    )}



                    {aiComparison && (

                        <section className="border rounded-3xl p-8 mt-8">

                            <div className="flex items-center gap-3 mb-6">

                                <Sparkles />

                                <h2 className="text-2xl font-bold">

                                    AI Comparison

                                </h2>

                            </div>



                            <h3 className="text-xl font-bold">

                                Winner

                            </h3>

                            <p className="mt-2">

                                {aiComparison.winner}

                            </p>

                            <p className="mt-4">

                                {aiComparison.reason}

                            </p>



                            {aiComparison.comparison && (

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">

                                    {Object.entries(

                                        aiComparison.comparison

                                    ).map(

                                        ([key, value]) => (

                                            <div

                                                key={key}

                                                className="border rounded-xl p-5"

                                            >

                                                <h4 className="font-bold">

                                                    {key}

                                                </h4>

                                                <p className="mt-2">

                                                    {String(value)}

                                                </p>

                                            </div>

                                        )

                                    )}

                                </div>

                            )}

                        </section>

                    )}

                </div>

            )}



            <div className="overflow-x-auto mt-12">

                <table className="w-full border">

                    <tbody>

                        <CompareRow
                            label="Price"
                            values={cars.map(
                                c =>
                                    `₹${Number(c.price).toLocaleString("en-IN")}`
                            )}
                        />

                        <CompareRow
                            label="Brand"
                            values={cars.map(c => c.brand)}
                        />

                        <CompareRow
                            label="Model"
                            values={cars.map(c => c.model)}
                        />

                        <CompareRow
                            label="Year"
                            values={cars.map(
                                c =>
                                    String(
                                        c.manufacture_year
                                    )
                            )}
                        />

                        <CompareRow
                            label="Fuel"
                            values={cars.map(
                                c => c.fuel_type
                            )}
                        />

                        <CompareRow
                            label="Transmission"
                            values={cars.map(
                                c =>
                                    c.transmission
                            )}
                        />

                        <CompareRow
                            label="Owner"
                            values={cars.map(
                                c =>
                                    c.owner_type
                            )}
                        />

                        <CompareRow
                            label="KM Driven"
                            values={cars.map(
                                c =>
                                    `${c.kms_driven} km`
                            )}
                        />

                    </tbody>

                </table>

            </div>

        </main>

    );

}



interface CompareRowProps {

    label: string;

    values: string[];

}



function CompareRow({

    label,

    values,

}: CompareRowProps) {

    return (

        <tr className="border-b">

            <td className="font-semibold p-4">

                {label}

            </td>

            {values.map((value, index) => (

                <td
                    key={index}
                    className="p-4"
                >

                    {value}

                </td>

            ))}

        </tr>

    );

}