import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useFormContext } from "react-hook-form";
import type { TripFormType } from "./tripschema";
// import { Upload } from "lucide-react"
// import { useState } from "react"

// const Tripdetail = () => {
//     type FormSchemaType = z.infer<typeof formSchema>;
//     const form = useForm<FormSchemaType>({
//         resolver: zodResolver(formSchema) as any,
//         shouldUnregister: false, 
//         defaultValues: {
//             LongDescription: "",
//             GroupSize: 0,
//             Rhythm: "",
//             SportsLevel: "",
//         },
//     });
//     // const [profile, setProfile] = useState("");
//     // const HandleuploadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
//     //     const file = event.target.files?.[0];
//     //     setProfile(file ? URL.createObjectURL(file) : "");
//     // };

//     const onSubmit = (val: z.infer<typeof formSchema>) => {
//         console.log(val);
//     };

//     return (
//         <div>
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)}>
//                     <span className="font-semibold text-[20px]">Trip Details</span>
//                     <div className="mt-10">
//                         <div className="grid md:grid-cols-1 gap-4 pb-6">
//                             <FormField
//                                 control={form.control}
//                                 name="LongDescription"
//                                 render={({ field }) => (
//                                     <FormItem className="md:col-span-2">
//                                         <FormLabel className="text-[#242E2F] font-semibold">
//                                             Long Description
//                                         </FormLabel>
//                                         <FormControl>
//                                             <Textarea
//                                                 placeholder="Describr your trip......"
//                                                 className="bg-[#FAFAFE] border border-[#EFEFEF] h-26 placeholder:text-[#221E33] px-4 py-3"
//                                                 {...field}
//                                             />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                         </div>
//                         <div className="grid md:grid-cols-3 gap-4 pb-6 mt-4">
//                             <FormField
//                                 control={form.control}
//                                 name="GroupSize"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel className="text-[#242E2F] font-semibold">
//                                             Group Size
//                                         </FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 placeholder="Group Size"
//                                                 {...field}
//                                                 className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
//                                             />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="Rhythm"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel className="text-[#242E2F] font-semibold">
//                                             Rhythm
//                                         </FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 placeholder="Rhythm"
//                                                 {...field}
//                                                 className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
//                                             />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="SportsLevel"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel className="text-[#242E2F] font-semibold">
//                                             Sport Level
//                                         </FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 placeholder="Sport Level"
//                                                 {...field}
//                                                 className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 placeholder:text-[#221E33]"
//                                             />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                         </div>
//                     </div>
//                 </form>
//             </Form>
//         </div>
//     )
// }

// export default Tripdetail




const TripDetail = () => {
    const { control } = useFormContext<TripFormType>();

    return (
        <>
            <div className="bg-white px-6 py-6">
                <span className="font-semibold text-[20px]">Trip Details</span>
                <div className="mt-10">
                    <div className="grid md:grid-cols-1 gap-4 pb-6">
                        <FormField
                            control={control}
                            name="LongDescription"
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
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 pb-6 mt-4">
                        <FormField
                            control={control}
                            name="GroupSize"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#242E2F] font-semibold">
                                        Group Size
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Group Size"
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
                            name="rhythm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#242E2F] font-semibold">
                                        Rhythm
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Rhythm"
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
                            name="SportsLevel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#242E2F] font-semibold">
                                        Sport Level
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Sport Level"
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
            </div>
        </>
    );
};

export default TripDetail