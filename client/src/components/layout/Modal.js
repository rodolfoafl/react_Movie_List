import React, { Fragment, useContext, useState } from "react";

import ListContext from "../../context/list/listContext";

const Modal = ({ show, onClose, children }) => {
  const listContext = useContext(ListContext);
  const { lists, loading } = listContext;

  const [selectedLists, setSelectedLists] = useState([]);

  const onCloseModal = (e) => {
    onClose && onClose(e);
  };

  const onConfirm = (e) => {
    console.log(`lists selected: ${selectedLists}`);
  };

  // TODO: Change the use of name to _id
  const onChange = (e) => {
    let arrSelected = selectedLists;

    if (e.target.checked) {
      arrSelected.push(e.target.name);
    } else {
      let index = arrSelected.indexOf(e.target.name);
      arrSelected.splice(index, 1);
      // arrSelected = arrSelected.filter((item) => item !== e.target.name);
    }

    setSelectedLists(arrSelected);
  };

  return (
    <Fragment>
      {!show ? null : (
        <Fragment>
          <div className="modal-background">
            <div className="modal text-dark" id="modal">
              <h3>{`Adicionar ${children} à:`}</h3>
              {lists.map((l) => (
                <div className="modal-content text-dark" key={l._id}>
                  <label htmlFor={l.name}>
                    {l.name}
                    <input
                      type="checkbox"
                      className="mx-1"
                      id={l._id}
                      name={l.name}
                      defaultChecked={false}
                      onChange={(e) => onChange(e)}
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
                <button
                  className="toggle-button mx-1"
                  onClick={(e) => onConfirm(e)}
                >
                  Confirmar
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
