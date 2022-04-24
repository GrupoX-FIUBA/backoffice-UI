import React from 'react';
import { faCirclePlay, faShield, faShieldHalved } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const newContent = (contentObject, showPlayModal, showBlockContent) => {

    contentObject.play = (<button className='rounded bg-spotiblue p-2' onClick={() => showPlayModal(contentObject.id)}>
        <FontAwesomeIcon icon={faCirclePlay}/> </button>)
    const blockIcon = (contentObject.status === 'Enabled') ? faShieldHalved : faShield;
    const blockColor = (contentObject.status === 'Enabled') ? 'bg-purple-500' : 'bg-spoticeleste';
    contentObject.block = (<button className={`rounded ${blockColor} p-2`} onClick={() => showBlockContent(contentObject.id)}>
        <FontAwesomeIcon icon={blockIcon}/> </button>)
    
    return {
        table_id: contentObject.id,
        table_name: contentObject.name,
        table_author: contentObject.author,
        table_play: contentObject.play,
        table_status: contentObject.status,
        table_block: contentObject.block,
    }
}