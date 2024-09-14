"use client"

import { addAgentAction } from "@/app/actions";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import {motion} from "framer-motion"
import fileUpload from "@/public/assets/fileupload.svg"
import Image from "next/image";
import checkmark from "@/public/assets/checkmark.svg"
import {z} from "zod"

const containerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
}

const formSchema = z.object({
    name: z.string()
        .min(2, "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს")
        .max(25, "სახელი არ უნდა აღემატებოდეს 25 სიმბოლოს"),
    surname: z.string()
        .min(2, "გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს")
        .max(25, "გვარი არ უნდა აღემატებოდეს 25 სიმბოლოს"),
    email: z.string()
        .email("ელ-ფოსტის მისამართი არასწორია")
        .refine((email) => email.endsWith("@redberry.ge"), {
            message: "ელ-ფოსტა უნდა იყოს @redberry.ge დომეინიდან",
        }),
    phone: z.string()
        .min(9, "ტელეფონის ნომერი უნდა შეიცავდეს მინიმუმ 9 ციფრს") 
});


export default function AgentModal({ onClose }: { onClose: () => void }) {
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const [errors, setErrors] = useState<{[key: string]: string }>({})
    const [phoneValue, setPhoneValue] = useState("")

    useEffect(() => {
        setMounted(true);

        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            setMounted(false);
        };
    }, [onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
    
        const name = formData.get("name") as string;
        const surname = formData.get("surname") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        

        const result = formSchema.safeParse({ name, surname, email, phone });
    
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
                await addAgentAction(formData);
                console.log("Agent added successfully");
                onClose();
            } catch (error) {
                console.error("Error adding agent:", error);
            }
        }
    };

    const [preview, setPreview] = useState<string | null>(null);

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; 
        if (file) {
            setPreview(URL.createObjectURL(file)); 
        }
    };

    function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const isValid = /^[\d\s]*$/.test(value);
    
        if (isValid) {
            setPhoneValue(value);
        } else {
            console.log("Invalid input");
        }
    }

    if (!mounted) return null;

    return createPortal(
        <div 
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <motion.div 
                ref={modalRef} 
                className="bg-white px-28 py-20 rounded-lg shadow-lg flex flex-col justify-center gap-4 w-[80%] max-w-[1920px]"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3 }}
            >
                <span className="text-3xl font-bold text-center">აგენტის დამატება</span>
                <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-7 mb-7">
                        <div className="flex flex-col">
                            <label htmlFor="name" className={`mb-1 font-medium ${errors.name ? "text-primary" : "text-[#021526]"}`}>სახელი *</label>
                            <input 
                                type="text" 
                                name="name"
                                id="name"
                                className={`border-[1px] ${errors.name ? "border-primary" : "border-[#808A93]"} p-2 rounded-md outline-none`} 
                            />
                             {errors.name ? <span className="text-red-500 text-sm mt-1">{errors.name}</span> : <span className="flex gap-2"><Image src={checkmark} alt="" />მინიმუმ ორი სიმბოლო</span>}
                            
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="surname" className={`mb-1 font-medium ${errors.surname ? "text-primary" : "text-[#021526]"}`}>გვარი *</label>
                            <input 
                                type="text" 
                                name="surname"
                                id="surname"
                                className={`border-[1px] ${errors.surname ? "border-primary" : "border-[#808A93]"} p-2 rounded-md outline-none`}  
                            />
                            {errors.surname ? <span className="text-red-500 text-sm mt-1">{errors.surname}</span> : <span className="flex gap-2"><Image src={checkmark} alt="" />მინიმუმ ორი სიმბოლო</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className={`mb-1 font-medium ${errors.email ? "text-primary" : "text-[#021526]"}`}>ელ-ფოსტა *</label>
                            <input 
                                type="email" 
                                name="email"
                                id="email" 
                                className={`border-[1px] ${errors.email ? "border-primary" : "border-[#808A93]"} p-2 rounded-md outline-none`}  
                            />
                            {errors.email ? <span className="text-red-500 text-sm mt-1">{errors.email}</span> : <span className="flex gap-2"><Image src={checkmark} alt="" />მინიმუმ ორი სიმბოლო</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="phone" className={`mb-1 font-medium ${errors.phone ? "text-primary" : "text-[#021526]"}`}>ტელეფონის ნომერი *</label>
                            <input 
                                type="tel" 
                                name="phone" 
                                id="phone"
                                onChange={handlePhoneChange}
                                value={phoneValue}
                                className={`border-[1px] ${errors.phone ? "border-primary" : "border-[#808A93]"} p-2 rounded-md outline-none`}  
                            />
                            {errors.phone ? <span className="text-red-500 text-sm mt-1">{errors.phone}</span> : <span className="flex gap-2"><Image src={checkmark} alt="" />მინიმუმ ორი სიმბოლო</span>}
                        </div>
                    </div>
                    <span className="font-medium text-[#021526] mb-2">ატვირთეთ ფოტო *</span>
                    <label htmlFor="avatar" className="custom-file-upload "><Image src={preview ? preview : fileUpload} width={preview ? 100 : 24} height={preview ? 90 : 24}alt="" className="max-h-[90px] object-cover"/></label>
                    <input 
                        type="file" 
                        name="avatar"
                        id="avatar" 
                        accept="image/*" 
                        className="border-[1px] border-gray-300 p-2 rounded-md"
                        onChange={handleUpload}
                    />
                    <div className="flex gap-8 justify-end mt-24">
                        <button className="text-primary py-2 px-4 rounded-md hover:bg-primary hover:text-white border-[1px] border-primary"
                        type="button" onClick={onClose}>
                            გაუქმება
                        </button>
                        <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover border-[1px]">
                            დაამატე აგენტი
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>,
        document.body
    );
}
