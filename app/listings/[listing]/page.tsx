import { getListing, getListings } from "@/api"
import ListingInfo from "@/components/listingPage/ListingInfo";
import { Listings } from "@/types"

export async function generateStaticParams() {

  const listingsData = await getListings()


  const listings = await listingsData.listings

  return listings.map((listing: Listings) => {
    return {
      listingId: listing.id.toString(),
    };
  });
}



export default async function ListingPage({params}: {params: {listing: string};}) {

  const listingData = await getListing(params.listing)
  
  const listing = listingData.listing

  return (
      <main>
        <ListingInfo 
          listing={listing}
        />
      </main>
  )
}


