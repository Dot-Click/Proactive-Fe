import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod"

const formSchema = z
    .object({
        Question: z.string().min(1, {
            message: "Question is required",
        }),
        Answer: z.string().min(1, {
            message: "Answer is required",
        }),
    })

const AddFAQ = () => {
    type FormSchemaType = z.infer<typeof formSchema>;
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            Question: "",
            Answer: "",
        },
    });

    const onSubmit = (val: z.infer<typeof formSchema>) => {
        console.log(val);
    };

    return (
        <div>
            <div className="rounded-[10px] mt-4 bg-white md:min-h-[100vh]">
                <div className="bg-[#FAFAFA] rounded-t-[10px]">
                    <h1 className="text-[#221E33] font-bold text-[18px] sm:text-[20px] px-6 py-6">
                        Add FAQ's
                    </h1>
                </div>

                <div className="border-b border-[#EDEDED]" />

                <div className="grid grid-rows-[1fr_auto] min-h-[90vh]">
                    <div className="p-5">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-6 w-full">
                                    <FormField
                                        control={form.control}
                                        name="Question"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#242E2F] font-semibold">
                                                    Question
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Question"
                                                        {...field}
                                                        className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 w-full"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="Answer"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#242E2F] font-semibold">
                                                    Answer
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Answer"
                                                        {...field}
                                                        className="bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6 w-full"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </form>
                        </Form>
                    </div>

                    <div className="flex justify-end p-5">
                        <Button
                            onClick={form.handleSubmit(onSubmit)}
                            className="rounded-full px-12 py-5 cursor-pointer"
                        >
                            Add 
                        </Button>
                    </div>

                </div>
            </div>
        </div>)
}

export default AddFAQ