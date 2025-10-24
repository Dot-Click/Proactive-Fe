import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod"

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

const Coordinator = () => {
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
  const [profile, setProfile] = useState("");
  const [show, setShow] = useState(false)
  const HandleuploadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setProfile(file ? URL.createObjectURL(file) : "");
  };

  const onSubmit = (val: z.infer<typeof formSchema>) => {
    console.log(val);
  };

  return (
    <div>
      <div className="grid grid-cols-2 mt-6">
        <div className="flex flex-col">
          <span className="text-[#221E33] font-bold">Trip Coordinators</span>
          <span className="text-[#221E33] font-medium text-[14px]">Multiple Coordinators Supported</span>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => setShow(!show)} className="rounded-full bg-[#FD8B3A] px-5 py-5 cursor-pointer hover:bg-[#ff8832] w-auto">
            Add Coordinator
          </Button>
        </div>
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {
              show &&
              <>
                <div className="mt-12 grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="Location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#242E2F] font-semibold">
                          Coordinator Name
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                              <SelectValue placeholder="Select Coordinator" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Maria">Maria</SelectItem>
                              <SelectItem value="John">John</SelectItem>
                              <SelectItem value="David">David</SelectItem>
                            </SelectContent>
                          </Select>
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
                          Role
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Lead Coordinator"
                            {...field}
                            className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex mt-8 gap-3 items-center">
                  <Avatar className="w-20 h-20">
                    <AvatarImage className="object-cover" src={profile ? profile : "https://github.com/shadcn.png"} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <input onChange={HandleuploadProfile} type="file" id="coordinatorphoto" className="hidden" />
                  <Button type="button" className="rounded-full w-42 ">
                    <label htmlFor="coordinatorphoto" className="flex gap-1 items-center cursor-pointer">
                      <Upload strokeWidth={3} size={60} />
                      Upload Photo
                    </label>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-6">
                  <FormField
                    control={form.control}
                    name="Description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2 mt-6">
                        <FormLabel className="text-[#242E2F] font-semibold">
                          Short Description
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
                    name="Description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#242E2F] font-semibold mt-6">
                          Instagram (optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="@username"
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
                      <FormItem >
                        <FormLabel className="text-[#242E2F] font-semibold mt-6">
                          Linkedin (optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Linkedin profile URL "
                            {...field}
                            className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-start mt-4">
                    <Button onClick={()=> setShow(false)} type="button" variant={'outline'} className="text-[#9C0000] rounded-full px-8 py-4 border border-[#9C0000] cursor-pointer">Remove</Button>
                  </div>
                </div>
              </>
            }
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Coordinator