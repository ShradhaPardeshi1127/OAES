// import React from "react";
// import { useNavigate } from "react-router-dom";

// const LoginOptions = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl w-full space-y-8">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-900 text-center">
//             OSM Evaluation System
//           </h1>
//           <p className="mt-2 text-lg text-gray-600 text-center">
//             Choose your login option to proceed.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Admin Card */}
//           <div
//             className="login-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//             onClick={() => navigate("/adminlogin")}
//           >
//             <div className="px-6 pt-8 pb-2 text-center">
//               <div className="icon text-6xl mb-4 text-blue-500">👤</div>
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">Admin</h2>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 Oversee the evaluation process, manage users, and access analytics dashboards.
//               </p>
//             </div>
//             <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-200">
//               <span className="text-blue-500 font-medium">Login as Admin</span>
//             </div>
//           </div>

//           {/* Evaluator Card */}
//           <div
//             className="login-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//             onClick={() => navigate("/evaluatorlogin")}
//           >
//             <div className="px-6 pt-8 pb-2 text-center">
//               <div className="icon text-6xl mb-4 text-green-500">📋</div>
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">Evaluator</h2>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 Review answer sheets, add annotations, and calculate scores efficiently.
//               </p>
//             </div>
//             <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-200">
//               <span className="text-green-500 font-medium">Login as Evaluator</span>
//             </div>
//           </div>

//           {/* Student Card */}
//           <div
//             className="login-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//             onClick={() => navigate("/studentlogin")}
//           >
//             <div className="px-6 pt-8 pb-2 text-center">
//               <div className="icon text-6xl mb-4 text-indigo-500">🎓</div>
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">Student</h2>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 View your results, track progress, and access feedback on evaluated sheets.
//               </p>
//             </div>
//             <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-200">
//               <span className="text-indigo-500 font-medium">Login as Student</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginOptions;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginOptions = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const loginOptions = [
    {
      id: "admin",
      title: "Admin",
      path: "/adminlogin",
      icon: "👤",
      iconColor: "text-blue-500",
      actionColor: "text-blue-500",
      hoverColor: "hover:bg-blue-50",
      description: "Oversee the evaluation process, manage users, and access analytics dashboards."
    },
    {
      id: "evaluator",
      title: "Evaluator",
      path: "/evaluatorlogin",
      icon: "📋",
      iconColor: "text-green-500",
      actionColor: "text-green-500",
      hoverColor: "hover:bg-green-50",
      description: "Review answer sheets, add annotations, and calculate scores efficiently."
    },
    {
      id: "student",
      title: "Student",
      path: "/studentlogin",
      icon: "🎓",
      iconColor: "text-indigo-500",
      actionColor: "text-indigo-500",
      hoverColor: "hover:bg-indigo-50",
      description: "View your results, track progress, and access feedback on evaluated sheets."
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            OSM Evaluation System
          </h1>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-4 rounded-full"></div>
          <p className="mt-2 text-lg text-gray-600">
            Choose your login option to proceed
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loginOptions.map((option) => (
            <div
              key={option.id}
              className={`login-card bg-white rounded-xl shadow-md overflow-hidden 
                hover:shadow-xl transition-all duration-300 cursor-pointer transform 
                ${hoveredCard === option.id ? 'scale-105' : 'scale-100'} ${option.hoverColor}`}
              onClick={() => navigate(option.path)}
              onMouseEnter={() => setHoveredCard(option.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="px-6 pt-8 pb-4 text-center">
                <div className={`w-20 h-20 mx-auto mb-4 flex items-center justify-center 
                  ${option.iconColor} bg-opacity-10 rounded-full`}>
                  <span className="text-5xl">{option.icon}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">{option.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {option.description}
                </p>
              </div>
              <div className={`px-6 py-4 text-center border-t border-gray-200 
                ${hoveredCard === option.id ? 'bg-white' : 'bg-gray-50'} transition-colors duration-300`}>
                <button 
                  className={`py-2 px-6 rounded-full font-medium ${option.actionColor} 
                    border border-current hover:bg-opacity-10 hover:bg-current transition-all duration-300`}
                >
                  Login as {option.title}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>© {new Date().getFullYear()} OSM Evaluation System | All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default LoginOptions;