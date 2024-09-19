"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */


import { ListingCardsSectionProps, Listings } from "@/types";
import ListingCard from "./ListingCard";

const filterListings = (listings: Listings[], filters: any) => {
  const {
    bedrooms = undefined,
    regions = [],
    minPrice = undefined,
    maxPrice = undefined,
    minArea = undefined,
    maxArea = undefined
  } = filters || {};

  return listings.filter((listing) => {
    const matchesBedrooms = bedrooms ? listing.bedrooms === parseInt(bedrooms) : true;
    const matchesRegions = regions.length > 0 ? regions.includes(listing.city.region_id.toString()) : true;
    const matchesMinPrice = minPrice ? listing.price >= parseFloat(minPrice) : true;
    const matchesMaxPrice = maxPrice ? listing.price <= parseFloat(maxPrice) : true;
    const matchesMinArea = minArea ? listing.area >= parseFloat(minArea) : true;
    const matchesMaxArea = maxArea ? listing.area <= parseFloat(maxArea) : true;

    return matchesBedrooms && matchesRegions && matchesMinPrice && matchesMaxPrice && matchesMinArea && matchesMaxArea;
  });
};

export default function ListingCardsSection({ listings, activeFilters }: ListingCardsSectionProps) {
  const filteredListings = filterListings(listings, activeFilters);

  return (
    <div className="py-8 grid grid-cols-3 w-full gap-x-5 gap-y-5">
      {filteredListings.length > 0 ? (
        filteredListings.map((listing) => (
          <ListingCard 
            listing={listing}
            key={listing.id}
          />
        ))
      ) : (
        <p className="text-[#021526CC] text-xl">აღნიშნული მონაცემებით განცხადება არ იძებნება</p>
      )}
    </div>
  );
}
