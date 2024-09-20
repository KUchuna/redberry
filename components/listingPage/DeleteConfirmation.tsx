import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const containerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
}

interface DeleteConfirmationProps {
    onClose: () => void;
    id: number;
    handleDelete: (id: number) => void
}


export default function DeleteConfirmation({ onClose, handleDelete, id }: DeleteConfirmationProps) {
    
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

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

    if (!mounted) return null;

    return createPortal(
        <div 
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <motion.div 
                ref={modalRef} 
                className="bg-white px-28 py-20 rounded-lg shadow-lg flex flex-col justify-center gap-4 max-w-[1920px] dark:bg-[#0A0A0A]"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3 }}
            >
                <span className="text-xl font-bold text-center">გსურთ წაშალოთ ლისტინგი?</span>
                <div className="flex gap-3 justify-center">
                    <button className="border-[1px] border-primary hover:bg-primary hover:text-white text-primary px-4 py-[0.875rem] rounded-[10px]" onClick={() => onClose()}>გაუქმება</button>
                    <button className="bg-primary hover:bg-primary-hover border-[1px] text-white dark:border-[#0A0A0A] px-4 py-[0.875rem] rounded-[10px]" onClick={() => handleDelete(id)}>დადასტურება</button>
                </div>
            </motion.div>
        </div>,
        document.body
    )
}