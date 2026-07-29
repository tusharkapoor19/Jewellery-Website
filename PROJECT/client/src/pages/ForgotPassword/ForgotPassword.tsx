
import { useState } from "react";
import { Link } from "react-router-dom";

import "./ForgotPassword.css";



const ForgotPassword =()=>{


const [step,setStep] = useState(1);


const [loading,setLoading] = useState(false);


const [success,setSuccess] = useState(false);


const [showPassword,setShowPassword] = useState(false);


const [showConfirm,setShowConfirm] = useState(false);


const [errors,setErrors] = useState<any>({});


const [serverError,setServerError] = useState("");






const [formData,setFormData] = useState({

email:"",

otp:"",

newPassword:"",

confirmPassword:""

});








const handleChange=(e:any)=>{


const {

name,

value

}=e.target;



setFormData({

...formData,

[name]:value

});


};








const validateEmail=()=>{


let error:any={};



if(!formData.email){


error.email="Email is required";


}

else if(

!/^[^\s@]+@[^\s@]+\.[^\s@]+$/

.test(formData.email)

){


error.email="Enter valid email address";


}





setErrors(error);



return Object.keys(error).length===0;


};









const validateOtp=()=>{


let error:any={};



if(!formData.otp){


error.otp="OTP is required";


}

else if(

!/^\d{6}$/.test(formData.otp)

){


error.otp="OTP must be 6 digits";


}




setErrors(error);



return Object.keys(error).length===0;


};









const validatePassword=()=>{


let error:any={};



if(!formData.newPassword){


error.newPassword="Password is required";


}

else if(

!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}/
.test(formData.newPassword)

){


error.newPassword=
"Password must contain uppercase, lowercase, number and special character";


}






if(

formData.newPassword !== formData.confirmPassword

){


error.confirmPassword=
"Passwords do not match";


}




setErrors(error);



return Object.keys(error).length===0;


};

const sendOtp = async()=>{


if(!validateEmail()) return;



try{


setLoading(true);

setServerError("");



const response = await fetch(

"http://localhost:5001/auth/sendotp",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

email:formData.email

})


}

);





const data = await response.json();





if(!response.ok){


throw new Error(

data.message || "OTP send failed"

);


}





setStep(2);



}


catch(error:any){


setServerError(

error.message

);


}


finally{


setLoading(false);


}



};









const verifyOtp = async()=>{


if(!validateOtp()) return;



try{


setLoading(true);

setServerError("");



const response = await fetch(

"http://localhost:5001/auth/verifyotp",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

email:formData.email,

otp:formData.otp

})


}

);





const data = await response.json();





if(!response.ok){


throw new Error(

data.message || "OTP verification failed"

);


}





setStep(3);



}


catch(error:any){


setServerError(

error.message

);


}


finally{


setLoading(false);


}



};









const resetPassword = async()=>{


if(!validatePassword()) return;



try{


setLoading(true);

setServerError("");



const response = await fetch(

"http://localhost:5001/auth/resetpassword",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

email:formData.email,

newPassword:formData.newPassword

})


}

);





const data = await response.json();





if(!response.ok){


throw new Error(

data.message || "Password reset failed"

);


}





setSuccess(true);



}


catch(error:any){


setServerError(

error.message

);


}


finally{


setLoading(false);


}



};

return (

<>

<div className="forgot-page">



<div className="forgot-wrapper">






<div className="forgot-brand">


<h1>

HIRANYA

</h1>



<p>

SECURE ACCOUNT RECOVERY

</p>




<span>

Reset your password securely
and continue your luxury jewellery journey.

</span>




<ul>


<li>
✦ Secure email verification
</li>


<li>
✦ OTP protected recovery
</li>


<li>
✦ Safe password reset
</li>


</ul>



</div>









<div className="forgot-card">






{
success && (


<div className="forgot-success">


<div className="success-icon">

<i className="fa-solid fa-check"></i>

</div>



<h3>

Password Updated

</h3>




<p>

Your password has been reset successfully ✨

</p>



<Link to="/login">

Login Now

</Link>



</div>


)

}








<div className="forgot-header">


<h2>

Forgot Password

</h2>



<p>

Recover your account securely

</p>



</div>







{
serverError &&


<p className="server-error">

{serverError}

</p>


}








<form>



{
step === 1 && (


<div className="input-group">


<label>

Email Address

</label>



<input

type="email"

name="email"

value={formData.email}

onChange={handleChange}

placeholder="Enter your registered email"

/>




{
errors.email &&

<small>

{errors.email}

</small>

}



</div>


)

}









{
step === 2 && (


<div className="input-group">


<label>

Enter OTP

</label>




<input

type="text"

name="otp"

value={formData.otp}

maxLength={6}

onChange={(e)=>{


const value=e.target.value.replace(/\D/g,"");


setFormData({

...formData,

otp:value

});


}}

placeholder="Enter 6 digit OTP"

/>




{
errors.otp &&

<small>

{errors.otp}

</small>

}



</div>


)

}









{
step === 3 && (


<>



<div className="input-group">


<label>

New Password

</label>




<div className="password-box">


<input

type={showPassword ? "text" : "password"}

name="newPassword"

value={formData.newPassword}

onChange={handleChange}

placeholder="Create new password"

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
errors.newPassword &&

<small>

{errors.newPassword}

</small>

}



</div>









<div className="input-group">


<label>

Confirm Password

</label>




<div className="password-box">


<input

type={showConfirm ? "text" : "password"}

name="confirmPassword"

value={formData.confirmPassword}

onChange={handleChange}

placeholder="Confirm new password"

/>





<button

type="button"

onClick={()=>setShowConfirm(!showConfirm)}

>


{

showConfirm

?

"Hide"

:

"Show"

}



</button>



</div>






{
errors.confirmPassword &&

<small>

{errors.confirmPassword}

</small>

}



</div>


</>

)

}









{
step === 1 && (


<button

type="button"

className="forgot-btn"

onClick={sendOtp}

disabled={loading}

>


{

loading

?

"Sending OTP..."

:

"Send OTP"

}



</button>


)

}









{
step === 2 && (


<button

type="button"

className="forgot-btn"

onClick={verifyOtp}

disabled={loading}

>


{

loading

?

"Verifying OTP..."

:

"Verify OTP"

}



</button>


)

}









{
step === 3 && (


<button

type="button"

className="forgot-btn"

onClick={resetPassword}

disabled={loading}

>


{

loading

?

"Updating..."

:

"Reset Password"

}



</button>


)

}








<p className="back-login">


<Link to="/login">

Back To Login

</Link>


</p>







</form>





</div>



</div>



</div>

</>


);


};



export default ForgotPassword;