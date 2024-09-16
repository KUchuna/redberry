"use client"

import checkmark from "@/public/assets/checkmark.svg"
import Image from "next/image"
import { useState } from "react"
import {motion} from "framer-motion"
import downArrow from "@/public/assets/downarrow.svg"
import fileUpload from "@/public/assets/fileupload.svg"
import AgentModal from "@/components/listingPage/AgentModal";
import Link from "next/link"
import { addListingAction } from "@/app/actions"
import { z } from "zod"

interface Regions {
    id: number;
    name: string;
}

interface Cities {
    id: number;
    name: string;
    region_id: number;
}

interface Agents {
    id: number;
    name: string;
    surname: string;
    avatar: string;
}

interface ListingFormProps {
    regions: Regions[];
    cities: Cities[];
    agents: Agents[];
}

const container = {
    hidden: { 
        height: 0,
    },
    visible: {
        height: 210,
        transition: {
        duration: 0.1,
        delayChildren: 0.1,
        },
    }
}

const item = {
    hidden: { opacity: 0},
    visible: { opacity: 1 }
}

const formSchema = z.object({
    address: z.string()
        .min(2, "მისამართი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს")
        .max(50, "მისამართი არ უნდა აღემატებოდეს 50 სიმბოლოს"),
    zip_code: z.string()
        .min(2, "ინდექსი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს")
        .max(10, "ინდექსი არ უნდა აღემატებოდეს 10 სიმბოლოს"),
    price: z
        .string()
        .min(2, "ფასი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს")
        .max(10, "ფასი არ უნდა აღემატებოდეს 10 სიმბოლოს")
        .refine((value) => /^\d+$/.test(value), {
            message: "ფასი უნდა შეიცავდეს მხოლოდ ციფრებს",
    }),
    description: z.string()
        .min(10, "აღწერა უნდა შეიცავდეს მინიმუმ 10 სიმბოლოს")
        .max(400, "აღწერა არ უნდა აღემატებოდეს 400 სიმბოლოს")
        .refine((value) => value.trim().split(/\s+/).length >= 5, {
            message: "აღწერა უნდა შეიცავდეს მინიმუმ 5 სიტყვას",
        }),
    area: z
        .string()
        .min(2, "ფართობი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს")
        .max(10, "ფართობი არ უნდა აღემატებოდეს 10 სიმბოლოს")
        .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
            message: "ფართობი უნდა იყოს დადებითი რიცხვი",
        }),
    bedrooms: z
        .string()
        .min(1, "რაოდენობა უნდა შეიცავდეს მინიმუმ 1 სიმბოლოს")
        .max(2, "რაოდენობა არ უნდა აღემატებოდეს 2 სიმბოლოს")
        .refine((value) => /^\d+$/.test(value) && parseInt(value, 10) > 0, {
            message: "რაოდენობა უნდა იყოს დადებითი მთელი რიცხვი",
        }),
    agent_id: z
        .number()
        .nullable()
        .refine((value) => value !== null, {
            message: "აგენტის ID არ უნდა იყოს ცარიელი",
        }),
    region_id: z
        .number()
        .nullable()
        .refine((value) => value !== null, {
            message: "რეიგიონის ID არ უნდა იყოს ცარიელი",
        }),
    city_id: z
        .number()
        .nullable()
        .refine((value) => value !== null, {
            message: "ქალაქის ID არ უნდა იყოს ცარიელი",
        }),
    image: z.any().refine((file) => {
        return file instanceof File && file.size > 0 && file.size <= 1024 * 1024;
    }, {
        message: "სურათი აუცილებელია და მისი ზომა უნდა იყოს 1MB-ზე ნაკლები",
    }),
});


export default function ListingForm({regions, cities, agents}: ListingFormProps) {

    const [activeDropDown, setActiveDropDown] = useState<string | null>(null)

    const [selectedRegion, setSelectedRegion] = useState<Regions | null>(null)
    const [selectedCity, setSelectedCity] = useState<Cities | null>(null)
    const [selectedAgent, setSelectedAgent] = useState<Agents | null>(null)

    const [active, setActive] = useState(false)
    

    const toggleModal = () => setActive(!active) 

    const toggleDropDown = (dropDown: string) => {
        setActiveDropDown(dropDown === activeDropDown ? null : dropDown);
    };

    const filteredCities = cities.filter((city) => city.region_id === selectedRegion?.id);

    function handleRegionSelect(name: string, id: number) {
        setSelectedRegion({
            "name": name,
            "id": id
        })
        setSelectedCity(null)
    } 
    
    function handleCitySelect(name: string, id: number, region_id: number) {
        setSelectedCity({
            "name": name,
            "id": id,
            "region_id": region_id,
        })
    } 

    function handleAgentSelect(name: string, id: number, surname: string, avatar: string) {
        setSelectedAgent({
            "name": name,
            "id": id,
            "surname": surname,
            "avatar": avatar,
        })
    } 

    function handleCityDropdown() {
        if (selectedRegion == null) {
            return
        } else {
            toggleDropDown("city")
        }
    }

    const [preview, setPreview] = useState<string | null>(null);

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; 
        if (file) {
            setPreview(URL.createObjectURL(file)); 
        }
    };

    const [errors, setErrors] = useState<{[key: string]: string }>({})

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
    
        const address = formData.get("address") as string;
        const zip_code = formData.get("zip_code") as string;
        const price = formData.get("price") as string;
        const description = formData.get("description") as string;
        const area = formData.get("area") as string;
        const bedrooms = formData.get("bedrooms") as string;
        const agent_id = selectedAgent?.id
        const region_id = selectedRegion?.id
        const city_id = selectedCity?.id
        const image = formData.get("image")
    
        const result = formSchema.safeParse({ address, zip_code, price, description, area, bedrooms, image, agent_id, region_id, city_id });
    
        if (!result.success) {
            const fieldErrors: { [key: string]: string } = {};
            result.error.errors.forEach((error) => {
                if (error.path[0]) {
                    fieldErrors[error.path[0]] = error.message;
                }
            });
            setErrors(fieldErrors);
        } else {
                try {
                    await addListingAction(formData);
                } catch (error) {
                    alert(`Error: ${error}`);
                }
            }
    };
    
    
    const [isRental, setIsRental] = useState(0)

    function handleRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
        setIsRental(parseInt(e.target.value, 10))
    }


    return (
        <>
            {active && 
                <div>
                    <AgentModal 
                        onClose={toggleModal}
                    />
                </div>
            }
            <form className="text-[#021526] flex flex-col gap-20 w-full" onSubmit={handleSubmit}>
                <input 
                    type="number"
                    name="agent_id"
                    value={selectedAgent?.id}
                    className="hidden"
                />
                <input 
                    type="number"
                    name="city_id"
                    value={selectedCity?.id}
                    className="hidden"
                />
                <input 
                    type="number"
                    name="region_id"
                    value={selectedRegion?.id}
                    className="hidden"
                />
                <div className="flex flex-col gap-2">
                    <span className="text-[#1A1A1F] font-[500] text-xl">გარიგების ტიპი</span>
                    <div className="flex gap-20">
                        <div className="flex flex-row-reverse gap-2">
                            <label htmlFor="sale" className="select-none radio-item">იყიდება</label>
                            <input
                                type="radio"
                                id="sale"
                                name="is_rental"
                                value={0}
                                className="radio-button"
                                checked={isRental === 0}
                                onChange={handleRadioChange}
                            />
                        </div>
                        <div className="flex flex-row-reverse gap-2">
                            <label htmlFor="rent" className="select-none radio-item">ქირავდება</label>
                            <input
                                type="radio"
                                id="rent"
                                name="is_rental"
                                value={1}
                                className="radio-button"
                                checked={isRental === 1}
                                onChange={handleRadioChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 w-full">
                    <span className="text-[#1A1A1F] font-[500] text-xl">მდებარეობა</span>
                    <div className="flex flex-col gap-5">
                        <div className="flex w-full gap-5">
                            <div className="flex flex-col w-[50%]">
                                <label htmlFor="address" className={`mb-1 font-medium ${errors.address ? "text-primary" : "text-[#021526]"}`}>მისამართი *</label>
                                <input type="text" name="address" id="address" className={`border-[1px] ${errors.address ? "border-primary" : "border-[#808A93]"} rounded-md outline-none py-2 px-3 h-[2.625rem]`} />
                                {errors.address ? <span className="text-primary text-sm mt-1">{errors.address}</span> : <span className="flex gap-2 mt-1"><Image src={checkmark} alt="" />მინიმუმ ორი სიმბოლო</span>}
                            </div>
                            <div className="flex flex-col w-[50%]">
                                <label htmlFor="zip_code" className={`mb-1 font-medium ${errors.zip_code ? "text-primary" : "text-[#021526]"}`}>საფოსტო ინდექსი *</label>
                                <input type="text" name="zip_code" id="zip_code" className={`border-[1px] ${errors.zip_code ? "border-primary" : "border-[#808A93]"} rounded-md outline-none py-2 px-3 h-[2.625rem]`} />
                                {errors.zip_code ? <span className="text-primary text-sm mt-1">{errors.zip_code}</span> : <span className="flex gap-2 mt-1"><Image src={checkmark} alt="" />მხოლოდ რიცხვები</span>}
                            </div>
                        </div>

                        <div className="flex w-full gap-5">
                            <div className="flex flex-col w-[50%]">
                                <span className={`mb-1 font-medium ${errors.region_id ? "text-primary" : "text-[#021526]"}`}>რეგიონი</span>
                                <div id="region" className={`border-[1px] ${errors.region_id ? "border-primary" : "border-[#808A93]"} rounded-md px-3 py-2 h-[2.625rem] relative cursor-pointer flex`} onClick={() => toggleDropDown("region")}> 
                                <p>{selectedRegion != null ? selectedRegion.name : "აირჩიე რეგიონი"}</p>
                                <Image src={downArrow} alt=""  className="ml-auto"/>
                                    {activeDropDown == "region" && 
                                        <motion.div 
                                        className="absolute bg-[#ffffff] select-none -bottom-0 translate-y-[100%] w-full rounded-md left-0 overflow-y-auto border-[1px] cursor-default py-2 border-[#808A93]"
                                        id="region"
                                        variants={container}
                                        initial="hidden"
                                        animate="visible"
                                        >
                                            {regions.map((region) => (
                                                <motion.p key={region.id} 
                                                className="px-3 py-1 hover:bg-zinc-300"
                                                variants={item}
                                                onClick={() => handleRegionSelect(region.name, region.id)}
                                                >{region.name}</motion.p>
                                            ))}
                                        </motion.div>
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col w-[50%]">
                                <span className={`mb-1 font-medium ${errors.city_id ? "text-primary" : "text-[#021526]"}`}>ქალაქი</span>
                                <div id="city" className={`border-[1px] ${errors.city_id ? "border-primary" : "border-[#808A93]"} rounded-md px-3 py-2 h-[2.625rem] relative ${!selectedRegion ? "cursor-not-allowed bg-slate-100" : "cursor-pointer"} flex`} onClick={handleCityDropdown}> 
                                <p>{selectedCity != null ? selectedCity.name : "აირჩიე ქალაქი"}</p>
                                <Image src={downArrow} alt=""  className="ml-auto"/>
                                    {activeDropDown == "city" && 
                                        <motion.div 
                                        className="absolute bg-[#ffffff] select-none -bottom-0 translate-y-[100%] w-full rounded-md left-0 overflow-y-auto border-[1px] cursor-default py-2 border-[#808A93]"
                                        id="region"
                                        variants={container}
                                        initial="hidden"
                                        animate="visible"
                                        >
                                            {filteredCities.length > 0 && 
                                                filteredCities.map((city) => (
                                                <motion.p key={city.id} 
                                                    className="px-3 py-1 hover:bg-zinc-300"
                                                    variants={item}
                                                    onClick={() => handleCitySelect(city.name, city.id, city.region_id)}
                                                    >{city.name}</motion.p>
                                                ))
                                            }
                                        </motion.div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                    <div className="flex flex-col gap-6">
                        <span className="text-[#1A1A1F] font-[500] text-xl">ბინის დეტალები</span>
                        <div className="flex w-full gap-5 flex-wrap">
                            <div className="w-full flex gap-5">
                                <div className="flex flex-col w-[50%]">
                                    <label htmlFor="price" className={`mb-1 font-medium ${errors.price ? "text-primary" : "text-[#021526]"}`}>ფასი</label>
                                    <input type="text" name="price" id="price" className={`border-[1px] ${errors.price ? "border-primary" : "border-[#808A93]"} rounded-md outline-none py-2 px-3 h-[2.625rem]`} />
                                    {errors.price ? <span className="text-primary text-sm mt-1">{errors.price}</span> : <span className="flex gap-2 mt-1"><Image src={checkmark} alt="" />მხოლოდ რიცხვები</span>}
                                </div>
                                <div className="flex flex-col w-[50%]">
                                    <label htmlFor="area" className={`mb-1 font-medium ${errors.area ? "text-primary" : "text-[#021526]"}`}>ფართობი</label>
                                    <input type="text" name="area" id="area" className={`border-[1px] ${errors.area ? "border-primary" : "border-[#808A93]"} rounded-md outline-none py-2 px-3 h-[2.625rem]`} />
                                    {errors.area ? <span className="text-primary text-sm mt-1">{errors.area}</span> : <span className="flex gap-2 mt-1"><Image src={checkmark} alt="" />მხოლოდ რიცხვები</span>}
                                </div>
                            </div>
                            <div className="w-full flex gap-5">
                                <div className="flex flex-col w-[50%]">
                                    <label htmlFor="bedrooms" className={`mb-1 font-medium ${errors.bedrooms ? "text-primary" : "text-[#021526]"}`}>საძინებლების რაოდენობა</label>
                                    <input type="text" name="bedrooms" id="bedrooms" className={`border-[1px] ${errors.bedrooms ? "border-primary" : "border-[#808A93]"} rounded-md outline-none py-2 px-3 h-[2.625rem]`} />
                                    {errors.bedrooms ? <span className="text-primary text-sm mt-1">{errors.bedrooms}</span> : <span className="flex gap-2 mt-1"><Image src={checkmark} alt="" />მხოლოდ რიცხვები</span>}
                                </div>
                                <div className="flex flex-col w-[50%]"></div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full -mt-1">
                            <label htmlFor="description" className={`mb-1 font-medium ${errors.description ? "text-primary" : "text-[#021526]"}`}>აღწერა *</label>
                            <textarea id="description" name="description" className={`border-[1px] ${errors.description ? "border-primary" : "border-[#808A93]"} rounded-md outline-none py-2 px-3 h-[10rem] resize-none`} ></textarea>
                            {errors.description ? <span className="text-primary text-sm mt-1">{errors.description}</span> : <span className="flex gap-2 mt-1"><Image src={checkmark} alt="" />მინიმუმ 5 სიტყვა</span>}
                            
                            <span className={`mb-2 mt-5 font-medium ${errors.image ? "text-primary" : "text-[#021526]"}`}>ატვირთეთ ფოტო *</span>
                            <label htmlFor="image" className={`custom-file-upload border-[2px] border-dashed ${errors.image ? "border-primary" : "border-[#2D3648]"}`}><Image src={preview ? preview : fileUpload} width={preview ? 100 : 24} height={preview ? 90 : 24}alt="" className="max-h-[90px] object-cover rounded-md"/></label>
                            <input 
                                type="file" 
                                name="image"
                                id="image" 
                                accept="image/*" 
                                className="border-[1px] border-gray-300 p-2 rounded-md"
                                onChange={handleUpload}
                            />
                            {errors.image && <span className="text-primary text-sm mt-1">{errors.image}</span>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <span className="text-[#1A1A1F] font-[500] text-xl">აგენტი</span>
                        <div className="flex flex-col w-[50%]">
                                <span className={`mb-1 font-medium ${errors.agent_id ? "text-primary" : "text-[#021526]"} select-none`}>აგენტი</span>
                                <div id="agent" className={`border-[1px] ${errors.agent_id ? "border-primary" : "border-[#808A93]"} rounded-md px-3 py-2 h-[2.625rem] relative cursor-pointer flex`} onClick={() => toggleDropDown("agent")}> 
                                <p>{selectedAgent != null ? selectedAgent.name+" "+selectedAgent.surname : "აირჩიე აგენტი"}</p>
                                <Image src={downArrow} alt=""  className="ml-auto"/>
                                    {activeDropDown == "agent" && 
                                        <motion.div 
                                        className="absolute bg-[#ffffff] select-none -bottom-0 translate-y-[100%] w-full rounded-md left-0 overflow-y-auto border-[1px] cursor-default border-[#808A93]"
                                        id="region"
                                        variants={container}
                                        initial="hidden"
                                        animate="visible"
                                        >
                                            <button className="border-[1px] w-full flex items-center px-2 py-3 gap-2 text-[#021526] border-b border-b-[#808A93]" onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault(); 
                                                setActive(!active)}}><Image src={fileUpload} alt="+" />დაამატე აგენტი</button>
                                            {agents.map((agent) => (
                                                <motion.p key={agent.id} 
                                                className="px-3 py-1 hover:bg-zinc-300"
                                                variants={item}
                                                onClick={() => handleAgentSelect(agent.name, agent.id, agent.surname, agent.avatar)}
                                                >{agent.name} {agent.surname}</motion.p>
                                            ))}
                                        </motion.div>
                                    }
                                </div>
                            </div>
                    </div>
                <div className="flex justify-end gap-5">
                    <Link href="/" className="border-[1px] border-primary hover:bg-primary hover:text-white text-primary px-4 py-[0.875rem] rounded-[10px]">გაუქმება</Link>
                    <button type="submit" className="bg-primary hover:bg-primary-hover border-[1px] text-white px-4 py-[0.875rem] rounded-[10px]">დაამატე ლისტინგი</button>
                </div>
            </form>
        </>
    )
}