"use client"

import { useState } from "react";
import Image from "next/image";
import uparrow from "@/public/assets/uparrow.svg";
import downarrow from "@/public/assets/downarrow.svg";
import { motion } from "framer-motion";


const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

interface Region {
    id: number;
    name: string;
}

interface FiltersProps {
    regions: Region[]
}

export default function Filters({regions}: FiltersProps) {

    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    const toggleFilter = (filter: string) => {
      setActiveFilter(filter === activeFilter ? null : filter);
    };
    
    const filterItems = [
        { id: "region", label: "რეგიონი"},
        { id: "price", label: "საფასო კატეგორია"},
        { id: "area", label: "ფართობი"},
        { id: "bedrooms", label: "საძინებლების რაოდენობა"},
      ];

    return (
      <div className="relative">
        <ul className="flex border-[1px] border-[#DBDBDB] w-full p-[0.375rem] gap-6 rounded-[10px] select-none">
          {filterItems.map((item) => (
            <li
              key={item.id}
              onClick={() => toggleFilter(item.id)}
              className={`flex gap-1 cursor-pointer py-2 px-[0.875rem] rounded-md relative`}
            >
              {item.label}
              <Image src={activeFilter === item.id ? uparrow : downarrow} alt="" />
              {activeFilter === item.id && (
                <motion.div
                  layoutId="background"
                  className="absolute inset-0 bg-[#F3F3F3] rounded-md -z-10"
                />
              )}
            </li>
          ))}
        </ul>

        {activeFilter === "region" && (
           <motion.div
           variants={dropdownVariants}
           initial="hidden"
           animate="visible"
           transition={{ duration: 0.3 }}
           className="absolute left-0 mt-2 border p-4 w-fit rounded-[10px] filter"
         >
            <span className="font-bold text-lg">რეგიონის მიხედვით</span>
            <div className="grid grid-cols-3 gap-x-12 gap-y-4 py-6">
                {regions.map((region: Region) => (
                    <div key={region.id} className="flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            id={`region-${region.id}`} 
                            name={region.name} 
                            value={region.id}
                        />
                        <label htmlFor={`region-${region.id}`} className="select-none text-[#021526]">{region.name}</label>
                    </div>
                ))}
           </div>
           <div className="w-full flex">
                <button className="bg-primary hover:bg-primary-hover rounded-lg text-white py-2 px-[0.875rem] ml-auto">არჩევა</button>
           </div>
         </motion.div>
         
        )}
        {activeFilter === "price" && (
            <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
            className="absolute left-0 mt-2 border p-4 w-fit rounded-[10px] filter"
            >
                <span className="font-bold text-lg">ფასის მიხედვით</span>
                <div className="flex gap-4 py-6">
                    <div className="border-[1px] border-[#808A93] rounded-md py-3 px-2">
                        <input type="text" className="outline-none rounded-md" placeholder="დან"/>
                        ₾
                    </div>
                    <div className="border-[1px] border-[#808A93] rounded-md py-3 px-2">
                        <input type="text" className="outline-none rounded-md" placeholder="დან"/>
                        ₾
                    </div>
                </div>
                <div className="w-full flex">
                <button className="bg-primary hover:bg-primary-hover rounded-lg text-white py-2 px-[0.875rem] ml-auto">არჩევა</button>
                </div>
            </motion.div>
        )}
        {activeFilter === "area" && (
            <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
            className="absolute left-0 mt-2 border p-4 w-fit rounded-[10px] filter"
            >
            <span className="font-bold text-lg">ფართობის მიხედვით</span>
                <div className="flex gap-4 py-6">
                    <div className="border-[1px] border-[#808A93] rounded-md py-3 px-2">
                        <input type="text" className="outline-none rounded-md" placeholder="დან"/>
                        ₾
                    </div>
                    <div className="border-[1px] border-[#808A93] rounded-md py-3 px-2">
                        <input type="text" className="outline-none rounded-md" placeholder="დან"/>
                        ₾
                    </div>
                </div>
                <div className="w-full flex">
                <button className="bg-primary hover:bg-primary-hover rounded-lg text-white py-2 px-[0.875rem] ml-auto">არჩევა</button>
                </div>
            </motion.div>
        )}
        {activeFilter === "bedrooms" && (
            <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
            className="absolute flex flex-col items-start gap-6 left-0 mt-2 border p-4 w-fit rounded-[10px] filter"
            >
            <span className="font-bold text-lg">საძინებლების რაოდენობა</span>
                <div className="flex justify-center items-center w-[20%] border-[1px] border-[#808A93] rounded-md py-3 px-3">
                    <input type="number" className="outline-none first-letter w-full" placeholder="1" />
                </div>
                <div className="w-full flex">
                <button className="bg-primary hover:bg-primary-hover rounded-lg text-white py-2 px-[0.875rem] ml-auto">არჩევა</button>
                </div>
            </motion.div>
        )}
    </div>
  );
}
