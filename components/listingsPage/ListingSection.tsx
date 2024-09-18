import { getListings, getRegions } from "@/api";
import ListingShared from "./ListingShared";

export default async function ListingSection() {

    const regionsData = await getRegions()
    const listingsData = await getListings()

    return (
        <section className="py-20 px-40 w-full flex justify-center">
            <div className="max-w-[1920px] flex flex-col justify-between items-center w-full">
                <ListingShared 
                    regions={regionsData.regions}
                    listings={listingsData.listings}
                />
            </div>
        </section>
    )
}