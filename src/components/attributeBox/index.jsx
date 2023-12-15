import useProductStore from "stores/product";
import React, { useEffect } from "react";
import classNames from "classnames";

import "./style.css";

export default function AttributeBox({ name, group, disabled }) {
  const { selectedAttributes, setSelectedAttributes } = useProductStore(
    (state) => ({
      selectedAttributes: state.selectedAttributes,
      setSelectedAttributes: state.setSelectedAttributes,
    })
  );

  const isSelected = selectedAttributes[group]
    ? selectedAttributes[group] === name
    : false;

  useEffect(() => {
    if (isSelected && disabled) {
      setSelectedAttributes(group, name);
    }
  }, [disabled, group, isSelected, setSelectedAttributes]);

  return (
    <div
      className={classNames("attribute-box", {
        "attribute-box__disabled": disabled,
        "attribute-box__selected": isSelected,
      })}
      onClick={() => !disabled && setSelectedAttributes(group, name)}
    >
      {name}
    </div>
  );
}
