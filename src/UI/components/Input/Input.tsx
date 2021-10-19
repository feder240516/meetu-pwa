import "./Input.scss";

interface IProps {
  id: string;
  label?: string;
  value?: string;
  onChange?: (newValue: string) => any;
  type?: string;
}

export default function Input ({
  value, type, onChange, label, id,
}: IProps) {

  const handleChange = (e: any) => {
    if (onChange) { onChange(e.target.value) }
  }

  return (
    <div className="input-wrapper">
      <label htmlFor={id} className="input-label">{label}</label> <br />
      <input id={id} className="input-component" type={type || "text"}
        value={value} onChange={handleChange}/> <br />
    </div>
  )
}