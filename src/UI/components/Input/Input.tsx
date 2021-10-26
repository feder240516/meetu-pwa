import "./Input.scss";

interface IProps {
  id: string;
  label?: string;
  value?: string;
  onChange?: (newValue: string) => any;
  type?: string;
  className?: string;
  icon?: string;
  otherProps?: any;
}

export default function Input ({
  value, type, onChange, label, id, otherProps, className, icon
}: IProps) {

  const handleChange = (e: any) => {
    if (onChange) { onChange(e.target.value) }
  }

  return (
    <div className="input-wrapper">
      {label ? (
        <>
          <label htmlFor={id} className={`input-label ${className || ""}`}>
            {label}
          </label>
          <br />
        </>
      ) : null}
      <div className="input-and-icon">
      <input id={id} className="input-component" type={type || "text"}
        value={value} onChange={handleChange} {...otherProps}/>
      {icon ? <i className="input-icon material-icons">{icon}</i> : null}
      </div>
      <br />
    </div>
  )
}