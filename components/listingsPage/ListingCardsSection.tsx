import { ListingCardsSectionProps } from "@/types";
import ListingCard from "./ListingCard";

export default function ListingCardsSection({listings}: ListingCardsSectionProps) {
    return (
        <div className="py-8 grid grid-cols-3 w-full gap-x-5 gap-y-5">
            {listings.map((listing) => (
                <ListingCard 
                    listing={listing}
                    key={listing.id}
                />
            ))}
        </div>
    )
}