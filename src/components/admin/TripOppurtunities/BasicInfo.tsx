import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UsegetCategory } from "@/hooks/getCategoryhook";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";


const formSchema = z
  .object({
    Triptype: z.string().min(1, {
      message: "Select Trip Type",
    }),
    TripTitle: z.string().min(1, {
      message: "TripTitle is required",
    }),
    Description: z.string().min(1, {
      message: "Description is required",
    }),
    coverImage: z.any().optional(),
    Location: z.string().min(1, {
      message: "Select at least one Location",
    }),
    mapCoordinates: z.string().optional(),
    StartDate: z.date({
      message: "Select Start Date",
    }),
    EndDate: z.date({
      message: "Select End Date",
    }),
    Duration: z.string().optional()
  })



const BasicInfo = () => {
  type FormSchemaType = z.infer<typeof formSchema>;
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema) as any,
    shouldUnregister: false,
    defaultValues: {
      Triptype: "",
      TripTitle: "",
      Description: "",
      coverImage: null,
      Location: "",
      mapCoordinates: '',
      StartDate: undefined,
      EndDate: undefined,
      Duration: '',
    },
  });

    const [openStart, setOpenStart] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);
    const [startDate, setStartDate] = useState<Date | undefined>(undefined)
    const [endDate, setendDate] = useState<Date | undefined>(undefined)
    // const navigate = useNavigate();
    const [profile, setProfile] = useState("");
    const [step, setStep] = useState(1)
    const totalStep = 6
    const { data, isLoading, isError } = UsegetCategory()
    const startDateCal = form.watch("StartDate");
    const endDateCal = form.watch("EndDate");
    useEffect(() => {
        if (startDateCal && endDateCal) {
            const start = new Date(startDateCal);
            const end = new Date(endDateCal);
            if (end >= start) {
                const diffTime = end.getTime() - start.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

                form.setValue("Duration", `${diffDays} Days`);
            } else {
                form.setValue("Duration", "");
            }
        } else {
            form.setValue("Duration", "");
        }
    }, [startDate, endDate]);
    const HandleuploadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setProfile(file ? URL.createObjectURL(file) : "");
    };

    const onSubmit = (val: z.infer<typeof formSchema>) => {
        console.log(val);
    };

    const next = async () => {
        const valid = await form.trigger();
        if (valid && step < totalStep) {
            setStep(step + 1);
        }
    };

    const previous = () => {
        if (step > 1) setStep(step - 1)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* ========== Section 2: Basic Information ========== */}
                <div className="bg-white rounded-bl-[25px] rounded-br-[25px]">
                    <div className="px-8 py-6">
                        <div className="flex flex-col gap-2">
                            <>
                                <span className="font-semibold text-[20px]">Basic Information</span>
                                <div className="mt-10">
                                    <div className="grid md:grid-cols-2 gap-4 pb-6">
                                        <FormField
                                            control={form.control}
                                            name="Triptype"
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
                                            control={form.control}
                                            name="TripTitle"
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
                                            control={form.control}
                                            name="Description"
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
                                            control={form.control}
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
                                            control={form.control}
                                            name="Location"
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
                                            control={form.control}
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
                                            control={form.control}
                                            name="StartDate"
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
                                                                    selected={startDate}
                                                                    {...field}
                                                                    onSelect={(date) => {
                                                                        setStartDate(date)
                                                                        setOpenStart(false)
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
                                            control={form.control}
                                            name="EndDate"
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
                                                                    selected={endDate}
                                                                    {...field}
                                                                    onSelect={(date) => {
                                                                        setendDate(date)
                                                                        setOpenEnd(false)
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
                                            control={form.control}
                                            name="Duration"
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
                            </>


                            <div className="flex md:flex-row flex-col justify-end mt-auto pt-24 gap-4">
                                {
                                    step > 1 &&
                                    <Button type="button" onClick={previous} variant={'outline'} className="text-[#666373] w-full md:w-auto border border-[#666373] font-bold cursor-pointer rounded-full px-8 py-5">
                                        {step === totalStep ? "Preview Trip Page" : "previous"}
                                    </Button>
                                }
                                {/* <Button
                    type="button"
                    onClick={step === totalStep ? form.handleSubmit(onSubmit) : next}
                    className={`${step === totalStep ? 'bg-[#0DAC87] hover:bg-[#0d9e7c]' : 'bg-[#000000]'} cursor-pointer rounded-full px-12 py-5 w-full md:w-auto`}>
                    {step === totalStep ? "Publish" : "Next"}
                  </Button> */}
                                <Button
                                    type="button"
                                    onClick={step === totalStep ? form.handleSubmit(onSubmit) : next}
                                    className={`${step === totalStep ? 'bg-[#0DAC87] hover:bg-[#0d9e7c]' : 'bg-[#000000]'} cursor-pointer rounded-full px-12 py-5 w-full md:w-auto`}>
                                    {step === totalStep ? "Publish" : "Next"}
                                </Button>

                            </div>

                        </div>
                    </div>
                </div>

            </form>
        </Form>
    )
}

export default BasicInfo