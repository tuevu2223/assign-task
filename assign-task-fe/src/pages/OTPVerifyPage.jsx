import FormField from "@/components/FormField";
import OTPInput from "@/components/FormInputs/OTPInput";
import { Button } from "antd";
import { useForm } from "react-hook-form";

function OTPVerifyPage() {
  const { control } = useForm();

  return (
    <>
      <p className="mt-4 text-center text-2xl font-bold">Login</p>
      <div className="mt-4 flex flex-col gap-2">
        <p className="text-xl font-bold">Two-Step Verification 💬</p>
        <p>
          We sent a verification code to your mobile.
          <br /> Enter the code from the mobile in the field below.
        </p>
        <FormField
          label="Type your 6 digit security code"
          name="verifyOTP"
          Component={OTPInput}
          control={control}
        />
        <Button type="primary" size="large"> Verify my account </Button>
        <p>Didn't get the code? Resend</p>
      </div>
    </>
  );
}
export default OTPVerifyPage;
