import { Button } from "antd";
import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div className="">
      <Button type="primary">button</Button>
    </div>
  );
}

export default HomePage;
