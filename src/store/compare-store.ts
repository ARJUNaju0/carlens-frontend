import { create } from "zustand";
import { Car } from "@/types/Car";

interface CompareStore {
    cars: Car[];

    addCar: (car: Car) => void;

    removeCar: (carId: string) => void;

    clearCars: () => void;
}

export const useCompareStore =
    create<CompareStore>((set) => ({
        cars: [],

        addCar: (car) =>
            set((state) => {
                const exists = state.cars.some(
                    (c) => c.id === car.id
                );

                if (exists) {
                    return state;
                }

                return {
                    cars: [
                        ...state.cars,
                        car,
                    ].slice(0, 3),
                };
            }),

        removeCar: (carId) =>
            set((state) => ({
                cars: state.cars.filter(
                    (car) => car.id !== carId
                ),
            })),

        clearCars: () => set({ cars: [] }),
    }));