import { Form } from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripSchema, type TripFormType } from "@/components/admin/TripOppurtunities/tripschema";
import { useState, useEffect } from "react";
import BasicInfo from "@/components/admin/TripOppurtunities/BasicInfo";
import TripDetail from "@/components/admin/TripOppurtunities/Tripdetail";
import Included from "@/components/admin/TripOppurtunities/Included";
import Coordinator from "@/components/admin/TripOppurtunities/Coordinator";
import Mediaprice from "@/components/admin/TripOppurtunities/Mediaprice";
import Reviewsave from "@/components/admin/TripOppurtunities/Reviewsave";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import arrowBack from "@/assets/sidebaricon/arrow.png";
// import Template from "@/assets/sidebaricon/template.png";
import { Progress } from "@/components/ui/progress";
import { UseUpdateTrip } from "@/hooks/useUpdateTriphook";
import { UsegetTripbyid } from "@/hooks/gettripbyidhook";
import { LoaderIcon } from "lucide-react";

const EditTrip = ({ backUrl }: { backUrl: string }) => {
  const { id } = useParams<{ id: string }>();
  const { data: tripData, isLoading, isError } = UsegetTripbyid(id || "");
  console.log('tripData', tripData);
  const navigate = useNavigate();

  const methods = useForm<TripFormType>({
    resolver: zodResolver(tripSchema),
    shouldUnregister: false,
    defaultValues: {
      type: "",
      title: "",
      description: "",
      coverImage: null,
      location: "",
      duration: "",
      mapCoordinates: "",
      startDate: undefined,
      endDate: undefined,
      LongDescription: "",
      GroupSize: "",
      rhythm: "",
      SportsLevel: "",
      included: [],
      notIncluded: [],
      CoordinatorName: "",
      CoordinatorRole: "",
      CoordinatorBio: "",
      CoordinatorInstagram: "",
      CoordinatorLinkedin: "",
      CoordinatorPhoto: null,
      PromotionalVideo: null,
      GalleryImages: [],
      BestPrice: "",
      FinalPrice: "",
    },
  });

  const steps = [
    "Basic Information",
    "Trip Details",
    "What's Included",
    "Coordinators",
    "Media & Price",
    "Review & Save",
  ];

  const [step, setStep] = useState(1);
  const totalStep = 6;
  const { mutateAsync, isPending } = UseUpdateTrip();

  // Load trip data into form when available (matches API response: data.trip).
  // Use reset() so type and location Selects receive values in one update and display correctly.
  useEffect(() => {
    if (!tripData) return;

    const trip = tripData?.trip || tripData;
    const coord = trip.coordinator ?? (Array.isArray(trip.coordinators) && trip.coordinators.length > 0 ? trip.coordinators[0] : null);

    const includedIds =
      trip.included != null && Array.isArray(trip.included)
        ? trip.included.map((item: any) => (typeof item === "string" ? item : item?.title ?? item?.id ?? "")).filter(Boolean)
        : [];
    const notIncludedIds =
      trip.notIncluded != null && Array.isArray(trip.notIncluded)
        ? trip.notIncluded.map((item: any) => (typeof item === "string" ? item : item?.title ?? item?.id ?? "")).filter(Boolean)
        : [];

    const coordinatorId = coord ? (coord.id ?? coord._id ?? coord.userId) : "";
    const coordinatorName = coordinatorId || (coord?.fullName ?? coord?.CoordinatorName ?? "");

    const values: Partial<TripFormType> = {
      type: trip.type ?? "",
      title: trip.title ?? "",
      description: trip.description ?? "",
      coverImage: (trip.coverImage && trip.coverImage !== "" ? trip.coverImage : null) as any,
      location: trip.location ?? "",
      duration: trip.duration ?? "",
      mapCoordinates: trip.mapCoordinates && trip.mapCoordinates !== "" ? trip.mapCoordinates : "",
      startDate: trip.startDate ? (() => { const d = new Date(trip.startDate); return !isNaN(d.getTime()) ? d : undefined; })() : undefined,
      endDate: trip.endDate ? (() => { const d = new Date(trip.endDate); return !isNaN(d.getTime()) ? d : undefined; })() : undefined,
      LongDescription: trip.longDesc ?? "",
      GroupSize: trip.groupSize != null ? String(trip.groupSize) : "",
      rhythm: trip.rhythm ?? "",
      SportsLevel: trip.sportLvl ?? "",
      included: includedIds,
      notIncluded: notIncludedIds,
      CoordinatorName: coordinatorName || "",
      CoordinatorRole: coord?.CoordinatorRole ?? coord?.role ?? "",
      CoordinatorBio: coord?.CoordinatorBio ?? coord?.bio ?? "",
      CoordinatorInstagram: trip.instaLink && trip.instaLink !== "" ? trip.instaLink : (coord?.instagram ?? ""),
      CoordinatorLinkedin: trip.likedinLink && trip.likedinLink !== "" ? trip.likedinLink : (coord?.linkedin ?? ""),
      CoordinatorPhoto: (trip.weekendTt && trip.weekendTt !== "" ? trip.weekendTt : coord?.CoordinatorPhoto ?? coord?.profilePicture ?? null) as any,
      PromotionalVideo: (trip.promotionalVideo && trip.promotionalVideo !== "" ? trip.promotionalVideo : null) as any,
      GalleryImages: (() => {
        const raw = trip.galleryImages && Array.isArray(trip.galleryImages) ? trip.galleryImages : [];
        const padded = [...raw];
        while (padded.length < 8) padded.push(undefined as any);
        return padded.slice(0, 8) as any;
      })(),
      BestPrice: trip.bestPriceMsg ?? "",
      FinalPrice: trip.perHeadPrice != null ? String(trip.perHeadPrice) : "",
    };

    methods.reset(values);
  }, [tripData, methods]);

  const next = async () => {
    let valid = false;

    if (step === 1) {
      valid = await methods.trigger([
        "type",
        "title",
        "description",
        "location",
        "startDate",
        "endDate",
        "duration",
      ]);
    }

    if (step === 2) {
      valid = await methods.trigger([
        "LongDescription",
        "GroupSize",
        "rhythm",
        "SportsLevel",
      ]);
    }

    if (step === 3) {
      valid = await methods.trigger(["included", "notIncluded"]);
    }

    if (step === 4) {
      valid = await methods.trigger([
        "CoordinatorName",
        "CoordinatorRole",
        "CoordinatorBio",
        "CoordinatorInstagram",
        "CoordinatorLinkedin",
        "CoordinatorPhoto",
      ]);
    }

    if (step === 5) {
      valid = await methods.trigger([
        "PromotionalVideo",
        "GalleryImages",
        "BestPrice",
        "FinalPrice",
      ]);
    }

    if (valid && step < totalStep) {
      setStep((s) => s + 1);
    }
  };

  const previous = () => setStep((s) => s - 1);

  const onSubmit = async (data: TripFormType) => {
    if (!id) {
      console.error("Trip ID is missing");
      return;
    }

    try {
      const formData = new FormData();

      // Send all trip fields as one JSON string so backend gets real arrays (fixes "expected array, received string").
      // Backend must parse: payload = JSON.parse(req.body.payload) and validate payload (see BACKEND_UPDATE_TRIP_FIX.md).
      const payload = {
        title: data.title,
        description: data.description,
        shortDesc: data.description?.slice(0, 255),
        type: data.type,
        location: data.location,
        mapCoordinates: data.mapCoordinates || undefined,
        startDate: data.startDate?.toISOString(),
        endDate: data.endDate?.toISOString(),
        duration: data.duration,
        longDesc: data.LongDescription,
        groupSize: data.GroupSize,
        rhythm: data.rhythm,
        sportLvl: data.SportsLevel,
        included: data.included ?? [],
        notIncluded: data.notIncluded ?? [],
        bestPriceMsg: data.BestPrice,
        perHeadPrice: data.FinalPrice,
        instaLink: data.CoordinatorInstagram || undefined,
        likedinLink: data.CoordinatorLinkedin || undefined,
        coordinators: data.CoordinatorName,
        coordinatorRole: data.CoordinatorRole,
        coordinatorBio: data.CoordinatorBio,
        coordinatorInstagram: data.CoordinatorInstagram,
        coordinatorLinkedin: data.CoordinatorLinkedin,
      };
      formData.append("payload", JSON.stringify(payload));

      if (data.coverImage && data.coverImage instanceof File) formData.append("cover_img", data.coverImage);
      if (data.PromotionalVideo && data.PromotionalVideo instanceof File) formData.append("promotional_video", data.PromotionalVideo);
      if (data.GalleryImages?.length) {
        data.GalleryImages.forEach((file: File) => {
          if (file instanceof File) formData.append("gallery_images", file);
        });
      }
      if (data.CoordinatorPhoto && data.CoordinatorPhoto instanceof File) formData.append("tt_img", data.CoordinatorPhoto);

      await mutateAsync({ id, formData });
      navigate(backUrl || "/coordinator-dashboard/oppurtunities-management");
    } catch (error) {
      console.error("Error updating trip:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-10">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  if (isError || !tripData) {
    return (
      <div className="w-full flex items-center justify-center py-10">
        <div className="text-center">
          <p className="text-red-600">Error loading trip data</p>
          <Button
            onClick={() => navigate(backUrl || "/coordinator-dashboard/oppurtunities-management")}
            className="mt-4"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#FAFAFA] px-4 py-4 rounded-tl-[20px] rounded-tr-[20px] mt-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Button
              onClick={() => navigate(backUrl ? backUrl : "/coordinator-dashboard/oppurtunities-management")}
              className="text-[#000000] font-bold bg-[#FAFAFA] hover:bg-[#ece7e7] cursor-pointer"
            >
              <img src={arrowBack} alt="arrowBack" className="h-4" />
              Back
            </Button>
          </div>
          <div className="px-4 flex justify-between items-center">
            <span className="text-[#221E33] font-semibold text-[18px]">
              Edit Trip
            </span>
            {/* <div className="flex items-center border border-[#000000] gap-2 px-5 py-3 rounded-[12px]">
              <img src={Template} alt="Template" className="h-4" />
              <span className="text-[#221E33] font-medium">Use Template</span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="px-8 py-6">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Step {step} of {totalStep}</span>
            <Progress value={(step / totalStep) * 100} />
            <div className="flex flex-wrap md:justify-between gap-4 mt-2">
              {steps.map((label, index) => (
                <span
                  key={index}
                  className={`text-[12px] font-semibold transition-colors ${
                    step === index + 1 ? "text-[#221E33]" : "text-[#606066]"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <FormProvider {...methods}>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {step === 1 && <BasicInfo />}
            {step === 2 && <TripDetail />}
            {step === 3 && <Included />}
            {step === 4 && <Coordinator />}
            {step === 5 && <Mediaprice />}
            {step === 6 && <Reviewsave />}

            <div className="bg-white rounded-bl-[25px] rounded-br-[25px] flex md:flex-row flex-col justify-end mt-auto pt-24 gap-4">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={previous}
                  variant={"outline"}
                  className="text-[#666373] w-full md:w-auto border border-[#666373] font-bold cursor-pointer rounded-full px-8 py-5 my-6"
                >
                  {step === totalStep ? "Preview Trip Page" : "previous"}
                </Button>
              )}
              <Button
                type="button"
                onClick={
                  step === totalStep ? methods.handleSubmit(onSubmit) : next
                }
                disabled={isPending}
                className={`${step === totalStep ? "bg-[#0DAC87] hover:bg-[#0d9e7c]" : "bg-[#000000]"} cursor-pointer rounded-full px-12 py-5 mx-6 my-6 w-full md:w-auto`}
              >
                {step === totalStep
                  ? isPending
                    ? "Updating..."
                    : "Update Trip"
                  : "Next"}
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </>
  );
};

export default EditTrip;
