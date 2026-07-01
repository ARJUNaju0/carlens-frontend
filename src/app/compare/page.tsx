"use client";

import { useCompareStore } from "@/store/compare-store";
import CompareCard from "@/components/cars/CompareCard";
import { Car } from "@/types/Car";

export default function ComparePage() {
    const cars: Car[] = useCompareStore(
        (state) => state.cars
    );

    const clearCars = useCompareStore(
        (state) => state.clearCars
    );

    if (cars.length === 0) {
        return (
            <main className="max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold">
                    Compare Cars
                </h1>

                <p className="mt-4 text-muted">
                    No cars selected for comparison.
                </p>
            </main>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-4 py-10">

            {/* Header */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                    <h1 className="text-4xl font-bold">
                        Compare Cars
                    </h1>

                        <p className="text-muted mt-2">
                            Compare specifications, pricing and features side by side.
                        </p>
                </div>

                <button onClick={clearCars} className="btn-secondary">
                    Clear All
                </button>

            </div>

            {/* Car Cards */}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

                {cars.map((car) => (
                    <CompareCard
                        key={car.id}
                        car={car}
                    />
                ))}

            </div>

            {/* Comparison Table */}

            <div className="mt-12 overflow-x-auto">

                <table className="w-full border rounded-2xl overflow-hidden">

                    <tbody>

                        <CompareRow
                            label="Price"
                            values={cars.map(
                                (car) =>
                                    `₹${Number(
                                        car.price
                                    ).toLocaleString("en-IN")}`
                            )}
                        />

                        <CompareRow
                            label="Brand"
                            values={cars.map(
                                (car) => car.brand
                            )}
                        />

                        <CompareRow
                            label="Model"
                            values={cars.map(
                                (car) => car.model
                            )}
                        />

                        <CompareRow
                            label="Variant"
                            values={cars.map(
                                (car) => car.variant
                            )}
                        />

                        <CompareRow
                            label="Manufacture Year"
                            values={cars.map(
                                (car) =>
                                    String(
                                        car.manufacture_year
                                    )
                            )}
                        />

                        <CompareRow
                            label="Registration Year"
                            values={cars.map(
                                (car) =>
                                    String(
                                        car.registration_year ??
                                        "-"
                                    )
                            )}
                        />

                        <CompareRow
                            label="Fuel Type"
                            values={cars.map(
                                (car) =>
                                    car.fuel_type
                            )}
                        />

                        <CompareRow
                            label="Transmission"
                            values={cars.map(
                                (car) =>
                                    car.transmission
                            )}
                        />

                        <CompareRow
                            label="Owner"
                            values={cars.map(
                                (car) =>
                                    car.owner_type
                            )}
                        />

                        <CompareRow
                            label="KMs Driven"
                            values={cars.map(
                                (car) =>
                                    `${car.kms_driven.toLocaleString()} km`
                            )}
                        />

                        <CompareRow
                            label="Engine"
                            values={cars.map(
                                (car) =>
                                    car.engine_capacity || "-"
                            )}
                        />

                        <CompareRow
                            label="Color"
                            values={cars.map(
                                (car) =>
                                    car.color || "-"
                            )}
                        />

                        <CompareRow
                            label="Insurance"
                            values={cars.map(
                                (car) =>
                                    car.insurance_validity || "-"
                            )}
                        />

                        <CompareRow
                            label="City"
                            values={cars.map(
                                (car) =>
                                    car.city
                            )}
                        />

                        <CompareRow
                            label="Marketplace"
                            values={cars.map(
                                (car) =>
                                    car.marketplace
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

            <td className="font-semibold p-4 min-w-[220px]" style={{background: 'rgba(46,160,255,0.04)'}}>
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