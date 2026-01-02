import { useFormContext } from "react-hook-form";
import type { TripFormType } from "./tripschema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { UsegetCategory } from "@/hooks/getCategoryhook";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
const BasicInfo = () => {
    const { control, watch, setValue } = useFormContext<TripFormType>();
    const [openStart, setOpenStart] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);
    const [startDate, setStartDate] = useState<Date | undefined>(undefined)
    const [endDate, setendDate] = useState<Date | undefined>(undefined)
    const [profile, setProfile] = useState("");
    const { data, isLoading, isError } = UsegetCategory()
    const startDateCal = watch("startDate");
    const endDateCal = watch("endDate");

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

    const HandleuploadProfile = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
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
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    isLoading && <p>Loading...</p>
                                                }
                                                {
                                                    isError && <p>Something went wrong</p>
                                                }
                                                {
                                                    data?.categories.map((category: any) => (
                                                        <SelectItem key={category.id} value={category.name}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                                    className={`${profile ? "py-0" : "py-14"} flex flex-col items-center`}
                                                >
                                                    {profile ? (
                                                        <img src={profile} alt="profile" />
                                                    ) : (
                                                        <>
                                                            <Upload strokeWidth={1} size={60} />
                                                            <span className="mt-6 text-[#242E2F] text-[16px] text-center font-semibold">
                                                                Upload cover image
                                                            </span>
                                                            <span>PNG,JPG,GIF up to 10MB</span>
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
                        <FormField
                            control={control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#242E2F] font-semibold mt-6">
                                        Location
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                                                <SelectValue placeholder="e.g, Barcelona,Spain" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Hunza Valley">Hunza Valley</SelectItem>
                                                <SelectItem value="Skardu">Skardu</SelectItem>
                                                <SelectItem value="Fairy Meadows">Fairy Meadows</SelectItem>
                                                <SelectItem value="Swat Valley">Swat Valley</SelectItem>
                                                <SelectItem value="Naran Kaghan">Naran Kaghan</SelectItem>
                                                <SelectItem value="Islamabad">Islamabad</SelectItem>
                                                <SelectItem value="Karachi">Karachi</SelectItem>
                                                <SelectItem value="Lahore">Lahore</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                                    id="date"
                                                    className="justify-between font-normal bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                >
                                                    {startDate ? startDate.toLocaleDateString() : "mm/dd/yy"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-4" align="end">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={(date) => {
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
                                                    id="date"
                                                    className="justify-between font-normal bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                                >
                                                    {endDate ? endDate.toLocaleDateString() : "mm/dd/yy"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-4" align="end">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={(date) => {
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
