import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import PayModal from 'src/application/components/Modals/PayModal';
import { useAuth } from '../../../context/authContext';
import PageCard from '../../components/Common/PageCard';
import DefaultTable from '../../components/Common/table/DefaultTable';
import Loader from '../../components/Loader/loader';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import EmptyModal from '../../components/Modals/EmptyModal';
import UserProfile from '../../components/UserPage/UserProfile';
import { newUser } from '../../components/UserPage/UserRow';
import { disableUser, enableUser, getUsers, grantAdmin, payUser, removeAdmin } from '../../repository/users';

export default function UserPage() {
    const [data, setData] = useState([]);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [showPayUserModal, setShowPayUserModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [userToBlock, setUserToBlock] = useState(null);
    const [userToSetAdmin, setUserToSetAdmin] = useState(null);
    const [userToPay, setUserToPay] = useState({userId: null, userName: null});
    const [usersPerPage, setUsersPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [payingAmount, setPayingAmount] = useState(0);
    const [filter, setFilter] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [maxUsers, setMaxUsers] = useState(5);
    const [showSuccessOnBlocking, setShowSuccessOnBlocking] = useState(false)
    const [showSuccessOnSettingAdmin, setShowSuccessOnSettingAdmin] = useState(false)
    const [showSuccessOnPaying, setShowSuccessOnPaying] = useState(false)
    const {user} = useAuth();

    useEffect(() => {
        const getUsersFromApi = async () => {
            const userInfo = await getUsers(currentPage, usersPerPage, filter, user.accessToken);
            setAllUsers(userInfo.users);
            reloadData(userInfo.users);
            setMaxUsers(userInfo.total);
        }
        getUsersFromApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usersPerPage, currentPage, filter])

    const showBlockUser = (userId) => {
        setUserToBlock(userId);
        setShowBlockModal(true);
    }

    const showSetAdminUser = (userId) => {
        setUserToSetAdmin(userId);
        setShowAdminModal(true);
    }

    const showPayModal = (userId, userName) => {
        setUserToPay({userId, userName});
        setShowPayUserModal(true);
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
            const parseRow = newUser(row, showUserProfile, showBlockUser, showSetAdminUser, showPayModal);
            parsedRows.push(parseRow);
        });
        
        setAllUsers(users);
        setData(parsedRows);
    }
    
    const getTableInfoFrom = (userInfo) => {
        return {
            Id: userInfo.uid,
            Name: userInfo.name,
            Email: userInfo.email,
            Authentication: (!userInfo.federated) ? 'Email & Password' : 'Federated Identity',
            Type: userInfo.admin ? 'Admin' : 'Client',
            Subscription: userInfo.subscription,
            Enabled: userInfo.disabled ? 'No': 'Yes',
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
    {
        Header: "Pay",
        accessor: "table_pay",
    },
    ], []
  );

    const confirmBlock = async () => {
        setShowBlockModal(false);
        
        const allUsersModified = allUsers;
        const userModifying = allUsersModified.find(curr_user => curr_user.uid === userToBlock)
        if(userModifying.disabled){
            await enableUser(userModifying.uid, user.accessToken);
            userModifying.disabled = false;
        }
        else{
            await disableUser(userModifying.uid, user.accessToken);
            userModifying.disabled = true;
        }
        setAllUsers(allUsersModified);
        reloadData(allUsersModified);
        setShowSuccessOnBlocking(true);
    }

    const getBlockText = () => {
        if(allUsers.find(curr_user => curr_user.uid === userToBlock).disabled)
            return ('enable this user');
        return ('block this user');
    }

    const confirmSetAdmin = async () => {
        setShowAdminModal(false);
        
        //Aqui le pego a la api
        const allUsersModified = allUsers;
        const userModifying = allUsersModified.find(curr_user => curr_user.uid === userToSetAdmin)
        if(userModifying.admin) {
            await removeAdmin(userModifying.uid, user.accessToken);
            userModifying.admin = false;
        } else {
            await grantAdmin(userModifying.uid, user.accessToken);
            userModifying.admin = true;
        }
        setAllUsers(allUsersModified);
        reloadData(allUsersModified);
        setShowSuccessOnSettingAdmin(true);
    }

    const confirmPay = async (amount) => {
        await payUser(user.accessToken, userToPay.userId, amount);
        setShowPayUserModal(false);
        setPayingAmount(amount);
        setShowSuccessOnPaying(true);
    }

    const getSetAdminText = () => {
        if(allUsers.find(curr_user => curr_user.uid === userToSetAdmin).admin)
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
        {showSuccessOnPaying && 
        <EmptyModal closeModal={() => setShowSuccessOnPaying(false)}>
            <div className='text-white bg-spoticeleste rounded p-4'>
                The amount of {payingAmount} was given successfully  </div>  
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
        {showPayUserModal && (
            <PayModal confirm={confirmPay} cancel={() => setShowPayUserModal(false)} user={userToPay}/>
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
