// import Play from "../../../../assets/play2.png"
// import momentscard1 from "../../../../assets/momentscard1.png"
// import momentscard2 from "../../../../assets/momentscard2.png"
// import momentscard3 from "../../../../assets/momentscard3.png"
// import { useInstagramInfo } from "@/hooks/getInstaInfohook"
// import type { InstagramPost } from "@/hooks/getInstaInfohook"

// const PLACEHOLDER_IMAGES = [momentscard1, momentscard2, momentscard3]

// const FollowCard = () => {
//     const { data, isLoading } = useInstagramInfo()
//     const posts = data?.posts?.slice(0,9) ?? []

//     if (isLoading || posts.length === 0) {
//         return (
//             <div className="grid lg:grid-cols-3 mb-8 gap-4">
//                 {[...PLACEHOLDER_IMAGES, ...PLACEHOLDER_IMAGES].map((src, i) => (
//                     <div key={`ph-${i}`} className="relative rounded-[14px] overflow-hidden">
//                         <img src={src} alt="" className="h-120 w-90 object-cover" />
//                         <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
//                             <img src={Play} alt="Play" className="h-10 cursor-pointer" />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         )
//     }

//     return (
//         <div className="grid lg:grid-cols-3 mb-8 gap-4">
//             {posts.map((post: InstagramPost, index: number) => (
//                 <a
//                     key={post.id}
//                     href={post.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="relative rounded-[14px] overflow-hidden block group"
//                 >
//                     <img
//                         src={post.thumbnail_url ?? PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]}
//                         alt={post.caption?.slice(0, 80) ?? "Instagram post"}
//                         className="h-120 w-90 object-cover w-full group-hover:scale-105 transition-transform duration-300"
//                     />
//                     <div className="absolute inset-0 flex justify-center items-center mb-12 h-full z-10 bg-black/20 group-hover:bg-black/30 transition-colors">
//                         <img src={Play} alt="Play" className="h-10 cursor-pointer" />
//                     </div>
//                 </a>
//             ))}
//         </div>
//     )
// }

// export default FollowCard

import Play from "../../../../assets/play2.png"
import momentscard1 from "../../../../assets/momentscard1.png"
import momentscard2 from "../../../../assets/momentscard2.png"
import momentscard3 from "../../../../assets/momentscard3.png"
import { useInstagramInfo } from "@/hooks/getInstaInfohook"
import type { InstagramPost } from "@/hooks/getInstaInfohook"

const PLACEHOLDER_IMAGES = [momentscard1, momentscard2, momentscard3]

const FollowCard = () => {
    const { data, isLoading } = useInstagramInfo()
    const posts = data?.posts?.slice(0,9) ?? []

    if (isLoading || posts.length === 0) {
        return (
            <div className="grid lg:grid-cols-3 mb-8 gap-4">
                {[...PLACEHOLDER_IMAGES, ...PLACEHOLDER_IMAGES].map((src, i) => (
                    <div key={`ph-${i}`} className="relative rounded-[14px] overflow-hidden">
                        <img src={src} alt="" className="h-120 w-90 object-cover" />
                        <div className="absolute inset-0 flex justify-center items-center mb-12 z-10">
                            <img src={Play} alt="Play" className="h-10 cursor-pointer" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="grid lg:grid-cols-3 mb-8 gap-4">
            {posts.map((post: InstagramPost, index: number) => (
                <a
                    key={post.id}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative rounded-[14px] overflow-hidden block group"
                >
                    <img
                        src={post.thumbnail_url ?? PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]}
                        alt={post.caption?.slice(0, 80) ?? "Instagram post"}
                        className="h-120 w-90 object-cover w-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex justify-center items-center mb-12 h-full z-10 bg-black/20 group-hover:bg-black/30 transition-colors">
                        <img src={Play} alt="Play" className="h-10 cursor-pointer" />
                    </div>
                </a>
            ))}
        </div>
    )
}

export default FollowCard



