"use client"

import { ListingCardProps } from "@/types";
import Image from "next/image";
import location from "@/public/assets/location.svg"
import bed from "@/public/assets/bed.svg"
import area from "@/public/assets/area.svg"
import zip from "@/public/assets/zipcode.svg"
import { useRouter } from "next/navigation";

export default function ListingCard({listing}: ListingCardProps) {

    const router = useRouter()
    function handleClick() {
        router.push(`/listings/${listing.id}`)
    }

    const formattedPrice = new Intl.NumberFormat('en-US').format(listing.price);

    return (
        <div className="flex flex-col rounded-[14px] cursor-pointer hover:[box-shadow:5px_5px_12px_0px_#02152614] transition-all duration-150 relative dark:bg-zinc-600" onClick={handleClick}>
            <span className="absolute bg-[rgba(2,_21,_38,_0.5)] px-[0.625rem] py-1 rounded-2xl text-white z-10 top-[1.425rem] left-[1.425rem]">{listing.is_rental == 0 ? "იყიდება" : "ქირავდება"}</span>
            <Image src={listing.image} alt="" priority quality={100} width={100} height={100} unoptimized className="h-[307px] w-full object-cover rounded-t-[14px]"/>
            <div className="flex flex-col gap-5 py-[1.5rem] pl-6 border-[#DBDBDB] dark:border-zinc-600 border border-t-0 rounded-b-[14px]">
                <span className="font-bold text-2xl -mb-4">{formattedPrice} ₾</span>
                <span className="text-[#021526B2] dark:text-white flex items-center gap-1"><Image src={location} alt="" /> {listing.address}</span>
                <div className="flex gap-8">
                    <span className="text-[#021526B2] dark:text-white flex items-center gap-1"><Image src={bed} alt=""/>{listing.bedrooms}</span>
                    <span className="text-[#021526B2] dark:text-white flex items-center gap-1"><Image src={area} alt=""/>{listing.area}</span>
                    <span className="text-[#021526B2] dark:text-white flex items-center gap-1"><Image src={zip} alt=""/>{listing.zip_code}</span>
                </div>
            </div>
        </div>
    )
}