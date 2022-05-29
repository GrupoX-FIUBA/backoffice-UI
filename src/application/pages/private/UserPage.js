import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import PageCard from '../../components/Common/PageCard';
import DefaultTable from '../../components/Common/table/DefaultTable';
import Loader from '../../components/Loader/loader';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import EmptyModal from '../../components/Modals/EmptyModal';
import UserProfile from '../../components/UserPage/UserProfile';
import { newUser } from '../../components/UserPage/UserRow';
import { getUsers } from '../../repository/users';

export default function UserPage() {
    const [data, setData] = useState([]);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [userToBlock, setUserToBlock] = useState(null);
    const [userToSetAdmin, setUserToSetAdmin] = useState(null);
    const [usersPerPage, setUsersPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [maxUsers, setMaxUsers] = useState(5);
    const [showSuccessOnBlocking, setShowSuccessOnBlocking] = useState(false)
    const [showSuccessOnSettingAdmin, setShowSuccessOnSettingAdmin] = useState(false)

    useEffect(() => {
        const getUsersFromApi = async () => {
            const userInfo = await getUsers(currentPage, usersPerPage, filter);
            setAllUsers(userInfo.users);
            reloadData(userInfo.users);
            setMaxUsers(userInfo.total);
        }
        getUsersFromApi();
    }, [usersPerPage, currentPage, filter])

    const showBlockUser = (userId) => {
        setUserToBlock(userId);
        setShowBlockModal(true);
    }

    const showSetAdminUser = (userId) => {
        setUserToSetAdmin(userId);
        setShowAdminModal(true);
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
            const parseRow = newUser(row, showUserProfile, showBlockUser, showSetAdminUser);
            parsedRows.push(parseRow);
        });
        
        setAllUsers(users);
        setData(parsedRows);
    }
    
    const getTableInfoFrom = (userInfo) => {
        return {
            Id: userInfo.id,
            Name: userInfo.name,
            Email: userInfo.email,
            Authentication: (userInfo.auth === 'ep') ? 'Email & Password' : 'Federated Identity',
            Type: userInfo.type,
            Enabled: userInfo.enabled ? 'Yes': 'No',
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
        Header: "Enabled",
        accessor: "table_enabled",
    },
    {
        Header: "Block",
        accessor: "table_block",
    },
    {
        Header: "Is Admin",
        accessor: "table_isAdmin",
    },
    {
        Header: "Set Admin",
        accessor: "table_admin",
    },
    ], []
  );

    const confirmBlock = () => {
        setShowBlockModal(false);
        
        //Aqui le pego a la api
        const allUsersModified = allUsers;
        const user = allUsersModified.find(user => user.id === userToBlock)
        if(user.enabled)
            user.enabled = false;
        else
            user.enabled = true;
        setAllUsers(allUsersModified);
        reloadData(allUsersModified);
        setShowSuccessOnBlocking(true);
    }

    const getBlockText = () => {
        if(allUsers.find(user => user.id === userToBlock).enabled)
            return ('block this user');
        return ('enable this user');
    }

    const confirmSetAdmin = () => {
        setShowAdminModal(false);
        
        //Aqui le pego a la api
        const allUsersModified = allUsers;
        const user = allUsersModified.find(user => user.id === userToSetAdmin)
        if(user.admin)
            user.admin = false;
        else
            user.admin = true;
        setAllUsers(allUsersModified);
        reloadData(allUsersModified);
        setShowSuccessOnSettingAdmin(true);
    }

    const getSetAdminText = () => {
        if(allUsers.find(user => user.id === userToSetAdmin).admin)
            return ('remove admin privileges from this user');
        return ('give admin privileges to this user');
    }

    const realLastPage = () => {
        setCurrentPage(Math.ceil(maxUsers / usersPerPage));
    }

    const realFirstPage = () => {
        setCurrentPage(1);
    }

    const realNextPage = () => {
        if(currentPage < Math.ceil(maxUsers / usersPerPage))
            setCurrentPage(currentPage+1);
    }

    const realPreviousPage = () => {
        if(currentPage > 1)
            setCurrentPage(currentPage-1);
    }

    return (
        <>
        {showSuccessOnBlocking && 
        <EmptyModal closeModal={() => setShowSuccessOnBlocking(false)}>
            <div className='text-white bg-spoticeleste rounded p-4'>
                The state of the user was changed  </div>  
        </EmptyModal>}
        {showSuccessOnSettingAdmin && 
        <EmptyModal closeModal={() => setShowSuccessOnSettingAdmin(false)}>
            <div className='text-white bg-spoticeleste rounded p-4'>
                The admin privileges of the user wete changed  </div>  
        </EmptyModal>}
        {showLoadingModal && (
            <EmptyModal closeModal={() => setShowLoadingModal(false)}>
                <Loader/>
            </EmptyModal>
        )}
        {showBlockModal && (
            <ConfirmationModal confirm={confirmBlock} cancel={() => setShowBlockModal(false)} text={getBlockText()}/>
        )}
        {showAdminModal && (
            <ConfirmationModal confirm={confirmSetAdmin} cancel={() => setShowAdminModal(false)} text={getSetAdminText()}/>
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
            <DefaultTable columns={columns} data={data} setGlobalFilter={setFilter}
             preGlobalFilteredRows={5} realPageSize={usersPerPage} setRealPageSize={setUsersPerPage}
             maxPages={Math.ceil(maxUsers/usersPerPage)}
             realFirstPage={realFirstPage}
             realLastPage={realLastPage}
             realNextPage={realNextPage}
             realPreviousPage={realPreviousPage}/>
        </div>
    </PageCard></>);
}
