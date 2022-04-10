import React from 'react';
import { faUserAltSlash, faUserEdit, faUserLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const newUser = (userObject) => {

    userObject.profile = (<button className='rounded bg-spotiblue p-2'>
        <FontAwesomeIcon icon={faUserEdit}/> </button>)
    userObject.block = (<button className='rounded bg-purple-500 p-2'>
        <FontAwesomeIcon icon={faUserLock}/> </button>)
    userObject.delete = (<button className='rounded bg-red-400 p-2'>
        <FontAwesomeIcon icon={faUserAltSlash}/> </button>)

    return {
        table_id: userObject.userId,
        table_name: userObject.name,
        table_profile: userObject.profile,
        table_block: userObject.block,
        table_delete: userObject.delete,
    }
}