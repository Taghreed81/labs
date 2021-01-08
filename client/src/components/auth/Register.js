import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";


export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [labName, setLabName] = useState();
  const [location, setLocation] = useState();
  const [phone, setPhone] = useState();
  const [description, setDescription] = useState();
  const [error, setError] = useState();

  
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, labName,location, phone, description};
       Axios.post("http://localhost:3000/users/register", newUser)
       .then(function (){
        history.push("/login");

       })
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div  className="card p-3 shadow mb-5 bg-white" style={{width: '35rem', padding: '15px ', marginLeft: '150px' , marginTop: '100px', borderRadius: '2.5rem',}}>
   <br />
      <div className = "container text-center"></div>
         <div className="page">
            <h3 className = "mb-3">Register</h3>
              {error && (
                  <ErrorNotice message={error} clearError={() => setError(undefined)} />
                  )}
      
               <form className="text-center border border-light p-9" onSubmit={submit}>
                <label >Email</label>
                 <input
                  required={true} className="form-control col"
                  id="register-email"
                   type="email"
                   onChange={(e) => setEmail(e.target.value)}
                   />
                    <label >Password</label>
                     <input
                      required={true}  name="password" className="form-control col"
                       id="register-password"
                       type="password"
                       onChange={(e) => setPassword(e.target.value)}
                       />
                     <br></br>
                     <label>Verify password</label>
                      <input
                      required={true}  name="password" className="form-control col"
                      type="password"
                       placeholder="Verify password"
                       onChange={(e) => setPasswordCheck(e.target.value)}
                       />

                        <label>Lab Name</label>
                         <input
                           required={true}  className="form-control col"
                             id="register-lab-name"
                               type="text"
                               onChange={(e) => setLabName(e.target.value)}
                          />

                      <label>Location</label>
                       <input
                       required={true}  className="form-control col"
                         id="register-location"
                         type="text"
                         onChange={(e) => setLocation(e.target.value)}
                          />

                    <label htmlFor="register-phone">Phone</label>
                    <input
                     required={true}  className="form-control col"
                      id="register-phone"
                    type="text"
                     onChange={(e) => setPhone(e.target.value)}
                       />
                     
                     <label>Description</label>
                     <input
                      required={true}   className="form-control col"
                       id="register-description"
                       type="text"
                       onChange={(e) => setDescription(e.target.value)}
                       />
                      
                   <div></div>
                     <br></br>
                     {/* <input type="submit" value="Register" className="btn btn-dark" /> */}
                 <button type='submit' value='Register'  className="btn btn-primary btn-lg btn-block">Register</button>

                     <br></br>
                     <br></br>
                     <b>If you already have an account<a href='/login'> Log In </a></b>
                       </form>
                   </div>
              </div>
  );
}
