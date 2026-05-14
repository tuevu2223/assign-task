import FormField from "@/components/FormField";
import InputType from "@/components/FormInputs/TextInput";
import { setTokens } from "@/redux/slices/authSlice";
import { open } from "@/redux/slices/snackBarSlice";
import { useLoginMutation } from "@/services/rootApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
// import { login } from "@/redux/slices/snackBarSlice";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

function LoginPage() {
  const [login, { data, isLoading, isSuccess, isError }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not valid")
      .required(),
    password: yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      console.log({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      dispatch(
        setTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }),
      );
    }
  }, [isSuccess, data, dispatch]);

  const onSubmit = (formData) => {
    console.log({ formData });

    login(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(open({ message: 'Đăng nhập thành công', type: 'success' }));
      navigate("/");
    } else if (isError) {
      dispatch(open({ message: isError?.data?.message || 'Lỗi đăng nhập', type: "error" }));
    }
  }, [isSuccess, isError, dispatch, navigate, isError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mt-4 text-center text-2xl font-bold">Login</p>
      <div className="mt-4 flex flex-col gap-2">
        <p className="text-xl font-bold">Welcome to Assign Task! 👋</p>
        <p>Please sign in to your account and start the adventure</p>
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
        <Button type="primary" htmlType="submit" loading={isLoading} size="large">
          Sign In
        </Button>
      </div>
    </form>
  );
}
export default LoginPage;
