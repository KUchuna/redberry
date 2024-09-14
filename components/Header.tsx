import logo from "@/public/assets/logo.svg"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
    return (
        <header className="py-10 flex justify-center border-b-[1px] border-[#DBDBDB] px-40">
            <div className="max-w-[1920px] w-full">
                <Link href="/">
                    <Image src={logo} alt="Redberry" />
                </Link>
            </div>
        </header>
    )
}