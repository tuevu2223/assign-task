import {
  DEFAULT_CREATE_TASK_FORM_FIELDS_SYNCH,
  PRIORITY_TASK,
  STATUS_TASK,
} from "@/common/const";
import FormField from "@/components/FormField";
import DateTimeInput from "@/components/FormInputs/DateTimeInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import InputType from "@/components/FormInputs/TextInput";
import { open } from "@/redux/slices/snackBarSlice";
import {
  useGetAllUserQuery,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
} from "@/services/rootApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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

function EditTaskPage() {
  const { id } = useParams();
  const { data: resDataGetTaskById } = useGetTaskByIdQuery(id);
  const dataGetTaskById = resDataGetTaskById?.data;
  console.log({ dataGetTaskById });

  const [updateTask, { data, isLoading, isSuccess, isError }] =
    useUpdateTaskMutation();

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
    if (dataGetTaskById) {
      reset({
        title: dataGetTaskById.title,
        description: dataGetTaskById.description,
        status: dataGetTaskById.status,
        priority: dataGetTaskById.priority,
        assignedTo: dataGetTaskById.assignedTo._id,
        deadline: dataGetTaskById?.deadline
          ? dayjs(dataGetTaskById.deadline)
          : "",
      });
    }
  }, [dataGetTaskById]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(open({ message: "Sửa task thành công", type: "success" }));
    } else if (isError) {
      dispatch(
        open({
          message: isError?.data?.message || "Sửa task thất bại",
          type: "error",
        }),
      );
    }
  }, [isSuccess, isError]);

  const onSubmit = (formData) => {
    console.log("formData:", formData);
    updateTask({ ...formData, taskId: id });
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
        <FormField
          label="Deadline"
          name="deadline"
          Component={DateTimeInput}
          // options={assignedToOptions}
          control={control}
          error={errors["deadline"]?.message}
        />
      </div>
      <div className="mt-2 flex justify-end">
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          size="large"
        >
          Save
        </Button>
      </div>
    </form>
  );
}

export default EditTaskPage;
