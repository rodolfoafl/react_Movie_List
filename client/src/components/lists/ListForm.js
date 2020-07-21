import React, { useState, useContext, useEffect } from "react";

import ListContext from "../../context/list/listContext";
import AlertContext from "../../context/alert/alertContext";

const ListForm = () => {
  const listContext = useContext(ListContext);
  const { addList, current, clearCurrent, updateList } = listContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [list, setList] = useState({
    name: "",
  });

  const { name } = list;

  useEffect(() => {
    if (current !== null) {
      setList(current);
    } else {
      setList({
        name: "",
        movies: [],
      });
    }
  }, [listContext, current]);

  const onChange = (e) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      setAlert("Lista criada com sucesso!", "success");
      addList(list);
    } else {
      setAlert("Lista atualizada com sucesso!", "success");
      updateList(list);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit} className="form-list">
      <h2 className="text-primary">
        {current ? "Editar Lista" : "Criar Nova Lista"}
      </h2>
      <input
        type="text"
        placeholder="Nome"
        name="name"
        value={name}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value={current ? "Atualizar" : "Criar"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Limpar
          </button>
        </div>
      )}
    </form>
  );
};

export default ListForm;
