import React, { useContext, Fragment, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import ListItem from "./ListItem";

import ListContext from "../../context/list/listContext";
import Spinner from "../layout/Spinner";

import ListModal from "./ListModal";

const Lists = () => {
  const listContext = useContext(ListContext);

  const { lists, filtered, loading, getLists } = listContext;

  useEffect(() => {
    getLists();
    //eslist-disable-next-line
  }, []);

  const [currentList, setCurrentList] = useState(null);

  const [show, setShow] = useState(false);
  const showModal = (list = null) => {
    setShow(!show);
    setCurrentList(list);
  };

  if (lists !== null && lists.length === 0 && !loading) {
    return <h4>Nenhuma lista encontrada.</h4>;
  }

  return (
    <Fragment>
      {lists !== null && !loading ? (
        // <TransitionGroup>
        <Fragment>
          {filtered !== null
            ? filtered.map((l) => (
                <ListItem key={l._id} list={l} showModal={showModal} />
              ))
            : lists.map((l) => (
                <ListItem key={l._id} list={l} showModal={showModal} />
              ))}
          {/* </TransitionGroup> */}
          {/* <ListModal show={show} onClose={showModal} list={currentList} /> */}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Lists;
