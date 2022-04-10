import { faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import PageCard from '../../components/Common/PageCard';
import DefaultTable from '../../components/Common/table/DefaultTable';
import { newUser } from '../../components/UserPage/UserRow';

export default function UserPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const parsedRows = [];
        users.forEach((row) => {
            const parseRow = newUser(row);
            parsedRows.push(parseRow);
        });
        
        setData(parsedRows);
    }, [])
    
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

    return (
    <PageCard information={{pageName: 'User Management', pageIcon: faUserFriends}}>
        <div className="mx-4">
            <DefaultTable columns={columns} data={data}/>
        </div>
    </PageCard>);
}
