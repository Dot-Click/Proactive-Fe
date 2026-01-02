import { z } from "zod";

export const tripSchema = z.object({
  // Step 1 – Basic Info
  type: z.string().min(1, "Trip type is required"),
  title: z.string().min(3, "Trip title is required"),
  description: z.string().min(10, "Description min 10 characters"),
  coverImage: z.any().optional(),
  location: z.string().min(1, "Location is required"),
  mapCoordinates: z.string().optional(),
  startDate: z.date({
    message: "Select Start Date",
  }),
  endDate: z.date({
    message: "Select End Date",
  }),
  duration: z.string().optional(),

  // Step 2 – Trip Details
  LongDescription: z.string().min(20, "Long Description min 20 characters"),
  GroupSize: z.string().min(1),
  rhythm: z.string(),
  SportsLevel: z.string(),

  // Step 3 – Included
  included: z.array(z.string()).min(1, "Select at least one item"),
  notIncluded: z.array(z.string()),

  // Step 4 – Coordinator
  CoordinatorName: z.string(),
  CoordinatorRole: z.string(),
  CoordinatorBio: z.string(),
  CoordinatorInstagram: z.string().optional(),
  CoordinatorLinkedin: z.string().optional(),
  CoordinatorPhoto: z.any().nullable(),

  // Step 5 – Media & Price
  PromotionalVideo: z.any().optional(),
  GalleryImages: z.array(z.any()).min(1),
  BestPrice: z.string().min(1, "Best Price is required"),
  FinalPrice: z.string().min(1, "Final Price is required"),
});

export type TripFormType = z.infer<typeof tripSchema>;
