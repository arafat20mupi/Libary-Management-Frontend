
const CoverPage = () => {
    return (
        <section className="relative min-h-[500px] bg-gradient-to-r from-amber-50 via-slate-400 to-slate-500 overflow-hidden">
            {/* Background overlay for better text readability */}
            <div className="absolute inset-0 bg-black/10"></div>

            <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center min-h-[400px]">
                    {/* Left Section - Book Cover/Promotional Content */}
                    <div className="flex flex-col justify-center items-start space-y-4">
                        <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-8 rounded-lg shadow-lg max-w-sm">
                            <div className="text-amber-700 font-serif">
                                <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                                    Still
                                    <br />
                                    holding
                                    <br />
                                    on
                                </h3>
                                <p className="text-sm lg:text-base opacity-80 leading-relaxed">
                                    A beautiful story that will make you
                                    <br />
                                    hope for and believe in love
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Center Section - Main Content */}
                    <div className="text-center space-y-6 lg:space-y-8">
                        <div className="space-y-4">
                            <p className="text-white/90 text-lg lg:text-xl font-light italic tracking-wide">Publishing House</p>

                            <h1 className="text-white text-4xl lg:text-5xl xl:text-6xl font-serif leading-tight">
                                The new novel from
                                <br />
                                <span className="font-bold">Blaine Pearson</span>
                            </h1>
                        </div>

                        <button className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                            READ MORE
                        </button>
                    </div>

                    {/* Right Section - Author Photo */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative">
                            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl">
                                <img
                                    src="/download.jpeg"
                                    alt="Blaine Pearson - Author"
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                            {/* Decorative ring around the image */}
                            <div className="absolute -inset-2 rounded-full border-4 border-white/20"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </section>
    );
};

export default CoverPage;