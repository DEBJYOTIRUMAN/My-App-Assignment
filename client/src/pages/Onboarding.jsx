import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { MyAppContext } from "../MyAppContext";
import Header from "../components/Header";
import Content from "../components/Content";

const Onboarding = () => {
  const { user, setUser } = useContext(MyAppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/");
      return;
    }
    if (user.name.length !== 0) {
      navigate("/dashboard");
      return;
    }
  }, [user]);

  const initialValues = {
    name: "",
  };

  const onboardingSchema = Yup.object().shape({
    name: Yup.string()
      .required("Please enter your name.")
      .min(3, "Name must have at least 3 characters.")
      .max(30, "Name has reached the character limit."),
  });

  const submit = (values) => {
    fetch(`https://myapp-iy51.onrender.com/api/user/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
      }),
    })
      .then((res) => res.json())
      .then((userData) => {
        if (!userData._id) {
          alert("Something went wrong. Please try again later.");
          return;
        }
        setUser(userData);
        navigate("/dashboard");
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        submit(values);
      }}
      validationSchema={onboardingSchema}
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
        <>
          <Header />
          <div className="flex items-center w-full max-w-xl px-6 mx-auto py-12">
            <div className="flex-1">
              <Content
                title="Onboarding"
                desc="Welcome to My App. Please enter your name to get started."
              />
              <div className="mt-8">
                <div>
                  <label htmlFor="name" className="mb-2 text-sm hidden">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                  {errors.name && touched.name ? (
                    <p className="text-red-600 font-medium">{errors.name}</p>
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
        </>
      )}
    </Formik>
  );
};

export default Onboarding;
