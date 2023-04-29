import React from 'react'
import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { shuffle } from 'lodash';
import { playlistIdState, playlistState } from '@/atoms/playlistAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSpotify from '@/hooks/useSpotify';
import { images } from '@/next.config';
import Songs from './Songs';


const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-slate-500",
    "from-purple-500",
    "from-orange-500",
];


const Center = () => {


    const { data: session } = useSession();
    const [color, setColor] = useState(null);

    const spotifyApi = useSpotify();
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playlistId]);


    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body)
        }).catch((err) => console.log("something went wrong!", err));
    }, [spotifyApi, playlistId])


    return (
        <div className='text-white  flex-grow h-screen overflow-y-scroll scrollbar-hide'>
            <header className='absolute top-5 right-8 '>
                <div className='flex items-center space-x-3 opacity-90  hover:opacity-80 cursor-pointer rounded-full bg-black'  onClick={() => signOut({ callbackUrl: "/login" })}>
                    {/* <UserIcon className='w-10 h-10 rounded-full border absolute left-2 '/> */}
                    <img className='rounded-full w-10 h-10 z-50 relative' src={session?.user.image} />
                    <h2 className='relative'>{session?.user.name}</h2>
                    <ChevronDownIcon className='h-5 w-5 relative right-2' />
                </div>
            </header>


            <section
                className={`flex items-end space-x-7 text-white p-8 bg-gradient-to-b to-black ${color} h-80 center-back`}
            >
                <img className='h-44 w-44 shadow-2xl' src={playlist?.images?.[0]?.url} alt="" />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className='text-2xl md:text-3xl xl:text-6xl'>{playlist?.name}</h1>
                </div>
            </section>
            <div >
                <Songs/>
            </div>
        </div>
    )
}

export default Center
