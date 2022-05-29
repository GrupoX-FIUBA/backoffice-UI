import { faPlay, faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Howl, Howler } from 'howler'
import React, { useState } from 'react'

export default function ContentPlayer({contentInfo}) {
  const [isPlaying, setIsPlaying] = useState(false)
  let sound = new Howl({
    src: contentInfo.url,
    html5: true
  })

  const playSound = () => {
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
      <div className="cursor-pointer justify-center flex py-5">
      {isPlaying ? <div className='bg-white text-black px-4 py-2 rounded-md justify-center align-middle' onClick={stopSound}><FontAwesomeIcon icon={faSquare}/></div>
      : <div className='bg-white text-black px-4 py-2 rounded-md justify-center align-middle' onClick={playSound}><FontAwesomeIcon icon={faPlay}/></div>
      }</div>
    </div>
  )
}
