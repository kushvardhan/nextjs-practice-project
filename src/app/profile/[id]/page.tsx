"use client"; 

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ProfileIDPage() {

    const params = useParams();
    
    return (
        <div className="w-screen h-screen bg-neutral-950 text-white flex justify-center items-center">
            <div className="w-[70%] h-full pt-20 flex flex-col items-center">
                <h1 className="text-3xl">
                    Profile Page: 
                    <span className="px-2 py-1 bg-orange-400 text-black font-semibold rounded-md">
                        {params.id}
                    </span>
                </h1>
                <br />
                <p className="text-sm text-zinc-300">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, ad. Ea numquam esse perspiciatis reiciendis!
                </p>
            </div>
        </div>
    );
}
