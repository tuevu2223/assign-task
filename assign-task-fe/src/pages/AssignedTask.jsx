import { formatDateTime } from "@/common/utils/formatDateTime";
import { useGetAssignedTaskQuery } from "@/services/rootApi";
import { Table, Typography } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const AssignedTask = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Priority",
      dataIndex: "priority",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: {
        compare: (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        multiple: 1,
      },
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      sorter: {
        compare: (a, b) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
        multiple: 1,
      },
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        console.log({ record });

        return (
          <Typography.Link
            onClick={() => {
              navigate(`/edit-task/${record._id}`);
            }}
          >
            Edit Status Task
          </Typography.Link>
        );
      },
    },
  ];

  const { data } = useGetAssignedTaskQuery();

  const dataSource = useMemo(() => {
    const tableData = data?.data.map((i) => ({
      ...i,
      createdBy: i.createdBy.fullName,
      assignedTo: i.assignedTo.fullName,
      createdAt: formatDateTime(i.createdAt),
      deadline: formatDateTime(i?.deadline),
    }));

    return data?.data ? tableData : [];
  }, [data]);

  return <Table columns={columns} dataSource={dataSource} />;
};

export default AssignedTask;
