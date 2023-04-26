import { useContext, useEffect } from "react";
import Header from "../components/Header";
import { MyAppContext } from "../MyAppContext";
import Content from "../components/Content";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(MyAppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/");
      return;
    }
    if (user.name.length === 0) {
      navigate("/onboarding");
      return;
    }
  }, [user]);
  return (
    <>
      <Header />
      <div className="flex items-center w-full max-w-xl px-6 mx-auto py-12">
        <div className="flex-1">
          <Content
            title="Dashboard"
            desc={`Welcome ${user.name}.`}
            optional="Great to see you."
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
