import React, { useContext, useRef, useEffect } from "react";

import ListContext from "../../context/list/listContext";

const ListFilter = () => {
  const listContext = useContext(ListContext);
  const { filterLists, clearFilter, filtered } = listContext;

  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = e => {
    if (text.current.value !== "") {
      filterLists(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filtrar Listas..."
        onChange={onChange}
      />
    </form>
  );
};

export default ListFilter;
