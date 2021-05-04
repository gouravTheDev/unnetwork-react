import React from "react";
import MenuL from "./MenuL";

const Base = ({children}) => (
  <div className="baseClass">
    <MenuL />
    {children}
  </div>
);

export default Base;
