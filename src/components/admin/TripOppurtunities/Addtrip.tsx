import { Form } from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripSchema, type TripFormType } from "./tripschema";
import { useState } from "react";
import BasicInfo from "./BasicInfo";
import TripDetail from "./Tripdetail";
import Included from "./Included";
import Coordinator from "./Coordinator";
import Mediaprice from "./Mediaprice";
import Reviewsave from "./Reviewsave";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import arrowBack from "@/assets/sidebaricon/arrow.png";
// import Template from "@/assets/sidebaricon/template.png";
import { Progress } from "@/components/ui/progress";
import { UseCreateTrip } from "@/hooks/UseCreateTriphook";
import included1 from "@/assets/included1.png";
import included2 from "@/assets/included2.png";
import included3 from "@/assets/included3.png";
import included4 from "@/assets/included4.png";
import included5 from "@/assets/included5.png";
import { CheckCircle, AlertCircle } from "lucide-react";

const AddTrip = ({ backUrl }: { backUrl: string }) => {
  const methods = useForm<TripFormType>({
    resolver: zodResolver(tripSchema) as any,
    mode: "onChange", // Validate on change instead of on submit
    reValidateMode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      categoryId: "",
      // Days itinerary (shown when trip type is selected)
      daysItinerary: [],
      title: "",
      description: "",
      coverImage: null,
      location: "",
      locationId: "",
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
      CoordinatorRole: "", // TEMP: role field hidden in UI, kept for form stability
      CoordinatorBio: "",
      CoordinatorInstagram: "",
      CoordinatorLinkedin: "",
      CoordinatorPhoto: null,
      PromotionalVideo: null,
      GalleryImages: [],
      BestPrice: "",
      FinalPrice: "",
      // Optional fields - initialize to prevent schema validation errors
      highlights: [],
      mood: [],
      commonFund: "",
      commonFundDescription: "",
      commonFundCount: undefined,
      thingsToKnow: [],
      applicationType: "video",
      depositAmount: "",
      status: "active",
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
  const [validatedSections, setValidatedSections] = useState<Set<number>>(new Set());
  const totalStep = 6;
  const navigate = useNavigate();
  const next = async () => {
    let valid = false;

    if (step === 1) {
      valid = await methods.trigger([
        "categoryId",
        "title",
        "description",
        "coverImage",
        "location",
        "startDate",
        "endDate",
        "duration",
        "status",
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
        // Coordinator details are now auto-populated, so we only validate the name selection
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
      // Mark current section as validated
      setValidatedSections((prev) => new Set([...prev, step]));
      setStep((s) => s + 1);
    }
  };

  const validateAndGoToSection = async (targetStep: number) => {
    // Allow going back to previous steps
    if (targetStep < step) {
      setStep(targetStep);
      return;
    }

    // If trying to go forward, validate current section first
    if (targetStep > step) {
      let valid = false;

      if (step === 1) {
        valid = await methods.trigger([
          "categoryId",
          "title",
          "description",
          "coverImage",
          "location",
          "startDate",
          "endDate",
          "duration",
        ]);
      } else if (step === 2) {
        valid = await methods.trigger([
          "LongDescription",
          "GroupSize",
          "rhythm",
          "SportsLevel",
        ]);
      } else if (step === 3) {
        valid = await methods.trigger(["included", "notIncluded"]);
      } else if (step === 4) {
        valid = await methods.trigger([
          "CoordinatorName",
          "CoordinatorBio",
          "CoordinatorInstagram",
          "CoordinatorLinkedin",
          "CoordinatorPhoto",
        ]);
      } else if (step === 5) {
        valid = await methods.trigger([
          "PromotionalVideo",
          "GalleryImages",
          "BestPrice",
          "FinalPrice",
        ]);
      }

      if (!valid) {
        return; // Don't navigate if validation fails
      }

      // Mark current section as validated
      setValidatedSections((prev) => new Set([...prev, step]));
      setStep(targetStep);
    }
  };

  const previous = () => setStep((s) => s - 1);
  const { mutateAsync, isPending } = UseCreateTrip(
    backUrl || "/dashboard/trip-management"
  );

  const onSubmit = async (data: TripFormType) => {
    try {
      console.log("🚀 TRIP CREATION STARTED");
      console.log("====================================");
      console.log("📝 Form Data Received:", data);
      
      const formData = new FormData();

      // Build daysItinerary data (without image files - those are sent separately)
      const daysItinerary =
        data.daysItinerary?.map((day, index) => ({
          day: index + 1,
          description: day.description || "",
          location: day.location || "",
          coordinates: day.coordinates || "",
          // image URL will be set by backend after upload
        })) || [];

      // Lookup tables for included/notIncluded items (matching Included.tsx)
      // Maps selected IDs to objects with title, description, and image path
      const INCLUDED_LOOKUP: Record<string, { title: string; description: string; img: string }> = {
        camp: { title: "3 Nights Camp Stay", description: "Boutique camp accommodation with cozy shared spaces.", img: included1 },
        breakfast: { title: "Daily Breakfasts", description: "Fresh and healthy breakfasts included throughout the trip", img: included2 },
        transfer: { title: "Airport Transfers", description: "Arrival & departure transfers for a smooth start & end.", img: included3 },
        coordinator: { title: "Trip Coordinator", description: "Professional English-speaking coordinator for full guidance.", img: included4 },
        tour: { title: "Sagrada Familia Tour", description: "Skip-the-line entry with guided experience.", img: included5 },
      };

      const NOT_INCLUDED_LOOKUP: Record<string, { title: string; description: string; img: string }> = {
        flight: { title: "International Flights", description: "Flights to/from Barcelona not covered.", img: included1 },
        insurance: { title: "Travel Insurance", description: "Personal insurance must be arranged separately.", img: included2 },
        shopping: { title: "Shopping & Souvenirs", description: "Personal purchases not included.", img: included3 },
      };

      // merge custom item icons from localStorage if present
      const customIncludedMap: Record<string, { title: string; description: string; img: string }> = {};
      try {
        const saved = localStorage.getItem("customIncludedItems");
        if (saved) {
          JSON.parse(saved).forEach((it: any) => {
            if (it.title) {
              customIncludedMap[it.title] = { title: it.title, description: it.desc || "", img: it.icon || "" };
            }
          });
        }
      } catch (e) {
        console.warn("failed to parse customIncludedItems from localStorage", e);
      }

      const customNotIncludedMap: Record<string, { title: string; description: string; img: string }> = {};
      try {
        const saved = localStorage.getItem("customNotIncludedItems");
        if (saved) {
          JSON.parse(saved).forEach((it: any) => {
            if (it.title) {
              customNotIncludedMap[it.title] = { title: it.title, description: it.desc || "", img: it.icon || "" };
            }
          });
        }
      } catch (e) {
        console.warn("failed to parse customNotIncludedItems from localStorage", e);
      }

      // map to store files for multi-part upload
      const includedIconFiles: File[] = [];
      const notIncludedIconFiles: File[] = [];

      // Transform included IDs to objects with title, description, and img
      const includedItems = (data.included ?? []).map((item: any) => {
        let transformedItem;
        if (typeof item === "string") {
          const lookup = INCLUDED_LOOKUP[item] || customIncludedMap[item];
          if (lookup) {
            transformedItem = { title: lookup.title, description: lookup.description, img: lookup.img };
          } else {
            transformedItem = { title: String(item), description: "", img: "" };
          }
        } else if (item && typeof item === "object") {
          transformedItem = {
            title: String(item.title || ""),
            description: String(item.description || item.desc || ""),
            img: String(item.icon || item.img || ""),
          };
          if (item.iconFile instanceof File) {
            includedIconFiles.push(item.iconFile);
          }
        } else {
          transformedItem = { title: "", description: "", img: "" };
        }
        return transformedItem;
      });

      // Transform notIncluded IDs to objects with title, description, and img
      const notIncludedItems = (data.notIncluded ?? []).map((item: any) => {
        let transformedItem;
        if (typeof item === "string") {
          const lookup = NOT_INCLUDED_LOOKUP[item] || customNotIncludedMap[item];
          if (lookup) {
            transformedItem = { title: lookup.title, description: lookup.description, img: lookup.img };
          } else {
            transformedItem = { title: String(item), description: "", img: "" };
          }
        } else if (item && typeof item === "object") {
          transformedItem = {
            title: String(item.title || ""),
            description: String(item.description || item.desc || ""),
            img: String(item.icon || item.img || ""),
          };
          if (item.iconFile instanceof File) {
            notIncludedIconFiles.push(item.iconFile);
          }
        } else {
          transformedItem = { title: "", description: "", img: "" };
        }
        return transformedItem;
      });

      // Send all trip fields as one JSON string so backend gets real arrays (fixes "expected array, received string").
      // Backend must parse: payload = JSON.parse(req.body.payload) and validate payload (see BACKEND_UPDATE_TRIP_FIX.md).
      const payload = {
        title: data.title,
        description: data.description,
        shortDesc: data.description?.slice(0, 255),
        categoryId: data.categoryId,
        location: data.location,
        locationId: data.locationId,
        mapCoordinates: data.mapCoordinates || undefined,
        startDate: data.startDate?.toISOString(),
        endDate: data.endDate?.toISOString(),
        duration: data.duration,
        longDesc: data.LongDescription,
        groupSize: data.GroupSize,
        rhythm: data.rhythm,
        sportLvl: data.SportsLevel,
        included: includedItems,
        notIncluded: notIncludedItems,
        bestPriceMsg: data.BestPrice,
        perHeadPrice: data.FinalPrice,
        instaLink: data.CoordinatorInstagram || undefined,
        likedinLink: data.CoordinatorLinkedin || undefined,
        // Send coordinator as an array
        coordinators: data.CoordinatorName ? [data.CoordinatorName] : [],
        coordinatorBio: data.CoordinatorBio,
        coordinatorInstagram: data.CoordinatorInstagram,
        coordinatorLinkedin: data.CoordinatorLinkedin,
        // Dynamic fields
        highlights: data.highlights || [],
        mood: data.mood || [],
        commonFund: data.commonFund || "",
        commonFundDescription: data.commonFundDescription || "",
        commonFundCount: data.commonFundCount || undefined,
        thingsToKnow: data.thingsToKnow || [],
        applicationType: data.applicationType || "video",
        depositAmount: data.depositAmount || "",
        status: data.status || "active",
        // Days itinerary data
        daysItinerary: daysItinerary,
      };
      
      console.log("📦 Payload with Dynamic Fields:", {
        highlights: payload.highlights,
        mood: payload.mood,
        commonFund: payload.commonFund,
        commonFundDescription: payload.commonFundDescription,
        commonFundCount: payload.commonFundCount,
        thingsToKnow: payload.thingsToKnow,
      });
      console.log("📏 Payload JSON size:", JSON.stringify(payload).length, "characters");
      // Send payload as a form field (reverted from file to avoid unexpected field error)
      formData.append("payload", JSON.stringify(payload));

      if (data.coverImage && data.coverImage instanceof File) {
        console.log("Appending cover image");
        formData.append("cover_img", data.coverImage);
      }
      if (data.PromotionalVideo && data.PromotionalVideo instanceof File) {
        console.log("Appending promotional video");
        formData.append("promotional_video", data.PromotionalVideo);
      }
      if (data.GalleryImages?.length) {
        console.log("Appending gallery images:", data.GalleryImages.length);
        data.GalleryImages.forEach((file: File) => {
          if (file instanceof File) formData.append("gallery_images", file);
        });
      }
      if (data.CoordinatorPhoto && data.CoordinatorPhoto instanceof File) {
        console.log("Appending coordinator photo");
        formData.append("prof_pic", data.CoordinatorPhoto);
      }

      // Append day images if provided (using indexed field names for backend processing)
      if (data.daysItinerary?.length) {
        console.log("Appending day images");
        data.daysItinerary.forEach((day, index) => {
          if (day.image && day.image instanceof File) {
            formData.append("day_images", day.image);
            // Also append the index to help backend map images to days
            formData.append("day_image_indices", index.toString());
          }
        });
      }

      // Append included/notIncluded icon files
      if (includedIconFiles.length > 0) {
        includedIconFiles.forEach((file) => formData.append("included_icons", file));
      }
      if (notIncludedIconFiles.length > 0) {
        notIncludedIconFiles.forEach((file) => formData.append("not_included_icons", file));
      }

      console.log("🚀 Calling API mutation...");
      console.log("📦 FormData keys:", Array.from(formData.keys()));
      
      const result = await mutateAsync(formData);
      
      console.log("✅ SUCCESS! API Response:", result);
      console.log("====================================");
    } catch (error) {
      console.error("❌ ERROR in onSubmit:", error);
      console.error("Full error response:", JSON.stringify((error as any)?.response?.data, null, 2));
      console.error("Error details:", {
        message: (error as any)?.message,
        response: (error as any)?.response?.data,
        status: (error as any)?.response?.status,
      });
    }
  };
  return (
    <>
      <div className="bg-[#FAFAFA] px-4 py-4 rounded-tl-[20px] rounded-tr-[20px] mt-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Button
              onClick={() => navigate(backUrl ? backUrl : "")}
              className="text-[#000000] font-bold bg-[#FAFAFA] hover:bg-[#ece7e7] cursor-pointer"
            >
              <img src={arrowBack} alt="arrowBack" className="h-4" />
              Back
            </Button>
          </div>
          <div className="px-4 flex justify-between items-center">
            <span className="text-[#221E33] font-semibold text-[18px]">
              Add New Trip
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
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Step {step} of {totalStep}</span>
              <span className="text-xs text-[#0DAC87] font-semibold">
                {validatedSections.size} of {totalStep} sections validated
              </span>
            </div>
            <Progress value={(step / totalStep) * 100} className="h-1.5" />
            
            {/* Clickable Section Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mt-8">
              {steps.map((label, index) => {
                const sectionNum = index + 1;
                const isCurrentStep = step === sectionNum;
                const isValidated = validatedSections.has(sectionNum);
                const isPastStep = step > sectionNum;
                const canNavigate = isPastStep || isCurrentStep;

                return (
                  <button
                    key={index}
                    onClick={() => validateAndGoToSection(sectionNum)}
                    disabled={!canNavigate && !isCurrentStep}
                    className={`relative flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
                      isCurrentStep
                        ? "bg-[#0DAC87]/10 border border-[#0DAC87]"
                        : isPastStep
                        ? "bg-[#35FF62]/5 border border-[#0DAC87]/30 cursor-pointer hover:bg-[#35FF62]/10"
                        : "bg-gray-50 border border-gray-200 cursor-not-allowed opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-2 w-full justify-center">
                      {isValidated && (
                        <CheckCircle className="w-4 h-4 text-[#0DAC87] flex-shrink-0" />
                      )}
                      <span
                        className={`text-[11px] font-semibold text-center transition-colors ${
                          isCurrentStep
                            ? "text-[#0DAC87]"
                            : isPastStep
                            ? "text-[#0DAC87]"
                            : "text-[#999]"
                        }`}
                      >
                        {label}
                      </span>
                    </div>

                    {(isCurrentStep || isPastStep) && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0DAC87] rounded-b-lg transition-all duration-300" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Error indicator if current section has errors */}
            {Object.keys(methods.formState.errors).length > 0 && step < totalStep && (
              <div className="mt-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>Please fix the errors in this section before continuing</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />
      <FormProvider {...methods}>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(
            (data) => {
              console.log("✅ Form validation passed! Submitting...");
              onSubmit(data as TripFormType);
            },
            (errors) => {
              console.error("❌ Form validation failed:", errors);
              // Log each field error
              Object.entries(errors).forEach(([field, error]: [string, any]) => {
                console.error(`  📍 ${field}: ${error?.message}`);
              });
            }
          )}>
            {step === 1 && <BasicInfo />}
            {step === 2 && <TripDetail />}
            {step === 3 && <Included />}
            {step === 4 && <Coordinator />}
            {step === 5 && <Mediaprice />}
            {step === 6 && <Reviewsave />}

            {/* Show validation errors blocking submission */}
            {step === 6 && Object.keys(methods.formState.errors).length > 0 && (
              <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-semibold mb-2">⚠️ Please fix the following errors before publishing:</p>
                <ul className="text-red-600 text-sm space-y-1">
                  {Object.entries(methods.formState.errors).map(([field, error]: [string, any]) => (
                    <li key={field}>• {field}: {error?.message || "Invalid"}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-white rounded-bl-[25px] rounded-br-[25px] flex md:flex-row flex-col justify-end mt-auto pt-24 gap-4">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={previous}
                  variant={"outline"}
                  className="text-[#666373] w-full md:w-auto border border-[#666373] font-bold cursor-pointer rounded-full px-8 py-5 my-6"
                  disabled={isPending}
                >
                  {step === totalStep ? "Preview Trip Page" : "previous"}
                </Button>
              )}
              {step === totalStep ? (
                <Button
                  type="submit"
                  disabled={isPending || !methods.formState.isValid}
                  className={`${
                    isPending || !methods.formState.isValid
                      ? "bg-[#0DAC87]/60 cursor-not-allowed"
                      : "bg-[#0DAC87] hover:bg-[#0d9e7c]"
                  } cursor-pointer rounded-full px-12 py-5 mx-6 my-6 w-full md:w-auto text-white font-bold transition-all duration-200`}
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Publishing Trip...
                    </span>
                  ) : !methods.formState.isValid ? (
                    "Fix Errors to Publish"
                  ) : (
                    "Publish"
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={next}
                  className="bg-[#000000] hover:bg-[#1a1a1a] cursor-pointer rounded-full px-12 py-5 mx-6 my-6 w-full md:w-auto text-white font-bold transition-all duration-200"
                >
                  Next
                </Button>
              )}
            </div>
          </form>
        </Form>
      </FormProvider>
    </>
  );
};

export default AddTrip;
