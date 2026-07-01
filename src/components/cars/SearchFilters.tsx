interface SearchFiltersProps {
    filters: {
        query: string;
        brand: string;
        model: string;
        fuelType: string;
        city: string;
        minPrice: string;
        maxPrice: string;
    };
    onFiltersChange: (filters: SearchFiltersProps["filters"]) => void;
}

export default function SearchFilters({
    filters,
    onFiltersChange,
}: SearchFiltersProps) {
    const handleChange = (
        key: keyof SearchFiltersProps["filters"],
        value: string
    ) => {
        onFiltersChange({
            ...filters,
            [key]: value,
        });
    };

    const handleReset = () => {
        onFiltersChange({
            query: "",
            brand: "",
            model: "",
            fuelType: "",
            city: "",
            minPrice: "",
            maxPrice: "",
        });
    };

    return (
        <div className="bg-white text-slate-900 border border-slate-200 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                    <p className="text-sm font-semibold text-slate-400">Filter cars</p>
                    <p className="text-xs text-slate-400">Brand, model, fuel, city, price</p>
                </div>
                <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-semibold text-slate-900 px-3 py-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-300 transition"
                >
                    Clear
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-xs font-medium text-slate-400 mb-2 block">Search</label>
                    <input
                        value={filters.query}
                        onChange={(e) => handleChange("query", e.target.value)}
                        placeholder="Search by brand, model or city"
                        className="w-full border border-slate-200 rounded-2xl bg-slate-50 px-4 py-3 outline-none text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                        <label className="text-xs font-medium text-slate-400 mb-2 block">Brand</label>
                        <input
                            value={filters.brand}
                            onChange={(e) => handleChange("brand", e.target.value)}
                            placeholder="Brand"
                            className="w-full border border-slate-200 rounded-2xl bg-slate-50 px-4 py-3 outline-none text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-slate-400 mb-2 block">Model</label>
                        <input
                            value={filters.model}
                            onChange={(e) => handleChange("model", e.target.value)}
                            placeholder="Model"
                            className="w-full border border-slate-200 rounded-2xl bg-slate-50 px-4 py-3 outline-none text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                        <label className="text-xs font-medium text-slate-400 mb-2 block">Fuel type</label>
                        <select
                            value={filters.fuelType}
                            onChange={(e) => handleChange("fuelType", e.target.value)}
                            className="w-full border border-slate-200 rounded-2xl bg-slate-50 px-4 py-3 outline-none text-slate-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="">Any fuel</option>
                            <option value="petrol">Petrol</option>
                            <option value="diesel">Diesel</option>
                            <option value="electric">Electric</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="cng">CNG</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-slate-400 mb-2 block">City</label>
                        <input
                            value={filters.city}
                            onChange={(e) => handleChange("city", e.target.value)}
                            placeholder="City"
                            className="w-full border border-slate-200 rounded-2xl bg-slate-50 px-4 py-3 outline-none text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                        <label className="text-xs font-medium text-slate-400 mb-2 block">Min price</label>
                        <input
                            value={filters.minPrice}
                            onChange={(e) => handleChange("minPrice", e.target.value)}
                            placeholder="Min price"
                            type="number"
                            className="w-full border border-slate-200 rounded-2xl bg-slate-50 px-4 py-3 outline-none text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-slate-400 mb-2 block">Max price</label>
                        <input
                            value={filters.maxPrice}
                            onChange={(e) => handleChange("maxPrice", e.target.value)}
                            placeholder="Max price"
                            type="number"
                            className="w-full border border-slate-200 rounded-2xl bg-slate-50 px-4 py-3 outline-none text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
