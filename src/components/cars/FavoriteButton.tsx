"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

import api from "@/lib/api";
import { Car } from "@/types/Car";

interface Props {
    car: Car;
    onRemove?: (
        favoriteId: number
    ) => void;
    onToggle?: (
        isFavorite: boolean,
        favoriteId: number | null
    ) => void;
}

export default function FavoriteButton({
    car,
    onRemove,
    onToggle,
}: Props) {

    const [isFavorite, setIsFavorite] =
        useState(
            car.is_favorite ?? false
        );

    const [favoriteId, setFavoriteId] =
        useState<number | null>(
            car.favorite_id ?? null
        );

    const [isLoading, setIsLoading] =
        useState(false);

    // Keep local state in sync if parent updates `car` prop
    useEffect(() => {
        setIsFavorite(car.is_favorite ?? false);
        setFavoriteId(car.favorite_id ?? null);
    }, [car.is_favorite, car.favorite_id]);

    async function toggleFavorite(
        e: React.MouseEvent
    ) {
        e.preventDefault();
        e.stopPropagation();

        const token =
            localStorage.getItem(
                "access"
            );

        if (!token) {
            alert("Login required");
            return;
        }

        setIsLoading(true);

        try {
            if (isFavorite && favoriteId) {
                // optimistic UI: keep favoriteId until server confirms
                const idToDelete = favoriteId;
                setIsFavorite(false);

                await api.delete(
                    `/cars/favorites/${idToDelete}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setFavoriteId(null);
                onRemove?.(idToDelete);
                onToggle?.(false, null);

            } else {
                // optimistic UI
                setIsFavorite(true);

                const response = await api.post(
                    "/cars/favorites/",
                    { car: car.id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // handle different possible response shapes
                const newId =
                    response?.data?.id ??
                    response?.data?.favorite_id ??
                    response?.data?.pk ??
                    null;

                setFavoriteId(newId);
            }

            } catch (error: any) {
            console.error(error);

            // rollback optimistic change
            setIsFavorite((prev) => !prev);

            const serverMessage =
                error?.response?.data?.detail ||
                error?.response?.data?.message ||
                error?.message ||
                "Unable to update favorite. Please try again.";

            alert(serverMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <button
            type="button"
            onClick={toggleFavorite}
            disabled={isLoading}
            aria-busy={isLoading}
            className={`
                p-2
                rounded-full
                transition
                ${isLoading ? "opacity-60 cursor-wait" : "hover:scale-110"}
            `}
        >
            <Heart
                size={20}
                fill={isFavorite ? "currentColor" : "none"}
                className={isFavorite ? "text-pink-500 drop-shadow-[0_0_12px_rgba(219,39,119,0.45)]" : "text-cyan-300/80"}
                aria-pressed={isFavorite}
            />
        </button>
    );
}