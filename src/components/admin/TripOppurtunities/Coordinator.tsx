import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UsegetCoordinator } from "@/hooks/getCoordinatorhook";
import { Upload } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { TripFormType } from "./tripschema";

const Coordinator = () => {
  const [profile, setProfile] = useState("");
  const [show, setShow] = useState(false)
  const { data } = UsegetCoordinator();
  console.log(data)
  const { control } = useFormContext<TripFormType>();
  const HandleuploadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setProfile(file ? URL.createObjectURL(file) : "");
  };

  return (
    <div>
      <div className="grid grid-cols-2 bg-white px-6 py-6">
        <div className="flex flex-col ">
          <span className="text-[#221E33] font-bold">Trip Coordinators</span>
          <span className="text-[#221E33] font-medium text-[14px]">Multiple Coordinators Supported</span>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => setShow(!show)} className="rounded-full bg-[#FD8B3A] px-5 py-5 cursor-pointer hover:bg-[#ff8832] w-auto">
            Add Coordinator
          </Button>
        </div>
      </div>

      <div className="bg-white px-6 py-6">
            {
              show &&
              <>
                <div className="mt-12 grid md:grid-cols-2 gap-6">
                  <FormField
                    control={control}
                    name="CoordinatorName"
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
                              {
                                data?.coordinators?.map((coordinator: any) => (
                                  <SelectItem key={coordinator.id} value={coordinator.userId}>{coordinator.fullName}</SelectItem>
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
                    name="CoordinatorRole"
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
                    control={control}
                    name="description"
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
                    control={control}
                    name="CoordinatorInstagram"
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
                    control={control}
                    name="CoordinatorLinkedin"
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
                    <Button onClick={() => setShow(false)} type="button" variant={'outline'} className="text-[#9C0000] rounded-full px-8 py-4 border border-[#9C0000] cursor-pointer">Remove</Button>
                  </div>
                </div>
              </>
            }
      </div>
    </div>
  )
}

export default Coordinator