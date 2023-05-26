"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter} from 'next/navigation'
type Props = {}

const Register = (props: Props) => {

    const router = useRouter(); 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await fetch("http://localhost:3000/api/user/register", {
            body: JSON.stringify({
                email,
                password,
                name
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        });
        if (res.status === 200) {
            console.log("success");
            const data = await res.json();
            console.log(data);
            //saving user in localstorage
            localStorage.setItem("user", JSON.stringify(data.user));
            setIsLoading(false);
            router.push("/");
        } else {
            const data = await res.json();
            console.log("User already exists!", data.message);
            setIsLoading(false);
            alert(data.message);
        }
    };

    return (
        <>
            {/* This is an example component */}
            <div className="h-screen font-sans bg-cover w-full" style={{
                background: "url('http://bit.ly/2gPLxZ4')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}>
                <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                    <div className="w-full max-w-lg">
                        <div className="leading-loose">
                            <form onSubmit={handleSubmit} className="m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
                                <p className="text-white text-center text-lg font-bold">
                                    Register
                                </p>
                                <div className="">
                                    <label className="block text-sm text-white" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="text"
                                        id="name"
                                        placeholder="John Doe"
                                        aria-label="name"
                                        required
                                    />
                                </div>
                                <div className="mt-2">
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
                                    <label className="block  text-sm text-white">Password</label>
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
                                        Already registered?
                                    </p>
                                    <Link
                                        href="/login"
                                        className="inline-block right-0 align-baseline text-sm text-gray-900 font-bold hover:text-red-400 ml-2">
                                        Login
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
                                                Register
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

export default Register