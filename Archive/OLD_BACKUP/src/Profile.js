import React from "react";
import logo from "./logo.png";

function Profile(){

return(

<div style={{
maxWidth:"900px",
margin:"auto",
padding:"20px"
}}>

{/* cover */}
<div style={{
height:"220px",
background:"linear-gradient(135deg,#1877f2,#42a5f5)",
borderRadius:"15px"
}}>
</div>

{/* logo */}
<div style={{
textAlign:"center",
marginTop:"-75px"
}}>

<div style={{
width:"150px",
height:"150px",
borderRadius:"50%",
background:"white",
display:"flex",
alignItems:"center",
justifyContent:"center",
margin:"auto",
border:"6px solid white",
boxShadow:"0 6px 18px rgba(0,0,0,0.2)"
}}>

<img
src={logo}
alt="FaceLook"
style={{
width:"110px",
height:"110px",
objectFit:"contain"
}}
/>

</div>

<h2 style={{marginTop:"12px"}}>
FaceLook User
</h2>

<p style={{color:"gray"}}>
Welcome to FaceLook profile
</p>

</div>

</div>

);

}

export default Profile;