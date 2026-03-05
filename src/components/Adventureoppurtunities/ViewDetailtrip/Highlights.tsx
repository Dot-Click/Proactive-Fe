import { Sparkles } from "lucide-react";

interface HighlightItemProps {
  text: string;
}

const HighlightItem = ({ text }: HighlightItemProps) => (
  <div className="flex items-start gap-3 group">
    <div className="shrink-0 w-5 h-5 text-[#0DAC87] mt-0.5">
      <Sparkles size={20} />
    </div>
    <span className="text-[#221E33] text-base font-quicksand group-hover:text-[#0DAC87] transition-colors">
      {text}
    </span>
  </div>
);

const Highlights = ({ trip }: { trip?: any }) => {
  const highlights = trip?.highlights || [];

  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
      {/* {highlights.map((highlight: string, index: number) => (
        <HighlightItem key={index} text={highlight} />
      ))} */}
    </div>
  );
};

export default Highlights;
