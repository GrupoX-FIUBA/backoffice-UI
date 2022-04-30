import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import PageCard from '../../components/Common/PageCard';
import DefaultTable from '../../components/Common/table/DefaultTable';
import Loader from '../../components/Loader/loader';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import EmptyModal from '../../components/Modals/EmptyModal';
import UserProfile from '../../components/UserPage/UserProfile';
import { newUser } from '../../components/UserPage/UserRow';

export default function UserPage() {
    const [data, setData] = useState([]);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [userToBlock, setUserToBlock] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [showSuccessOnBlocking, setShowSuccessOnBlocking] = useState(false)

    const mockedUsers = [
        {
            name: 'eduardo',
            userId: 'aided',
            email: 'eduardo@hotmail.com',
            auth: 'ep',
            signupDate: '2022-04-01',
            status: 'Enabled',
            type: 'client'
        },
        {
            name: 'sofia',
            userId: '1copad',
            email: 'sofia@hotmail.com',
            auth: 'fi',
            signupDate: '2022-04-02',
            status: 'Enabled',
            type: 'client'
        },
        {
            name: 'lucia',
            userId: 'lou2ad',
            email: 'lucia@hotmail.com',
            auth: 'ep',
            signupDate: '2022-04-03',
            status: 'Enabled',
            type: 'client'
        },
        {
            name: 'federico',
            userId: 'chipa',
            email: 'federico@hotmail.com',
            auth: 'ep',
            signupDate: '2022-04-04',
            status: 'Disabled',
            type: 'client'
        },
        {
            name: 'franco',
            userId: 'erectu',
            email: 'franco@hotmail.com',
            auth: 'ep',
            signupDate: '2022-04-05',
            status: 'Enabled',
            type: 'client'
        },
        {
            name: 'iñaki',
            userId: 'erucpo',
            email: 'inaki@hotmail.com',
            auth: 'ep',
            signupDate: '2022-04-01',
            status: 'Enabled',
            type: 'client'
        },
        {
            name: 'nicolas',
            userId: 'eructo',
            email: 'nicolas@hotmail.com',
            auth: 'ep',
            signupDate: '2022-04-01',
            status: 'Enabled',
            type: 'client'
        },
        {
            name: 'gonzalo',
            userId: 'idgeneradorandom',
            email: 'gonzalo@hotmail.com',
            auth: 'ep',
            signupDate: '2022-04-01',
            status: 'Enabled',
            type: 'client'
        },
        {
            name: 'profesor',
            userId: 'niidea',
            email: 'profesor@hotmail.com',
            auth: 'ep',
            signupDate: '2022-04-01',
            status: 'Enabled',
            type: 'client'
        }
    ]

    useEffect(async () => {
        getUsersFromApi();
        reloadData(mockedUsers);
    }, [])

    const getUsersFromApi = async () => {
        setAllUsers(mockedUsers);
    }

    const showBlockUser = (userId) => {
        setUserToBlock(userId);
        setShowBlockModal(true);
    }

    const showUserProfile = (userObject) => {
        setUserInfo({});
        setShowUserModal(true);
        const tableInfo = getTableInfoFrom(userObject);
        setUserInfo(tableInfo);
    }

    const reloadData = (users) => {
        const parsedRows = [];
        users.forEach((row) => {
            const parseRow = newUser(row, showUserProfile, showBlockUser);
            parsedRows.push(parseRow);
        });
        
        setAllUsers(users);
        setData(parsedRows);
    }
    
    const getTableInfoFrom = (userInfo) => {
        return {
            Id: userInfo.userId,
            Name: userInfo.name,
            Email: userInfo.email,
            'Date of Sign Up': userInfo.signupDate,
            Authentication: (userInfo.auth === 'ep') ? 'Email & Password' : 'Federated Identity',
            Type: userInfo.type,
            Status: userInfo.status,
        }
    }

const columns = React.useMemo(
    () => [
    {
        Header: "Id",
        accessor: "table_id",
    },
    {
        Header: "Name",
        accessor: "table_name",
    },
    {
        Header: "Profile",
        accessor: "table_profile",
    },
    {
        Header: "Status",
        accessor: "table_status",
    },
    {
        Header: "Block",
        accessor: "table_block",
    },
    ], []
  );

    const confirmBlock = () => {
        setShowBlockModal(false);
        
        //Aqui le pego a la api
        const allUsersModified = allUsers;
        const user = allUsersModified.find(user => user.userId === userToBlock)
        if(user.status === 'Enabled')
            user.status = 'Disabled';
        else
            user.status = 'Enabled';
        setAllUsers(allUsersModified);
        reloadData(allUsersModified);
        setShowSuccessOnBlocking(true);
    }

    const getBlockText = () => {
        if(allUsers.find(user => user.userId === userToBlock).status === 'Enabled')
            return ('block this user');
        return ('enable this user');
    }

    return (
        <>
        {showSuccessOnBlocking && 
        <EmptyModal closeModal={() => setShowSuccessOnBlocking(false)}>
            <div className='text-white bg-spoticeleste rounded p-4'>
                The state of the user was changed  </div>  
        </EmptyModal>}
        {showLoadingModal && (
            <EmptyModal closeModal={() => setShowLoadingModal(false)}>
                <Loader/>
            </EmptyModal>
        )}
        {showBlockModal && (
            <ConfirmationModal confirm={confirmBlock} cancel={() => setShowBlockModal(false)} text={getBlockText()}/>
        )}
        {showUserModal && (
            <EmptyModal closeModal={() => setShowUserModal(false)}>
               <div className="grid col-span-1 row-span-2 overflow-auto max-h-screenmin ">
                {userInfo ? <UserProfile userInfo={userInfo}/> : <Loader/>}
              </div>
            </EmptyModal>
          )}
    <PageCard information={{pageName: 'User Management', pageIcon: faUserFriends}}>
        <div className="mx-4">
            <DefaultTable columns={columns} data={data}/>
        </div>
    </PageCard></>);
}
