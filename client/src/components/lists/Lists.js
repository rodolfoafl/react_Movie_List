import React, { useContext, Fragment, useEffect, useState } from "react";

import ListItem from "./ListItem";
import ListModal from "./ListModal";

import ListContext from "../../context/list/listContext";
import Spinner from "../layout/Spinner";

const Lists = () => {
  const listContext = useContext(ListContext);

  const { lists, filtered, loading, getLists, setCurrentUpdated } = listContext;

  useEffect(() => {
    getLists();
    //eslint-disable-next-line
  }, []);

  const [show, setShow] = useState(false);
  const showModal = (list) => {
    setShow(!show);

    setCurrentUpdated(list);
  };

  if (lists !== null && lists.length === 0 && !loading) {
    return <h4>Nenhuma lista encontrada.</h4>;
  }

  return (
    <Fragment>
      {lists !== null && !loading ? (
        <Fragment>
          <ListModal show={show} onClose={showModal} />
          {filtered !== null
            ? filtered.map((l) => (
                <ListItem key={l._id} list={l} showModal={showModal} />
              ))
            : lists.map((l) => (
                <ListItem key={l._id} list={l} showModal={showModal} />
              ))}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Lists;
