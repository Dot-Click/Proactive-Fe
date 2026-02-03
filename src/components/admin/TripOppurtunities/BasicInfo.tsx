import { useFormContext, Controller } from "react-hook-form";
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
import { useEffect, useState, useRef } from "react"; // Added useRef
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
import { Upload, ChevronDown } from "lucide-react"; // Added ChevronDown
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

  // Custom Dropdown State
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = UsegetCategory();
  const { data: locationsData, isLoading: isLocLoading } = UseGetLocations(); // Location Hook

  const startDateCal = watch("startDate");
  const endDateCal = watch("endDate");
  const coverImageValue = watch("coverImage");

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

  return (
    <>
      <div className="bg-white px-6 py-6">
        <span className="font-semibold text-[20px]">Basic Information</span>
        <div className="mt-10">
          <div className="grid md:grid-cols-2 gap-4 pb-6">
            {/* Trip Type - Shadcn (Kept as requested) */}
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#242E2F] font-semibold">
                    Trip Type
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoading && <p className="p-2">Loading...</p>}
                        {isError && (
                          <p className="p-2 text-red-500">
                            Something went wrong
                          </p>
                        )}
                        {data?.categories.map((category: any) => (
                          <SelectItem key={category.id} value={category.name}>
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
