// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//     const [credentials, setCredentials] = useState({ name:"", email: "", password: "" , cpassword:""});
//     let navigate = useNavigate();
//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     const {name, email, password} = credentials;

//     const response = await fetch("http://localhost:5000/api/auth/createUser", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name,
//         email,
//         password
//       }),
//     });
//     const json = await response.json();
//     console.log(json);

//     if (json.success) {
//       // save the auth token and redirect
//       localStorage.setItem("token", json.authtoken);
//       navigate("/");  // ✅ navigate instead of history.push
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   const onChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };
//   return (
//     <div className="container">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">
//             Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             name="name"
//             onChange={onChange}
//             aria-describedby="emailHelp"
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             Email address
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             name="email"
//             onChange={onChange}
//             aria-describedby="emailHelp"
//           />
//           <div id="emailHelp" className="form-text">
//             We'll never share your email with anyone else.
//           </div>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             name="password"
//             onChange={onChange}
//                         minLength={5} required

//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="cpassword" className="form-label">
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="cpassword"
//             name="cpassword"

//             onChange={onChange}
//             minLength={5} required
//           />
//         </div>
        
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    // ✅ check confirm password before API call
    if (password !== cpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        // ✅ save the auth token and redirect
        localStorage.setItem("token", json.authtoken);
        navigate("/");
      } else {
        alert(json.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-2">
      <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
