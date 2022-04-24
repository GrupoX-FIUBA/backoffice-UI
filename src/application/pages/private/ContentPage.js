import { faMusic} from '@fortawesome/free-solid-svg-icons';
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
    const [allContent, setAllContent] = useState(null);
    const [showSuccessOnBlocking, setShowSuccessOnBlocking] = useState(false)

    const music = [
        {
            id: '1',
            name: 'Song 1',
            author: 'Author 1',
            status: 'Enabled'
        },
        {
            id: '2',
            name: 'Song 2',
            author: 'Author 2',
            status: 'Disabled'
        },
        {
            id: '3',
            name: 'Song 3',
            author: 'Author 3',
            status: 'Enabled'
        },
        {
            id: '4',
            name: 'Song 4',
            author: 'Author 4',
            status: 'Enabled'
        },
        {
            id: '5',
            name: 'Song 5',
            author: 'Author 5',
            status: 'Enabled'
        },
        {
            id: '6',
            name: 'Song 6',
            author: 'Author 6',
            status: 'Enabled'
        },
        {
            id: '7',
            name: 'Song 7',
            author: 'Author 7',
            status: 'Enabled'
        },
        {
            id: '8',
            name: 'Song 8',
            author: 'Author 8',
            status: 'Enabled'
        }
    ]

    useEffect(() => {
        setAllContent(music);
        reloadData(music);
    }, [])

    const reloadData = (content) => {
        const parsedRows = [];
        content.forEach((row) => {
            const parseRow = newContent(row, showPlayModal, showBlockContent);
            parsedRows.push(parseRow);
        });
        
        setData(parsedRows);
    }


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
        const allContentModified = allContent;
        const content = allContentModified.find(content => content.id === contentToBlock)
        if(content.status === 'Enabled')
            content.status = 'Disabled';
        else
            content.status = 'Enabled';
        setAllContent(allContentModified);
        reloadData(allContentModified); 
        setShowSuccessOnBlocking(true);
    }

    const getBlockText = () => {
        if(allContent.find(content => content.id === contentToBlock).status === 'Enabled')
            return 'block this content'
        return 'enable this content'
    }

    return (
        <>
        {showSuccessOnBlocking && 
        <EmptyModal closeModal={() => setShowSuccessOnBlocking(false)}>
            <div className='text-white bg-spoticeleste rounded p-4'>
                The state of the content was changed  </div>  
        </EmptyModal>}
        {showLoadingModal && (
            <EmptyModal closeModal={() => setShowLoadingModal(false)}>
                <Loader/>
            </EmptyModal>
        )}
        {showBlockModal && (
            <ConfirmationModal confirm={confirmBlock} cancel={() => setShowBlockModal(false)} text={getBlockText()}/>
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
