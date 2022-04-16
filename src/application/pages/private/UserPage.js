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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [userToBlock, setUserToBlock] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        const parsedRows = [];
        users.forEach((row) => {
            const parseRow = newUser(row, showUserProfile, showBlockUser, showDeleteUser);
            parsedRows.push(parseRow);
        });
        
        setData(parsedRows);
    }, [])


    const showBlockUser = (userId) => {
        setUserToBlock(userId);
        setShowBlockModal(true);
    }

    const showDeleteUser = (userId) => {
        setUserToDelete(userId);
        setShowDeleteModal(true);
    }
    
    const showUserProfile = (id) => {
        setUserInfo({});
        setShowUserModal(true);
        //aqui le pego a la api
        const userInfo = {
            name: 'no se xd',
            userId: id,
            email: 'niidea@spotifiuby.com.ar',
            money: 50
        }
        setUserInfo(userInfo);
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
        Header: "Block",
        accessor: "table_block",
    },
    {
        Header: "Delete",
        accessor: "table_delete",
    },
    ], []
  );

    const users = [
        {
            name: 'eduardo',
            userId: 'asdad'
        },
        {
            name: 'sofia',
            userId: '1asdad'
        },
        {
            name: 'lucia',
            userId: '2asdad'
        },
        {
            name: 'federico',
            userId: '3asdad'
        },
        {
            name: 'franco',
            userId: '4asdad'
        },
        {
            name: 'iñaki',
            userId: '5asdad'
        },
        {
            name: 'nicolas',
            userId: '6asdad'
        },
        {
            name: 'gonzalo',
            userId: '7asdad'
        },
        {
            name: 'profesor',
            userId: '8asdad'
        }
    ]

    const confirmDelete = () => {
        setShowDeleteModal(false);
        //Aqui le pego a la api
    }

    const confirmBlock = () => {
        setShowBlockModal(false);
        //Aqui le pego a la api
    }

    return (
        <>
        {showLoadingModal && (
            <EmptyModal closeModal={() => setShowLoadingModal(false)}>
                <Loader/>
            </EmptyModal>
        )}
        {showBlockModal && (
            <ConfirmationModal confirm={confirmBlock} cancel={() => setShowBlockModal(false)} text='block this user'/>
        )}
        {showDeleteModal && (
            <ConfirmationModal confirm={confirmDelete} cancel={() => setShowDeleteModal(false)} text='delete this user'/>
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
