import { Typography } from "antd";
import { Controller } from "react-hook-form";

// eslint-disable-next-line no-unused-vars
function FormField({ control: formControl, label, name, Component, placeholder, type='text', error }) {
  return (
    <div>
      <p className="mb-1">{label}</p>
      <Controller
        name={name}
        control={formControl}
        render={({ field: { name, onChange, value } }) => {
          return <Component name={name} onChange={onChange} value={value} control={formControl} placeholder={placeholder} type={type} error={error} />;
        }}
      ></Controller>

      {
        error && (
          <Typography.Text type="danger">
             {error}
          </Typography.Text>
        )
      }
    </div>
  );
}
export default FormField;
