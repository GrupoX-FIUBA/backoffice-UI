import React from 'react';
import { faUser, faUserCheck, faUserEdit, faUserLock, faUserTie } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const newUser = (userObject, showUserProfile, showBlockUser, showSetAdminUser) => {

    userObject.profile = (<button className='rounded bg-spotiblue p-2' onClick={() => showUserProfile(userObject)}>
        <FontAwesomeIcon icon={faUserEdit}/> </button>)
    const blockIcon = (userObject.enabled) ? faUserLock : faUserCheck;
    const blockColor = (userObject.enabled) ? 'bg-purple-500' : 'bg-spoticeleste';
    userObject.block = (<button className={`rounded ${blockColor} p-2`} onClick={() => showBlockUser(userObject.id)}>
        <FontAwesomeIcon icon={blockIcon}/> </button>)
    const adminIcon = (userObject.admin) ? faUser : faUserTie;
    const adminColor = (userObject.admin) ? 'bg-red-500' : 'bg-spoticeleste';
    userObject.adminButton = (<button className={`rounded ${adminColor} p-2`} onClick={() => showSetAdminUser(userObject.id)}>
        <FontAwesomeIcon icon={adminIcon}/> </button>)

    return {
        table_id: userObject.id,
        table_name: userObject.name,
        table_profile: userObject.profile,
        table_enabled: userObject.enabled ? 'Yes' : 'No',
        table_block: userObject.block,
        table_isAdmin: userObject.admin ? 'Yes': 'No',
        table_admin: userObject.adminButton,
    }
}