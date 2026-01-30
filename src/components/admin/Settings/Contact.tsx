import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UsegetSettinghook } from "@/hooks/getSettinghook";
import { UseupdateSetting } from "@/hooks/updatesettinghook";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  contactAddress: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.union([z.string().email("Invalid email"), z.literal("")]).optional(),
  mapLat: z.string().optional(),
  mapLng: z.string().optional(),
});

const Contact = () => {
  type FormSchemaType = z.infer<typeof formSchema>;
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      contactAddress: "",
      contactPhone: "",
      contactEmail: "",
      mapLat: "",
      mapLng: "",
    },
  });

  const { mutateAsync, isPending } = UseupdateSetting();
  const { data } = UsegetSettinghook();
  const settings = data?.settings;

  useEffect(() => {
    if (settings) {
      form.reset({
        contactAddress: settings.contactAddress ?? "",
        contactPhone: settings.contactPhone ?? "",
        contactEmail: settings.contactEmail ?? "",
        mapLat: settings.mapLat ?? "",
        mapLng: settings.mapLng ?? "",
      });
    }
  }, [settings, form]);

  const onSubmit = async (val: FormSchemaType) => {
    try {
      await mutateAsync({
        contactAddress: val.contactAddress || undefined,
        contactPhone: val.contactPhone || undefined,
        contactEmail: val.contactEmail || undefined,
        mapLat: val.mapLat || undefined,
        mapLng: val.mapLng || undefined,
      });
      toast.success("Contact info updated successfully");
    } catch (error) {
      toast.error("Failed to update contact info");
    }
  };

  return (
    <div className="rounded-[10px] mt-4 bg-white md:min-h-[100vh]">
      <div className="bg-[#FAFAFA] rounded-t-[10px]">
        <h1 className="text-[#221E33] font-bold text-[28px] sm:text-[20px] px-6 py-6">
          Contact Info (Contact Page)
        </h1>
      </div>
      <div className="border-b border-[#EDEDED]" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 px-5 py-8 gap-6">
            <FormField
              control={form.control}
              name="contactAddress"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-[#242E2F] font-semibold">
                    Contact Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 123 Adventure Street Brussels, Belgium 1000"
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
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#242E2F] font-semibold">
                    Contact Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. +32 2 123 4567"
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
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#242E2F] font-semibold">
                    Contact Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="e.g. hello@proactiefuture.com"
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
              name="mapLat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#242E2F] font-semibold">
                    Map Latitude
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 24.86270"
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
              name="mapLng"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#242E2F] font-semibold">
                    Map Longitude
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 67.07363"
                      {...field}
                      className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end px-5 py-8 mt-35">
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-full px-12 py-5 cursor-pointer flex items-center gap-2"
            >
              {isPending ? (
                <>
                  <LoaderIcon className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Contact;
