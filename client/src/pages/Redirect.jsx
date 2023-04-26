import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyAppContext } from "../MyAppContext";

const Redirect = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { setUser } = useContext(MyAppContext);

  useEffect(() => {
    fetch(`https://myapp-iy51.onrender.com/api/link/${params.token}`)
      .then((res) => res.json())
      .then((userData) => {
        if (!userData._id) {
          navigate("/error");
          return;
        }
        setUser(userData);
        navigate("/onboarding");
      });
  }, [params.token]);
};

export default Redirect;
