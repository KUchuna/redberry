"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Image from "next/image";
import uparrow from "@/public/assets/uparrow.svg";
import downarrow from "@/public/assets/downarrow.svg";
import { motion } from "framer-motion";
import { FiltersProps, Region } from "@/types";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { z } from "zod";


const filterSchema = z.object({
  minPrice: z
    .union([
      z.coerce.number({ invalid_type_error: "მინიმალური ფასი უნდა იყოს რიცხვი" })
      .nonnegative({ message: "მინიმალური ფასი უნდა იყოს 0-ზე მეტი" }),
      z.undefined()
    ]),
  maxPrice: z
    .union([
      z.coerce.number({ invalid_type_error: "მაქსიმალური ფასი უნდა იყოს რიცხვი" })
      .nonnegative({ message: "მაქსიმალური ფასი უნდა იყოს 0-ზე მეტი" }),
      z.undefined()
    ]),
  minArea: z
    .union([
      z.coerce.number({ invalid_type_error: "მინიმალური ფართობი უნდა იყოს რიცხვი" })
      .nonnegative({ message: "მინიმალური ფართობი უნდა იყოს 0-ზე მეტი" }),
      z.undefined()
    ]),
  maxArea: z
    .union([
      z.coerce.number({ invalid_type_error: "მაქსიმალური ფართობი უნდა იყოს რიცხვი" })
      .nonnegative({ message: "მაქსიმალური ფართობი უნდა იყოს 0-ზე მეტი" }),
      z.undefined()
    ])
}).refine((data) => {
  if (data.minPrice !== undefined && data.maxPrice !== undefined) {
    return data.minPrice <= data.maxPrice;
  }
  return true;
}, {
  message: "მინიმალური ფასი არ შეიძლება იყოს უფრო დიდი ვიდრე მაქსიმალური ფასი",
  path: ["minPrice"],
}).refine((data) => {
  if (data.minArea !== undefined && data.maxArea !== undefined) {
    return data.minArea <= data.maxArea;
  }
  return true;
}, {
  message: "მინიმალური ფართობი არ შეიძლება იყოს უფრო დიდი ვიდრე მაქსიმალური ფართობი",
  path: ["minArea"],
});




const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

export default function Filters({regions}: FiltersProps) {

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const toggleFilter = (filter: string) => {
    setActiveFilter(filter === activeFilter ? null : filter);
    setErrors(null)
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


  const [minPrice, setMinPrice] = useState<any>(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState<any>(searchParams.get('maxPrice') || '');
  
  const [minArea, setMinArea] = useState<any>(searchParams.get('minArea') || '');
  const [maxArea, setMaxArea] = useState<any>(searchParams.get('maxArea') || '');

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

  useEffect(() => {
    // Clear errors when the active filter changes
    setErrors(null);
  }, [activeFilter]);

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

  const [errors, setErrors] = useState<{[key: string]: string } | null>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    const result = filterSchema.safeParse({ minPrice, maxPrice, minArea, maxArea });

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0]] = error.message;
        }
      });
      try {
        setMinPrice("")
        setMaxPrice("")
        setMinArea("")
        setMaxArea("")
      } finally {
        setErrors(fieldErrors);
      }
      return;
    }



    // Only apply parameters based on the active filter
    if (activeFilter === "region") {
        if (selectedRegions.length > 0) {
            params.set('regions', selectedRegions.join(','));
        } else {
            params.delete('regions');
        }
    } else if (activeFilter === "price") {
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
    } else if (activeFilter === "area") {
        if (minArea) {
            params.set('minArea', minArea);
        } else {
            params.delete('minArea');
        }

        if (maxArea) {
            params.set('maxArea', maxArea);
        } else {
            params.delete('maxArea');
        }
    } else if (activeFilter === "bedrooms") {
        if (bedrooms) {
            params.set('bedrooms', bedrooms);
        } else {
            params.delete('bedrooms');
        }
    }

    // Reset the active filter after submission
    setActiveFilter(null);
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
           className="absolute left-0 mt-2 border p-4 w-fit rounded-[10px] z-20 bg-white filter-container"
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
            className="absolute left-0 mt-2 border p-4 w-fit rounded-[10px] z-20 bg-white filter-container"
            >
                <span className="font-bold text-lg">ფასის მიხედვით</span>
                  <div className="flex gap-4 py-6">
                    <div className="flex flex-col gap-6">
                      <div className={`border-[1px] ${errors?.minPrice ? "border-primary" : "border-[#808A93]"} rounded-md py-3 px-2 relative mb-7`}>
                          <input type="number" className="outline-none rounded-md" placeholder="დან" onChange={handleMinPriceChange} value={minPrice}/>
                          ₾
                          {errors?.minPrice &&
                            <span className="absolute text-primary w-full left-0 bottom-0 translate-y-[102%]">მინიმალური ფასი უნდა იყოს მაქსიმალურზე ნაკლები</span>
                          }
                      </div>
                      <span className="text-[#021526] font-[500]">მინ. ფასი</span>
                      <ul className="flex flex-col gap-2 items-start">
                        <li className="cursor-pointer" onClick={() => {setMinPrice("50000"), setErrors(null)}}>50,000 ₾</li>
                        <li className="cursor-pointer" onClick={() => {setMinPrice("100000"), setErrors(null)}}>100,000 ₾</li>
                        <li className="cursor-pointer" onClick={() => {setMinPrice("150000"), setErrors(null)}}>150,000 ₾</li>
                        <li className="cursor-pointer" onClick={() => {setMinPrice("200000"), setErrors(null)}}>200,000 ₾</li>
                        <li className="cursor-pointer" onClick={() => {setMinPrice("300000"), setErrors(null)}}>300,000 ₾</li>
                      </ul>
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="border-[1px] border-[#808A93] rounded-md py-3 px-2 mb-7">
                          <input type="number" className="outline-none rounded-md" placeholder="მდე" onChange={handleMaxPriceChange} value={maxPrice}/>
                          ₾
                      </div>
                      <span className="text-[#021526] font-[500]">მაქს. ფასი</span>
                      <ul className="flex flex-col gap-2 items-start">
                        <li className="cursor-pointer" onClick={() => {setMaxPrice("50000"), setErrors(null)}}>50,000 ₾</li>
                        <li className="cursor-pointer" onClick={() => {setMaxPrice("100000"), setErrors(null)}}>100,000 ₾</li>
                        <li className="cursor-pointer" onClick={() => {setMaxPrice("150000"), setErrors(null)}}>150,000 ₾</li>
                        <li className="cursor-pointer" onClick={() => {setMaxPrice("200000"), setErrors(null)}}>200,000 ₾</li>
                        <li className="cursor-pointer" onClick={() => {setMaxPrice("300000"), setErrors(null)}}>300,000 ₾</li>
                      </ul>
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
            className="absolute left-0 mt-2 border p-4 w-fit rounded-[10px] z-20 bg-white filter-container"
            >
            <span className="font-bold text-lg">ფართობის მიხედვით</span>
                <div className="flex gap-4 py-6">
                    <div className="flex flex-col gap-6">
                      <div className={`border-[1px] ${errors?.minArea ? "border-primary" : "border-[#808A93]"} rounded-md py-3 px-2 relative mb-7`}>
                          <input type="number" className="outline-none rounded-md" placeholder="დან" onChange={handleMinAreaChange} value={minArea}/>
                          მ<sup>2</sup>
                          {errors?.minArea &&
                            <span className="absolute text-primary w-full left-0 bottom-0 translate-y-[102%]">მინიმალური ფართობი უნდა იყოს მაქსიმალურზე ნაკლები</span>
                          }
                      </div>
                      <span className="text-[#021526] font-[500]">მინ. მ<sup>2</sup></span>
                      <ul className="flex flex-col gap-2 items-start">
                        <li className="cursor-pointer" onClick={() => setMinArea("40")}>40 მ<sup>2</sup></li>
                        <li className="cursor-pointer" onClick={() => setMinArea("80")}>80 მ<sup>2</sup></li>
                        <li className="cursor-pointer" onClick={() => setMinArea("120")}>120 მ<sup>2</sup></li>
                        <li className="cursor-pointer" onClick={() => setMinArea("160")}>160 მ<sup>2</sup></li>
                        <li className="cursor-pointer" onClick={() => setMinArea("200")}>200 მ<sup>2</sup></li>
                      </ul>
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="border-[1px] border-[#808A93] rounded-md py-3 px-2 mb-7">
                          <input type="number" className="outline-none rounded-md" placeholder="დან" onChange={handleMaxAreaChange} value={maxArea}/>
                          მ<sup>2</sup>
                      </div>
                      <span className="text-[#021526] font-[500]">მაქს. მ<sup>2</sup></span>
                      <ul className="flex flex-col gap-2 items-start">
                        <li className="cursor-pointer" onClick={() => setMaxArea("240")}>240 მ<sup>2</sup></li>
                        <li className="cursor-pointer" onClick={() => setMaxArea("280")}>280 მ<sup>2</sup></li>
                        <li className="cursor-pointer" onClick={() => setMaxArea("320")}>320 მ<sup>2</sup></li>
                        <li className="cursor-pointer" onClick={() => setMaxArea("360")}>360 მ<sup>2</sup></li>
                        <li className="cursor-pointer" onClick={() => setMaxArea("400")}>400 მ<sup>2</sup></li>
                      </ul>
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
            className="absolute flex flex-col items-start gap-6 left-0 mt-2 border p-4 w-fit rounded-[10px] z-20 bg-white filter-container"
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
