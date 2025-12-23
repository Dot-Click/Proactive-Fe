import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import ApprovalSetting from "./ApprovalSetting"
import { UseCreateCategory } from "@/hooks/UseCreateCategoryhook"

const formSchema = z
    .object({
        name: z.string().min(1, {
            message: "Add Category",
        }),
    })

const Trips = () => {
    const [showhide, SetShowHide] = useState(false)
    type FormSchemaType = z.infer<typeof formSchema>;
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            name: ""
        },
    });
    const CategoryMutation = UseCreateCategory()
    const onSubmit = async (val: z.infer<typeof formSchema>) => {
        const { name } = val
        try {
            await CategoryMutation.mutateAsync({
                name
            })
            form.reset()
            toast.success('Category Added Successfully')
        } catch (error: any) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message);
        }
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
                        <Switch className="w-12" />
                    </div>

                    <div className="flex justify-between items-center bg-[#FAFAFE] px-5 py-3 rounded-[20px]">
                        <div className="flex flex-col">
                            <span className="text-[#221E33] font-bold">Wild Trip</span>
                            <span className="text-[#727272] text-[12px]">Auto-approval enabled</span>
                        </div>
                        <Switch className="w-12" />
                    </div>
                    {
                        showhide ?
                            <div className="flex lg:flex-row flex-col gap-8">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormControl>
                                                        <Input {...field} type="text" placeholder="Add Trip" />
                                                    </FormControl>
                                                    <FormMessage className="mb-2" />
                                                </FormItem>
                                            )}
                                        />

                                        <Button className="cursor-pointer px-4 py-2">
                                        {
                                            CategoryMutation.isPending ? "...adding" : "Add"
                                        }
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                            : ''
                    }

                    <div className="mt-2" onClick={() => SetShowHide(prev => !prev)}>
                        <Button className="w-full rounded-full px-14 py-6 cursor-pointer">
                        Add Category
                        </Button>
                    </div>

                </div>
            </div>
            <ApprovalSetting />
        </div>
    )
}

export default Trips