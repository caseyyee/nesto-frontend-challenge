import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  family: z.enum(["VALUE_FLEX", "STANDARD"]),
  type: z.enum(["VARIABLE", "FIXED"]),
  term: z.enum([
    "1_YEAR",
    "2_YEAR",
    "3_YEAR",
    "4_YEAR",
    "5_YEAR",
    "6_YEAR",
    "7_YEAR",
    "10_YEAR",
  ]),
  insurable: z.boolean(),
  insurance: z.enum(["INSURED", "CONVENTIONAL"]),
  prepaymentOption: z.enum(["STANDARD", "ENHANCED", "HELOC"]),
  restrictionsOption: z.enum([
    "NO_RESTRICTIONS",
    "SOME_RESTRICTIONS",
    "MORE_RESTRICTIONS",
  ]),
  restrictions: z.string(),
  fixedPenaltySpread: z.string(),
  helocOption: z.enum(["HELOC_WITH", "HELOC_WITHOUT"]),
  helocDelta: z.number(),
  lenderName: z.string(),
  lenderType: z.string(),
  rateHold: z.enum(["30_DAYS", "45_DAYS", "60_DAYS", "90_DAYS", "120_DAYS"]),
  rate: z.number(),
  ratePrimeVariance: z.number(),
  bestRate: z.number(),
  created: z.string(),
  updated: z.string(),
});

export const ApplicantSchema = z.object({
  phone: z.string(),
  email: z.string(), // Allow empty strings for now since API returns empty
  firstName: z.string(),
  lastName: z.string(),
});

export const ApplicationSchema = z.object({
  id: z.string(),
  token: z.string().optional(), // Make token optional since API doesn't return it
  type: z.enum(["NEW", "RENEWAL", "REFINANCE"]),
  applicants: z.array(ApplicantSchema),
  productId: z.number().optional(),
  createdAt: z.string(),
});

export const CreateApplicationSchema = z.object({
  productId: z.number(),
});

export type Product = z.infer<typeof ProductSchema>;
export type Applicant = z.infer<typeof ApplicantSchema>;
export type Application = z.infer<typeof ApplicationSchema>;
export type CreateApplication = z.infer<typeof CreateApplicationSchema>;

// Array schemas for API responses
export const ProductsSchema = z.array(ProductSchema);
export const ApplicationsSchema = z.array(ApplicationSchema);
