import React from "react";
import Lists from "../lists/Lists";
import ListForm from "../lists/ListForm";
import ListFilter from "../lists/ListFilter";

const Home = () => {
  return (
    <div className="grid-2">
      <div>{<ListForm />}</div>
      <div>
        <ListFilter />
        <Lists />
      </div>
    </div>
  );
};

export default Home;
