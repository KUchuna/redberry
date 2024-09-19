"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import uparrow from "@/public/assets/uparrow.svg";
import downarrow from "@/public/assets/downarrow.svg";
import { motion } from "framer-motion";
import { FiltersProps, Region } from "@/types";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

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

  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRegions, setSelectedRegions] = useState<string[]>(() => {
    const params = searchParams.get('regions');
    return params ? params.split(',') : [];
  });


  const [minPrice, setMinPrice] = useState<string | null>(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState<string | null>(searchParams.get('maxPrice') || '');
  
  const [minArea, setMinArea] = useState<string | null>(searchParams.get('minArea') || '');
  const [maxArea, setMaxArea] = useState<string | null>(searchParams.get('maxArea') || '');

  const [bedrooms, setBedrooms] = useState<string | null>(searchParams.get('bedrooms') || '')

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedRegions((prev) =>
      prev?.includes(value)
        ? prev.filter((region) => region !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    const params = searchParams.get('regions');
    setSelectedRegions(params ? params.split(',') : []);
    setMinPrice(searchParams.get('minPrice'));
    setMaxPrice(searchParams.get('maxPrice'));
    setMinArea(searchParams.get('minArea'));
    setMaxArea(searchParams.get('maxArea'))
    setBedrooms(searchParams.get('bedrooms'))
  }, [searchParams]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };

  const handleMinAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinArea(e.target.value);
  };

  const handleMaxAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxArea(e.target.value);
  };

  const handleBedroomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBedrooms(e.target.value);
  };


const handleSubmit = (e: React.FormEvent) => {
  
  e.preventDefault();
  const params = new URLSearchParams(searchParams.toString());

  if (selectedRegions.length > 0) {
    params.set('regions', selectedRegions.join(','));
  } else {
    params.delete('regions');
  }

  if (minPrice) {
    params.set('minPrice', minPrice);
  } else {
    params.delete('minPrice');
  }
  
  if (maxPrice) {
    params.set('maxPrice', maxPrice);
  } else {
    params.delete('maxPrice');
  }
  
  if (maxArea) {
    params.set('maxArea', maxArea);
  } else {
    params.delete('maxArea');
  }

  if (minArea) {
    params.set('minArea', minArea);
  } else {
    params.delete('minArea');
  }
  
  if (bedrooms) {
    params.set('bedrooms', bedrooms);
  } else {
    params.delete('bedrooms');
  }

  setActiveFilter(null)
  router.replace(`?${params.toString()}`);
};



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
           <motion.form
           variants={dropdownVariants}
           initial="hidden"
           animate="visible"
           transition={{ duration: 0.3 }}
           className="absolute left-0 mt-2 border p-4 w-fit rounded-[10px] z-20 bg-white"
           onSubmit={handleSubmit}
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
                    checked={selectedRegions.includes(region.id.toString())}
                    onChange={handleCheckboxChange}
                  />
                 <label htmlFor={`region-${region.id}`} className="select-none text-[#021526]">
                   {region.name}
                 </label>
               </div>
             ))}
           </div>
           <div className="w-full flex">
             <button className="bg-primary hover:bg-primary-hover rounded-lg text-white py-2 px-[0.875rem] ml-auto">
               არჩევა
             </button>
           </div>
         </motion.form>
         
        )}
        {activeFilter === "price" && (
            <motion.form
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="absolute left-0 mt-2 border p-4 w-fit rounded-[10px] z-20 bg-white"
            >
                <span className="font-bold text-lg">ფასის მიხედვით</span>
                <div className="flex gap-4 py-6">
                    <div className="border-[1px] border-[#808A93] rounded-md py-3 px-2">
                        <input type="text" className="outline-none rounded-md" placeholder="დან" onChange={handleMinPriceChange}/>
                        ₾
                    </div>
                    <div className="border-[1px] border-[#808A93] rounded-md py-3 px-2">
                        <input type="text" className="outline-none rounded-md" placeholder="მდე" onChange={handleMaxPriceChange}/>
                        ₾
                    </div>
                </div>
                <div className="w-full flex">
                <button className="bg-primary hover:bg-primary-hover rounded-lg text-white py-2 px-[0.875rem] ml-auto">არჩევა</button>
                </div>
            </motion.form>
        )}
        {activeFilter === "area" && (
            <motion.form
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="absolute left-0 mt-2 border p-4 w-fit rounded-[10px] z-20 bg-white"
            >
            <span className="font-bold text-lg">ფართობის მიხედვით</span>
                <div className="flex gap-4 py-6">
                    <div className="border-[1px] border-[#808A93] rounded-md py-3 px-2">
                        <input type="text" className="outline-none rounded-md" placeholder="დან" onChange={handleMinAreaChange}/>
                        ₾
                    </div>
                    <div className="border-[1px] border-[#808A93] rounded-md py-3 px-2">
                        <input type="text" className="outline-none rounded-md" placeholder="დან" onChange={handleMaxAreaChange}/>
                        ₾
                    </div>
                </div>
                <div className="w-full flex">
                <button className="bg-primary hover:bg-primary-hover rounded-lg text-white py-2 px-[0.875rem] ml-auto">არჩევა</button>
                </div>
            </motion.form>
        )}
        {activeFilter === "bedrooms" && (
            <motion.form
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
            className="absolute flex flex-col items-start gap-6 left-0 mt-2 border p-4 w-fit rounded-[10px] z-20 bg-white"
            onSubmit={handleSubmit}
            >
            <span className="font-bold text-lg">საძინებლების რაოდენობა</span>
                <div className="flex justify-center items-center w-[20%] border-[1px] border-[#808A93] rounded-md py-3 px-3">
                    <input type="number" name="bedrooms" className="outline-none first-letter w-full" placeholder="1" onChange={handleBedroomsChange}/>
                </div>
                <div className="w-full flex">
                <button className="bg-primary hover:bg-primary-hover rounded-lg text-white py-2 px-[0.875rem] ml-auto">არჩევა</button>
                </div>
            </motion.form>
        )}
    </div>
  );
}
