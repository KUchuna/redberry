"use client"

import { ListingCardsSectionProps } from "@/types"
import ListingCard from "../listingsPage/ListingCard"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { useCallback } from "react"
import Image from "next/image"
import arrowr from "@/public/assets/arrowr.svg"

export default function ListingsCarousel({listings}: ListingCardsSectionProps) {

    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true})

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
      }, [emblaApi])
    
      const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
      }, [emblaApi])

    return (
        <section className="pb-20 px-40 w-full flex justify-start">
            <div className="max-w-[1920px] flex flex-col justify-start items-start w-full gap-7 relative">
                <h1 className="font-bold text-3xl">ბინები მსგავს ლოკაციაზე</h1>
                <motion.button 
                    className="bg-primary rounded-full p-[12px] absolute top-[44%] translate-y-[-44%] left-[-5%] z-10" 
                    onClick={scrollPrev}
                    whileTap={{scale: 0.9}}
                    whileHover={{scale: 1.1}}
                    >
                        <Image src={arrowr} alt="Next" className="rotate-[180deg]"/>
                </motion.button>
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
                <motion.button 
                        className="bg-primary rounded-full p-[12px] absolute top-[40%] translate-y-[-40%] right-[-5%] z-10" 
                        onClick={scrollNext}
                        whileTap={{scale: 0.9}}
                        whileHover={{scale: 1.1}}
                        >
                        <Image src={arrowr} alt="Next"/>
                </motion.button>
            </div>
        </section>
    )
}