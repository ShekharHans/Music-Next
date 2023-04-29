import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom';
import useSpotify from '@/hooks/useSpotify'
import { millisToMinutesAndSeconds } from '@/lib/time';
import React from 'react'
import { useRecoilState } from 'recoil';

const Song = ({ order, track }) => {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId]=useRecoilState(currentTrackIdState)
    const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState)

// for playing song 
const playSong =()=>{
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
        uris:[track.track.uri],
    })
}


    return (
        <div className='grid grid-cols-2 text-gray-500 py-3 px-5 hover:bg-zinc-800 cursor-pointer rounded-md' onClick={playSong}>
            <div className='flex items-center space-x-4'>
                <p>{order + 1}</p>
                <img className='h-10 w-10' src={track.track.album.images[0].url} alt="" />
                <div>
                    <p className='w-36 lg:w-64 text-white truncate'>{track.track.name}</p>
                    <p className='w-36'>{track.track.artists[0].name}</p>
                </div>
            </div>
            <div className='flex items-center justify-between ml-2 md: ml-2'>
                <p className='hidden w-42 md:inline'>{track.track.album.name}</p>
                <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song
