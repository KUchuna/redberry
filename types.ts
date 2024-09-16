export interface Region {
    id: number;
    name: string;
}

export interface City {
    id: number;
    name: string;
    region_id: number;
    region: Region
}

export interface Listings {
    id: number;
    address: string;
    zip_code: string;
    price: number;
    area: number;
    bedrooms: number;
    image: string;
    is_rental: number;
    city_id: number;
    city: City;
}

export interface ListingCardProps {
    listing: Listings;
}

export interface ListingCardsSectionProps {
    listings: Listings[]
}

export interface Region {
    id: number;
    name: string;
}

export interface FiltersProps {
    regions: Region[]
}

export interface Regions {
    id: number;
    name: string;
}

export interface Cities {
    id: number;
    name: string;
    region_id: number;
}

export interface Agents {
    id: number;
    name: string;
    surname: string;
    avatar: string;
}

export interface ListingFormProps {
    regions: Regions[];
    cities: Cities[];
    agents: Agents[];
}