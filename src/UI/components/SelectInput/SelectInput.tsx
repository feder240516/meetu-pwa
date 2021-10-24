import React, { useRef, useState } from "react";
import Select from "react-select";
import './SelectInput.scss';

interface IProps {
    label?: string;
    options: {
      value: any;
      label: string;
    }[];
    value?: any;
    placeholder?: string;
    onChange?: (value: any) => void;
}

const SelectInput: React.FC<IProps> = ({
  label, options, value, placeholder, onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");

  const handleChange = (e: any) => {
    if (onChange) { onChange(e.value); }
  }

  return (
    <div className="select-wrapper">
      {label ? (<p className="select-label">{label}</p>) : null}
      <Select 
        options={options} 
        onChange={handleChange} 
        value={value} 
        className="select-component"
        classNamePrefix="select-component"
        isSearchable={false}
      />
    </div>
  )
};

export default SelectInput;