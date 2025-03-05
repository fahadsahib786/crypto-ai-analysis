import React, { useContext, useEffect, useState } from 'react'
import { OtpInput } from 'reactjs-otp-input';
import './otp.css'
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { verifyOtp } from '../utils/commonFunc';

const Otp = () => {
    const [otp, setOtp] = useState('');
    const [error,setError] = useState("")
    const [count,setCount] = useState(60);
    const location = useLocation();
    const navigate = useNavigate();

  const { register,sendOTP } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [forgotpassword, setForgotPassword] = useState("");



useEffect(() => {
        if (location.state) {
            const { email, username, password,forgotpassword } = location.state;
     
                setEmail(email || "");
                setUsername(username || "");
                setPassword(password || "");

                setForgotPassword(forgotpassword)
            
        } else {
            toast.error('Missing required information, please register again.');
            navigate('/register');
        }
    }, []);


  const handleChange = (otp) => setOtp(otp);

  useEffect(() => {
    const key = setInterval(() => {
       if(count > 0) setCount(count-1)
    },1000)
    return () => clearInterval(key)
  },[count])

  const handleOTP = async (e) => {
    e.preventDefault();
    let otpVerified =  await verifyOtp(otp,email)
    if(!otpVerified.success){
        toast("Invalid OTP")
        return
    }

    if(forgotpassword){
      setOtp('');
      navigate('/resetPassword',{ state: { otpVerified:true,email} })
    }else{
      try {
        const response = await register(username,email,password)
        debugger
        if(response.status == 201){
            toast(response.data.message);
            navigate('/login')
        }else if(response.status == 400){
            toast(response.message)
        }
       
            
        } catch (error) {
            console.log(error)
        }
    }

   
  }

  const resendOTP = async(e) => {
     e.preventDefault()
     try {
        const otp = await sendOTP(username, email, password);
        if(otp=='success'){
          toast('OTP resent Successfully')
        }
        setCount(60)
     } catch (error) {
        console.log(error);
     }
    
  }

  return (
    <div className="bg-indigo-900 text-navy-blue py-8">
      <div className="bg-white p-6 mx-auto max-w-xl rounded-lg shadow-lg">
        <h1 className="text-4xl text-center mb-6 text-indigo-900">Enter OTP</h1>
        <form className="space-y-4" >
          <div>
            <h6 className="block font-semibold">OTP has been sent to your email</h6>
            <OtpInput value={otp} containerStyle='inputContainer' inputStyle='eachInputField' onChange={handleChange} numInputs={6} separator={<span> - </span>} />
          </div>
        
          {error && <p className="text-red-500 text-center">{error}</p>}
          <span> Didn't recieve otp ? <button disabled={count !== 0 && true} onClick={resendOTP}>Resend</button> {count == 0 ?null: `otp in 00:${count.toString().padStart(2, '0')}`}</span>
          <button
            type="submit"
            className="w-full bg-indigo-900 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-300"
            onClick={handleOTP}
          >
            Verify
          </button>
          
        </form>
      </div>
    </div>
  )
}

export default Otp;