import Coordinatordetail from "@/components/Adventureoppurtunities/ViewDetailtrip/Coordinatordetail";
import Daybyday from "@/components/Adventureoppurtunities/ViewDetailtrip/Daybyday";
import Includeditem from "@/components/Adventureoppurtunities/ViewDetailtrip/Includeditem";
import Locationmeetingpoint from "@/components/Adventureoppurtunities/ViewDetailtrip/Locationmeetingpoint";
import MasonryLayout from "@/components/Adventureoppurtunities/ViewDetailtrip/MasonryLayout";
import ParticipantsCards from "@/components/Adventureoppurtunities/ViewDetailtrip/ParticipantsCards";
// import SurfaceCamp from "@/components/Adventureoppurtunities/ViewDetailtrip/SurfaceCamp";
import Tripmood from "@/components/Adventureoppurtunities/ViewDetailtrip/Tripmood";
import VideoSection from "@/components/Adventureoppurtunities/ViewDetailtrip/VideoSection";
import Faqs from "@/components/Adventureoppurtunities/ViewDetailtrip/Faqs";
import HowItWorks from "@/components/Adventureoppurtunities/ViewDetailtrip/HowItWorks";
import { useParams } from "react-router-dom";
import { LoaderIcon } from "lucide-react";
import { UsegetCategory } from "@/hooks/getCategoryhook";
import { UsegetPublicTripbyid } from "@/hooks/getPublicTripbyidhook";

/**
 * Public trip detail page - accessible without authentication.
 * Used from landing and other public pages.
 */
const ViewTripDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = UsegetPublicTripbyid(id ?? "");
  const { data: categoriesData } = UsegetCategory();

  // Simple auth check: if a token exists, user is considered logged in.
  // This aligns with how Supabase/token-based auth is stored on login.
  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-10">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center text-red-900 py-10">
        <p className="text-lg font-semibold">Trip not found</p>
        <p className="text-sm text-gray-600 mt-2">
          The trip you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
      </div>
    );
  }

  // Extract trip from API response structure: { trip: {...} }
  const trip: any = data?.trip || data;

  // Resolve category name using new categoryId relation (fallback to legacy fields)
  const resolvedCategoryName =
    trip?.categoryName ??
    trip?.category ??
    categoriesData?.categories?.find((c: any) => c.id === trip?.categoryId)
      ?.name ??
    trip?.type ??
    "";

  // Normalized category/type name
  const normalizedCategory = resolvedCategoryName
    .toString()
    .toLowerCase()
    .trim();

  // const isWildWeekend = normalizedCategory.includes("wild weekend");
  const isWildTrips = normalizedCategory.includes("wild trips");

  return (
    <div>
      {/* On public detail page, only show apply button when user is logged in */}
      <MasonryLayout trip={trip} showApplyButton={isLoggedIn} />
      <Locationmeetingpoint trip={trip} />
      <Tripmood />
      {/* {isWildWeekend && <SurfaceCamp />} */}
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

export default ViewTripDetailPage;

