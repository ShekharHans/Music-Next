import { playlistState } from "@/atoms/playlistAtom";
import { currentTrackIdState, isPlayingState } from "@/atoms/songAtom";
import useSongInfo from "@/hooks/useSongInfo";
import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  ArrowsRightLeftIcon,
  BackwardIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ForwardIcon,
  ArrowPathRoundedSquareIcon,
  PauseCircleIcon,
  PlayCircleIcon

} from '@heroicons/react/24/solid'
import { debounce } from "lodash";








function Player() {
  const [playlist, setPlaylist] = useRecoilState(playlistState);



  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState);

  const [volume, setVolume] = useState(50)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("now playing : ", data.body?.item);
        setCurrentIdTrack(data.body?.item?.id)

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentIdTrack) {
      // fetch the song info
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdState, spotifyApi, session])


  // play pause control
  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false)
      }
      else {
        spotifyApi.play();
        setIsPlaying(true)
      }
    })
  }

  // Changeing volume

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(

    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err)=>{});

    }, 100),
    []
  )

  return (
    <div className="h-20 bg-[#181818] text-white grid grid-cols-3 sm:text-xs  md:text-base  px-2 md:px-8">
      {/* Left Portion */}
      <div className="flex items-center space-x-5">
        <img
          className='hidden md:inline h-10 w-10'
          src={songInfo?.album?.images?.[0]?.url}
          alt=""
        />
        <div >
          <h3>{songInfo?.name}</h3>
          <p className="text-gray-500">{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* Center */}

      <div className="flex items-center justify-evenly">
        <ArrowsRightLeftIcon className="button" />
        <BackwardIcon className="button" />

        {/* playing pause icon */}

        {isPlaying ? (
          <PauseCircleIcon onClick={handlePlayPause} className="button w-10 h-10" />
        ) : (
          <PlayCircleIcon onClick={handlePlayPause} className="button w-10 h-10" />
        )}

        <ForwardIcon className="button" />
        <ArrowPathRoundedSquareIcon className="button" />
      </div>

      {/* Right */}

      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-4">
        <SpeakerXMarkIcon onClick={() => volume > 0 && setVolume(volume - 10)} className="button" />
        <input
          className=" md:w-28 w-20"
          type="range"
          value={volume}
          // onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <SpeakerWaveIcon onClick={() => volume < 100 && setVolume(volume + 10)} className="button" />
      </div>
    </div>
  );
}

export default Player;

