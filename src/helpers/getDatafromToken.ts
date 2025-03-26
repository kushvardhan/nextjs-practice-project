import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export function getDatafromToken(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || "";
        if (!token) throw new Error("Token not found");

        const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY as string);
        return decodedToken.id;
    } catch (err: any) {
        throw new Error(err.message);
    }
}
