import { DatePicker } from "antd";

function DateTimeInput({ onChange, value, error, options }) {
  console.log({ value });

  return (
    <div className="">
      <DatePicker
        showTime
        format="DD/MM/YYYY HH:mm"
        value={value}
        style={{ width: "100%" }}
        onChange={onChange}
        options={options}
        status={error ? "error" : ""}
      />
    </div>
  );
}
export default DateTimeInput;
