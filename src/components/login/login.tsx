import login from "../../assets/login.png"
import loginLayer from "../../assets/loginLayer.png"
import loginformbg from "../../assets/loginformbg.png"

const Login = () => {
    return (
        <div className="lg:bg-cover h-screen w-screen relative" style={{ backgroundImage: `url(${login})` }}>
            <div className="lg:bg-cover lg:h-screen lg:w-screen absolute" style={{ backgroundImage: `url(${loginLayer})` }} />
            <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 p-20">
                {/* left side */}
                <div className="z-[10]">
                    <h1 className="text-red-900">Login Page</h1>
                    <div style={{ backgroundImage: `url(${loginformbg})` }} className="bg-cover mt-10 w-full h-full">
                        <form className="p-10">
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="000" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="000" />
                            </div>
                        </form>
                    </div>
                </div>
                {/* right side */}
                <div className="">
                    <h1 className="text-red-900">Right Side</h1>
                </div>
            </div>
        </div>
    )
}

export default Login