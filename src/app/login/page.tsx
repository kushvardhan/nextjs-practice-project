"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link"
import toast from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter();

    const [user,setUser] = React.useState({
            email:"",
            password:"",
        })

           const [buttonDisable,setButtonDisable] = React.useState(false);
        
            useEffect(()=>{
                if(user.email.length > 5 && user.password.length > 5){
                    setButtonDisable(true);
                }
            },[user]);
        const onLogin=async()=>{
            try{
                const res = await axios.post('/api/users/login',user);
                console.log('Success',res.data);
                router.push('/profile');
            }catch(error:any){
                toast.error(error.message);
                console.log(error);
            }
        }

    return(
        <div className="w-screen h-screen bg-neutral-950 text-white flex justify-center items-center">
            <div className="w-[40%] min-h-fit border-1 rounded-lg border-zinc-500 shadow-lg bg-neutral-900  shadow-zinc-700 p-6">
                    <h1 className="text-center font-black text-2xl">Login Page</h1>

                    <div className="w-full h-full mt-6 p-3 flex flex-col gap-5 justify-center items-center">
                       <div className="w-full h-full">
                       <label className="text-xs text-zinc-300 select-none" htmlFor="">Enter Email</label>
                       <input value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} className="block w-full px-3 py-2 border-1 bg-neutral-800 rounded-md tracking-wide outline-none border-zinc-200" type="email" placeholder="Enter Email" name="" id="" />
                       </div>
                       <div className="w-full h-full">
                       <label className="text-xs text-zinc-300 select-none" htmlFor="">Enter Password</label>
                        <input value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} type="password" className="block w-full px-3 py-2 bg-neutral-800 border-1 rounded-md tracking-wide outline-none border-zinc-200" name="" id="" placeholder="Enter Password"  />
                       </div>
                    {
                        buttonDisable ? (<button onClick={onLogin} className="w-[40%] rounded-lg px-3 py-2 mt-4 text-center  bg-blue-600 text-md">Login</button>)
                        : ""
                    }
                    </div>

                    <div className="w-full h-full items-center text-center  mt-4">
                    <Link className=" text-zinc-400 text-xs select-none" href='/signup'>Don't have an Account? <span className="text-blue-400 tracking-wide hover:text-blue-300 text-sm">SignUp</span></Link>
                    </div>
            </div>
        </div>
    )
}