import { getListing, getListings } from "@/api"
import { Listings } from "@/types"

export async function generateStaticParams() {
    const listings = await getListings()
   
    return listings.map((listing: Listings) => ({
      listingId: listing.id,
    }))
  }



export default async function ListingPage({params}: {params: {listingId: string};}) {

    const response = await getListing(params.listingId)
    
    const listing = await response.json()

    return (
        <div>
            {listing.address}
        </div>
    )
}