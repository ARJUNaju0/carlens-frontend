"use client";

import { useEffect, useMemo, useState } from "react";

import api from "@/lib/api";
import { Car } from "@/types/Car";

import CarCard from "@/components/cars/CarCard";
import SearchFilters from "@/components/cars/SearchFilters";
import { notFound } from "next/navigation";

interface CarFilters {
    query: string;
    brand: string;
    model: string;
    fuelType: string;
    city: string;
    minPrice: string;
    maxPrice: string;
}

const initialFilters: CarFilters = {
    query: "",
    brand: "",
    model: "",
    fuelType: "",
    city: "",
    minPrice: "",
    maxPrice: "",
};

export default function CarsPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<CarFilters>(initialFilters);

    async function handleSearch(searchQuery = filters.query) {
        setLoading(true);
        try {
            const token = localStorage.getItem("access");
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            if (searchQuery.trim()) {
                const response = await api.post(
                    "/ai/search/",
                    { query: searchQuery },
                    { headers }
                );
                setCars(response.data);
            } else {
                const response = await api.get(
                    "/cars/",
                    { headers }
                );
                setCars(response.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleSearch("");
    }, []);

    const filteredCars = useMemo(() => {
        const query = filters.query.trim().toLowerCase();
        const minPrice = Number(filters.minPrice || 0);
        const maxPrice = Number(filters.maxPrice || 0);

        return cars.filter((car) => {
            const title = car.title?.toLowerCase() || "";
            const brand = car.brand?.toLowerCase() || "";
            const model = car.model?.toLowerCase() || "";
            const fuelType = car.fuel_type?.toLowerCase() || "";
            const city = car.city?.toLowerCase() || "";
            const variant = car.variant?.toLowerCase() || "";
            const price = Number(car.price);

            const matchesQuery =
                !query ||
                title.includes(query) ||
                brand.includes(query) ||
                model.includes(query) ||
                fuelType.includes(query) ||
                city.includes(query) ||
                variant.includes(query);

            const matchesBrand =
                !filters.brand ||
                brand.includes(filters.brand.trim().toLowerCase());

            const matchesModel =
                !filters.model ||
                model.includes(filters.model.trim().toLowerCase());

            const matchesFuelType =
                !filters.fuelType ||
                fuelType.includes(filters.fuelType.trim().toLowerCase());

            const matchesCity =
                !filters.city ||
                city.includes(filters.city.trim().toLowerCase());

            const matchesMinPrice =
                !filters.minPrice || price >= minPrice;

            const matchesMaxPrice =
                !filters.maxPrice || price <= maxPrice;

            return (
                matchesQuery &&
                matchesBrand &&
                matchesModel &&
                matchesFuelType &&
                matchesCity &&
                matchesMinPrice &&
                matchesMaxPrice
            );
        });
    }, [cars, filters]);



    if (loading) {
        return (
            <div className="p-20 text-center text-muted">
                Loading Cars...
            </div>
        );
        if (!cars) {
            notFound();
        }
    }

    return (
        <main className="min-h-screen">

            <section className="hero-bg">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <h1 className="text-5xl font-bold">
                        Discover Your Next Car
                    </h1>

                    <p className="mt-4 text-muted max-w-2xl leading-8">
                        Search, compare and save vehicles from multiple marketplaces with quick, modern filters on the left.
                    </p>

                    <div className="mt-10 rounded-3xl border border-white/10 bg-white/10 p-4 shadow-[0_25px_60px_rgba(2,6,23,0.15)] backdrop-blur-xl">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <input
                                value={filters.query}
                                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                                placeholder="Search by brand, model, fuel type or city"
                                className="flex-1 min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                            />
                            <button
                                type="button"
                                onClick={() => handleSearch()}
                                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
                            >
                                Search
                            </button>
                        </div>
                        <p className="mt-2 text-sm text-slate-200">

                        </p>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
                    <div className="lg:sticky lg:top-24 self-start">
                        <SearchFilters filters={filters} onFiltersChange={setFilters} />
                    </div>

                    <div>
                        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center mb-8">
                            <div>
                                <h2 className="text-3xl font-bold">
                                    {filteredCars.length} Cars Found
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Showing results for your selected filters.
                                </p>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                            {filteredCars.map((car) => (
                                <CarCard key={car.id} car={car} />
                            ))}

                            {filteredCars.length === 0 && (
                                <div className="lg:col-span-3 text-center py-20 text-slate-500">
                                    No cars matched your filters. Please adjust brand, model, fuel type, city or price range.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}