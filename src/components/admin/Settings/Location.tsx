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
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { UseCreateLocation } from "@/hooks/UseCreateLocationhook";
import { UseGetLocations, type Location } from "@/hooks/UseGetLocationhook";
import { UseUpdateLocation } from "@/hooks/UseUpdateLocationhook";
import { UseDeleteLocation } from "@/hooks/UseDeleteLocationhook";

import { LoaderIcon, Plus, Edit, Trash2, X } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Location name is required"),
});

const Locations = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  
  const createMutation = UseCreateLocation();
  const updateMutation = UseUpdateLocation();
  const deleteMutation = UseDeleteLocation();
  const { data: locations = [], isLoading, refetch } = UseGetLocations();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  // Reset form when editing location changes
  useEffect(() => {
    if (editingLocation) {
      form.reset({ name: editingLocation.name });
    } else {
      form.reset({ name: "" });
    }
  }, [editingLocation, form]);

  const onCancel = () => {
    setShowForm(false);
    setEditingLocation(null);
    form.reset();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (editingLocation) {
        // Update existing location
        await updateMutation.mutateAsync({
          id: editingLocation.id,
          data: { name: values.name }
        });
        toast.success("Location updated successfully!");
      } else {
        // Create new location
        await createMutation.mutateAsync(values);
        toast.success("Location added successfully!");
      }
      
      onCancel();
      refetch();
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error("A location with this name already exists");
      } else if (error.response?.status === 404) {
        toast.error("Location not found");
      } else if (error.response?.status === 400) {
        toast.error("Validation error. Please check the input.");
      } else {
        toast.error(editingLocation ? "Failed to update location" : "Failed to add location");
      }
    }
  };

  const handleDeleteLocation = async (location: Location) => {
    if (window.confirm(`Are you sure you want to delete "${location.name}"? This action cannot be undone.`)) {
      try {
        await deleteMutation.mutateAsync(location.id);
        toast.success("Location deleted successfully!");
        
        // If we're editing the deleted location, close the form
        if (editingLocation?.id === location.id) {
          onCancel();
        }
        
        refetch();
      } catch (error: any) {
        if (error.response?.status === 400) {
          toast.error("Cannot delete - one or more trips use this location");
        } else if (error.response?.status === 404) {
          toast.error("Location not found");
        } else {
          toast.error("Failed to delete location");
        }
      }
    }
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setShowForm(true);
  };

  const isPending = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Locations</h2>
          <p className="text-gray-600 text-sm mt-1">
            Manage locations used for trips and scheduling
          </p>
        </div>
        {!showForm && (
          <Button 
            onClick={() => setShowForm(true)} 
            className="bg-black hover:bg-black-100"
          >
            <Plus className="mr-2" size={18} /> Add New Location
          </Button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-8 p-6 bg-white border rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              {editingLocation ? "Edit Location" : "Add New Location"}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              disabled={isPending}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Enter location name..." 
                        disabled={isPending}
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="min-w-24"
                >
                  {isPending ? (
                    <>
                      <LoaderIcon className="mr-2 animate-spin" size={16} />
                      {editingLocation ? "Updating..." : "Saving..."}
                    </>
                  ) : (
                    editingLocation ? "Update Location" : "Save Location"
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onCancel}
                  disabled={isPending}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {/* Loading State for GET */}
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <LoaderIcon className="animate-spin mr-2" />
          <span>Loading locations...</span>
        </div>
      )}

      {/* Locations List */}
      {!isLoading && (
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                All Locations ({locations.length})
              </h3>
              {locations.length > 0 && (
                <span className="text-sm text-gray-500">
                  Click edit to modify a location
                </span>
              )}
            </div>
          </div>
          
          {locations.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-gray-700 font-medium mb-1">No locations yet</h4>
              <p className="text-gray-500 text-sm mb-4">Add your first location to get started</p>
              <Button 
                onClick={() => setShowForm(true)} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="mr-2" size={16} /> Add First Location
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {locations.map((location: Location) => (
                <div 
                  key={location.id} 
                  className="p-4 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 truncate">
                        {location.name}
                        {editingLocation?.id === location.id && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Editing
                          </span>
                        )}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-sm text-gray-500">
                          Created: {new Date(location.createdAt).toLocaleDateString()}
                        </p>
                        <span className="text-gray-300">•</span>
                        <p className="text-sm text-gray-500">
                          Updated: {new Date(location.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditLocation(location)}
                        disabled={isPending}
                        className="hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteLocation(location)}
                        disabled={isPending}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                      >
                        {deleteMutation.isPending && deleteMutation.variables === location.id ? (
                          <LoaderIcon className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Global Loading Overlay for Mutations */}
      {(createMutation.isPending || updateMutation.isPending || deleteMutation.isPending) && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3">
            <LoaderIcon className="animate-spin" />
            <span>
              {createMutation.isPending && "Creating location..."}
              {updateMutation.isPending && "Updating location..."}
              {deleteMutation.isPending && "Deleting location..."}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Locations;