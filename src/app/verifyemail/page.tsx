"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong!");
        }
    };

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get("token");
        setToken(urlToken || "");
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h1 className="text-3xl font-bold mb-4">Verify Your Email</h1>

                <p className="text-gray-400">Token:</p>
                <p className="bg-orange-500 text-black px-2 py-1 rounded-md mt-2 w-full break-words">
                    {token || "No token found"}
                </p>

                {verified ? (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-green-400">✅ Email Verified Successfully!</h2>
                        <Link href="/login" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
                            Go to Login
                        </Link>
                    </div>
                ) : error ? (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-red-500">❌ Verification Failed</h2>
                        <p className="text-sm text-gray-300">{error}</p>
                    </div>
                ) : (
                    <p className="text-gray-400 mt-4">Verifying your email...</p>
                )}
            </div>
        </div>
    );
}
