import { getListings, getRegions } from "@/api";
import Filters from "./Filters";
import ListingButtons from "./ListingButtons";
import ListingCardsSection from "./ListingCardsSection";

export default async function ListingSection() {

    const regionsData = await getRegions()
    const listingsData = await getListings()

    return (
        <section className="py-20 px-40 w-full flex justify-center">
            <div className="max-w-[1920px] flex flex-col justify-between items-center w-full">
                <div className="flex w-full justify-between">
                    <Filters 
                        regions={regionsData.regions}
                    />
                    <ListingButtons />
                </div>
                <ListingCardsSection 
                    listings={listingsData.listings}
                />
            </div>
        </section>
    )
}