import React, { Fragment, useContext, useState, useEffect } from "react";

import ListContext from "../../context/list/listContext";

const Modal = ({ show, onClose, movie }) => {
  const listContext = useContext(ListContext);
  const { lists, loading, addMovie } = listContext;

  const [selectedLists, setSelectedLists] = useState([]);

  useEffect(() => {
    console.log("modal is open...");
  }, [movie]);

  const onCloseModal = (e) => {
    onClose && onClose(e);
  };

  const onConfirm = (e) => {
    if (selectedLists.length === 0) {
      return alert("Selecione ao menos uma Lista!");
    }

    let movieToAdd = {
      name: movie.Title,
      image: movie.Poster,
    };

    addMovie(selectedLists[0]._id, movieToAdd);

    onCloseModal();
  };

  // TODO: Change the use of name to _id
  const onChange = (e, list) => {
    let arrSelected = selectedLists;

    if (e.target.checked) {
      // arrSelected.push(e.target.name);
      // arrSelected.push(e.target._id);
      arrSelected.push(list);
    } else {
      // let index = arrSelected.indexOf(e.target.name);
      // let index = arrSelected.indexOf(e.target._id);
      let index = arrSelected.indexOf(list._id);
      arrSelected.splice(index, 1);
    }

    setSelectedLists(arrSelected);
  };

  return (
    <Fragment>
      {!show ? null : (
        <Fragment>
          <div className="modal-background">
            <div className="modal text-dark" id="modal">
              <h3>{`Adicionar ${movie.Title} à:`}</h3>
              {lists.length === 0 ? (
                <h3>Nenhuma Lista encontrada.</h3>
              ) : (
                lists.map((list) => (
                  <div className="modal-content text-dark" key={list._id}>
                    <label htmlFor={list.name}>
                      {list.name}
                      <input
                        type="checkbox"
                        className="mx-1"
                        id={list._id}
                        name={list.name}
                        defaultChecked={false}
                        onChange={(e) => onChange(e, list)}
                      ></input>
                    </label>
                  </div>
                ))
              )}

              <div className="modal-actions">
                <button
                  className="toggle-button"
                  onClick={(e) => onCloseModal(e)}
                >
                  Fechar
                </button>
                {/* TODO: Habilitar o botão de 'Confirmar somente se alguma lista for selecionada' */}
                <button
                  // className="toggle-button disabled mx-1"
                  id="confirm-button"
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
