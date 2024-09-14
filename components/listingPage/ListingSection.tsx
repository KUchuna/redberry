import { getRegions } from "@/api";
import Filters from "./Filters";
import ListingButtons from "./ListingButtons";

export default async function ListingSection() {

    const regionsData = await getRegions()

    return (
        <section className="py-20 px-40 w-full flex justify-center">
            <div className="max-w-[1920px] flex justify-between items-center w-full">
                <Filters 
                    regions={regionsData.regions}
                />
                <ListingButtons />
            </div>
        </section>
    )
}