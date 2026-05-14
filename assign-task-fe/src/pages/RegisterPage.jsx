import { ROLE_USER } from "@/common/const";
import FormField from "@/components/FormField";
import SelectInput from "@/components/FormInputs/SelectInput";
import InputType from "@/components/FormInputs/TextInput";
import { open } from "@/redux/slices/snackBarSlice";
import { useRegisterMutation } from "@/services/rootApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

function RegisterPage() {
  const [register, { data, isLoading, isSuccess, isError, error }] =
    useRegisterMutation();
  const dispatch = useDispatch();

  const formSchema = yup.object().shape({
    fullName: yup.string().min(2).required(),
    email: yup
      .string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not valid")
      .required(),
    password: yup.string().required(),
    role: yup.string().default(ROLE_USER[0].value).required("Role is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (formData) => {
    register(formData);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(open({ message: data?.message, type: "success" }));
      navigate("/login");
    } else if (isError) {
      dispatch(
        open({ message: error?.data?.message || "Lỗi đăng ký", type: "error" }),
      );
    }
  }, [isSuccess, isError, data, error, dispatch, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mt-4 text-center text-2xl font-bold">Register</p>
      <div className="mt-4 flex flex-col gap-2">
        <p className="text-xl font-bold">Adventure starts here 🚀</p>
        <p>Make your app management easy and fun!</p>
        <FormField
          label="Username"
          placeholder={"Vu Van Tue"}
          name="fullName"
          Component={InputType}
          control={control}
          error={errors["fullName"]?.message}
        />
        <FormField
          label="Email"
          placeholder={"abc123@gmail.com"}
          name="email"
          Component={InputType}
          control={control}
          error={errors["email"]?.message}
        />
        <FormField
          label="Password"
          placeholder={"*******"}
          name="password"
          Component={InputType}
          control={control}
          type="password"
          error={errors["password"]?.message}
        />
        <FormField
          label="Role"
          // placeholder={"Vu Van Tue"}
          name="role"
          Component={SelectInput}
          control={control}
          error={errors["role"]?.message}
        />
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          size="large"
        >
          Sign Up
        </Button>
        <p>
          Already have an account? <Link to={"/login"}>Sign in instead</Link>
        </p>
      </div>
    </form>
  );
}
export default RegisterPage;
