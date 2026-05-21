import {
  DEFAULT_CREATE_TASK_FORM_FIELDS_SYNCH,
  PRIORITY_TASK,
  STATUS_TASK,
} from "@/common/const";
import FormField from "@/components/FormField";
import SelectInput from "@/components/FormInputs/SelectInput";
import InputType from "@/components/FormInputs/TextInput";
import { open } from "@/redux/slices/snackBarSlice";
import { useCreateTaskMutation, useGetAllUserQuery } from "@/services/rootApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { login } from "@/redux/slices/snackBarSlice";

import * as yup from "yup";
// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };

const formSchema = yup.object().shape({
  title: yup.string().min(1).required(),
  description: yup.string().min(1).required(),
  status: yup
    .string()
    // .default(STATUS_TASK[0].value)
    .required("Please select status"),
  priority: yup
    .string()
    // .default(PRIORITY_TASK[0].value)
    .required("Please select priority"),
  assignedTo: yup.string().required("Please select assigned to"),
});

function Create() {
  const [createTask, { data, isLoading, isSuccess, isError }] =
    useCreateTaskMutation();

  const { data: resAllUser } = useGetAllUserQuery();
  const allUser = resAllUser?.data;
  // const newUsers = allUser.data.filter((item) => item.role !== "ADMIN");
  const dispatch = useDispatch();

  const assignedToOptions = useMemo(() => {
    if (!allUser) return [];

    const newUsers = allUser.filter((item) => item.role !== "ADMIN");

    return newUsers.map((i) => ({
      value: i._id,
      label: i.fullName,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allUser]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
    values: DEFAULT_CREATE_TASK_FORM_FIELDS_SYNCH,
  });

  useEffect(() => {
    if (allUser) {
      reset({
        ...DEFAULT_CREATE_TASK_FORM_FIELDS_SYNCH,
        assignedTo: assignedToOptions[0]?.value,
      });
    }
  }, [allUser]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(open({ message: "Tạo task thành công", type: "success" }));
    } else if (isError) {
      dispatch(
        open({
          message: isError?.data?.message || "Tạo task thất bại",
          type: "error",
        }),
      );
    }
  }, [isSuccess, isError]);

  const onSubmit = (formData) => {
    console.log("formData:", formData);
    createTask(formData);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <FormField
          label="Title"
          placeholder={"Task 1"}
          name="title"
          Component={InputType}
          control={control}
          error={errors["title"]?.message}
        />
        <FormField
          label="Description"
          placeholder={"Some description"}
          name="description"
          Component={InputType}
          control={control}
          error={errors["description"]?.message}
        />
        <FormField
          label="Status"
          name="status"
          Component={SelectInput}
          options={STATUS_TASK}
          control={control}
          error={errors["status"]?.message}
        />
        <FormField
          label="Priority"
          name="priority"
          options={PRIORITY_TASK}
          Component={SelectInput}
          control={control}
          error={errors["priority"]?.message}
        />
        <FormField
          label="assignedTo"
          name="assignedTo"
          Component={SelectInput}
          options={assignedToOptions}
          control={control}
          error={errors["assignedTo"]?.message}
        />
      </div>
      <div className="mt-2 flex justify-end">
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          size="large"
        >
          Create Task
        </Button>
      </div>
    </form>
  );
}

export default Create;
