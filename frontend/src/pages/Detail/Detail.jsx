import React from "react";
import Mountaininfo from "./Mountaininfo";
import { Showcase, List } from "./Detail.style";
import MtComments from "../../components/MtComments";

const Detail = () => {
  return (
    <>
      <Showcase>
        <List>
          <Mountaininfo />
          <hr></hr>
          <MtComments />
        </List>
      </Showcase>
    </>
  );
};

export default Detail;
