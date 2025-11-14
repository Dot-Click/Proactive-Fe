import WhatwedoCard from "./WhatwedoCard"

const Whatwedo = () => {
  return (
    <div className="bg-[#FAFAFA] py-20">
        <div className="flex flex-col gap-6 justify-center items-center">
        <h1 className="lg:text-4xl text-2xl bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold">What We Do</h1>
        <p className="text-center text-sm text-[#221E33]">We create transformative experiences that connect people with adventure and culture</p>
        </div>
        <div className="flex justify-center items-center py-6">
            <WhatwedoCard/>
        </div>
    </div>
  )
}

export default Whatwedo