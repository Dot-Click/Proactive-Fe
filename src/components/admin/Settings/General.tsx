import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
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

const General = () => {
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

  const onSubmit = (val: z.infer<typeof formSchema>) => {
    console.log(val);
  };

  return (
    <div className="rounded-[10px] mt-4 bg-white md:min-h-[100vh]">

      <div className="bg-[#FAFAFA] rounded-t-[10px]">
        <h1 className="text-[#221E33] font-bold text-[28px] sm:text-[20px] px-6 py-6">
          Platform Configuration
        </h1>
      </div>

      <div className="border-b border-[#EDEDED]" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 px-5 py-8 gap-6">
            <FormField
              control={form.control}
              name="Triptype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#242E2F] font-semibold">
                    Platform Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Platform Name"
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
              name="Triptype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#242E2F] font-semibold">
                    Time zone
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                        <SelectValue placeholder="Select Time Zone" />
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
              name="Triptype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#242E2F] font-semibold">
                    Platform Image
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Platform Image"
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
              name="Triptype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#242E2F] font-semibold">
                    Default Language
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                        <SelectValue placeholder="Default Language" />
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
              name="Triptype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#242E2F] font-semibold">
                    Currency
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                        <SelectValue placeholder="Currency" />
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
          </div>
          <div className="flex justify-end px-5 py-8 mt-35">
            <Button className="rounded-full px-12 py-5 cursor-pointer">Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default General