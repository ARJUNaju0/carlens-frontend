"use client";

import { useEffect, useState } from "react";
import CarCard from "@/components/cars/CarCard";
import api from "@/lib/api";

export default function DemoListings() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    loadCars();
  }, []);

  async function loadCars() {
    try {
      const response = await api.get("/cars/");
      setCars(response.data);
    } catch (error) {
      console.error(error);
    }
  }

    return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-3xl md:text-5xl font-bold text-center">Available Cars</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {cars.map((car: any) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}