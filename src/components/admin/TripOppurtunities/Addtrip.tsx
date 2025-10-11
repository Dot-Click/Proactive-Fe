import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import arrowBack from "../../../assets/sidebaricon/arrowback.png";
// import imgupload from "../../../assets/sidebaricon/imgupload.png";
import Template from "../../../assets/sidebaricon/Template.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Check } from "lucide-react";

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
    StartDate: z.coerce.number().min(1, {
      message: "Select Start Date",
    }),
    EndDate: z.coerce.number().min(1, {
      message: "Select End Date",
    }),
    Duration: z.string().optional()
  })
const Addtrip = () => {
  type FormSchemaType = z.infer<typeof formSchema>;
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      Triptype: "",
      TripTitle: "",
      Description: "",
      coverImage: null,
      Location: "",
      mapCoordinates: '',
      StartDate: 0,
      EndDate: 0,
      Duration: '',
    },
  });
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setendDate] = useState<Date | undefined>(undefined)
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");
  const [step, setStep] = useState(1)
  const totalStep = 6

  const HandleuploadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setProfile(file ? URL.createObjectURL(file) : "");
  };

  const onSubmit = (val: z.infer<typeof formSchema>) => {
    console.log(val);
  };

  const next = () => {
    if (step < totalStep) setStep(step + 1)
  }

  const previous = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div>
      <div className="bg-[#FAFAFA] px-4 py-4 rounded-tl-[20px] rounded-tr-[20px] mt-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Button onClick={() => navigate("/dashboard/trip-management")} className="text-[#000000] font-bold bg-[#FAFAFA] hover:bg-[#ece7e7] cursor-pointer">
              <img src={arrowBack} alt="arrowBack" className="h-4" />
              Back
            </Button>
          </div>
          <div className="px-4 flex justify-between items-center">
            <span className="text-[#221E33] font-semibold text-[18px]">Add New Trip</span>
            <div className="flex items-center border border-[#000000] gap-2 px-5 py-3 rounded-[12px]">
              <img src={Template} alt="Template" className="h-4" />
              <span className="text-[#221E33] font-medium">Use Template</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========== Section 1: stepper ========== */}
      <div className="bg-white">
        <div className="px-8 py-6">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Step 1 of 6</span>
            <Progress value={(step / totalStep) * 100} />
            <div className="flex justify-between mt-2">
              <span className="text-[12px] font-semibold text-[#221E33]">Basic Information</span>
              <span className="text-[12px] font-semibold text-[#221E33]">Trip Details</span>
              <span className="text-[12px] font-semibold text-[#221E33]">What's Included</span>
              <span className="text-[12px] font-semibold text-[#221E33]">Coordinators</span>
              <span className="text-[12px] font-semibold text-[#221E33]">Media & Price</span>
              <span className="text-[12px] font-semibold text-[#221E33]">Review & Save</span>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* ========== Section 2: Basic Information ========== */}
          <div className="bg-white rounded-bl-[25px] rounded-br-[25px]">
            <div className="px-8 py-6">
              <div className="flex flex-col gap-2">
                {
                  step === 1 &&
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
                                    <SelectItem value="Photography">Wild Trip</SelectItem>
                                    <SelectItem value="Travel">Wild weekend</SelectItem>
                                    <SelectItem value="Travel">Other</SelectItem>
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
                                  placeholder="Describr your trip......"
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
                                    <SelectItem value="Wild Trip">Wild Trip</SelectItem>
                                    <SelectItem value="Wild weekend">Wild weekend</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
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
                }

                {
                  step === 2 &&
                  <>
                    <span className="font-semibold text-[20px]">Trip Details</span>
                    <div className="mt-10">
                      <div className="grid md:grid-cols-2 gap-4 pb-6">
                        <FormField
                          control={form.control}
                          name="Description"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Long Description
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describr your trip......"
                                  className="bg-[#FAFAFE] border border-[#EFEFEF] h-26 placeholder:text-[#221E33] px-4 py-3"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* <div className="grid grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#242E2F] font-semibold">
                                  Trip Title
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Email"
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
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#242E2F] font-semibold">
                                  Trip Description
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Email"
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
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#242E2F] font-semibold">
                                  Trip Description
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Email"
                                    {...field}
                                    className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div> */}



                        
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
                                  className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={() => (
                            <FormItem className="md:col-span-3 mt-6">
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
                      </div>

                    </div>
                  </>
                }

                {
                  step === 3 &&
                  <>
                    <span className="font-semibold text-[20px]">What</span>
                    <div className="mt-10">
                      <div className="grid md:grid-cols-2 gap-4 pb-6">
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Trip Type
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Trip Title
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Email"
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
                          name="phone"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2 mt-6">
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Trip Description
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describr your trip......"
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
                          name="phone"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold mt-6">
                                Location
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold mt-6">
                                Map Coordinates (Optional)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Date
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                End Date
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Duration
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
                                  {...field}
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
                }

                {
                  step === 4 &&
                  <>
                    <span className="font-semibold text-[20px]">Coordinators</span>
                    <div className="mt-10">
                      <div className="grid md:grid-cols-2 gap-4 pb-6">
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Trip Type
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Trip Title
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Email"
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
                          name="phone"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2 mt-6">
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Trip Description
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describr your trip......"
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
                          name="phone"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold mt-6">
                                Location
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold mt-6">
                                Map Coordinates (Optional)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Date
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                End Date
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Duration
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
                                  {...field}
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
                }

                {
                  step === 5 &&
                  <>
                    <span className="font-semibold text-[20px]">Media</span>
                    <div className="mt-10">
                      <div className="grid md:grid-cols-2 gap-4 pb-6">
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Trip Type
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Trip Title
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Email"
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
                          name="phone"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2 mt-6">
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Trip Description
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describr your trip......"
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
                          name="phone"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold mt-6">
                                Location
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold mt-6">
                                Map Coordinates (Optional)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Date
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                End Date
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Duration
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
                                  {...field}
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
                }

                {
                  step === 6 &&
                  <>
                    <span className="font-semibold text-[20px]">Review</span>
                    <div className="mt-10">
                      <div className="grid md:grid-cols-2 gap-4 pb-6">
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Trip Type
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Trip Title
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Email"
                                  {...field}
                                  className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Phone */}
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2 mt-6">
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Trip Description
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describr your trip......"
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
                          name="phone"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold mt-6">
                                Location
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold mt-6">
                                Map Coordinates (Optional)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Date
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                End Date
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#242E2F] font-semibold">
                                Duration
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
                                  {...field}
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
                }

                <div className="flex justify-end py-6 gap-4">
                  {
                    step > 1 &&
                    <Button type="button" onClick={previous} variant={'outline'} className="cursor-pointer rounded-full px-8 py-5">Previous</Button>
                  }
                  <Button
                    type="button"
                    onClick={step === totalStep ? form.handleSubmit(onSubmit) : next}
                    className="cursor-pointer rounded-full px-12 py-5">
                    {step === totalStep ? "Publish" : "Next"}
                  </Button>
                </div>

              </div>
            </div>
          </div>

        </form>
      </Form>
    </div >
  );
};

export default Addtrip;
