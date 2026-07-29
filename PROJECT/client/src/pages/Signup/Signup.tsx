import { useState } from "react";
import { Link } from "react-router-dom";


import "./Signup.css";


const Signup = () => {


const [showPassword,setShowPassword] = useState(false);

const [showConfirm,setShowConfirm] = useState(false);


const [loading,setLoading] = useState(false);

const [success,setSuccess] = useState(false);


const [errors,setErrors] = useState<any>({});

const [serverError,setServerError] = useState("");




const [formData,setFormData] = useState({

name:"",

gender:"",

dob:"",

email:"",

phone:"",

password:"",

confirmPassword:"",

terms:false

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



if(!formData.name.trim()){

error.name="Name is required";

}

else if(
!/^[A-Za-z ]+$/.test(formData.name)
){

error.name="Only alphabets allowed";

}




if(!formData.gender){

error.gender="Select gender";

}



if(!formData.dob){

error.dob="Date of birth required";

}




if(!formData.email){

error.email="Email required";

}

else if(
!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
){

error.email="Enter valid email";

}





if(!/^[6-9]\d{9}$/.test(formData.phone)){

error.phone="Enter valid mobile number";

}


if(
!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}/
.test(formData.password)

){

error.password =
"Password must contain uppercase, lowercase, number & special character";

}




if(
formData.password !== formData.confirmPassword

){

error.confirmPassword =
"Passwords do not match";

}




if(!formData.terms){

error.terms =
"Accept Terms & Privacy Policy";

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



const response = await fetch(
"http://localhost:5001/auth/signup",
{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify(formData)


}

);





const data = await response.json();





if(!response.ok){


throw new Error(

data.message || "Signup failed"

);


}





setSuccess(true);



}


catch(error:any){


setServerError(error.message);


}


finally{


setLoading(false);


}


};









return (

<>

<div className="signup-page">


<div className="signup-wrapper">





<div className="signup-brand">


<h1>
HIRANYA
</h1>



<p>
CRAFTED FOR LUXURY
</p>




<span>

Create your account and unlock
exclusive jewellery experiences.

</span>





<ul>

<li>
✦ Save your favourite jewellery
</li>


<li>
✦ Track your orders easily
</li>


<li>
✦ Get exclusive offers
</li>


</ul>



</div>








<div className="signup-card">





{
success && (


<div className="success-box">


<div className="success-icon">

<i className="fa-solid fa-check"></i>

</div>



<h3>
Account Created Successfully
</h3>



<p>

Welcome to HIRANYA ✨

<br/>

Your luxury jewellery journey begins here.

</p>



<Link to="/login">

Continue To Login

</Link>


</div>


)

}






<div className="signup-header">


<h2>
Create Account
</h2>



<p>
Join HIRANYA Luxury Club
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
Full Name
</label>



<input

type="text"

name="name"

value={formData.name}

onChange={handleChange}

placeholder="Enter your full name"

/>




{
errors.name &&

<small>
{errors.name}
</small>

}



</div>









<div className="input-group">


<label>
Gender
</label>




<select

name="gender"

value={formData.gender}

onChange={handleChange}

>


<option value="">
Select Gender
</option>


<option value="Male">
Male
</option>


<option value="Female">
Female
</option>


<option value="Other">
Other
</option>


</select>




{
errors.gender &&

<small>
{errors.gender}
</small>

}



</div>









<div className="input-group">


<label>
Date of Birth
</label>



<input

type="date"

name="dob"

value={formData.dob}

onChange={handleChange}

/>




{
errors.dob &&

<small>
{errors.dob}
</small>

}



</div>









<div className="input-group">


<label>
Email Address
</label>




<input

type="email"

name="email"

value={formData.email}

onChange={handleChange}

placeholder="Enter email address"

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
Mobile Number
</label>



<div className="phone-box">


<span>
+91
</span>



<input

type="tel"

name="phone"

value={formData.phone}

maxLength={10}

onChange={handleChange}

placeholder="Enter mobile number"

/>



</div>





{
errors.phone &&

<small>
{errors.phone}
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

placeholder="Create password"

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









<div className="input-group">


<label>
Confirm Password
</label>




<div className="password-box">


<input

type={
showConfirm
?
"text"
:
"password"
}

name="confirmPassword"

value={formData.confirmPassword}

onChange={handleChange}

placeholder="Confirm password"

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


<div className="terms-box">


<input

type="checkbox"

name="terms"

checked={formData.terms}

onChange={handleChange}

/>




<p>

I agree to{" "}



 <Link to="/terms-conditions">
    Terms & Conditions
  </Link>


{" "}and{" "}



<Link to="/privacy-policy">

Privacy Policy

</Link>



</p>



</div>







{
errors.terms &&

<small className="error-text">

{errors.terms}

</small>

}









<button

type="submit"

className="signup-btn"

disabled={loading}

>


{

loading

?

"Creating Account..."

:

"Create Account"

}


</button>









<div className="otp-login">


<Link to="/login-otp">

Login With OTP

</Link>


</div>








<p className="already-account">


Already have an account?



<Link to="/login">

Login

</Link>



</p>






</form>




</div>




</div>



</div>

</>


);


};



export default Signup;