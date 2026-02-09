// import Testimonial from "./Testimonial"
// import box1 from "../../../../assets/box.png"

// const OurMerchant = () => {
//   return (
//     <div className="flex flex-col justify-center items-center lg:gap-10 lg:mt-30 mt-20">
//       <div className="relative flex flex-col lg:gap-8 gap-4 px-4 text-center">
//         <h1 className="z-10 bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold lg:text-4xl">What Our Merchants Says</h1>
//         <img
//           src={box1}
//           alt="box1"
//           className="w-30 h-28 absolute bottom-6 right-92 opacity-50 lg:flex hiddenz-5"
//         />
//       <p className="text-[#221E33] ">Our Testimonials</p>
//       </div>
//       <div className="mb-20">
//         <Testimonial />
//       </div>
//     </div>
//   )
// }

// export default OurMerchant


// import Testimonial from "./Testimonial"
// import box1 from "../../../../assets/box.png"

// const OurMerchant = () => {
//   return (
//     <div className="flex flex-col justify-center items-center lg:gap-10 lg:mt-30 mt-20">
//       <div className="relative flex flex-col lg:gap-8 gap-4 px-4 text-center">
//         <h1 className="z-10 bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold lg:text-4xl">What Our Merchants Says</h1>
//         <img
//           src={box1}
//           alt="box1"
//           className="w-30 h-28 absolute bottom-6 right-92 opacity-50 lg:flex hiddenz-5"
//         />
//       <p className="text-[#221E33] ">Our Testimonials</p>
//       </div>
//       <div className="mb-20">
//         <Testimonial />
//       </div>
//     </div>
//   )
// }

// export default OurMerchant

import   { useMemo } from 'react';
import Marquee from 'react-fast-marquee';
import { FaStar } from 'react-icons/fa';
// 1. Import the hook and the type from your hook file
import { useReviews, type ReviewItem } from "@/hooks/getReviewshook";

// --- Types ---
interface Testimonial {
  id: string | number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  link?: string; // Optional link for Google Reviews
}
// --- Fallback Data ---
const TESTIMONIAL_DATA: Testimonial[] = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Senior Developer",
    avatar: "https://i.pravatar.cc/150?u=alex",
    content: "The attention to detail in this project is astounding. The UI is clean, and the performance is top-notch. Highly recommend!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Google Review",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    content: "I've used many similar services, but this one stands out. The horizontal scrolling marquee is a great touch for the landing page!",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Wong",
    role: "Freelance Designer",
    avatar: "https://i.pravatar.cc/150?u=mike",
    content: "The layout is perfectly responsive on mobile. I love the pause-on-hover feature, it allows users to read at their own pace.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sophia Martinez",
    role: "Marketing Director",
    avatar: "https://i.pravatar.cc/150?u=sophia",
    content: "Incredible user experience! We saw an immediate increase in engagement after implementing these components into our workflow.",
    rating: 5,
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Google Review",
    avatar: "https://i.pravatar.cc/150?u=james",
    content: "Setting this up was a breeze. The documentation is clear, and the code quality is much higher than what I've seen elsewhere.",
    rating: 5,
  },
  {
    id: 6,
    name: "Emma Thompson",
    role: "Student at Tech Academy",
    avatar: "https://i.pravatar.cc/150?u=emma",
    content: "As a beginner, I found the modular structure very easy to follow. It helped me understand how to build modern UI components.",
    rating: 5,
  },
];
// --- Sub-Component: Testimonial Card ---
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const initials = testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const CardContent = (
    <div className="mx-3 w-[280px] md:w-[350px] bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[200px] md:h-[220px]">
      <div>
        <div className="flex gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-[#34AB7F] text-xs md:text-sm" />
          ))}
        </div>
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-4 italic">
          "{testimonial.content}"
        </p>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
        <div className="relative flex h-9 w-9 md:h-10 md:w-10 shrink-0 overflow-hidden rounded-full bg-slate-100 border border-slate-200">
          {testimonial.avatar ? (
            <img className="aspect-square h-full w-full object-cover" src={testimonial.avatar} alt={testimonial.name} />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-600 text-xs font-bold">
              {initials}
            </div>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs md:text-sm font-bold text-slate-900 truncate">
            {testimonial.name}
          </span>
          <span className="text-[10px] md:text-xs text-slate-500 font-medium truncate">
            {testimonial.role}
          </span>
        </div>
      </div>
    </div>
  );

  // If it's a real API review, it likely has a link to Google
  if (testimonial.link) {
    return (
      <a href={testimonial.link} target="_blank" rel="noopener noreferrer" className="block outline-none">
        {CardContent}
      </a>
    );
  }

  return CardContent;
};

export default function TestimonialSection() {
  // 2. Call the hook to get reviews
  const { data: apiReviews, isLoading } = useReviews();

  // 3. Convert the API data format to the format your component uses
  const testimonials = useMemo(() => {
    // If loading or no data, show the 5 fallback items
    if (isLoading || !apiReviews || apiReviews.length === 0) {
      return TESTIMONIAL_DATA;
    }

    // Transform API data to Testimonial interface
    return apiReviews.map((item: ReviewItem, index: number) => ({
      id: item.link || index,
      name: item.userName,
      role: "Google Review", // Since they come from the hook
      avatar: item.userImage,
      content: item.review,
      rating: 5,
      link: item.link
    }));
  }, [apiReviews, isLoading]);

  return (
    <section className="py-12 md:py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 mb-10 md:mb-16 text-center">
        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          What Our Users Say
        </h2>
        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
          {isLoading ? "Loading community feedback..." : "Continuous feedback helps us build a better platform."}
        </p>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        {/* Row 1: Right to Left */}
        <Marquee
          direction="left"
          speed={45}
          pauseOnHover={true}
          gradient={true}
          gradientColor="#f8fafc"
          gradientWidth={50}
          autoFill={true}
        >
          {testimonials.map((t) => (
            <TestimonialCard key={`top-${t.id}`} testimonial={t} />
          ))}
        </Marquee>

        {/* Row 2: Left to Right */}
        <Marquee
          direction="right"
          speed={45}
          pauseOnHover={true}
          gradient={true}
          gradientColor="#f8fafc"
          gradientWidth={50}
          autoFill={true}
        >
          {testimonials.map((t) => (
            <TestimonialCard key={`bottom-${t.id}`} testimonial={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}