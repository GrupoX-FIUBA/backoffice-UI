import { faMusic, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import PageCard from '../../components/Common/PageCard';
import DefaultTable from '../../components/Common/table/DefaultTable';
import ContentPlayer from '../../components/ContentPage/ContentPlayer';
import { newContent } from '../../components/ContentPage/ContentRow';
import Loader from '../../components/Loader/loader';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import EmptyModal from '../../components/Modals/EmptyModal';

export default function ContentPage() {
    const [data, setData] = useState([]);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showContentModal, setShowContentModal] = useState(false);
    const [contentInfo, setContentInfo] = useState({});
    const [contentToBlock, setContentToBlock] = useState(null);

    useEffect(() => {
        const parsedRows = [];
        music.forEach((row) => {
            const parseRow = newContent(row, showPlayModal, showBlockContent);
            parsedRows.push(parseRow);
        });
        
        setData(parsedRows);
    }, [])


    const showBlockContent = (contentId) => {
        setContentToBlock(contentId);
        setShowBlockModal(true);
    }
    
    const showPlayModal = (id) => {
        setContentInfo({});
        setShowContentModal(true);
        //aqui le pego a la api
        const contentInfo = {
        }
        setContentInfo(contentInfo);
    }

const columns = React.useMemo(
    () => [
    {
        Header: "Id",
        accessor: "table_id",
    },
    {
        Header: "Song Name",
        accessor: "table_name",
    },
    {
        Header: "Author",
        accessor: "table_author",
    },
    {
        Header: "Play",
        accessor: "table_play",
    },
    {
        Header: "Block",
        accessor: "table_block",
    },
    ], []
  );

    const music = [
        {
            id: '1',
            name: 'Song 1',
            author: 'Author 1',
        },
        {
            id: '2',
            name: 'Song 2',
            author: 'Author 2',
        },
        {
            id: '3',
            name: 'Song 3',
            author: 'Author 3',
        },
        {
            id: '4',
            name: 'Song 4',
            author: 'Author 4',
        },
        {
            id: '5',
            name: 'Song 5',
            author: 'Author 5',
        },
        {
            id: '6',
            name: 'Song 6',
            author: 'Author 6',
        },
        {
            id: '7',
            name: 'Song 7',
            author: 'Author 7',
        },
        {
            id: '8',
            name: 'Song 8',
            author: 'Author 8',
        }
    ]

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
        {showContentModal && (
            <EmptyModal closeModal={() => setShowContentModal(false)}>
               <div className="grid col-span-1 row-span-2 overflow-auto max-h-screenmin ">
                {contentInfo ? <ContentPlayer contentInfo={contentInfo}/> : <Loader/>}
              </div>
            </EmptyModal>
          )}
    <PageCard information={{pageName: 'Content Management', pageIcon: faMusic}}>
        <div className="mx-4">
            <DefaultTable columns={columns} data={data}/>
        </div>
    </PageCard></>);
}
