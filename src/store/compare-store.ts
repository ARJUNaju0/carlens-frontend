import { create } from "zustand";
import api from "@/lib/api";
import { Car } from "@/types/Car";

interface CompareStore {
    cars: Car[];

    loadCars: (isLoggedIn: boolean) => Promise<void>;

    addCar: (
        car: Car,
        isLoggedIn: boolean
    ) => Promise<void>;

    removeCar: (
        id: string,
        isLoggedIn: boolean
    ) => Promise<void>;

    clearCars: (
        isLoggedIn: boolean
    ) => Promise<void>;

    setCars: (cars: Car[]) => void;
}

export const useCompareStore = create<CompareStore>((set, get) => ({
    cars: [],

    loadCars: async (isLoggedIn) => {
        if (!isLoggedIn) return;

        try {
            const response = await api.get("/cars/compare/");

            set({
                cars: response.data.map(
                    (item: any) => item.car
                ),
            });
        } catch (error) {
            console.error(error);
        }
    },

    addCar: async (car, isLoggedIn) => {
        const cars = get().cars;

        if (cars.find((c) => c.id === car.id)) return;

        if (cars.length >= 3) return;

        try {
            if (isLoggedIn) {
                await api.post("/cars/compare/add/", {
                    car: car.id,
                });
            }

            set({
                cars: [...cars, car],
            });
        } catch (error) {
            console.error(error);
        }
    },

    removeCar: async (id, isLoggedIn) => {
        try {
            if (isLoggedIn) {
                await api.delete(`/cars/compare/${id}/`);
            }

            set((state) => ({
                cars: state.cars.filter(
                    (car) => car.id !== id
                ),
            }));
        } catch (error) {
            console.error(error);
        }
    },

    clearCars: async (isLoggedIn) => {
        try {
            if (isLoggedIn) {
                const cars = get().cars;

                await Promise.all(
                    cars.map((car) =>
                        api.delete(`/cars/compare/${car.id}/`)
                    )
                );
            }

            set({
                cars: [],
            });
        } catch (error) {
            console.error(error);
        }
    },

    setCars: (cars) =>
        set({
            cars,
        }),
}));