import Coordinatordetail from "@/components/Adventureoppurtunities/ViewDetailtrip/Coordinatordetail";
import Daybyday from "@/components/Adventureoppurtunities/ViewDetailtrip/Daybyday";
import Includeditem from "@/components/Adventureoppurtunities/ViewDetailtrip/Includeditem";
import Locationmeetingpoint from "@/components/Adventureoppurtunities/ViewDetailtrip/Locationmeetingpoint";
import MasonryLayout from "@/components/Adventureoppurtunities/ViewDetailtrip/MasonryLayout";
import SurfaceCamp from "@/components/Adventureoppurtunities/ViewDetailtrip/SurfaceCamp";
import VideoSection from "@/components/Adventureoppurtunities/ViewDetailtrip/VideoSection";
import { Button } from "@/components/ui/button";
import { UsegetTripbyid } from "@/hooks/gettripbyidhook";
import { UsegetCategory } from "@/hooks/getCategoryhook";
import { LoaderIcon } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const VIEW_BACK_URL = "/coordinator-dashboard/oppurtunities-management";

const ViewTripPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = UsegetTripbyid(id ?? "");
  const { data: categoriesData } = UsegetCategory();

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-10">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-red-600 font-medium">Trip not found</p>
        <Button
          onClick={() => navigate(VIEW_BACK_URL)}
          variant="outline"
          className="mt-4"
        >
          Back to Opportunities
        </Button>
      </div>
    );
  }

  const trip = data?.trip ?? data;

  // Resolve category name using new categoryId relation (fallback to legacy fields)
  const resolvedCategoryName =
    trip?.categoryName ??
    trip?.category ??
    categoriesData?.categories?.find((c: any) => c.id === trip?.categoryId)?.name ??
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
      <MasonryLayout
        trip={trip}
        backUrl={VIEW_BACK_URL}
        backLabel="Back to Opportunities"
        showApplyButton={false}
        headerAction={
          <Button
            onClick={() => navigate(`/coordinator-dashboard/edit-trip/${id}`)}
            className="rounded-full bg-[#0DAC87] hover:bg-[#119b7b] cursor-pointer px-8 py-5"
          >
            Edit Trip
          </Button>
        }
      />
      <Locationmeetingpoint trip={trip} />
      {isWildWeekend && <SurfaceCamp />}
      {isWildTrips && <Daybyday trip={trip} />}
      <Includeditem trip={trip} />
      <VideoSection trip={trip} />
      {isWildTrips && <Coordinatordetail trip={trip} />}
    </div>
  );
};

export default ViewTripPage;
