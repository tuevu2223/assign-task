import { Outlet } from "react-router-dom";
// Supports weights 100-900
import "@fontsource-variable/public-sans/wght.css";

function RootLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
export default RootLayout;
