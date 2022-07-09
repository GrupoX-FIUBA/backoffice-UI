import { faMusic} from '@fortawesome/free-solid-svg-icons';
import { Howler } from 'howler';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/authContext';
import PageCard from '../../components/Common/PageCard';
import DefaultTable from '../../components/Common/table/DefaultTable';
import ContentPlayer from '../../components/ContentPage/ContentPlayer';
import { newContent } from '../../components/ContentPage/ContentRow';
import Loader from '../../components/Loader/loader';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import EmptyModal from '../../components/Modals/EmptyModal';
import { enableContent, getContent, disableContent } from '../../repository/content';

export default function ContentPage() {
    const [data, setData] = useState([]);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showContentModal, setShowContentModal] = useState(false);
    const [contentInfo, setContentInfo] = useState({});
    const [contentToBlock, setContentToBlock] = useState(null);
    const [allContent, setAllContent] = useState(null);
    const [contentPerPage, setContentPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [maxContent, setMaxContent] = useState(5);
    const [showSuccessOnBlocking, setShowSuccessOnBlocking] = useState(false)
    const {user} = useAuth();

    useEffect(() => {
        const getContentFromApi = async () => {
            const contentInfo = await getContent(currentPage, contentPerPage, filter, user.accessToken);
            setAllContent(contentInfo.contents);
            reloadData(contentInfo.contents);
            setMaxContent(contentInfo.total);
        }
        getContentFromApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentPerPage, currentPage, filter])

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
    
    const showPlayModal = (content) => {
        setShowContentModal(true);
        setContentInfo(content);
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
    

    const confirmBlock = async () => {
        setShowBlockModal(false);
        //Aqui le pego a la api
        const allContentModified = allContent;
        const content = allContentModified.find(content => content.id === contentToBlock)
        if(content.blocked){
            await enableContent(content.id, user.accessToken);
            content.blocked = false;
        }
        else{
            await disableContent(content.id, user.accessToken);
            content.blocked = true;
        }
        setAllContent(allContentModified);
        reloadData(allContentModified); 
        setShowSuccessOnBlocking(true);
    }

    const getBlockText = () => {
        if(allContent.find(content => content.id === contentToBlock).blocked)
            return 'enable this content'
        return 'block this content'
    }

    const realLastPage = () => {
        setCurrentPage(Math.ceil(maxContent / contentPerPage));
    }

    const realFirstPage = () => {
        setCurrentPage(1);
    }

    const realNextPage = () => {
        if(currentPage < Math.ceil(maxContent / contentPerPage))
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
            <EmptyModal closeModal={() => {setShowContentModal(false); Howler.stop()}}>
                {contentInfo ? <ContentPlayer contentInfo={contentInfo}/> : <Loader/>}
            </EmptyModal>
          )}
    <PageCard information={{pageName: 'Content Management', pageIcon: faMusic}}>
        <div className="mx-4">
        <DefaultTable columns={columns} data={data} setGlobalFilter={setFilter}
             preGlobalFilteredRows={5} realPageSize={contentPerPage} setRealPageSize={setContentPerPage}
             maxPages={Math.ceil(maxContent/contentPerPage)}
             realFirstPage={realFirstPage}
             realLastPage={realLastPage}
             realNextPage={realNextPage}
             realPreviousPage={realPreviousPage}/>
        </div>
    </PageCard></>);
}
