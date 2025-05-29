import React, { useState, SyntheticEvent } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate  } from "react-router-dom";
import { authAction } from "../../redux/authSlice";


const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    
    const isLoginSuccessful = true;

    if (isLoginSuccessful) {
      navigate("/"); 
  };
}

  // Initial State
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Error Messages
  const [errEmail, setErrEmail] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string>("");

  const [successMsg, setSuccessMsg] = useState<string>("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleSignUp = (e: SyntheticEvent) => {
    e.preventDefault();




  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      
      <div className="w-full bg-gray-100 lgl:w-full h-full">
        {successMsg ? (
          <div className="w-full lgl:w-[500px] mx-auto h-full flex flex-col justify-center">
            <p className="w-full px-4 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signup">
              <button
                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full lgl:w-[450px] mx-auto h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full mx-auto h-[90%] flex flex-col gap-4 justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-6 mx-auto">
               Login
              </h1>
              <div className="flex flex-col gap-6">
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                   Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full bg-transparent h-8 placeholder:text-sm placeholder:tracking-wide px-4 py-5 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="john@workemail.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full bg-transparent h-8 placeholder:text-sm placeholder:tracking-wide px-4 py-5 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Create password"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
                >
                  Sign In
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  Don't have an Account?{" "}
                  <Link to="/signup">
                    <span className="hover:text-blue-600 duration-300">
                      Sign up
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>

      <div className="w-fit hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <div className=" text-white font-bold uppercase text-3xl w-fit m-auto">Ankabit Bookings</div>
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Stay sign in for more
            </h1>
            <p className="text-base">When you sign in, you are with us!</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with Digital Market
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all Digital Market services
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <Link to="/">
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                © Mansur
              </p>
            </Link>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
