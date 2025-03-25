import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { cookies } from 'next/headers';
import jsonwebtoken from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User doesn't exist." }, { status: 400 });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid Credentials." }, { status: 400 });
        }
        if (!user._id) {
            return NextResponse.json({ message: "User ID is missing." }, { status: 500 });
        }
        const token = jsonwebtoken.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY!, { expiresIn: '1h' });

        cookies().set('token', token, {
            httpOnly: true,
        });

        return NextResponse.json({ message: "Logged in" });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
