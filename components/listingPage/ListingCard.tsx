import { ListingCardProps } from "@/types";
import Image from "next/image";

export default function ListingCard({listing}: ListingCardProps) {
    return (
        <div className="flex flex-col">
            <Image src={listing.image} alt="" width={100} height={100}/>
        </div>
    )
}