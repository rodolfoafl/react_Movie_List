import React, { useContext, Fragment, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import ListItem from "./ListItem";

import ListContext from "../../context/list/listContext";
import Spinner from "../layout/Spinner";

const Lists = () => {
  const listContext = useContext(ListContext);

  const { lists, filtered, loading, getLists } = listContext;

  useEffect(() => {
    getLists();
    //eslist-disable-next-line
  }, []);

  if (lists !== null && lists.length === 0 && !loading) {
    return <h4>Nenhuma lista encontrada.</h4>;
  }

  return (
    <Fragment>
      {lists !== null && !loading ? (
        // <TransitionGroup>
        <Fragment>
          {filtered !== null
            ? filtered.map(l => <ListItem list={l} />)
            : lists.map(l => <ListItem list={l} />)}
          {/* </TransitionGroup> */}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Lists;
