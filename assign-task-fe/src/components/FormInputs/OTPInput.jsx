import { MuiOtpInput } from "mui-one-time-password-input";

function OTPInput({ onChange, value }) {
  return (
    <MuiOtpInput
      value={value}
      onChange={onChange}
      length={6}
    />
  );
}
export default OTPInput;
