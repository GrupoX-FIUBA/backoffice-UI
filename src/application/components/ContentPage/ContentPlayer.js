import { faPlay, faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Howl, Howler } from 'howler'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/authContext';
import { getSongUrl } from '../../repository/content';

export default function ContentPlayer({contentInfo}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [songUrl, setSongUrl] = useState(null)
  const {user} = useAuth();

  useEffect(() => {
    const getSong = async() => {
      const songUrl = await getSongUrl(contentInfo.id, user.accessToken)
      console.log(songUrl);
      setSongUrl(songUrl);
    }
    getSong();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const playSound = () => {
    let sound = new Howl({
      src: songUrl,
      html5: true
    })
    sound.play();
    setIsPlaying(true);
  }

  const stopSound = () => {
    Howler.stop();
    setIsPlaying(false);
  }

  return (
    <div className='text-white'>
      Play the content
      {songUrl != null && <div className="cursor-pointer justify-center flex py-5">
      {isPlaying ? <div className='bg-white text-black px-4 py-2 rounded-md justify-center align-middle' onClick={stopSound}><FontAwesomeIcon icon={faSquare}/></div>
      : <div className='bg-white text-black px-4 py-2 rounded-md justify-center align-middle' onClick={playSound}><FontAwesomeIcon icon={faPlay}/></div>
      }</div>}
    </div>
  )
}
