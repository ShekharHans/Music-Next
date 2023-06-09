import React from 'react'
import {
    HomeIcon,
    MagnifyingGlassIcon,
    BuildingLibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
    ArrowLeftOnRectangleIcon,
    FireIcon

} from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useSpotify from '@/hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '@/atoms/playlistAtom'




const Sidebar = () => {

    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    console.log("You picked", playlistId);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi])

    
    return (


        <div className='text-gray-500 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-32'>


            <div className='space-y-4 p-4 pt-2'>
                {/* 1st box */}

                <button className='flex items-center space-x-2 hover:text-white'>
                    <HomeIcon className='h-5 w-5' />
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>

                    <MagnifyingGlassIcon className='h-5 w-5' />
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <BuildingLibraryIcon className='h-5 w-5' />
                    <p>Your Library</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />


                {/* 2nd Box */}
                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlusCircleIcon className='h-5 w-5' />
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>

                    <RssIcon className='h-5 w-5' />
                    <p>Your Episodes</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className='h-5 w-5' />
                    <p>Liked Songs</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <FireIcon className='h-5 w-5' />
                    <p>Popular Songs</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />
                {/* PlayLists... Rendering form api */}
                {playlists.map((playlist) => (
                    <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className='cursor-pointer  hover:text-white' >{playlist.name}</p>
                ))}
            </div>
        </div >
    )
}

export default Sidebar
