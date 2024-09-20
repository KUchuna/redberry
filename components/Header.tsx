import logo from "@/public/assets/logo.svg"
import Image from "next/image"
import Link from "next/link"
import ThemeSwitch from "./ThemeChanger"

export default function Header() {
    return (
        <header className="py-10 flex border-b-[1px] border-[#DBDBDB] px-40 justify-center dark:bg-[#0A0A0A] dark:border-zinc-600 sticky top-0 bg-white z-[300]">
            <div className="max-w-[1920px] w-full flex items-center">
                <Link href="/" className="">
                    <Image src={logo} alt="Redberry" />
                </Link>
            </div>
            <ThemeSwitch />
        </header>
    )
}