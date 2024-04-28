import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
// import useLogin from "../hooks/useLogin";
import { loginUser } from "../Store/UserSlice";
import logo from "../img/logo.png";
import "../App.css";
import { Result } from "postcss";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  // redux state
  const { userObj } = useSelector((state) => state.user);

  // dispatch and navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkInputFields = () => {
    if (email === "" || password === "")
      toast.warn("Enter User Credentials", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setLoginError(null);
    dispatch(loginUser({ email, password })).then((res) => {
      setLoading(false);
      if (res.payload !== undefined) {
        setTimeout(() => {
          setEmail("");
          setPassword("");
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Invalid User!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        if (res.error.message === "One or more of the fields are missing.") {
          setLoginError("Access Denied! Invalid username or password");
        } else {
          setLoginError(res.error.message);
        }
      }
    });
  };
  return (
    <>
      <motion.div
        // initial={{ y: 0 }}
        // animate={{ y: -500 }}
        // variants=
        className="w-screen  h-screen flex items-center "
      >
        <div className="w-[40%] h-full flex justify-center bg-[#F5D6BA] items-center p-3 ">
          <div className="bg-[#f7eadf] rounded-[1.5rem] justify-center items-center flex flex-col relative w-full h-full ">
            <div className=" w-full h-[70%]  p-2">
              <div className=" text-[3.2rem] gap-2 px-3 font-bold flex items-center ">
                {/* <span> */}
                <img src={logo} className="  h-[155px] w-[270px]" />
                {/* </span> */}
              </div>
              <div className=" h-[75%] mt-10 flex justify-center">
                <div className="  w-[85%] flex flex-col rounded-[0.8rem]">
                  <div className="flex h-[70%] justify-center ">
                    <div className=" relative w-[89%]">
                      <form className=" text-[1.45rem] ">
                        <div className="flex flex-col">
                          <input
                            type="email"
                            placeholder="Email"
                            className="mt-2 w-full p-2 px-5 rounded-[1.5rem] placeholder:text-[#4a2607]/60"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          ></input>
                        </div>{" "}
                        <div className="flex flex-col mt-5">
                          <input
                            type="password"
                            placeholder="Password"
                            className="mt-2 w-full p-2 px-5 rounded-[1.5rem]  placeholder:text-[#4a2607]/60"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          ></input>
                        </div>{" "}
                        {/* <div className="flex flex-col"> */}
                        <button
                          onClick={(e) => {
                            handleSubmit(e);
                            checkInputFields();
                          }}
                          className=" bg-[#F5D6BA] text-[#4a2607] font-normal mt-10 absolute right-0 px-5 py-2 rounded-[1.5rem] rounded-lg  hover:bg-[#f5c9a2] "
                        >
                          {loading ? "Loading..." : "Sign In"}
                        </button>
                        {/* <button
                          className="bg-white text-[#824609] font-normal 	 mt-10 absolute right-0 px-5 py-2 rounded-[1.5rem] "
                          onClick={(e) => {
                            handleSubmit(e);
                          }}
                        >
                          {loading ? "Loading..." : "Sign In"}
                          {/* {error && <div>{error}</div>} */}
                        {/* </button> */}
                        {/* </div> */}
                      </form>
                    </div>{" "}
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[70%] h-full bg-cover bg-center image-background"></div>
      </motion.div>
      <ToastContainer />
    </>
  );
}
export default Login;
