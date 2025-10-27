// import React from "react";

// const About = () => {
//   return (
//     <div className="container my-4">
//       <h2>About iNotebook</h2>
//       <p>
//         iNotebook is a simple and secure note-taking app built using the MERN
//         stack (MongoDB, Express, React, Node.js).  
//         It allows you to store your personal notes securely in the cloud, so you
//         can access them anytime, anywhere.
//       </p>
//     </div>
//   );
// };

// export default About;

import React, { useEffect, useState } from "react";

const About = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"), // ✅ send token
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container my-4">
      <h2>About iNotebook</h2>
      <p>
        iNotebook is a secure note-taking app built with the MERN stack (MongoDB, Express, React, Node.js).
        It allows you to manage your notes anywhere, anytime.
      </p>

      <hr />

      {user ? (
        <div>
          <h4>User Information</h4>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p className="text-muted">Loading user info...</p>
      )}
    </div>
  );
};

export default About;



