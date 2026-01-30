import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Video } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useFormContext } from "react-hook-form";
import gallery from "@/assets/sidebaricon/gallery.png"
import { Input } from "@/components/ui/input";
import type { TripFormType } from "./tripschema";

const GALLERY_SLOTS = 8;

function getGalleryItemPreviewUrl(item: unknown): string {
  if (item == null) return "";
  if (typeof item === "string") return item;
  if (item instanceof File) return URL.createObjectURL(item);
  if (typeof item === "object" && item !== null && "url" in item && typeof (item as { url: string }).url === "string")
    return (item as { url: string }).url;
  return "";
}

const Mediaprice = () => {
  const { control, setValue, getValues, formState, watch } =
    useFormContext<TripFormType>();
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(Array(GALLERY_SLOTS).fill(""));
  const galleryPreviewsRef = useRef<string[]>([]);
  const [videoPreview, setVideoPreview] = useState("");
  const promotionalVideoValue = watch("PromotionalVideo");
  const galleryImagesValue = watch("GalleryImages");

  const handleUploadVideo = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      setVideoPreview("");
      setValue("PromotionalVideo", null);
      return;
    }

    const allowedTypes = ["video/mp4", "video/quicktime"];
    const maxBytes = 100 * 1024 * 1024;

    if (!allowedTypes.includes(file.type) || file.size > maxBytes) {
      return;
    }

    const url = URL.createObjectURL(file);
    setVideoPreview(url);

    setValue("PromotionalVideo", file, { shouldValidate: true });
  };

  // ================= GALLERY UPLOAD =================
  const handleGalleryUpload =
    (index: number) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const rawImages = getValues("GalleryImages");
        const currentImages = Array.isArray(rawImages) ? rawImages : [];
        const updatedImages = [...currentImages];
        updatedImages[index] = file;
        while (updatedImages.length < GALLERY_SLOTS) updatedImages.push(undefined as any);
        const newValue = updatedImages.slice(0, GALLERY_SLOTS);

        setValue("GalleryImages", newValue, { shouldValidate: true });
        event.target.value = ""; // allow re-uploading same file
      };

  // Handle promotional video URL preview (for edit mode)
  useEffect(() => {
    if (promotionalVideoValue && typeof promotionalVideoValue === "string") {
      setVideoPreview(promotionalVideoValue);
    }
  }, [promotionalVideoValue]);

  // Derive gallery previews from form value: show both existing URLs and new File uploads (as blob URLs).
  // Revoke previous blob URLs to avoid leaks when value changes.
  useEffect(() => {
    galleryPreviewsRef.current.forEach((url) => {
      if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
    });

    if (!galleryImagesValue || !Array.isArray(galleryImagesValue)) {
      galleryPreviewsRef.current = Array(GALLERY_SLOTS).fill("");
      setGalleryPreviews(Array(GALLERY_SLOTS).fill(""));
      return;
    }

    const previews: string[] = [];
    for (let i = 0; i < GALLERY_SLOTS; i++) {
      const item = galleryImagesValue[i];
      previews.push(getGalleryItemPreviewUrl(item));
    }
    galleryPreviewsRef.current = previews;
    setGalleryPreviews(previews);

    return () => {
      previews.forEach((url) => {
        if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [galleryImagesValue]);

  // ================= CLEANUP =================
  useEffect(() => {
    return () => {
      if (videoPreview && videoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  useEffect(() => {
    return () => {
      galleryPreviews.forEach((url) => {
        if (url && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [galleryPreviews]);

  return (
    <div className="bg-white px-6 py-6">
      <FormField
        control={control}
        name="PromotionalVideo"
        render={() => (
          <FormItem className="md:col-span-2">
            <FormLabel className="text-[#242E2F] font-semibold">
              Promotional Video
            </FormLabel>
            <FormControl>
              <div className="bg-[#FAFAFE] border-[2.5px] border-dashed border-[#A19AAF] rounded-[10px]">
                <input
                  type="file"
                  accept="video/mp4, video/quicktime"
                  id="coordinatorProfile"
                  className="hidden"
                  onChange={handleUploadVideo}
                />

                <label
                  htmlFor="coordinatorProfile"
                  className="block cursor-pointer hover:bg-[#f0f0ff] transition-colors duration-200 rounded-[10px]"
                >
                  <div
                    className={`${videoPreview ? "py-0" : "py-14"} flex flex-col items-center`}
                  >
                    {videoPreview ? (
                      <video src={videoPreview} controls className="w-full max-h-80 rounded-[10px]" />
                    ) : (
                      <>
                        <Video strokeWidth={1} size={60} stroke="#606066" />
                        <span className="mt-4 text-[#242E2F] text-[16px] text-center font-semibold">
                          Upload Promotional Video
                        </span>
                        <span>MP4, MOV Max 100MB</span>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="mt-6">
        <FormLabel className="text-[#242E2F] font-semibold">Gallery Images</FormLabel>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-3">
          {Array.from({ length: GALLERY_SLOTS }).map((_, i) => (
            <div
              key={i}
              className="bg-[#FAFAFE] border-[2.5px] border-dashed border-[#A19AAF] rounded-[10px]"
            >
              <input
                type="file"
                accept="image/*"
                id={`galleryImage-${i}`}
                className="hidden"
                onChange={handleGalleryUpload(i)}
              />
              <label
                htmlFor={`galleryImage-${i}`}
                className="cursor-pointer hover:bg-[#f0f0ff] transition-colors duration-200 rounded-[10px]"
              >
                <div className={`${galleryPreviews[i] ? "py-0" : "py-14"} flex flex-col items-center`}>
                  {galleryPreviews[i] ? (
                    <img src={galleryPreviews[i]} alt={`gallery-${i}`} className="max-h-50 w-full rounded-[10px]" />
                  ) : (
                    <>
                      <img src={gallery} alt="gallery" className="h-15" />
                    </>
                  )}
                </div>
              </label>
            </div>
          ))}
        </div>
        {formState.errors.GalleryImages && (
          <FormMessage className="mt-2">{formState.errors.GalleryImages.message}</FormMessage>
        )}
      </div>
      <FormField
        control={control}
        name="BestPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#242E2F] font-semibold mt-8">
              Best Price Guarantee Message
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Guarantee Message"
                {...field}
                className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="FinalPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#242E2F] font-semibold mt-8">
              Final Price
            </FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                <Input
                  placeholder="0"
                  {...field}
                  className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33] w-auto"
                />
                <span className="text-[#242E2F] font-semibold">€ per person</span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
export default Mediaprice