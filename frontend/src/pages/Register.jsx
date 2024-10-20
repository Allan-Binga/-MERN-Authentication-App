import { useState } from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        name:'',
        email:'',
        password:'',
    }) 

    const registerUser = async (e) => {
        e.preventDefault();
        const {name, email, password} = data 
        try {
            const {data} = await axios.post('/register', {
                name, email, password 
            })
            if(data.error) {
                toast.error(data.error)
            } else{
                setData({})
                toast.success('Registration successful!')
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="register-container">
    <form onSubmit={registerUser}>
      <div className="form-row">
        <label htmlFor="nameInput">Name</label>
        <input id="nameInput" type="text" placeholder="Enter your name" value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
      </div>
      <div className ="form-row">
        <label htmlFor="emailInput">Email</label>
        <input id="emailInput" type="email" placeholder="iamjohndoe@gmail.com" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
      </div>
      <div className="form-row">
        <label htmlFor="passwordInput">Password</label>
        <input id="passwordInput" type="password" placeholder="Enter password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
      </div>
      <button id="registerBtn" type="submit">Register</button>
    </form>
  </div>
  
  
  )
}
