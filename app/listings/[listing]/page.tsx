import { getListing, getListings } from "@/api"
import ListingInfo from "@/components/listingPage/ListingInfo";
import ListingsCarousel from "@/components/listingPage/ListingsCarousel";
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

  const listingData = await getListing(params.listing);
  const listing = listingData.listing;

  const allListingsData = await getListings();
  const allListings = allListingsData.listings;


  const regionId = listing.city.region_id;
  

  const similarListings = await allListings.filter(
    (item: Listings) => item.city.region_id == parseInt(regionId) && item.id !== listing.id
  );


  return (
      <main>
        <ListingInfo 
          listing={listing}
        />
        <ListingsCarousel 
          listings={similarListings}
        />
      </main>
  )
}


