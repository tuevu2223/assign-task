import { useGetAllUserQuery } from "@/services/rootApi";
import { Table } from "antd";
import { useMemo } from "react";
const columns = [
  {
    title: "Full Name",
    dataIndex: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
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
const MembersPage = () => {
  const { data } = useGetAllUserQuery();
  console.log({ data });
  const dataSource = useMemo(() => {
    return data?.data ? data?.data : [];
  });
  return (
    <Table columns={columns} dataSource={dataSource} onChange={onChange} />
  );
};
export default MembersPage;
