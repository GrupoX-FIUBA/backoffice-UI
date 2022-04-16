import React from 'react';
import { faCirclePlay, faShieldHalved } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const newContent = (contentObject, showPlayModal, showBlockContent) => {

    contentObject.play = (<button className='rounded bg-spotiblue p-2' onClick={() => showPlayModal(contentObject.id)}>
        <FontAwesomeIcon icon={faCirclePlay}/> </button>)
    contentObject.block = (<button className='rounded bg-purple-500 p-2' onClick={() => showBlockContent(contentObject.id)}>
        <FontAwesomeIcon icon={faShieldHalved}/> </button>)
    
    return {
        table_id: contentObject.id,
        table_name: contentObject.name,
        table_author: contentObject.author,
        table_play: contentObject.play,
        table_block: contentObject.block,
    }
}