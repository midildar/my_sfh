import axios from "axios";
import React,{useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
const Login = () => {
  const navigate = useNavigate()
  const [error, seterror] = useState("");
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setdata({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
      const { email, password} = data;
      const Data = await axios.post("http://localhost:3001/user/login",{ email,password})
      console.log(Data)
      if (Data.data.status === false) alert(Data.msg)
      if (Data.data.status === true){
        localStorage.setItem("user",JSON.stringify(Data.data.user))
        localStorage.setItem("token",JSON.stringify(Data.data.token))
        setTimeout(() => {
          navigate("/home")
        }, 1000);
      } 
  
  };

  return (
    <div class="flex items-center justify-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <form onSubmit={handleSubmit}>
          <div class="form-group mb-6">
            <label
              for="exampleInputEmail2"
              class="form-label inline-block mb-2 text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              class="form-control
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInputEmail2"
              placeholder="Email Address"
              name="email"
              value={data.email}
              required
              onChange={handleChange}
            />
          </div>
          <div class="form-group mb-6">
            <label
              for="exampleInputPassword2"
              class="form-label inline-block mb-2 text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              class="form-control block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInputPassword2"
              placeholder="Password"
              name="password"
              value={data.password}
              required
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            class="
    w-full
    px-6
    py-2.5
    bg-blue-600
    text-white
    font-medium
    text-xs
    leading-tight
    uppercase
    rounded
    shadow-md
    hover:bg-blue-700 hover:shadow-lg
    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
    active:bg-blue-800 active:shadow-lg
    transition
    duration-150
    ease-in-out"
          >
            Sign in
          </button>
          {error && <p class=" justify-center">{error}</p>}
          <p class="text-gray-800 mt-6 text-center">
            Already a member?{" "}
            <Link to="/register">
              <p class="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">
                Signup
              </p>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
