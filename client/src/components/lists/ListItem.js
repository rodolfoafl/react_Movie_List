import React, { useContext } from "react";
import PropTypes from "prop-types";

import ListContext from "../../context/list/listContext";

const ListItem = ({ list }) => {
  const listContext = useContext(ListContext);
  const { deleteList, setCurrent, clearCurrent } = listContext;

  const { id, name, movies } = list;

  const onDelete = () => {
    clearCurrent();
    deleteList(id);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">{name}</h3>
      <h3 className="text-primary text-center">{`Contém ${movies.length} filmes`}</h3>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(list)}
        >
          Editar
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Deletar
        </button>
      </p>
    </div>
  );
};

ListItem.propTypes = {
  list: PropTypes.object.isRequired
};

export default ListItem;
