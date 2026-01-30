import { z } from "zod";

// Update schema - makes file fields optional since they may already exist
export const updateTripSchema = z.object({
  // Step 1 – Basic Info
  type: z.string().min(1, "Trip type is required").optional(),
  title: z.string().min(3, "Trip title must be at least 3 characters").optional(),
  description: z.string().min(10, "Description must be at least 10 characters").optional(),
  coverImage: z.any().optional(),
  location: z.string().min(1, "Location is required").optional(),
  mapCoordinates: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  duration: z.string().optional(),

  // Step 2 – Trip Details
  LongDescription: z.string().min(20, "Long description must be at least 20 characters").optional(),
  GroupSize: z.string().min(1, "Group size is required").optional(),
  rhythm: z.string().min(1, "Rhythm is required").optional(),
  SportsLevel: z.string().min(1, "Sports level is required").optional(),

  // Step 3 – Included
  included: z.array(z.string()).optional(),
  notIncluded: z.array(z.string()).optional(),

  // Step 4 – Coordinator
  CoordinatorName: z.string().min(1, "Coordinator name is required").optional(),
  CoordinatorRole: z.string().min(1, "Coordinator role is required").optional(),
  CoordinatorBio: z.string().min(1, "Coordinator bio is required").optional(),
  CoordinatorInstagram: z.string().optional(),
  CoordinatorLinkedin: z.string().optional(),
  CoordinatorPhoto: z.any().nullable().optional(),

  // Step 5 – Media & Price
  PromotionalVideo: z.any().optional(),
  GalleryImages: z.array(z.any()).optional(),
  BestPrice: z.string().min(1, "Best price message is required").optional(),
  FinalPrice: z.string().min(1, "Final price is required").optional(),
});

export type UpdateTripFormType = z.infer<typeof updateTripSchema>;
