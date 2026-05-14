import { Input } from "antd";

function InputType({ name, onChange, value, placeholder, type, error }) {
  return (
    <div className="">
      <Input
        className="h-10 px-3 py-2"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        type={type}
        status={error ? "error" : ""}
      />
    </div>
  );
}
export default InputType;
