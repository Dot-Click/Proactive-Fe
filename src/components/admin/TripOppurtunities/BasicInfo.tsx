import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import type { TripFormType } from "./tripschema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, useRef } from "react";
import { UsegetCategory } from "@/hooks/getCategoryhook";
import { UseGetLocations } from "@/hooks/UseGetLocationhook";
import type { Location } from "@/hooks/UseGetLocationhook";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, ChevronDown, Plus, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

const BasicInfo = () => {
  const { control, watch, setValue } = useFormContext<TripFormType>();
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setendDate] = useState<Date | undefined>(undefined);
  const [profile, setProfile] = useState("");
  const [dayImagePreviews, setDayImagePreviews] = useState<
    Record<number, string>
  >({});

  // Days itinerary field array
  const {
    fields: daysFields,
    append: appendDay,
    remove: removeDay,
  } = useFieldArray({
    control,
    name: "daysItinerary",
  });

  // Custom Dropdown State
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = UsegetCategory();
  const { data: locationsData, isLoading: isLocLoading } = UseGetLocations(); // Location Hook

  const startDateCal = watch("startDate");
  const endDateCal = watch("endDate");
  const coverImageValue = watch("coverImage");
  const selectedCategoryId = watch("categoryId");
  const daysItineraryWatch = watch("daysItinerary");

  // Close custom dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node)
      ) {
        setIsOpenLocation(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (startDateCal) {
      const d = new Date(startDateCal);
      if (!isNaN(d.getTime())) setStartDate(d);
    }
  }, [startDateCal]);

  useEffect(() => {
    if (endDateCal) {
      const d = new Date(endDateCal);
      if (!isNaN(d.getTime())) setendDate(d);
    }
  }, [endDateCal]);

  useEffect(() => {
    if (startDateCal && endDateCal) {
      const start = new Date(startDateCal);
      const end = new Date(endDateCal);
      if (end >= start) {
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setValue("duration", `${diffDays} Days`);
      } else {
        setValue("duration", "");
      }
    } else {
      setValue("duration", "");
    }
  }, [startDateCal, endDateCal, setValue]);

  useEffect(() => {
    if (coverImageValue && typeof coverImageValue === "string") {
      setProfile(coverImageValue);
    }
  }, [coverImageValue]);

  // Initialize day image previews when editing (when daysItinerary has existing image URLs)
  useEffect(() => {
    if (daysItineraryWatch && Array.isArray(daysItineraryWatch)) {
      const previews: Record<number, string> = {};
      daysItineraryWatch.forEach((day, index) => {
        // Check for existing image URL (string) or imagePreview
        const existingImage = day.image || day.imagePreview;
        if (existingImage && typeof existingImage === "string") {
          previews[index] = existingImage;
        }
      });
      // Only update if we have previews to set and they're different
      if (Object.keys(previews).length > 0) {
        setDayImagePreviews((prev) => {
          // Merge with existing previews (local file previews take precedence)
          const merged = { ...previews };
          Object.keys(prev).forEach((key) => {
            const idx = parseInt(key);
            // Keep local blob URLs (from file uploads) over remote URLs
            if (prev[idx]?.startsWith("blob:")) {
              merged[idx] = prev[idx];
            }
          });
          return merged;
        });
      }
    }
  }, [daysItineraryWatch]);

  const HandleuploadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setProfile("");
      setValue("coverImage", null);
      return;
    }
    const url = URL.createObjectURL(file);
    setProfile(url);
    setValue("coverImage", file, { shouldValidate: true });
  };

  // Handle day image upload
  const handleDayImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      setDayImagePreviews((prev) => {
        const updated = { ...prev };
        delete updated[index];
        return updated;
      });
      setValue(`daysItinerary.${index}.image`, null);
      setValue(`daysItinerary.${index}.imagePreview`, "");
      return;
    }
    const url = URL.createObjectURL(file);
    setDayImagePreviews((prev) => ({ ...prev, [index]: url }));
    setValue(`daysItinerary.${index}.image`, file, { shouldValidate: true });
    setValue(`daysItinerary.${index}.imagePreview`, url);
  };

  // Add a new day to itinerary
  const handleAddDay = () => {
    const nextDayNumber = daysFields.length + 1;
    appendDay({
      day: nextDayNumber,
      description: "",
      image: null,
      imagePreview: "",
    });
  };

  // Remove a day from itinerary
  const handleRemoveDay = (index: number) => {
    // Clean up image preview
    setDayImagePreviews((prev) => {
      const updated = { ...prev };
      delete updated[index];
      // Shift remaining previews
      const newPreviews: Record<number, string> = {};
      Object.keys(updated).forEach((key) => {
        const keyNum = parseInt(key);
        if (keyNum > index) {
          newPreviews[keyNum - 1] = updated[keyNum];
        } else {
          newPreviews[keyNum] = updated[keyNum];
        }
      });
      return newPreviews;
    });
    removeDay(index);
  };

  return (
    <>
      <div className="bg-white px-6 py-6">
        <span className="font-semibold text-[20px]">Basic Information</span>
        <div className="mt-10">
          <div className="grid md:grid-cols-2 gap-4 pb-6">
            {/* Category - Shadcn */}
            <FormField
              control={control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#242E2F] font-semibold">
                    Category
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoading && <p className="p-2">Loading...</p>}
                        {isError && (
                          <p className="p-2 text-red-500">
                            Something went wrong
                          </p>
                        )}
                        {data?.categories.map((category: any) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Trip Title */}
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#242E2F] font-semibold">
                    Trip Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Trip Title"
                      {...field}
                      className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Days Itinerary Section - Shown when category is selected */}
            {selectedCategoryId && (
              <>
                {/* Days Itinerary Section */}
                <div className="md:col-span-2 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <FormLabel className="text-[#242E2F] font-semibold text-[16px]">
                      Days Itinerary
                    </FormLabel>
                    <Button
                      type="button"
                      onClick={handleAddDay}
                      className="bg-[#0DAC87] hover:bg-[#0d9e7c] text-white rounded-full px-4 py-2 flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Add Day
                    </Button>
                  </div>

                  {daysFields.length === 0 && (
                    <div className="bg-[#FAFAFE] border border-dashed border-[#EFEFEF] rounded-[10px] p-6 text-center">
                      <p className="text-[#666373] text-sm">
                        No days added yet. Click "Add Day" to create an
                        itinerary.
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    {daysFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="bg-[#FAFAFE] border border-[#EFEFEF] rounded-[10px] p-4"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[#242E2F] font-semibold text-[14px]">
                            Day {index + 1}
                          </span>
                          <Button
                            type="button"
                            onClick={() => handleRemoveDay(index)}
                            variant="ghost"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          {/* Day Description */}
                          <FormField
                            control={control}
                            name={`daysItinerary.${index}.description`}
                            render={({ field }) => (
                              <FormItem className="md:col-span-1">
                                <FormLabel className="text-[#242E2F] font-medium text-[13px]">
                                  Day {index + 1} Description
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder={`Describe activities for Day ${
                                      index + 1
                                    }...`}
                                    {...field}
                                    value={field.value ?? ""}
                                    className="bg-white border border-[#EFEFEF] h-28 placeholder:text-[#999] text-sm"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Day Image */}
                          <FormField
                            control={control}
                            name={`daysItinerary.${index}.image`}
                            render={() => (
                              <FormItem className="md:col-span-1">
                                <FormLabel className="text-[#242E2F] font-medium text-[13px]">
                                  Day {index + 1} Image
                                </FormLabel>
                                <FormControl>
                                  <div className="bg-white border-[2px] border-dashed border-[#EFEFEF] rounded-[8px]">
                                    <input
                                      type="file"
                                      id={`dayImageUpload-${index}`}
                                      className="hidden"
                                      accept="image/*"
                                      onChange={(e) =>
                                        handleDayImageUpload(e, index)
                                      }
                                    />
                                    <label
                                      htmlFor={`dayImageUpload-${index}`}
                                      className="block cursor-pointer hover:bg-[#f5f5ff] transition-colors duration-200 rounded-[8px]"
                                    >
                                      <div
                                        className={`${
                                          dayImagePreviews[index]
                                            ? "py-2"
                                            : "py-6"
                                        } flex flex-col items-center`}
                                      >
                                        {dayImagePreviews[index] ? (
                                          <img
                                            src={dayImagePreviews[index]}
                                            alt={`Day ${index + 1}`}
                                            className="max-h-24 object-contain rounded"
                                          />
                                        ) : (
                                          <>
                                            <Upload
                                              strokeWidth={1}
                                              size={28}
                                              className="text-[#999]"
                                            />
                                            <span className="mt-2 text-[#666] text-[12px] text-center">
                                              Upload image
                                            </span>
                                            <span className="text-[10px] text-[#999]">
                                              PNG, JPG up to 10MB
                                            </span>
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Trip Description */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2 mt-6">
                  <FormLabel className="text-[#242E2F] font-semibold">
                    Trip Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your trip......"
                      className="bg-[#FAFAFE] border border-[#EFEFEF] h-26 placeholder:text-[#221E33]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cover Image */}
            <FormField
              control={control}
              name="coverImage"
              render={() => (
                <FormItem className="md:col-span-2 mt-6">
                  <FormLabel className="text-[#242E2F] font-semibold">
                    Cover Image
                  </FormLabel>
                  <FormControl>
                    <div className="bg-[#FAFAFE] border-[2.5px] border-dashed border-[#221E33] rounded-[10px]">
                      <input
                        type="file"
                        id="coordinatorProfile"
                        className="hidden"
                        onChange={HandleuploadProfile}
                      />
                      <label
                        htmlFor="coordinatorProfile"
                        className="block cursor-pointer hover:bg-[#f0f0ff] transition-colors duration-200 rounded-[10px]"
                      >
                        <div
                          className={`${
                            profile ? "py-0" : "py-14"
                          } flex flex-col items-center`}
                        >
                          {profile ? (
                            <img
                              src={profile}
                              alt="profile"
                              className="max-h-60 object-contain"
                            />
                          ) : (
                            <>
                              <Upload strokeWidth={1} size={60} />
                              <span className="mt-6 text-[#242E2F] text-[16px] text-center font-semibold">
                                Upload cover image
                              </span>
                              <span>PNG, JPG, GIF up to 10MB</span>
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

            {/* CUSTOM LOCATION DROPDOWN (Replaces Shadcn) */}
            <Controller
              control={control}
              name="location"
              render={({ field, fieldState }) => (
                <div
                  className="flex flex-col gap-2 mt-6 relative"
                  ref={locationRef}
                >
                  <label className="text-[#242E2F] font-semibold">
                    Location
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsOpenLocation(!isOpenLocation)}
                    className="flex items-center justify-between w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-3 rounded-md min-h-[50px]"
                  >
                    <span
                      className={
                        field.value ? "text-[#221E33]" : "text-gray-400"
                      }
                    >
                      {field.value || "e.g, Barcelona, Spain"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isOpenLocation ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpenLocation && (
                    <ul className="absolute z-50 w-full top-[100%] mt-1 bg-white border border-[#EFEFEF] rounded-md shadow-lg max-h-60 overflow-auto">
                      {isLocLoading && (
                        <li className="px-4 py-2 text-sm text-gray-500">
                          Loading locations...
                        </li>
                      )}
                      {!isLocLoading && locationsData?.length === 0 && (
                        <li className="px-4 py-2 text-sm text-gray-500">
                          No locations found
                        </li>
                      )}
                      {locationsData?.map((loc: Location) => (
                        <li
                          key={loc.id}
                          onClick={() => {
                            field.onChange(loc.name);
                            setValue("locationId", loc.id); // Also set locationId
                            setIsOpenLocation(false);
                          }}
                          className="px-4 py-2 hover:bg-[#FAFAFE] cursor-pointer text-[#242E2F] text-sm border-b border-[#f9f9f9] last:border-none"
                        >
                          {loc.name}
                        </li>
                      ))}
                    </ul>
                  )}
                  {fieldState.error && (
                    <p className="text-red-500 text-[0.8rem] font-medium">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Map Coordinates */}
            <FormField
              control={control}
              name="mapCoordinates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#242E2F] font-semibold mt-6">
                    Map Coordinates (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Select on map"
                      {...field}
                      className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Dates and Duration Section */}
          <div className="grid md:grid-cols-3 gap-4 pb-6 mt-4">
            <FormField
              control={control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#242E2F] font-semibold">
                    Start Date
                  </FormLabel>
                  <FormControl>
                    <Popover open={openStart} onOpenChange={setOpenStart}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between font-normal bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6"
                        >
                          {(
                            startDate ??
                            (field.value ? new Date(field.value) : null)
                          )?.toLocaleDateString() ?? "mm/dd/yy"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (!date) return;
                            setStartDate(date);
                            setOpenStart(false);
                            field.onChange(date);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#242E2F] font-semibold">
                    End Date
                  </FormLabel>
                  <FormControl>
                    <Popover open={openEnd} onOpenChange={setOpenEnd}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between font-normal bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6"
                        >
                          {(
                            endDate ??
                            (field.value ? new Date(field.value) : null)
                          )?.toLocaleDateString() ?? "mm/dd/yy"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (!date) return;
                            setendDate(date);
                            setOpenEnd(false);
                            field.onChange(date);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#242E2F] font-semibold">
                    Duration
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Auto-calculated"
                      {...field}
                      readOnly
                      className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicInfo;
