import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

const HomePage = () => {
  const { role } = useSelector((state) => state.role);
  console.log({ role });

  return (
    <Routes>
      <Route path="/dashboard" element={<p>dashboard</p>} />
      <Route path="/tasks" element={<p>tasks</p>} />
      <Route path="/my-task" element={<p>my-task</p>} />
      <Route path="/members" element={<p>members</p>} />
      <Route path="/setting" element={<p>setting</p>} />
    </Routes>
  );
};
export default HomePage;
