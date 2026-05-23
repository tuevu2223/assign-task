import { STATUS_TASK } from "@/common/const";
import {
  useGetMyTasksQuery,
  useUpdateMyStatusTaskMutation,
} from "@/services/rootApi";
import { Form, Popconfirm, Select, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

// const originData = Array.from({ length: 100 }).map((_, i) => ({
//   key: i.toString(),
//   name: `Edward ${i}`,
//   age: 32,
//   address: `London Park no. ${i}`,
// }));

const MytaskPage = () => {
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const { data: dataRes, isSuccess } = useGetMyTasksQuery();
  const [updateMyStatusTask] = useUpdateMyStatusTaskMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isSuccess) {
      const myTasks = dataRes?.data;
      console.log({ myTasks });
      const myTasksDataTable = myTasks.map((i) => ({
        ...i,
        createdBy: i.createdBy.fullName,
        key: i._id,
      }));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(myTasksDataTable);
    }
  }, [isSuccess, dataRes]);

  const edit = (record) => {
    reset(record);
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = (formData) => {
    const newData = [...data];
    const index = newData.findIndex((item) => editingKey === item.key);
    if (index > -1) {
      newData[index] = { ...newData[index], ...formData };
      const taskUpdate = newData.find((i) => i._id === editingKey);

      updateMyStatusTask({ taskId: taskUpdate._id, status: taskUpdate.status });
      setEditingKey("");
    }
  };

  const columns = [
    {
      title: "title",
      dataIndex: "title",
      render: (text) => {
        return text;
      },
    },
    {
      title: "description",
      dataIndex: "description",
      render: (text) => {
        return text;
      },
    },
    {
      title: "description",
      dataIndex: "description",
      render: (text) => {
        return text;
      },
    },
    {
      title: "createdBy",
      dataIndex: "createdBy",
      render: (text) => {
        return text;
      },
    },
    {
      title: "status",
      dataIndex: "status",
      filters: [
        {
          text: "Todo",
          value: "TODO",
        },
        {
          text: "IN Progress",
          value: "IN_PROGRESS",
        },
        {
          text: "Done",
          value: "DONE",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
      render: (text, record) => {
        if (isEditing(record)) {
          return (
            <Form.Item
              style={{ margin: 0 }}
              validateStatus={errors.status ? "error" : ""}
              help={errors.status?.message}
            >
              <Controller
                name="status"
                control={control}
                rules={{ required: "Please Input status!" }}
                render={({ field }) => (
                  <Select options={STATUS_TASK} {...field} />
                )}
              />
            </Form.Item>
          );
        }
        return text;
      },
    },
    {
      title: "priority",
      dataIndex: "priority",
      render: (text) => {
        return text;
      },
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      render: (text) => {
        return text;
      },
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={handleSubmit(save)}
              style={{ marginInlineEnd: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit Status Task
          </Typography.Link>
        );
      },
    },
  ];

  return (
    <Table
      bordered
      dataSource={data}
      columns={columns}
      rowClassName="editable-row"
      pagination={{ onChange: cancel }}
    />
  );
};

export default MytaskPage;
