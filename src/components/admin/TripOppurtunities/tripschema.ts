// import { z } from "zod";

// export const tripSchema = z.object({
//   // Step 1 – Basic Info
//   type: z.string().min(1, "Trip type is required"),
//   title: z.string().min(3, "Trip title must be at least 3 characters"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
//   coverImage: z.any().optional(),
//   location: z.string().min(1, "Location is required"),
//   mapCoordinates: z.string().optional(),
//   startDate: z.date().refine(
//     (date) => date instanceof Date,
//     "Start date is required"
//   ),
//   endDate: z.date().refine(
//     (date) => date instanceof Date,
//     "End date is required"
//   ),
//   duration: z.string().optional(),

//   // Step 2 – Trip Details
//   LongDescription: z.string().min(20, "Long description must be at least 20 characters"),
//   GroupSize: z.string().min(1, "Group size is required"),
//   rhythm: z.string().min(1, "Rhythm is required"),
//   SportsLevel: z.string().min(1, "Sports level is required"),

//   // Step 3 – Included
//   included: z.array(z.string()).min(1, "Select at least one included item"),
//   notIncluded: z.array(z.string()).min(1, "Select at least one not-included item"),

//   // Step 4 – Coordinator
//   CoordinatorName: z.string().min(1, "Coordinator name is required"),
//   // TEMP: Coordinator role field hidden – validation commented out
//   // CoordinatorRole: z.string().min(1, "Coordinator role is required"),
//   CoordinatorRole: z.string().optional(),
//   CoordinatorBio: z.string().min(1, "Coordinator bio is required"),
//   CoordinatorInstagram: z.string().optional(),
//   CoordinatorLinkedin: z.string().optional(),
//   CoordinatorPhoto: z.any().nullable().refine(
//     (file) => file !== null && file !== undefined,
//     "Coordinator photo is required"
//   ),

//   // Step 5 – Media & Price
//   PromotionalVideo: z.any().optional(),
//   GalleryImages: z.array(z.any()).min(1, "Upload at least 1 gallery image"),
//   BestPrice: z.string().min(1, "Best price message is required"),
//   FinalPrice: z.string().min(1, "Final price is required"),
// });

// export type TripFormType = z.infer<typeof tripSchema>;

import { z } from "zod";

// Schema for individual day in the itinerary
export const dayItinerarySchema = z.object({
  day: z.number().min(1, "Day number is required"),
  description: z
    .string()
    .max(2000, "Description must be less than 2000 characters")
    .optional(),
  image: z.any().nullable().optional(), // File object for upload
  imagePreview: z.string().optional(), // For UI preview
});

export type DayItineraryType = z.infer<typeof dayItinerarySchema>;

export const tripSchema = z
  .object({
    // Step 1 – Basic Info
    categoryId: z.string().min(1, "Category is required"),
    // Days itinerary - array of days with description and image (shown when trip type is selected)
    daysItinerary: z.array(dayItinerarySchema).optional(),
    title: z.string().min(3, "Trip title must be at least 3 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    coverImage: z.any().optional(),
    location: z.string().min(1, "Location is required"),
    locationId: z.string().min(1, "Location is required"), // ADD THIS
    mapCoordinates: z.string().optional(),
    startDate: z
      .date()
      .refine((date) => date instanceof Date, "Start date is required"),
    endDate: z
      .date()
      .refine((date) => date instanceof Date, "End date is required"),
    duration: z.string().optional(),

    // Step 2 – Trip Details
    LongDescription: z
      .string()
      .min(20, "Long description must be at least 20 characters"),
    GroupSize: z.string().min(1, "Group size is required"),
    rhythm: z.string().min(1, "Rhythm is required"),
    SportsLevel: z.string().min(1, "Sports level is required"),

    // Step 3 – Included
    included: z.array(z.string()).min(1, "Select at least one included item"),
    notIncluded: z
      .array(z.string())
      .min(1, "Select at least one not-included item"),

    // Step 4 – Coordinator
    CoordinatorName: z.string().min(1, "Coordinator name is required"),
    CoordinatorRole: z.string().optional(),
    CoordinatorBio: z.string().min(1, "Coordinator bio is required"),
    CoordinatorInstagram: z.string().optional(),
    CoordinatorLinkedin: z.string().optional(),
    CoordinatorPhoto: z
      .any()
      .nullable()
      .refine(
        (file) => file !== null && file !== undefined,
        "Coordinator photo is required"
      ),

    // Step 5 – Media & Price
    PromotionalVideo: z.any().optional(),
    GalleryImages: z.array(z.any()).min(1, "Upload at least 1 gallery image"),
    BestPrice: z.string().min(1, "Best price message is required"),
    FinalPrice: z.string().min(1, "Final price is required"),
  })
  .refine(
    (data) => {
      // Ensure location and locationId are both present if one is
      return (
        !(data.location && !data.locationId) &&
        !(data.locationId && !data.location)
      );
    },
    {
      message: "Both location name and ID must be provided",
      path: ["locationId"],
    }
  );

export type TripFormType = z.infer<typeof tripSchema>;
