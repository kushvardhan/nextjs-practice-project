"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await axios.post('/api/users/logout',{withCredentials:true});
            console.log(res);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="w-screen h-screen relative bg-neutral-950 text-white flex justify-center items-center">
            <div className="w-[70%] h-full pt-20 flex flex-col items-center">
                <h1 className="text-3xl">Profile Page</h1>
                <br />
                <p className="text-sm text-zinc-300">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, ad. Ea numquam esse perspiciatis reiciendis!
                </p>
            </div>
 
            <button 
                onClick={handleLogout} 
                className="absolute top-5 right-5 bg-red-600 text-white px-3 py-2 rounded-md text-sm cursor-pointer font-semibold hover:bg-red-700 transition"
            >
                Logout
            </button>
        </div>
    );
}
