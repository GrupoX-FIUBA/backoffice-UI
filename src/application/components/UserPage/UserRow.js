import React from 'react';
import { faUserCheck, faUserEdit, faUserLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const newUser = (userObject, showUserProfile, showBlockUser) => {

    userObject.profile = (<button className='rounded bg-spotiblue p-2' onClick={() => showUserProfile(userObject)}>
        <FontAwesomeIcon icon={faUserEdit}/> </button>)
    const blockIcon = (userObject.status === 'Enabled') ? faUserLock : faUserCheck;
    const blockColor = (userObject.status === 'Enabled') ? 'bg-purple-500' : 'bg-spoticeleste';
    userObject.block = (<button className={`rounded ${blockColor} p-2`} onClick={() => showBlockUser(userObject.userId)}>
        <FontAwesomeIcon icon={blockIcon}/> </button>)

    return {
        table_id: userObject.userId,
        table_name: userObject.name,
        table_profile: userObject.profile,
        table_status: userObject.status,
        table_block: userObject.block,
    }
}