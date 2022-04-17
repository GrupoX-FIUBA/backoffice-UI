import React from "react";

const EmptyModal = ({ children, closeModal, okFunction }) => {
  return (
    <div
      className="fixed flex justify-center items-center z-30 inset-0 p-6"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex justify-center items-center text-center sm:block p-0">
        <div
          className="fixed inset-0 transition-opacity"
          style={{
            backgroundColor: "#1b1a3580", 
            backdropFilter: "blur(6px)",
          }}
          aria-hidden="true"
        ></div>
        <div 
          className="inline-block align-bottom rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-9 sm:align-middle bg-black border-2"
        >
          <div className="px-8 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start text-black">{children}</div>
          </div>
          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            
            {closeModal && <button
              onClick={closeModal}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-red text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>}
            {okFunction && (
              <button
                onClick={okFunction}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                OK
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyModal;