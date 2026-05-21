import { useGetAllTaskQuery } from "@/services/rootApi";
import { Table } from "antd";
import { useMemo } from "react";
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
];

// const dataSource = [
//   {
//     key: "1",
//     name: "John Brown",
//     chinese: 98,
//     math: 60,
//     english: 70,
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     chinese: 98,
//     math: 66,
//     english: 89,
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     chinese: 98,
//     math: 90,
//     english: 70,
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     chinese: 88,
//     math: 99,
//     english: 89,
//   },
// ];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const TaskPage = () => {
  const { data } = useGetAllTaskQuery();
  console.log({ data });
  const dataSource = useMemo(() => {
    const tableData = data?.data.map((i) => ({
      ...i,
      createdBy: i.createdBy.fullName,
      assignedTo: i.assignedTo.fullName,
    }));

    return data?.data ? tableData : [];
  });
  return (
    <Table columns={columns} dataSource={dataSource} onChange={onChange} />
  );
};
export default TaskPage;
