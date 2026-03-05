import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import React from "react";
import { Button } from "@/components/ui/button";
import { useFormContext, useFieldArray } from "react-hook-form";
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
    const highlightsArray = useFieldArray({ control, name: "highlights" as any });
    const moodArray = useFieldArray({ control, name: "mood" as any });
    const thingsArray = useFieldArray({ control, name: "thingsToKnow" as any });

    // prepopulate mood with default categories on mount if empty
    React.useEffect(() => {
        // Only populate defaults if the mood array is completely empty
        if (moodArray.fields.length === 0) {
            const defaultLabels = [
                "Fiesta y Nightlife",
                "Relax",
                "Naturaleza y aventura",
                "Ciudad y culturas",
                "Monumentos e historia",
            ];
            defaultLabels.forEach((label) => {
                moodArray.append({ label, value: 0 });
            });
            console.log("Populated mood array with default values");
        } else {
            console.log("Mood array already populated with values:", moodArray.fields);
        }
    }, [moodArray.fields.length]);

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

            {/* Highlights Section */}
            <div className="bg-white px-6 py-6 mt-6">
                <span className="font-semibold text-[18px]">Highlights</span>
                <div className="space-y-4 mt-4">
                    {highlightsArray.fields.map((field, idx) => (
                        <div key={field.id} className="flex items-center gap-2">
                            <FormField
                                control={control}
                                name={`highlights.${idx}` as any}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Highlight text"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => highlightsArray.remove(idx)}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        onClick={() => highlightsArray.append("")}
                    >
                        Add Highlight
                    </Button>
                </div>
            </div>

            {/* Mood / Suitability Section */}
            <div className="bg-white px-6 py-6 mt-6">
                <span className="font-semibold text-[18px]">
                    Trip Mood / Suitability
                </span>
                <div className="space-y-4 mt-4">
                    {moodArray.fields.map((field, idx) => (
                        <div
                            key={field.id}
                            className="grid grid-cols-3 gap-4 items-center"
                        >
                            <FormField
                                control={control}
                                name={`mood.${idx}.label` as any}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Label"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name={`mood.${idx}.value` as any}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={0}
                                                max={5}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => moodArray.remove(idx)}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        onClick={() => moodArray.append({ label: "", value: 0 })}
                    >
                        Add Item
                    </Button>
                </div>
            </div>

            {/* Common Fund Section */}
            <div className="bg-white px-6 py-6 mt-6">
                <span className="font-semibold text-[18px]">
                    Common Fund Info
                </span>
                <div className="mt-4 space-y-4">
                    <FormField
                        control={control}
                        name="commonFund"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fund Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Describe common fund..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="commonFundCount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Participants count for button
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        placeholder="e.g. 4"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            {/* Things To Know Section */}
            <div className="bg-white px-6 py-6 mt-6">
                <span className="font-semibold text-[18px]">
                    Things To Know
                </span>
                <div className="space-y-6 mt-4">
                    {thingsArray.fields.map((field, idx) => (
                        <div key={field.id} className="space-y-2">
                            <FormField
                                control={control}
                                name={`thingsToKnow.${idx}.title` as any}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Item title"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name={`thingsToKnow.${idx}.description` as any}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Description"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => thingsArray.remove(idx)}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        onClick={() =>
                            thingsArray.append({ title: "", description: "" })
                        }
                    >
                        Add Item
                    </Button>
                </div>
            </div>
        </>
    );
};

export default TripDetail