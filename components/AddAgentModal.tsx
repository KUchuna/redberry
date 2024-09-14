import { addAgentAction } from "@/app/actions";

export default function AddAgentModal() {
    return (
        <div>
            <h1>აგენტის დამატება</h1>
            <form action={addAgentAction} className="flex flex-col gap-4 max-w-[50%]">
                <input type="text" name="name" className="border-[1px] border-red-600" />
                <input type="text" name="surname" className="border-[1px] border-red-600" />
                <input type="email" name="email" className="border-[1px] border-red-600" />
                <input type="tel" name="phone" className="border-[1px] border-red-600" />
                <input 
                    type="file" 
                    name="avatar" 
                    accept="image/*" 
                    className="border-[1px] border-red-600"
                    />

                <button type="submit">submit</button>
            </form>
        </div>
    )
}