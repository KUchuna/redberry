import NewListingForm from "./NewListingForm";

export default function NewListingSection() {
    return (
        <section className="py-20 px-40 w-full flex justify-center">
        <div className="max-w-[1920px] flex justify-between items-center w-full">
            <NewListingForm />
        </div>
    </section>
    )
}