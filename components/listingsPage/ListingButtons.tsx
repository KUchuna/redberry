"use client"

import Link from "next/link";
import { useState } from "react";
import AgentModal from "./AgentModal";

export default function ListingButtons() {

    const [active, setActive] = useState(false)
    
    const toggleModal = () => setActive(!active) 

    return (
        <div className="flex items-center gap-4">
            <Link href="/newlisting" className="bg-primary hover:bg-primary-hover border-[1px] text-white px-4 py-[0.875rem] rounded-[10px]">+ ლისტინგის დამატება</Link>
            <button className="border-[1px] border-primary hover:bg-primary hover:text-white text-primary px-4 py-[0.875rem] rounded-[10px]" onClick={() => setActive(!active)}>+ აგენტის დამატება</button>
            {active && 
                <AgentModal 
                    onClose={toggleModal}
                />
            }
        </div>
    )
}