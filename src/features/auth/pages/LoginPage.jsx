
// import LoginForm from "../component/loginForm";
// import LoginHeader from "../component/loginHeader";
// import HeroSection from "../component/heroSection";

// const LoginPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">

//       <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">

//         <div className="grid lg:grid-cols-2 min-h-[700px]">

//           {/* Left */}
//           <div className="flex flex-col justify-center px-16 py-12">

//           <LoginHeader />

//             <div className="mt-10">
//               <LoginForm />
//             </div>

//           </div>

//           {/* Right */}
//           <HeroSection />

//         </div>

//       </div>

//     </div>
//   );
// };

// export default LoginPage;

import HeroSection from "../component/HeroSection";
import LoginForm from "../component/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="grid min-h-[750px] grid-cols-2">
          <LoginForm />
          <HeroSection />
        </div>
      </div>
    </div>
  );
}