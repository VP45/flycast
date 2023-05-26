'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
type Props = {}

const Login = (props: Props) => {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password
        });
        console.log("user",res);
        setIsLoading(false);
        if(res?.error){
            alert(res.error);
            setPassword("");
        }else{
            if(res?.ok && res.status === 200){
                router.push("/");
            }else{
                alert(res?.error);
                setPassword("");
            }
        }
    };


    return (
        <>
            {/* This is an example component */}
            <div className="h-screen font-sans login bg-cover w-full" style={{
                background: "url('http://bit.ly/2gPLxZ4')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}>
                <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                    <div className="w-full max-w-lg">
                        <div className="leading-loose">
                            <form
                                onSubmit={handleSubmit}
                                className="m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
                                <p className="text-white text-center text-lg font-bold">
                                    LOGIN
                                </p>
                                <div className="">
                                    <label className="block text-sm text-white" htmlFor="email">
                                        E-mail
                                    </label>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="email"
                                        id="email"
                                        placeholder="example@gmail.com"
                                        aria-label="email"
                                        required
                                    />
                                </div>
                                <div className="mt-2">
                                    <label className="block  text-sm text-white">Passsword</label>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="password"
                                        id="password"
                                        placeholder="*******"
                                        arial-label="password"
                                        required
                                    />
                                </div>
                                <div className="mt-4 items-center flex justify-start">

                                    <p
                                        className="inline-block right-0 align-baseline font-bold text-sm text-500 text-white hover:text-red-400"
                                    >
                                        Not a member?
                                    </p>
                                    <Link
                                        href="/register"
                                        className="inline-block right-0 align-baseline font-bold text-sm text-gray-900 hover:text-orange-400 ml-2">
                                        Sign up now!
                                    </Link>
                                </div>
                                <div className="mt-4">
                                    {
                                        isLoading ? (
                                            <button
                                                className="w-full px-4 py-1 text-white font-light tracking-wider bg-gray-700 rounded"
                                                type="submit"
                                                disabled
                                            >
                                                Loading...
                                            </button>
                                        ) : (
                                            <button
                                                className="w-full px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                                                type="submit"
                                            >
                                                Login
                                            </button>
                                        )
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login