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
    region_id?: number;
}

export interface ListingCardProps {
    listing: Listings;
}

interface ListingsForListingPage extends Listings {
    created_at: string;
    description: string
    agent: Agents
}

export interface ListingInfoProps {
    listing: ListingsForListingPage
}

export interface ListingCardsSectionProps {
    listings: Listings[]
    activeFilters?: FiltersInterface | undefined
}

export interface ListingSharedProps extends FiltersProps {
    listings: Listings[];
}

export interface Region {
    id: number;
    name: string;
}

export interface FiltersProps {
    regions: Region[];
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
    email?: string;
    phone?: string;
}

export interface ListingFormProps {
    regions: Regions[];
    cities: Cities[];
    agents: Agents[];
}

export interface FiltersInterface {
    bedrooms?: string;
    regions?: string[];
    minPrice?: string;
    maxPrice?: string;
    minArea?: string;
    maxArea?: string;
};