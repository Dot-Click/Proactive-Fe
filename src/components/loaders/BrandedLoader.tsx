import proactivelogo from "@/assets/proactive-logo.avif";

interface BrandedLoaderProps {
  title?: string;
  subtitle?: string;
  fullScreen?: boolean;
}

export const BrandedLoader = ({
  title = "Setting up your workspace",
  subtitle = "Initializing data securely...",
  fullScreen = true,
}: BrandedLoaderProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-[#FAFAFE] ${
        fullScreen ? "fixed inset-0 z-[9999] h-screen w-screen" : "h-full w-full py-20"
      }`}
    >
      <div className="relative flex flex-col items-center gap-6 p-8 animate-in fade-in duration-500">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full border-[3px] border-[#0DAC87]/20 border-t-[#0DAC87] animate-spin"></div>
          <img
            src={proactivelogo}
            alt="ProActive Logo"
            className="w-36 object-contain animate-pulse"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-1 mt-4 text-center">
          <h2 className="text-[#221E33] font-bold text-xl tracking-tight">{title}</h2>
          <p className="text-[#646464] text-sm font-medium animate-pulse">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};
