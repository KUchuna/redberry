import logo from "@/public/assets/logo.svg"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
    return (
        <header className="py-10 flex justify-start border-b-[1px] border-[#DBDBDB] px-40">
            <div className="max-w-[1920px] w-full flex">
                <Link href="/" className="">
                    <Image src={logo} alt="Redberry" />
                </Link>
            </div>
        </header>
    )
}