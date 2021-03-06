import React, { Fragment, useContext, useState, useEffect } from "react";

import ListContext from "../../context/list/listContext";
import AlertContext from "../../context/alert/alertContext";

const Modal = ({ show, onClose, movie }) => {
  const listContext = useContext(ListContext);
  const { lists, addMovie, deleteMovie } = listContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [selectedLists, setSelectedLists] = useState([]);
  const [deselectedLists, setDiselectedLists] = useState([]);

  useEffect(() => {
    if (show) {
      if (lists !== null) {
        let selLists = lists.filter((list) =>
          list.movies.some((m) => m.name === movie.Title)
        );
        setSelectedLists(selLists);
      }
    }
    //eslint-disable-next-line
  }, [show]);

  const onCloseModal = (e) => {
    onClose && onClose(e);

    setSelectedLists([]);
    setDiselectedLists([]);
  };

  const onConfirm = (e) => {
    console.log(selectedLists);
    console.log(deselectedLists);

    //Add Movie to selected Lists
    if (selectedLists.length > 0) {
      let movieToAdd = {
        name: movie.Title,
        image: movie.Poster,
        year: movie.Year,
        imdbID: movie.imdbID,
      };

      selectedLists
        .filter((list) => !list.movies.some((m) => m.name === movieToAdd.name))
        .map((list) => addMovie(list._id, movieToAdd));
      setAlert("Filme adicionado com sucesso!", "success");
    }

    //Remove Movie from previously selected List
    if (deselectedLists.length > 0) {
      deselectedLists.map((list) => deleteMovie(list._id, movie.Title));
      setAlert("Filme removido com sucesso!", "success");
    }
    onCloseModal();
  };

  const onChange = (e, list) => {
    let arrSelected = selectedLists;
    let arrDeselected = deselectedLists;

    if (e.target.checked) {
      arrSelected.push(list);

      let index = arrDeselected.indexOf(list._id);
      arrDeselected.splice(index, 1);
    } else {
      let index = arrSelected.indexOf(list._id);
      arrSelected.splice(index, 1);

      arrDeselected.push(list);
    }

    setSelectedLists(arrSelected);
    setDiselectedLists(arrDeselected);
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
                        defaultChecked={list.movies.some(
                          (m) => m.name === movie.Title
                        )}
                        onChange={(e) => onChange(e, list)}
                      ></input>
                    </label>
                  </div>
                ))
              )}

              <div className="modal-actions">
                {/* TODO: Habilitar o botão de 'Confirmar somente se alguma lista for selecionada' */}
                <button
                  id="confirm-button"
                  className="toggle-button"
                  onClick={(e) => onConfirm(e)}
                >
                  Confirmar
                </button>
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
