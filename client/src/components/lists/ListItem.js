import React, { useContext } from "react";
import PropTypes from "prop-types";

import ListContext from "../../context/list/listContext";

const ListItem = ({ list }) => {
  const listContext = useContext(ListContext);
  const { deleteList, setCurrent, clearCurrent } = listContext;

  const { _id, name, movies } = list;

  const onDelete = () => {
    clearCurrent();
    deleteList(_id);
  };

  return (
    <div className="card bg-primary">
      <h3 className="text-dark text-left">{name}</h3>
      <h3 className="text-dark text-center">{`Contém ${movies.length} filmes`}</h3>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(list)}
        >
          <i className="far fa-edit"></i>
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          <i className="far fa-trash-alt"></i>
        </button>
      </p>
    </div>
  );
};

ListItem.propTypes = {
  list: PropTypes.object.isRequired,
};

export default ListItem;
