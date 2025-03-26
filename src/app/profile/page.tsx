"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('/api/users/me', { withCredentials: true });
                console.log(response.data);
                setUserData(response.data.data); // Store user data
            } catch (err: any) {
                console.log(err);
            }
        };
        getData();
    }, []);

    const handleLogout = async () => {
        try {
            const res = await axios.post('/api/users/logout', { withCredentials: true });
            console.log(res.data);
            router.push('/login');
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
                    Welcome, {userData?.username || "User"}!
                </p>
                <button className="bg-green-700 mt-10 text-white px-3 py-2 rounded-md text-sm cursor-pointer font-semibold hover:bg-green-800 transition">
                    <Link href={`/profile/${userData?._id}`}>Know more</Link> {/* ✅ Dynamic ID */}
                </button>
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
