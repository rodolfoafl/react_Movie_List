import React, { useContext, Fragment } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import ListItem from "./ListItem";

import ListContext from "../../context/list/listContext";

const Lists = () => {
  const listContext = useContext(ListContext);

  const { lists, filtered } = listContext;

  if (lists.lenght === 0) {
    return <h4>Nenhuma lista encontrada.</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map(l => <ListItem list={l} />)
          : lists.map(l => (
              <CSSTransition key={l.id} timeout={500} classNames="item">
                <ListItem list={l} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Lists;
