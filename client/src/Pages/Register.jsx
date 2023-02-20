import axios from 'axios'
import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
const Register = () => {
  const [error, seterror] = useState("")
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  })
const handleChange = ({currentTarget: input}) => {
  setdata({...data,[input.name]: input.value})

}

const navigate = useNavigate()


const handleSubmit = async(event) =>{
  event.preventDefault();
    
  const { name, email, password} = data;
  const Data = await axios.post("http://localhost:3001/user/register",{ name,email,password})
  console.log(Data)
  if (Data.data.status === false) alert(Data.data.msg)
  if (Data.data.status === true){
    setTimeout(() => {
      navigate("/login")
    }, 1000);
  } 
}


  return (
    <div class="flex items-center justify-center h-screen bg-gradient-to-r from-green-200 ">
      <div class="p-6 rounded-lg shadow-lg bg-white max-w-md ">
        <h1 class= "flex justify-center mb-6 font-medium">Register</h1>
  <form onSubmit={handleSubmit}>
    
      <div class="form-group mb-6">
        <input type="text" class="form-control
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
          placeholder="Name" name='name' value={data.name} required onChange={handleChange} />
      </div>
    
    <div class="form-group mb-6">
      <input type="email" class="form-control block
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
        placeholder="Email Address" name='email' value={data.email} required onChange={handleChange}/>
    </div>
    <div class="form-group mb-6">
      <input type="password" class="form-control block
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126"
        placeholder="Password" name='password' value={data.password} required onChange={handleChange}/>
    </div>
    <button type="submit" class="  
      w-full
      px-6
      py-2.5
      bg-slate-900
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
      ease-in-out">Sign up</button>
      {error && <p class= " justify-center">{error}</p>}
      <p class="text-gray-800 mt-6 text-center">Already a member? <Link to="/login"><p
        class="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Signin</p></Link>
    </p>
    
  </form>
</div>
    </div>
  )
}

export default Register