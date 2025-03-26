import { NextRequest, NextResponse } from 'next/server';
import { getDatafromToken } from '@/helpers/getDatafromToken'; 
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

connect();

export async function GET(request: NextRequest) {
    try {
        const userID = getDatafromToken(request); 

        const user = await User.findOne({ _id: userID }).select("-password -isAdmin");

        return NextResponse.json({ message: 'User found', data: user });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
