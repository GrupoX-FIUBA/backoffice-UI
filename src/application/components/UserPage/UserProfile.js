import React from 'react'
import SimpleTable from '../Common/table/SimpleTable';

export default function UserProfile({userInfo}) {
    
    const columns = React.useMemo(
        () => [
        {
            Header: "Item",
            accessor: "item",
        },
        {
            Header: "Value",
            accessor: "value",
        },
    ],[]);

    const data = [];
    let keys = Object.keys(userInfo);
    for(let key of keys){
        data.push({item: key, value: userInfo[key]});
    }

  return (
    <SimpleTable columns={columns} data={data} initialPageSize={15}/>
  )
}
