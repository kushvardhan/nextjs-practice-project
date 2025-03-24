"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link"

export default function SignupPage(){
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:"",
    })
    const onSignup=async()=>{
        try{
            const user = await axios.post('');
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div className="w-screen h-screen bg-neutral-950 text-white flex justify-center items-center">
            <div className="w-[40%] min-h-[60%] border-1 rounded-lg border-zinc-500 shadow-lg bg-neutral-900  shadow-zinc-700 p-6">
                    <h1 className="text-center font-black text-3xl">Signup Page</h1>

                    <div className="w-full h-full mt-6 p-3 flex flex-col gap-5 justify-center items-center">
                        <div className="w-full h-full">
                       <label className="text-xs text-zinc-300 select-none" htmlFor="">Enter Name</label>
                       <input value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} className="block w-full px-3 py-2 border-1 bg-neutral-800 rounded-md tracking-wide outline-none border-zinc-200" type="text" placeholder="Enter Name" name="" id="" />
                       </div>
                       <div className="w-full h-full">
                       <label className="text-xs text-zinc-300 select-none" htmlFor="">Enter Email</label>
                       <input value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} className="block w-full px-3 py-2 border-1 bg-neutral-800 rounded-md tracking-wide outline-none border-zinc-200" type="email" placeholder="Enter Email" name="" id="" />
                       </div>
                       <div className="w-full h-full">
                       <label className="text-xs text-zinc-300 select-none" htmlFor="">Enter Password</label>
                        <input value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} type="password" className="block w-full px-3 py-2 bg-neutral-800 border-1 rounded-md tracking-wide outline-none border-zinc-200" name="" id="" placeholder="Enter Password"  />
                       </div>
                       <button onClick={onSignup} className="w-[40%] rounded-lg px-3 py-2 mt-4 text-center text-black bg-green-600 text-md">SignUp</button>
                    </div>

                    <div className="w-full h-full items-center text-center">
                    <Link className=" text-zinc-400 text-xs select-none" href='/login'>Don't have an Account? <span className="text-blue-400 tracking-wide hover:text-blue-300 text-sm">Login</span></Link>
                    </div>
            </div>
        </div>
    )
}