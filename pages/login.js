import React from 'react'
import { getProviders, signIn } from "next-auth/react"
import Image from 'next/image'
import loginImage from '../Components/Assets/login.png'

const Login = ({ providers }) => {
    return (
        <div className='flex flex-col items-center min-h-screen w-full justify-center bg-slate-600'>
            <Image src={loginImage} className='w-52 mb-5' alt="" ></Image>
            {Object.values(providers).map((providers) => (
                <div>
                    <button
                        className='text-white bg-teal-500 p-3 rounded-lg hover:bg-blue-500'

                        onClick={() => signIn(providers.id, { callbackUrl: "/" })}
                    >
                        Login with Beat.com
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Login
export async function getServerSideProps() {

    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}
