import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FaqQuestion from "@/components/userSide/BecomeMember/FaqQuestion";
import { useCreateFaqs } from "@/hooks/UseCreateFaqshook";
import { useUpdateFaq } from "@/hooks/UseUpdateFAQhook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod"

const formSchema = z
    .object({
        question: z.string().min(1, {
            message: "Question is required",
        }),
        answers: z.string().min(1, {
            message: "Answer is required",
        }),
    })

const AddFAQ = () => {
    type FormSchemaType = z.infer<typeof formSchema>;
    const [editId, setEditId] = useState<string | null>(null);

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            question: "",
            answers: "",
        },
    });

    const CreateFaqsMutation = useCreateFaqs();
    const UpdateFaqMutation = useUpdateFaq();

    const onSubmit = async (val: z.infer<typeof formSchema>) => {
        const { question, answers } = val
        try {
            if (editId) {
                await UpdateFaqMutation.mutateAsync({
                    faqId: editId,
                    question,
                    answers
                });
                toast.success("FAQ updated successfully");
                setEditId(null);
            } else {
                await CreateFaqsMutation.mutateAsync({
                    question,
                    answers
                });
                toast.success("FAQ added successfully");
            }
            form.reset();
        } catch (err: any) {
            const message = err?.response?.data?.message || "Something went wrong";
            toast.error(message);
        }
    };

    const handleEdit = (faq: any) => {
        setEditId(faq.id);
        form.setValue("question", faq.question);
        form.setValue("answers", faq.answers);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditId(null);
        form.reset();
    };

    return (
        <div>
            <div className="rounded-[10px] mt-4 bg-white md:min-h-[100vh]">
                <div className="bg-[#FAFAFA] rounded-t-[10px] flex justify-between items-center pr-6">
                    <h1 className="text-[#221E33] font-bold text-[18px] sm:text-[20px] px-6 py-6">
                        {editId ? "Edit FAQ" : "Add FAQ's"}
                    </h1>
                    {editId && (
                        <Button 
                            variant="outline" 
                            onClick={handleCancel}
                            className="rounded-full h-10 border-red-200 text-red-600 hover:bg-red-50"
                        >
                            Cancel Edit
                        </Button>
                    )}
                </div>

                <div className="border-b border-[#EDEDED]" />

                <div className="grid grid-rows-[1fr_auto] min-h-[90vh]">
                    <div className="p-5">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-6 w-full">
                                    <FormField
                                        control={form.control}
                                        name="question"
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
                                        name="answers"
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
                    <FaqQuestion role={"admin"} onEdit={handleEdit} />

                    <div className="flex justify-end p-5">
                        <Button
                            onClick={form.handleSubmit(onSubmit)}
                            className={`rounded-full px-12 py-5 cursor-pointer ${editId ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                        >
                            {
                                editId 
                                    ? (UpdateFaqMutation.isPending ? "Updating..." : "Update")
                                    : (CreateFaqsMutation.isPending ? "Adding..." : "Add")
                            }
                        </Button>
                    </div>

                </div>
            </div>
        </div>)
}

export default AddFAQ