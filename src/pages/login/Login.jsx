import "./Login.css";
import Logo from "../../assets/logo.png";
import { useState } from "react";
import { notifyInfo, notifySuccess } from "../../helper/toast";
import { login } from "../../api/request/admin/auth/main.api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginMethod = async (data) => {
    try {
      const response = await login(data);

      console.log(response.data);

      localStorage.setItem("token", response.data.accessToken);
      notifySuccess("Muvaffaqiyatli kirdingiz");
      navigate("/admin");
    } catch (error) {
      notifyInfo("Login yoki parol xato");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      notifyInfo("To'liq ma'lumot kiritilishi shart");
      return;
    }

    await loginMethod({ username, password });
  };

  return (
    <section className="login-section relative h-screen text-white overflow-hidden flex items-center justify-center w-full">
      <div className="w-[510px] border bg-blue-300/50 backdrop-blur-lg relative z-50 px-[80px] py-[40px] rounded-[28px]">
        <img className="h-[80px] mx-auto" src={Logo} alt="Silver water logo" />
        <h1 className="text-3xl font-bold mt-[40px] mb-[24px]">Login</h1>
        <form onSubmit={handleLogin}>
          <label className="flex flex-col gap-[8px]">
            UserName
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="text-black pl-[16px] py-[8px] rounded-[8px] border shadow-sm"
              type="text"
            />
          </label>
          <label className="flex flex-col gap-[8px] mt-[16px]">
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="text-black pl-[16px] py-[8px] rounded-[8px] border shadow-sm"
              type="password"
            />
          </label>
          <button
            type="submit"
            className="bg-[#003465] rounded-[8px] mt-[24px] py-[8px] text-white w-full transition-all duration-300 hover:bg-blue-900"
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
