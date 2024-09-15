import { getAgents, getCities, getRegions } from "@/api";
import NewListingForm from "./NewListingForm";

export default async function NewListingSection() {

    const regionsData = await getRegions()
    const regions = regionsData.regions

    const citiesData = await getCities()
    const cities = citiesData.cities

    const agentsData = await getAgents()
    const agents = agentsData.agents

    return (
        <section className="py-20 px-40 w-full flex justify-center">
        <div className="max-w-[1920px] flex flex-col justify-center items-start w-full gap-14">
        <h1 className="text-3xl font-bold text-center w-full">ლისტინგის დამატება</h1>
            <NewListingForm 
                regions={regions}
                cities={cities}
                agents={agents}
            />
        </div>
    </section>
    )
}