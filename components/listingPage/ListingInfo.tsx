"use client"

import { ListingInfoProps } from "@/types";
import Image from "next/image";
import location from "@/public/assets/location.svg"
import bed from "@/public/assets/bed.svg"
import area from "@/public/assets/area.svg"
import zip from "@/public/assets/zipcode.svg"
import email from "@/public/assets/email.svg"
import phone from "@/public/assets/phone.svg"
import back from "@/public/assets/back.svg"
import Link from "next/link";
import { deleteListingAction } from "@/app/actions";
import { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";

export default function ListingInfo({listing}: ListingInfoProps) {

    const created_at = listing.created_at
    const date = new Date(created_at);
    const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${String(date.getFullYear()).slice(-2)}`;

    const formattedPrice = new Intl.NumberFormat('en-US').format(listing.price);

    const formattedPhoneNumber = listing.agent.phone?.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");

    async function handleDelete(id:number) {
        await deleteListingAction(id)
    }

    const [active, setActive] = useState(false)
    
    const toggleModal = () => setActive(!active)

    return (
        <section className="py-20 px-40 w-full flex justify-start">
            <div className="max-w-[1920px] flex flex-col justify-start items-start w-full gap-7">
                <Link href="/">
                    <Image src={back} alt="" className="dark:bg-zinc-500 rounded-full"/>
                </Link>
                <div className="flex w-full justify-start items-start gap-16 max-h-[700px] min-h-[700px] h-full">
                    <div className="w-[50%] justify-between h-full overflow-hidden flex flex-col items-end gap-3">
                        <div className="h-full overflow-hidden w-full">
                            <Image src={listing.image} alt="" width={100} height={100} unoptimized className="rounded-t-[14px] w-full h-full object-cover"/>
                        </div>
                        <span className="text-[#808A93]">გამოქვეყნების თარიღი {formattedDate}</span>
                    </div>
                    <div className="flex flex-col w-[30%] h-full">
                        <span className="font-bold text-[#021526] dark:text-slate-200 text-5xl">{formattedPrice} ₾</span>
                        <div className="flex flex-col gap-4 mt-6 mb-10 dark:bg-zinc-700 dark:p-3 rounded-2xl">
                            <span className="text-[#021526B2] dark:text-slate-200 flex items-center gap-1 text-2xl"><Image src={location} alt="" /> {listing.address}</span>
                            <span className="text-[#021526B2] dark:text-slate-200 flex items-center gap-1 text-2xl"><Image src={area} alt="" /> ფართი {listing.area} მ<sup>2</sup></span>
                            <span className="text-[#021526B2] dark:text-slate-200 flex items-center gap-1 text-2xl"><Image src={bed} alt="" /> საძინებელი {listing.bedrooms}</span>
                            <span className="text-[#021526B2] dark:text-slate-200 flex items-center gap-1 text-2xl"><Image src={zip} alt="" /> საფოსტო ინდექსი {listing.zip_code}</span>
                        </div>
                        <p className="text-[#808A93] text-lg mb-12">
                            {listing.description}
                        </p>
                        <div className="border border-[#DBDBDB] rounded-[8px] py-6 px-5 w-full mt-auto">
                            <div className="flex gap-4 items-center mb-4">
                                <div className="w-20 h-20 overflow-hidden rounded-full flex justify-center items-center">
                                    <Image src={listing.agent.avatar} alt="" width={72} height={72} className="rounded-full object-cover w-full h-full"/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#021526] dark:text-slate-200">{listing.agent.name} {listing.agent.surname}</span>
                                    <span className="text-[#808A93]">აგენტი</span>
                                </div>
                            </div>
                            <div>
                                <span className="text-[#808A93] flex gap-1"><Image src={email} alt="" /> {listing.agent.email}</span>
                                <span className="text-[#808A93] flex gap-1"><Image src={phone} alt="" /> {formattedPhoneNumber}</span>
                            </div>
                        </div>
                        <div className="mt-5">
                            <button className="border border-[#676E76] text-[#808A93] hover:text-white hover:bg-[#808A93] rounded-[8px] p-[0.625rem]" onClick={() => setActive(!active)}>
                                ლისტინგის წაშლა
                            </button>
                        </div>
                    </div>
                </div>    
            </div>
            {active && 
                <DeleteConfirmation 
                    onClose={toggleModal}
                    handleDelete={handleDelete}
                    id={listing.id}
                />
            }
        </section>
    )
}