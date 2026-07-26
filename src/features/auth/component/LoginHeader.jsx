// const LoginHeader = () => {
//   return (
//     <div className="space-y-2">

//       <h1 className="text-4xl font-bold text-slate-900">
//         Welcome Back
//       </h1>

//       <p className="text-gray-500">
//         Welcome back! Please enter your details.
//       </p>

//     </div>
//   );
// };

// export default LoginHeader;



export default function LoginHeader() {
  return (
    <div className="mb-10">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">
        System Management Center
      </h1>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        Log in to securely manage users, monitor activity, and oversee
        platform operations from one centralized dashboard.
      </p>
    </div>
  );
}