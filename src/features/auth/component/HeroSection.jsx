// const HeroSection = () => {
//   return (
//     <div className="hidden lg:flex items-center justify-center bg-slate-200">

//       <h2 className="text-4xl font-bold">
//         Hero Image
//       </h2>

//     </div>
//   );
// };

// export default HeroSection;

import heroImage from "@/assets/hero2.png";

export default function HeroSection() {
  return (
    <div className="relative hidden lg:flex items-center justify-center bg-slate-900">

      <img
        src={heroImage}
        alt="System management"
        className="
          w-full
          h-full
          object-cover
        "
      />

    </div>
  );
}