import { ROLE_USER } from "@/common/const";
import { Select } from "antd";

function SelectInput({ onChange, value, error }) {
  console.log({ value });

  return (
    <div className="">
      <Select
        value={value}
        defaultValue={ROLE_USER[0].value}
        style={{ width: '100%' }}
        onChange={onChange}
        options={ROLE_USER}
        status={error ? "error" : ""}
      />
    </div>
  );
}
export default SelectInput;
