import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { UseCreateLocation } from "@/hooks/UseCreateLocationhook";
import { UseGetLocations } from "@/hooks/UseGetLocationhook";
import { UseUpdateLocation } from "@/hooks/UseUpdateLocationhook";
import { UseDeleteLocation } from "@/hooks/UseDeleteLocationhook";

import { LoaderIcon, Pencil, Trash2,  Plus } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Location name is required"),
});

const Location = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // 1. Get the cleaned array from the hook
  const { data: locations = [], isLoading: isFetching} = UseGetLocations();
  
  const createMutation = UseCreateLocation();
  const updateMutation = UseUpdateLocation();
  const deleteMutation = UseDeleteLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const onEdit = (location: any) => {
    setEditingId(location.id); // Using 'id' as seen in your console
    form.setValue("name", location.name);
    setShowForm(true);
  };

  const onCancel = () => {
    setShowForm(false);
    setEditingId(null);
    form.reset();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, data: values });
        toast.success("Updated!");
      } else {
        await createMutation.mutateAsync(values);
        toast.success("Added!");
      }
      onCancel();
    } catch (error: any) {
      toast.error("Operation failed");
    }
  };

  const onDelete = async (id: string) => {
    if (!window.confirm("Delete this?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Locations</h2>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="bg-blue-600">
            <Plus className="mr-2" size={18} /> Add New
          </Button>
        )}
      </div>

      {/* FORM */}
      {showForm && (
        <div className="mb-8 p-6 bg-white border rounded-xl shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Name</FormLabel>
                    <FormControl><Input {...field} placeholder="Enter location..." /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingId ? "Update" : "Save"}
                </Button>
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {/* LIST */}
      <div className="space-y-3">
        {isFetching ? (
          <div className="flex justify-center py-10"><LoaderIcon className="animate-spin" /></div>
        ) : locations.length === 0 ? (
          <div className="text-center py-10 text-gray-400 border-2 border-dashed rounded-lg">
            No locations found in the database.
          </div>
        ) : (
          locations.map((loc: any) => (
            <div key={loc.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
              <span className="font-medium text-gray-700">{loc.name}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(loc)} className="text-blue-600">
                  <Pencil size={14} className="mr-1" /> Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(loc.id)} className="text-red-600">
                  <Trash2 size={14} className="mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Location;