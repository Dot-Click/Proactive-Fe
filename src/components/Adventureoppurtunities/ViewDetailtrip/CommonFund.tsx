const CommonFund = ({ trip }: { trip?: any }) => {
    const data = trip?.trip?.[0] || trip?.trip || trip;

    // Placeholder text from the user's screenshot if data is missing
    const fundText = data?.commonFundDescription || data?.commonFund || "The group fund will be collected on-site, and the fee will be approximately €150. Depending on the participants' needs, this amount may vary and could be adjusted later. In any case, any unused portion will be refunded.";
    const count = data?.commonFundCount || 4;

    return (
        <div className="border-t border-[#ECECF1] pt-12 mt-16">
            <h3 className="text-[#221E33] font-extrabold text-3xl mb-8 font-quicksand tracking-tight">
                Common fund
            </h3>
            <div className="space-y-8">
                <p className="text-[#221E33] text-base leading-relaxed font-quicksand max-w-3xl">
                    {fundText}
                </p>
                <button className="px-6 py-2.5 border border-[#D1D5DB] rounded-lg text-[#221E33] font-bold text-sm hover:bg-gray-50 transition-colors bg-white shadow-sm font-quicksand">
                    Show all {count} included
                </button>
            </div>
        </div>
    );
};

export default CommonFund;
