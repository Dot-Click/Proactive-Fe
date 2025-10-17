import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod"



const formSchema = z
  .object({
    PlatformName: z.string().min(1, {
      message: "Platform Name is required",
    }),
    TimeZone: z.string().min(1, {
      message: "Select TimeZone",
    }),
    PlatformImage: z.string().min(1, {
      message: "Platform Image is required",
    }),
    DefaultLanguage: z.string().min(1, {
      message: "Select Default Language",
    }),
    Currency: z.string().min(1, {
      message: "Select Currency",
    }),

  })

const General = () => {
  type FormSchemaType = z.infer<typeof formSchema>;
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      PlatformName: "",
      TimeZone: "",
      PlatformImage: "",
      DefaultLanguage: "",
      Currency: "",
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
              name="PlatformName"
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
              name="TimeZone"
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
                        <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="UTC+0">Greenwich Mean Time (UTC+0)</SelectItem>
                        <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                        <SelectItem value="UTC+3">Arabian Standard Time (UTC+3)</SelectItem>
                        <SelectItem value="UTC+4">Gulf Standard Time (UTC+4)</SelectItem>
                        <SelectItem value="UTC+5">Pakistan Standard Time (UTC+5)</SelectItem>
                        <SelectItem value="UTC+5:30">India Standard Time (UTC+5:30)</SelectItem>
                        <SelectItem value="UTC+7">Indochina Time (UTC+7)</SelectItem>
                        <SelectItem value="UTC+8">China Standard Time (UTC+8)</SelectItem>
                        <SelectItem value="UTC+9">Japan Standard Time (UTC+9)</SelectItem>
                        <SelectItem value="UTC+10">Australian Eastern Time (UTC+10)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PlatformImage"
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
              name="DefaultLanguage"
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
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Urdu">Urdu</SelectItem>
                        <SelectItem value="Arabic">Arabic</SelectItem>
                        <SelectItem value="Turkish">Turkish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Chinese">Chinese (Mandarin)</SelectItem>
                        <SelectItem value="Japanese">Japanese</SelectItem>
                        <SelectItem value="Indonesian">Indonesian</SelectItem>
                        <SelectItem value="Malay">Malay</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Currency"
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
                        <SelectItem value="PKR">PKR - Pakistani Rupee</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                        <SelectItem value="SAR">SAR - Saudi Riyal</SelectItem>
                        <SelectItem value="TRY">TRY - Turkish Lira</SelectItem>
                        <SelectItem value="THB">THB - Thai Baht</SelectItem>
                        <SelectItem value="IDR">IDR - Indonesian Rupiah</SelectItem>
                        <SelectItem value="MYR">MYR - Malaysian Ringgit</SelectItem>
                        <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                        <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                        <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
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