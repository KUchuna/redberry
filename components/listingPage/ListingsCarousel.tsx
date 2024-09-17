"use client"

import { ListingCardsSectionProps } from "@/types"
import ListingCard from "../listingsPage/ListingCard"
import useEmblaCarousel from "embla-carousel-react"

export default function ListingsCarousel({listings}: ListingCardsSectionProps) {

    const [emblaRef] = useEmblaCarousel({loop: true})

    return (
        <section className="pb-20 px-40 w-full flex justify-start">
            <div className="max-w-[1920px] flex flex-col justify-start items-start w-full gap-7">
                <h1 className="font-bold text-3xl">ბინები მსგავს ლოკაციაზე</h1>
                {listings.length > 0 ?
                    <div className="w-full h-[30rem] relative overflow-x-hidden font-lato" ref={emblaRef}>
                        <div className="flex gap-5 h-full w-full absolute">
                            {listings.map((listing, index) => (
                                <div key={listing.id} className={`flex-[0_0_30%] select-none ${
                                    index === listings.length - 1 && 'mr-5'}`}>
                                        <ListingCard 
                                            listing={listing}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                    :
                    <p>მსგავსი სახლები არ მოიძებნა</p>
                }
            </div>
        </section>
    )
}