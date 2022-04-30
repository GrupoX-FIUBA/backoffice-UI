import React, { useState } from "react";
import { useAsyncDebounce } from 'react-table'

export default function GlobalFilter({
  preGlobalFilteredRows,
  handleOnClick
}) {
  const count = preGlobalFilteredRows
  const [localFilter, setLocalFilter] = useState('')
  const onChange = useAsyncDebounce(value => {
    setLocalFilter(value || undefined)
  }, 200)

  return (
    <div className="text-white w-1/2 m-2 inline-block">
      <div className="inline-block">
        <div>Search:{' '}</div>
        <div className="w-1/2"><input
          value={localFilter || ""}
          onChange={e => {
            setLocalFilter(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          className="text-black rounded-md px-3"
        />
        </div>
      </div>

              <button
                onClick={() => handleOnClick(localFilter)}
                className="w-1/8 bg-spoticeleste text-white font-bold mx-1 py-1 px-4 rounded-xl"
              >
                Filter
              </button>
    </div>
  )
}


