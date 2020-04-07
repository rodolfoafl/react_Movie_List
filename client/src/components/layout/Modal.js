import React, { Fragment } from "react";

const Modal = ({ show, onClose, children }) => {
  const onCloseModal = (e) => {
    onClose && onClose(e);
  };

  const movieLists = [
    {
      name: "Lista 1",
    },
    {
      name: "Lista 2",
    },
    {
      name: "Lista 3",
    },
  ];

  return (
    <Fragment>
      {!show ? null : (
        <Fragment>
          <div className="modal text-primary" id="modal">
            <h2>{children}</h2>
            {movieLists.map((l) => (
              <div className="modal-content text-primary">
                <h3>{l.name}</h3>
              </div>
            ))}

            <div className="modal-actions">
              <button
                className="toggle-button"
                onClick={(e) => onCloseModal(e)}
              >
                Close
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Modal;
