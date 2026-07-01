"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import api from "@/lib/api";
import { Car } from "@/types/Car";
import FavoriteButton from "@/components/cars/FavoriteButton";

interface Favorite {
    id: number;
    car: Car;
    created_at: string;
}

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFavorites();
    }, []);

    async function fetchFavorites() {
        try {
            const token = localStorage.getItem("access");

            if (!token) {
                setLoading(false);
                return;
            }

            const response = await api.get(
                "/cars/favorites/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setFavorites(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function removeFavorite(
        favoriteId: number
    ) {
        setFavorites((prev) =>
            prev.filter(
                (favorite) =>
                    favorite.id !== favoriteId
            )
        );
    }

    if (loading) {
        return (
            <main className="min-h-screen">
                <div className="max-w-7xl mx-auto px-4 py-10">
                    <p className="text-muted">Loading favorites...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen">

            {/* Header */}

            <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">

                <h1 className="text-4xl md:text-5xl font-bold">Favorite Cars</h1>

                <p className="text-muted mt-3">Vehicles you've saved for later.</p>

            </section>

            <section className="max-w-7xl mx-auto px-4 pb-10">

                {favorites.length === 0 ? (
                    <div className="card p-12 text-center">
                        <h2 className="text-2xl font-semibold">No Favorites Yet</h2>

                        <p className="text-muted mt-3">Save cars you like and they will appear here.</p>

                        <Link href="/cars" className="btn-primary inline-flex mt-6">Browse Cars</Link>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 text-muted">{favorites.length} saved vehicle{favorites.length > 1 ? "s" : ""}</div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {favorites.map((favorite) => {
                                const car = favorite.car;

                                return (
                                    <Link
                                        key={favorite.id}
                                        href={`/cars/${car.id}`}
                                    >
                                        <article className="card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                                            {/* Image */}

                                            <div className="relative">

                                                <img
                                                    src={
                                                        car.images?.[0]
                                                            ?.image_url ||
                                                        "/placeholder-car.jpg"
                                                    }
                                                    alt={car.title}
                                                    className="
                                                        h-60
                                                        w-full
                                                        object-cover
                                                    "
                                                />

                                                {/* Favorite */}

                                                <div className="absolute top-4 right-4">
                                                    <FavoriteButton
                                                        car={{
                                                            ...car,
                                                            is_favorite: true,
                                                            favorite_id:
                                                                favorite.id,
                                                        }}
                                                        onRemove={() =>
                                                            removeFavorite(
                                                                favorite.id
                                                            )
                                                        }
                                                    />
                                                </div>

                                                <span className="absolute top-4 left-4 marketplace-badge">{car.marketplace}</span>

                                            </div>

                                            {/* Content */}

                                            <div className="p-5">

                                                <h3 className="text-xl font-bold line-clamp-2">{car.title}</h3>

                                                <p className="text-3xl font-bold text-primary mt-4">₹{Number(car.price).toLocaleString("en-IN")}</p>

                                                <div className="grid grid-cols-2 gap-3 mt-5 text-sm text-muted">
                                                    <span>
                                                        {" "}
                                                        {car.manufacture_year}
                                                    </span>

                                                    <span>
                                                        {" "}
                                                        {car.kms_driven.toLocaleString()}{" "}
                                                        km
                                                    </span>

                                                    <span>
                                                        {car.fuel_type}
                                                    </span>

                                                    <span>
                                                        {car.transmission}
                                                    </span>

                                                    <span>
                                                        {car.owner_type}
                                                    </span>

                                                    <span>
                                                        {car.city}
                                                    </span>
                                                </div>

                                                <div className="mt-6 flex flex-wrap gap-2">

                                                    {car.variant && (
                                                        <span className="text-xs rounded-full px-3 py-1" style={{background:'rgba(46,160,255,0.04)', color:'var(--primary)'}}>{car.variant}</span>
                                                    )}

                                                    {car.engine_capacity && (
                                                        <span className="text-xs rounded-full px-3 py-1" style={{background:'rgba(255,255,255,0.02)', color:'var(--muted)'}}>{car.engine_capacity}</span>
                                                    )}

                                                </div>

                                                <div className="mt-6 text-blue-600 font-medium">
                                                    View Details →
                                                </div>

                                            </div>

                                        </article>
                                    </Link>
                                );
                            })}

                        </div>
                    </>
                )}

            </section>

        </main>
    );
}