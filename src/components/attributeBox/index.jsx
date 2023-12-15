import useProductStore from "stores/product";
import React from "react";
import classNames from "classnames";

import "./style.css";

export default function AttributeBox({ name, group }) {
  const { selectedAttributes, setSelectedAttributes } = useProductStore(
    (state) => ({
      selectedAttributes: state.selectedAttributes,
      setSelectedAttributes: state.setSelectedAttributes,
    })
  );

  const isSelected = selectedAttributes[group]
    ? selectedAttributes[group] === name
    : false;

  return (
    <div
      className={classNames("attribute-box", {
        "attribute-box__selected": isSelected,
      })}
      onClick={() => setSelectedAttributes(group, name)}
    >
      {name}
    </div>
  );
}
