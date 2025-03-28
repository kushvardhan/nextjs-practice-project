import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request:NextRequest){
        try{
            const reqBody = await request.json();
            const {username,email,password} = reqBody;

            const user = await User.findOne({email});
            if(user) return NextResponse.json({message:'User already Exist.'},{status:400})

            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password,salt);
            
            const newUser =new User({
                email,username,password:hashedPassword
            })
            if(!newUser){
                return NextResponse.json({message:"User not created."},{status:500})
            }
            const savedUser = await newUser.save();
            
            await sendEmail({email,emailType:"VERIFY",userId:savedUser._id});

            
            return NextResponse.json({message:"New User Created",savedUser},{status:200})

        }catch(err:any){
            return NextResponse.json({
                error:err.message
            },{status:500})
        }
}