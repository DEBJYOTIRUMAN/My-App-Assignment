import { useNavigate } from "react-router-dom";
import { storeUser } from "../storage";
import { MyAppContext } from "../MyAppContext";
import { useContext } from "react";

const Header = () => {
  const { setUser } = useContext(MyAppContext);
  const navigate = useNavigate();

  const logout = () => {
    setUser({});
    storeUser({});
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center p-10 ">
      <div className="text-2xl font-bold text-gray-900">MyApp</div>
      <div
        className="cursor-pointer underline font-semibold"
        onClick={() => logout()}
      >
        Logout
      </div>
    </div>
  );
};

export default Header;
