export interface Car {
    id: string; // Django PK uuid or auto-increment ID
    title: string;
    brand: string;
    model: string;
    variant: string;
    manufacture_year: number;
    registration_year?: number;
    price: number; // decimal converted to number
    kms_driven: number;
    fuel_type: string;
    transmission: string;
    owner_type: string;
    city: string;
    engine_capacity: string;
    color: string;
    insurance_validity: string;
    description: string;
    marketplace: string;
    source_url: string;
    posting_date?: string;
    scraped_at?: string;
    created_at?: string;
    
    // Related lists (Django prefetch inline)
    images?: CarImage[];
    features?: CarFeature[];
    service_history?: ServiceHistory;
    specifications?: CarSpecification;
    
    //fav
    is_favorite?: boolean;
    favorite_id?: number | null;
}

export interface CarImage {
    id: string;
    car: string; // Foreign Key relation ID
    image_url: string;
    order: number;
}

export interface CarFeature {
    id: string;
    car: string;
    name: string;
}

export interface ServiceHistory {
    id: string;
    car: string;
    last_service_date?: string;
    authorized_service: boolean;
    notes: string;
}

export interface CarSpecification {
    id: string;
    car: string;
    data: Record<string, string | number | boolean>; // Django dynamic JSONField
}

export interface Favorite {
    user_id: string;
    car_id: string;
    created_at: string;
}

export interface RecentlyViewed {
    user_id: string;
    car_id: string;
    viewed_at: string;
}
