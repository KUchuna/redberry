import { ListingCardsSectionProps } from "@/types";
import ListingCard from "./ListingCard";

export default function ListingCardsSection({listings}: ListingCardsSectionProps) {
    return (
        <div className="p-8">
            {listings.map((listing) => (
                <ListingCard 
                    listing={listing}
                    key={listing.id}
                />
            ))}
        </div>
    )
}