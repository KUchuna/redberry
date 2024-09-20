"use client"

import { ListingCardsSectionProps } from "@/types"
import ListingCard from "../listingsPage/ListingCard"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import arrowr from "@/public/assets/arrowr.svg"
import { EmblaCarouselType } from "embla-carousel"

export default function ListingsCarousel({listings}: ListingCardsSectionProps) {

    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true})
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(false)
    
    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
      }, [emblaApi])
    
      const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
      }, [emblaApi])

      const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
      }, [])
    
      useEffect(() => {
        if (!emblaApi) return
    
        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect).on('select', onSelect)
      }, [emblaApi, onSelect])


    return (
        <section className="pb-20 px-40 w-full flex justify-start">
            <div className="max-w-[1920px] flex flex-col justify-start items-start w-full gap-7 relative">
                <h1 className="font-bold text-3xl">ბინები მსგავს ლოკაციაზე</h1>
                <motion.button 
                    className={`rounded-full dark:bg-zinc-500 p-[12px] absolute top-[50%] translate-y-[-50%] left-[-5%] z-10 ${prevBtnDisabled && "pointer-events-none"}`} 
                    onClick={scrollPrev}
                    disabled={prevBtnDisabled}
                    whileHover={{background: "#808A93"}}
                    >
                        <Image src={arrowr} alt="Prev"/>
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
                        className={`rounded-full p-[12px] absolute top-[50%] translate-y-[-50%] right-[-5%] dark:bg-zinc-500 z-10 ${nextBtnDisabled && "pointer-events-none"}`} 
                        onClick={scrollNext}
                        disabled={nextBtnDisabled}
                        whileHover={{background: "#808A93"}}
                        >
                        <Image src={arrowr} alt="Next" className="rotate-180"/>
                </motion.button>
            </div>
        </section>
    )
}