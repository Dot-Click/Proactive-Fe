import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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

const Trips = () => {
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
        <div className="grid lg:grid-cols-2 grid-cosl-1 gap-3 md:min-h-[100vh]">
            <div className="rounded-[10px] mt-4 bg-white">

                <div className="bg-[#FAFAFA] rounded-t-[10px]">
                    <h1 className="text-[#221E33] font-bold text-[18px] sm:text-[20px] px-6 py-6">
                        Trip Categories
                    </h1>
                </div>

                <div className="border-b border-[#EDEDED]" />

                <div className="flex flex-col gap-4 px-5 py-4">

                    <div className="flex justify-between items-center bg-[#FAFAFE] px-5 py-3 rounded-[20px]">
                        <div className="flex flex-col">
                            <span className="text-[#221E33] font-bold">Wild Weekend</span>
                            <span className="text-[#727272] text-[12px]">Manual approval required</span>
                        </div>
                        <Switch />
                    </div>

                    <div className="flex justify-between items-center bg-[#FAFAFE] px-5 py-3 rounded-[20px]">
                        <div className="flex flex-col">
                            <span className="text-[#221E33] font-bold">Wild Trip</span>
                            <span className="text-[#727272] text-[12px]">Auto-approval enabled</span>
                        </div>
                        <Switch />
                    </div>
                    <div className="mt-2">
                        <Button className="rounded-full px-14 py-6 cursor-pointer">Add Category</Button>
                    </div>
                </div>
            </div>

            <div className="rounded-[10px] mt-4 bg-white">

                <div className="bg-[#FAFAFA] rounded-t-[10px]">
                    <h1 className="text-[#221E33] font-semibold text-[18px] sm:text-[20px] px-6 py-6">
                        Approval Settings
                    </h1>
                </div>

                <div className="border-b border-[#EDEDED]" />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="px-6 py-6 flex flex-col gap-5 flex-1">
                            <FormField
                                control={form.control}
                                name="Triptype"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#242E2F] font-semibold">
                                            Default Approval Flow
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                                                    <SelectValue placeholder="Select Approval" />
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
                                            Default Max Participants
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                                                    <SelectValue placeholder="Select Max Participants" />
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
                                            Default Min Parcipants
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                                                    <SelectValue placeholder="Select Min Parcipants" />
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
                        <div className="flex justify-end md:mt-36 px-6 py-6">
                        <Button className="rounded-full px-14 py-6 cursor-pointer">Save Changes</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Trips