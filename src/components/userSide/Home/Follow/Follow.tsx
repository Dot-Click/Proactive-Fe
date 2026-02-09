// import { Button } from "@/components/ui/button"
// import Instagram from "../../../../assets/Instagram.png"
// import Instagram2 from "../../../../assets/Instagram2.png"
// import FollowCard from "./FollowCard"
// import box1 from "../../../../assets/box.png"
// import { useInstagramInfo } from "@/hooks/getInstaInfohook"

// const INSTAGRAM_HANDLE = "proactivefuture"

// const Follow = () => {
//   const { data } = useInstagramInfo()
//   const username = data?.user?.username ?? INSTAGRAM_HANDLE
//   const profileLink = data?.user?.profile_link ?? `https://www.instagram.com/${INSTAGRAM_HANDLE}/`

//   return (
//     <>
//       <div className="flex flex-col justify-center items-center lg:gap-8 gap-4 lg:py-16 py-8">
//         <img src={Instagram} className="" alt="Instagram" />
//         <div className="relative flex flex-col lg:gap-8 gap-4 px-4">
//           <h1 className="z-10 bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold lg:text-4xl text-center">Follow Our Journey</h1>
//           <img
//             src={box1}
//             alt="box1"
//             className="w-26 h-28 absolute bottom-12 left-28 opacity-50 lg:flex hidden z-5"
//           />
//           <p className="text-center text-[#221E33] font-medium">Get inspired by real adventures from our community. Follow @{username} for daily <br className="lg:block hidden" /> doses of wanderlust!</p>        
//         </div>
//       </div>
//       <div className="flex flex-col justify-center items-center mb-6">
//         <FollowCard />
//         <div>
//           <Button
//             asChild
//             className="rounded-full px-7 py-6 bg-linear-to-r from-[#F73696] to-[#FF6800] cursor-pointer"
//           >
//             <a href={profileLink} target="_blank" rel="noopener noreferrer">
//               <img src={Instagram2} alt="Instagram2" className="h-4" />
//               <p>Follow @{username}</p>
//             </a>
//           </Button>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Follow

import { Button } from "@/components/ui/button"
import Instagram from "../../../../assets/Instagram.png"
import Instagram2 from "../../../../assets/Instagram2.png"
import FollowCard from "./FollowCard"
import box1 from "../../../../assets/box.png"
import { useInstagramInfo } from "@/hooks/getInstaInfohook"
import { useTranslation } from "react-i18next"

const INSTAGRAM_HANDLE = "proactivefuture"

const Follow = () => {
  const { t } = useTranslation();
  const { data } = useInstagramInfo()
  const username = data?.user?.username ?? INSTAGRAM_HANDLE
  const profileLink = data?.user?.profile_link ?? `https://www.instagram.com/${INSTAGRAM_HANDLE}/`

  return (
    <>
      <div className="flex flex-col justify-center items-center lg:gap-8 gap-4 lg:py-16 py-8">
        <img src={Instagram} className="" alt="Instagram" />
        <div className="relative flex flex-col lg:gap-8 gap-4 px-4">
          <h1 className="z-10 bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold lg:text-4xl text-center">{t('follow.title')}</h1>
          <img
            src={box1}
            alt="box1"
            className="w-26 h-28 absolute bottom-12 left-28 opacity-50 lg:flex hidden z-5"
          />
          <p className="text-center text-[#221E33] font-medium" dangerouslySetInnerHTML={{ __html: t('follow.subtitle', { username }).replace(/\n/g, '<br className="lg:block hidden" />') }} />        
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mb-6">
        <FollowCard />
        <div>
          <Button
            asChild
            className="rounded-full px-7 py-6 bg-linear-to-r from-[#F73696] to-[#FF6800] cursor-pointer"
          >
            <a href={profileLink} target="_blank" rel="noopener noreferrer">
              <img src={Instagram2} alt="Instagram2" className="h-4" />
              <p>{t('follow.followButton', { username })}</p>
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Follow