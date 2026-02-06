import Coordinatordetail from "@/components/Adventureoppurtunities/ViewDetailtrip/Coordinatordetail";
import Daybyday from "@/components/Adventureoppurtunities/ViewDetailtrip/Daybyday";
import Includeditem from "@/components/Adventureoppurtunities/ViewDetailtrip/Includeditem";
import Locationmeetingpoint from "@/components/Adventureoppurtunities/ViewDetailtrip/Locationmeetingpoint";
import MasonryLayout from "@/components/Adventureoppurtunities/ViewDetailtrip/MasonryLayout";
import ParticipantsCards from "@/components/Adventureoppurtunities/ViewDetailtrip/ParticipantsCards";
import SurfaceCamp from "@/components/Adventureoppurtunities/ViewDetailtrip/SurfaceCamp";
import Tripmood from "@/components/Adventureoppurtunities/ViewDetailtrip/Tripmood";
import VideoSection from "@/components/Adventureoppurtunities/ViewDetailtrip/VideoSection";
import Faqs from "@/components/Adventureoppurtunities/ViewDetailtrip/Faqs";
import HowItWorks from "@/components/Adventureoppurtunities/ViewDetailtrip/HowItWorks";
import { useParams } from "react-router-dom";
import { UsegetTripbyid } from "@/hooks/gettripbyidhook";
import { LoaderIcon } from "lucide-react";
import { UsegetCategory } from "@/hooks/getCategoryhook";

const ViewDetailTripPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = UsegetTripbyid(id ?? "");
  const { data: categoriesData } = UsegetCategory();
  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center py-10">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  if (error || !data)
    return <div className="text-center text-red-900">Trip not found</div>;

  // Extract trip from API response structure: { trip: {...} }
  const trip: any = data?.trip || data;

  // Resolve category name using new categoryId relation (fallback to legacy fields)
  // Backend now returns categoryName directly, but we still check categoriesData as fallback
  const resolvedCategoryName =
    trip?.categoryName ??
    trip?.category ??
    categoriesData?.categories?.find((c: any) => c.id === trip?.categoryId)
      ?.name ??
    trip?.type ??
    "";

  // Normalized category/type name based on new trips flow (categories)
  const normalizedCategory = resolvedCategoryName
    .toString()
    .toLowerCase()
    .trim();

  const isWildWeekend = normalizedCategory.includes("wild weekend");
  const isWildTrips = normalizedCategory.includes("wild trips");

  return (
    <div>
      <MasonryLayout trip={trip} />
      <Locationmeetingpoint trip={trip} />
      <Tripmood />
      {isWildWeekend && <SurfaceCamp />}
      {isWildTrips && <Daybyday trip={trip} />}
      <Includeditem trip={trip} />
      <VideoSection trip={trip} />
      {isWildTrips && <Coordinatordetail trip={trip} />}
      <HowItWorks />
      <Faqs />
      <ParticipantsCards />
    </div>
  );
};

export default ViewDetailTripPage;
