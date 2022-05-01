import { faMusic} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import PageCard from '../../components/Common/PageCard';
import DefaultTable from '../../components/Common/table/DefaultTable';
import ContentPlayer from '../../components/ContentPage/ContentPlayer';
import { newContent } from '../../components/ContentPage/ContentRow';
import Loader from '../../components/Loader/loader';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import EmptyModal from '../../components/Modals/EmptyModal';
import { getContent } from '../../repository/content';

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

    useEffect(() => {
        const getContentFromApi = async () => {
            const contentInfo = await getContent(currentPage, contentPerPage, filter);
            setAllContent(contentInfo.contents);
            reloadData(contentInfo.contents);
            setMaxContent(contentInfo.total);
        }
        getContentFromApi();
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
            <EmptyModal closeModal={() => setShowContentModal(false)}>
               <div className="grid col-span-1 row-span-2 overflow-auto max-h-screenmin ">
                {contentInfo ? <ContentPlayer contentInfo={contentInfo}/> : <Loader/>}
              </div>
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
