"use client";

import { FiltersInterface, ListingSharedProps } from "@/types";
import Filters from "./Filters";
import ListingButtons from "./ListingButtons";
import ListingCardsSection from "./ListingCardsSection";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import cross from "@/public/assets/cross.svg"
import Image from "next/image"

export default function ListingShared({ regions, listings }: ListingSharedProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState<FiltersInterface>({
        bedrooms: undefined,
        regions: [],
        minPrice: undefined,
        maxPrice: undefined,
        minArea: undefined,
        maxArea: undefined,
    });

    useEffect(() => {
        const params = {
        bedrooms: searchParams.get("bedrooms") || undefined,
        regions: searchParams.get("regions") ? searchParams.get("regions")?.split(",") : [],
        minPrice: searchParams.get("minPrice") || undefined,
        maxPrice: searchParams.get("maxPrice") || undefined,
        minArea: searchParams.get("minArea") || undefined,
        maxArea: searchParams.get("maxArea") || undefined,
        };

        setFilters(params);

        if (Object.values(params).every(value => value === undefined || value.length === 0)) {
        router.push("/");
        }
    }, [searchParams, router]);

    const handleClearFilter = (filterKey: keyof FiltersInterface) => {
      // Create a copy of the current filters
      const newFilters = { ...filters };
  
      // Clear the specific filter
      newFilters[filterKey] = undefined;
  
      // Clear related filters based on the key
      if (filterKey === 'minPrice') {
          newFilters['maxPrice'] = undefined;
      } else if (filterKey === 'minArea') {
          newFilters['maxArea'] = undefined;
      }
  
      // Update the state with the new filters
      setFilters(newFilters);
  
      // Create a new URLSearchParams object and set the updated filters
      const params = new URLSearchParams();
  
      Object.entries(newFilters).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
              params.set(key, value.toString());
          }
      });
  
      // Check if no filters are present, and redirect accordingly
      if (params.toString() === "") {
          router.push("/");
      } else {
          router.push(`?${params.toString()}`);
      }
  };
  

    const hasActiveFilters = Object.values(filters).some(value => (Array.isArray(value) ? value.length > 0 : value !== undefined && value !== ""));



  return (
    <>
      <div className="flex w-full justify-between items-start">
          <div>
              <Filters
              regions={regions}
              />
                <div className="flex w-full mt-4 gap-2">
                    {Object.entries(filters).map(([key, value]) => {
                    if (value === undefined || (Array.isArray(value) && value.length === 0))
                    return null;
                    let displayText;
                    if (key === 'regions') {
                      displayText = `რეგიონი`;
                    } else if (key === 'bedrooms') {
                      displayText = `${value}`;
                    } else if (key === 'minArea') {
                      displayText = <span>{searchParams.get('minArea')} მ<sup>2</sup> - {searchParams.get('maxArea')} მ<sup>2</sup></span>
                    } else if (key === 'minPrice') {
                      displayText = <span>{searchParams.get('minPrice')}₾ - {searchParams.get('maxPrice')}₾</span>
                    }
                    return (
                      displayText != null && 
                        <button
                            key={key}
                            className="border border-[#DBDBDB] rounded-[43px] px-[0.625rem] py-[0.375rem] flex gap-1 items-center text-[#021526CC]"
                        >
                            {displayText} <Image src={cross} alt="" onClick={() => handleClearFilter(key as keyof FiltersInterface)}/>
                        </button>
                    );
                    })}
                    {hasActiveFilters &&
                        <button
                        onClick={() => {
                            setFilters({
                            bedrooms: undefined,
                            regions: [],
                            minPrice: undefined,
                            maxPrice: undefined,
                            minArea: undefined,
                            maxArea: undefined,
                            });
                            router.replace("/")
                        }}
                        className="ml-4 font-[500]"
                        >
                        გასუფთავება
                        </button>
                    }
                </div>
            </div>
          <ListingButtons />
        </div>
      <ListingCardsSection
        listings={listings}
        activeFilters={filters}
      />
    </>
  );
}
