/* eslint-disable react/no-unescaped-entities */
import { IconHeartFilled } from "@tabler/icons-react";
import { useLogin } from "../../api/hooks/useLogin";
import { useForm } from "../../utils/useForm";
import showToast from "../../utils/toast";
import useUserStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const { setUserData} = useUserStore();
  // console.log(userData)
  const nav = useNavigate()


  // Validation function for the login form
  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = "Email is required";
    if (!values.password) errors.password = "Password is required";
    return errors;
  };

  const { formData, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate
  );

  const loginMutation = useLogin({
    onSuccess: (data) => {
      showToast.success("Login successful! Welcome back.");
      setUserData(data.data);
      nav('/dashboard/landing-manage')
      // console.log(data.data);
    },
    onError: (error) => {
      showToast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    },
  });

  const { isLoading } = loginMutation;

  const handleFormSubmit = (e) => {
    handleSubmit(e, () => loginMutation.mutate(formData));
  };

  return (
    <form
      className="w-full h-[100vh] flex flex-col gap-5 items-center py-10 p-5"
      onSubmit={handleFormSubmit}
    >
      <div className="main-font text-secondary text-[30px] md:text-[100px] w-full self-start flex flex-wrap">
        Welcome Back! <IconHeartFilled className="text-red-500" /> Let's have a
        new experience
      </div>
      <div className="w-1/2 flex flex-col justify-center  gap-3 border p-3 rounded border-slate-300 shadow">
        <div className="flex flex-col gap-2">
          <label className="text-lg">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={errors.email ? "true" : "false"}
            required
          />
          {errors.email && (
            <p role="alert" style={{ color: "red" }}>
              {errors.email}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            aria-invalid={errors.password ? "true" : "false"}
            required
          />
          {errors.password && (
            <p role="alert" style={{ color: "red" }}>
              {errors.password}
            </p>
          )}
        </div>
        <button className="gradient-btn" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default Login;
