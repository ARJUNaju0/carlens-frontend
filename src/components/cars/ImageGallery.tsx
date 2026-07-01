"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageItem {
    id?: number | string;
    image_url?: string;
}

interface Props {
    images?: ImageItem[];
}

export default function ImageGallery({ images = [] }: Props) {
    const [index, setIndex] = useState(0);

    const main = images[index]?.image_url || "/placeholder-car.jpg";
    const count = images.length;

    function prev() {
        if (count === 0) return;
        setIndex((i) => (i - 1 + count) % count);
    }

    function next() {
        if (count === 0) return;
        setIndex((i) => (i + 1) % count);
    }

    return (
        <div>
            <div className="relative">
                <img
                    src={main}
                    alt={`Car image ${index + 1}`}
                    className="w-full h-[520px] object-cover rounded-3xl ring-1 ring-cyan-700/20"
                />

                {count > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                prev();
                            }}
                            aria-label="Previous image"
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-cyan-300 rounded-full p-2 shadow-[0_6px_20px_rgba(2,6,23,0.6)]"
                        >
                            <ChevronLeft size={22} />
                        </button>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                next();
                            }}
                            aria-label="Next image"
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-cyan-300 rounded-full p-2 shadow-[0_6px_20px_rgba(2,6,23,0.6)]"
                        >
                            <ChevronRight size={22} />
                        </button>
                    </>
                )}
            </div>

            {images && images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto">
                    {images.map((image, i) => (
                        <button
                            key={image.id ?? i}
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setIndex(i);
                            }}
                            className={`flex-shrink-0 rounded-xl border ${i === index ? "ring-2 ring-cyan-400/60" : "border-transparent"}`}
                        >
                            <img
                                src={image.image_url}
                                alt={`Thumbnail ${i + 1}`}
                                className="h-24 min-w-[120px] object-cover rounded-xl"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
