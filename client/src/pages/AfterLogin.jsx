import { useNavigate } from "react-router-dom";
import Content from "../components/Content";
import { useContext, useEffect } from "react";
import { MyAppContext } from "../MyAppContext";

const AfterLogin = () => {
  const navigate = useNavigate();
  const { user } = useContext(MyAppContext);
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      if (user.name.length !== 0) {
        navigate("/dashboard");
        return;
      }
      navigate("/onboarding");
    }
  }, [user]);
  return (
    <div className="flex items-center w-full max-w-xl px-6 mx-auto py-12">
      <div className="flex-1">
        <Content
          title="My App Login"
          desc="Great. Thanks, We've send you a link to Login. Please check your email and click the link."
        />
      </div>
    </div>
  );
};

export default AfterLogin;
