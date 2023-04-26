import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Content from "../components/Content";
import { useContext, useEffect } from "react";
import { MyAppContext } from "../MyAppContext";

const Login = () => {
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

  const initialValues = {
    email: "",
  };

  const addLoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email.")
      .required("Please enter your email."),
  });

  const handleLogin = (values) => {
    fetch("https://myapp-iy51.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
      }),
    })
      .then((res) => res.json())
      .then((userData) => {
        if (!userData._id) {
          alert("Login failed, Please try again later.");
          return;
        }
        navigate("/after_login");
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        handleLogin(values);
      }}
      validationSchema={addLoginSchema}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <div className="flex items-center w-full max-w-xl px-6 mx-auto py-12">
          <div className="flex-1">
            <Content
              title="My App Login"
              desc="Welcome, please enter your email address and we'll send you a
                link to login."
            />
            <div className="mt-8">
              <div>
                <label htmlFor="email" className="mb-2 text-sm hidden">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="block w-full px-4 py-2 mt-2 border rounded-md"
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <p className="text-red-600 font-medium">{errors.email}</p>
                ) : null}
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className={`px-6 py-3 tracking-wide text-white transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-400 focus:ring-opacity-50 text-sm font-medium ${
                    !isValid &&
                    "text-gray-300 bg-gray-900 cursor-not-allowed hover:bg-gray-800"
                  }`}
                  onClick={handleSubmit}
                  disabled={!isValid}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
