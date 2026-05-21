import { Select } from "antd";

function SelectInput({ onChange, value, error, options }) {
  console.log({ value });

  return (
    <div className="">
      <Select
        value={value}
        defaultValue={options[0]?.value}
        style={{ width: "100%" }}
        onChange={onChange}
        options={options}
        status={error ? "error" : ""}
      />
    </div>
  );
}
export default SelectInput;
