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
          <div className="modal-background">
            <div className="modal text-dark" id="modal">
              <h3>{`Adicionar ${children} à:`}</h3>
              {movieLists.map((l) => (
                <div className="modal-content text-dark" key={l.name}>
                  <label htmlFor={l.name}>
                    {l.name}
                    <input
                      type="checkbox"
                      className="mx-1"
                      id={l.name}
                      name={l.name}
                    ></input>
                  </label>
                </div>
              ))}

              <div className="modal-actions">
                <button
                  className="toggle-button"
                  onClick={(e) => onCloseModal(e)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Modal;
