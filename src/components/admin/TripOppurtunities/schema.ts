import * as z from "zod";

export const coordinatorSchema = z.object({
  id: z.string(),
  role: z.string(),
  image: z.any().optional(),
  description: z.string(),
});

export const formSchema = z.object({
  Triptype: z.string().min(1),
  TripTitle: z.string().min(3),
  Description: z.string().min(10),
  Location: z.string(),
  mapCoordinates: z.string().optional(),

  StartDate: z.date(),
  EndDate: z.date(),
  Duration: z.string(),

  LongDescription: z.string(),
  GroupSize: z.number(),
  Rhythm: z.string(),
  SportsLevel: z.string(),

  included: z.array(z.string()),
  notIncluded: z.array(z.string()),

  coordinators: z.array(coordinatorSchema),

  PromotionalVideo: z.any().optional(),
  GalleryImages: z.array(z.any()),
  FinalPrice: z.string(),
});
