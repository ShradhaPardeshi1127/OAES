// import React, { useState } from "react";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     console.log("Email:", email);
//     console.log("Password:", password);

//     try {
//       const response = await fetch(
//         "http://localhost:7000/login-options/adminlogin",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, password }),
//         }
//       );

//       if (!response.ok) {
//         const data = await response.json();
//         console.error("Login error:", data.error);
//         setError(data.error || "Something went wrong. Please try again.");
//         return;
//       }

//       const data = await response.json();
//       alert(data.message);
//       window.location.href = "/admin-dashboard";
//     } catch (error) {
//       console.error("Error:", error);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
//           <p className="mt-2 text-sm text-gray-600">Welcome back! Please enter your details</p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleLogin}>
//           <div className="space-y-1">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Enter your email *
//             </label>
//             <div className="mt-1">
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div className="space-y-1">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password *
//             </label>
//             <div className="mt-1 relative">
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 autoComplete="current-password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? (
//                   <span aria-hidden="true">🙈</span>
//                 ) : (
//                   <span aria-hidden="true">👁️</span>
//                 )}
//               </button>
//             </div>
//           </div>

//           {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 onChange={(e) => {
//                   localStorage.setItem("rememberMe", e.target.checked);
//                 }}
//               />
//               <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                 Remember me
//               </label>
//             </div>

//             <div className="text-sm">
//               <a
//                 href="/reset-password"
//                 className="font-medium text-blue-600 hover:text-blue-500"
//                 onClick={() => localStorage.setItem("emailToReset", email)}
//               >
//                 Forgot password?
//               </a>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
//             >
//               LOGIN
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useState, useEffect } from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Load saved email if remember me was checked previously
  useEffect(() => {
    const remembered = localStorage.getItem("rememberMe") === "true";
    if (remembered) {
      const savedEmail = localStorage.getItem("savedEmail");
      if (savedEmail) setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    console.log("Email:", email);
    console.log("Password:", password);

    // Save email if remember me is checked
    if (rememberMe) {
      localStorage.setItem("savedEmail", email);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("savedEmail");
      localStorage.setItem("rememberMe", "false");
    }

    try {
      const response = await fetch(
        "http://localhost:7000/login-options/adminlogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.error("Login error:", data.error);
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      const data = await response.json();
      alert(data.message);
      window.location.href = "/admin-dashboard";
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
    localStorage.setItem("rememberMe", e.target.checked);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div 
        className={`max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg transition-all duration-300 
          ${isHovered ? 'shadow-xl transform scale-[1.02]' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
          {isHovered ? (
            <div className="h-1 w-20 bg-blue-500 mx-auto mt-2 mb-3 rounded-full transition-all duration-300"></div>
          ) : null}
          <p className="mt-2 text-sm text-gray-600">Welcome back! Please sign in to continue</p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-2 bg-white ${isHovered ? 'text-blue-500' : 'text-gray-500'} transition-colors duration-300`}>
              Secure Login
            </span>
          </div>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-1 group">
            <label htmlFor="email" className={`block text-sm font-medium ${isHovered ? 'text-blue-600' : 'text-gray-700'} transition-colors duration-300`}>
              Email Address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isHovered ? 'text-blue-400' : 'text-gray-400'} transition-colors duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className={`appearance-none block w-full pl-10 pr-3 py-2 border ${isHovered ? 'border-blue-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300`}
              />
            </div>
          </div>

          <div className="space-y-1 group">
            <label htmlFor="password" className={`block text-sm font-medium ${isHovered ? 'text-blue-600' : 'text-gray-700'} transition-colors duration-300`}>
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isHovered ? 'text-blue-400' : 'text-gray-400'} transition-colors duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`appearance-none block w-full pl-10 pr-10 py-2 border ${isHovered ? 'border-blue-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300`}
              />
              <button
                type="button"
                className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 ${isHovered ? 'text-blue-500' : 'text-gray-500'} hover:text-gray-700 transition-colors duration-300`}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMe}
                className={`h-4 w-4 ${isHovered ? 'text-blue-600' : 'text-blue-500'} focus:ring-blue-500 border-gray-300 rounded transition-colors duration-300`}
              />
              <label htmlFor="remember-me" className={`ml-2 block text-sm ${isHovered ? 'text-blue-900' : 'text-gray-900'} transition-colors duration-300`}>
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="/reset-password"
                className={`font-medium ${isHovered ? 'text-blue-700' : 'text-blue-600'} hover:text-blue-500 transition-colors duration-300`}
                onClick={() => localStorage.setItem("emailToReset", email)}
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isHovered ? 'bg-blue-700 shadow-md' : 'bg-blue-600'
              } hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform ${
                isHovered ? 'scale-105' : 'hover:scale-[1.01]'
              } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "SIGN IN"
              )}
            </button>
          </div>
        </form>
        
        <div className={`text-center text-xs ${isHovered ? 'text-blue-500' : 'text-gray-500'} mt-6 transition-colors duration-300`}>
          <p>Protected administrative area. Unauthorized access is prohibited.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;