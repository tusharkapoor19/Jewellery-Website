import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// import TopBar from "../../components/TopBar/TopBar";
// import Navbar from "../../components/Navbar/Navbar";
// import Footer from "../../components/Footer/Footer";

import "./Login.css";


const Login = () => {

const navigate = useNavigate();

const { login } = useAuth();

const [showPassword,setShowPassword] = useState(false);


const [loading,setLoading] = useState(false);


const [success,setSuccess] = useState(false);


const [errors,setErrors] = useState<any>({});


const [serverError,setServerError] = useState("");





const [formData,setFormData] = useState({

email:"",

password:"",

remember:false

});







const handleChange=(e:any)=>{


const {

name,

value,

type,

checked

}=e.target;



setFormData({

...formData,


[name]:

type==="checkbox"

?

checked

:

value


});


};







const validateForm=()=>{


let error:any={};



if(!formData.email){

error.email="Email is required";

}

else if(

!/^[^\s@]+@[^\s@]+\.[^\s@]+$/

.test(formData.email)

){

error.email="Enter valid email";

}





if(!formData.password){

error.password="Password is required";

}





setErrors(error);



return Object.keys(error).length===0;


};


const handleSubmit = async(e:any)=>{


e.preventDefault();



if(!validateForm()) return;



try{

    setLoading(true);
    setServerError("");
    const role = await login(formData.email, formData.password);
    setSuccess(true);

    setTimeout(() => {
    navigate(role == "admin" ? "/admin" : "/");
    }, 1500);
}

catch(error:any){
    setServerError(error.message);
} 

finally{
    setLoading(false)
}


}










return (

<>





<div className="login-page">



<div className="login-wrapper">






<div className="login-brand">


<h1>

HIRANYA

</h1>



<p>

CRAFTED FOR LUXURY

</p>




<span>

Welcome back to your luxury
jewellery experience.

</span>






<ul>


<li>
✦ Access your wishlist
</li>


<li>
✦ Track your orders
</li>


<li>
✦ Get exclusive collections
</li>


</ul>



</div>









<div className="login-card">





{
success && (


<div className="login-success">


<div className="success-icon">

<i className="fa-solid fa-check"></i>

</div>



<h3>

Login Successful

</h3>



<p>

Welcome back to HIRANYA ✨

</p>



</div>


)

}







<div className="login-header">


<h2>

Welcome Back

</h2>



<p>

Login to your account

</p>



</div>








{
serverError &&

<p className="server-error">

{serverError}

</p>

}






<form onSubmit={handleSubmit}>




<div className="input-group">


<label>

Email Address

</label>




<input

type="email"

name="email"

value={formData.email}

onChange={handleChange}

placeholder="Enter your email"

/>




{
errors.email &&

<small>

{errors.email}

</small>

}



</div>









<div className="input-group">


<label>

Password

</label>




<div className="password-box">


<input

type={

showPassword

?

"text"

:

"password"

}

name="password"

value={formData.password}

onChange={handleChange}

placeholder="Enter your password"

/>





<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

>


{

showPassword

?

"Hide"

:

"Show"

}



</button>



</div>





{
errors.password &&

<small>

{errors.password}

</small>

}



</div>









<div className="login-options">


<label>


<input

type="checkbox"

name="remember"

checked={formData.remember}

onChange={handleChange}

/>



<span>

Remember me

</span>


</label>





<Link to="/forgot-password">

Forgot Password?

</Link>



</div>









<button

type="submit"

className="login-btn"

disabled={loading}

>



{

loading

?

"Logging In..."

:

"Login"

}



</button>









<div className="otp-login">


<Link to="/login-otp">

Login With OTP

</Link>



</div>








<p className="create-account">


Don't have an account?



<Link to="/signup">

Create Account

</Link>



</p>







</form>





</div>




</div>



</div>



</>


);


};


export default Login;