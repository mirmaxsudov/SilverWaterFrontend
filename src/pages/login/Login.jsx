import "./Login.css";
import Logo from "../../assets/logo.png"

const Login = () => {
    return <section
        className={"login-section relative h-screen text-[#fff] overflow-hidden flex items-center justify-center w-full"}>
        <div
            className={"w-[510px] border bg-blue-300/50 backdrop-blur-lg relative z-50 px-[80px] py-[40px] rounded-[28px]"}>
            <img className={"h-[80px] mx-auto"} src={Logo} alt={"Silver water logo"}/>
            <h1 className={"text-3xl font-bold mt-[40px] mb-[24px]"}>Login</h1>
            <form>
                <label className={"flex flex-col gap-[8px]"}>
                    Email
                    <input placeholder={"username@gmail.com"}
                           className={"text-[black] ps-[16px] py-[8px] rounded-[8px] border shadow-sm"} type={"text"}/>
                </label>
                <label className={"flex flex-col gap-[8px] mt-[16px]"}>
                    Password
                    <input
                        placeholder={"********"}
                        className={"text-black ps-[16px] py-[8px] rounded-[8px] border shadow-sm"}
                        type={"password"}/>
                </label>
                <button
                    className={"bg-[#003465] rounded-[8px] mt-[24px] py-[8px] text-white w-full transition-all duration-300 hover:bg-blue-900"}>
                    Sign in
                </button>
            </form>
        </div>

    </section>
}

export default Login;