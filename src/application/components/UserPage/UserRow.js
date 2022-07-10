import React from 'react';
import { faMoneyCheckDollar, faUser, faUserCheck, faUserEdit, faUserLock, faUserTie } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const newUser = (userObject, showUserProfile, showBlockUser, showSetAdminUser, showPayModal) => {

    userObject.profile = (<button className='rounded bg-spotiblue p-2' onClick={() => showUserProfile(userObject)}>
        <FontAwesomeIcon icon={faUserEdit}/> </button>)
    const blockIcon = (!userObject.disabled) ? faUserLock : faUserCheck;
    const blockColor = (!userObject.disabled) ? 'bg-purple-500' : 'bg-spoticeleste';
    userObject.block = (<button className={`rounded ${blockColor} p-2`} onClick={() => showBlockUser(userObject.uid)}>
        <FontAwesomeIcon icon={blockIcon}/> </button>)
    const adminIcon = (userObject.admin) ? faUser : faUserTie;
    const adminColor = (userObject.admin) ? 'bg-red-500' : 'bg-spoticeleste';
    userObject.adminButton = (<button className={`rounded ${adminColor} p-2`} onClick={() => showSetAdminUser(userObject.uid)}>
        <FontAwesomeIcon icon={adminIcon}/> </button>)
    userObject.payButton = (<button className={`rounded bg-black p-2`} onClick={() => showPayModal(userObject.uid, userObject.name)}>
        <FontAwesomeIcon icon={faMoneyCheckDollar}/> </button>)

    return {
        table_id: userObject.uid,
        table_name: userObject.name,
        table_profile: userObject.profile,
        table_enabled: userObject.disabled ? 'No' : 'Yes',
        table_block: userObject.block,
        table_isAdmin: userObject.admin ? 'Yes': 'No',
        table_admin: userObject.adminButton,
        table_pay: userObject.payButton,
    }
}