import React from "react";
import { DataContext } from "../../App";

const Avatar = props => (
  <img className="avatar" src={props.avatar} alt="avatar" />
);

const Avatar2 = () => {
  const data = React.useContext(DataContext);
  return <img className="avatar" src={data.avatar} alt="avatar" />;
};

export default Avatar2;
