import React from "react";
import { useAsyncDebounce } from 'react-table'

export default function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  handleOnClick
}) {
  const count = preGlobalFilteredRows
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <div className="text-white w-1/2 m-2 inline-block">
      <div className="inline-block">
        <div>Search:{' '}</div>
        <div className="w-1/2"><input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          className="text-black rounded-md px-3"
        />
        </div>
      </div>

              <button
                onClick={handleOnClick}
                className="w-1/8 bg-spoticeleste text-white font-bold mx-1 py-1 px-4 rounded-xl"
              >
                Filter
              </button>
    </div>
  )
}


