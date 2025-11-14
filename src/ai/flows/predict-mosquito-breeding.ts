// This file is an AI-powered mosquito breeding prediction flow that uses weather, waterlogging patterns, and historical data to identify high-risk areas for mosquito breeding and recommend preventive actions like fogging.

'use server';

/**
 * @fileOverview AI-powered mosquito breeding prediction flow.
 *
 * - predictMosquitoBreeding - A function that analyzes environmental data to predict mosquito breeding hotspots.
 * - PredictMosquitoBreedingInput - The input type for the predictMosquitoBreeding function.
 * - PredictMosquitoBreedingOutput - The return type for the predictMosquitoBreeding function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const PredictMosquitoBreedingInputSchema = z.object({
  weatherData: z
    .string()
    .describe(
      'Current and forecasted weather data, including temperature, humidity, and rainfall predictions.'
    ),
  satelliteImageryData: z
    .string()
    .describe(
      "A data URI of satellite imagery showing potential waterlogging areas. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  historicalCaseData: z
    .string()
    .describe(
      'Historical data of Dengue/Malaria cases in the area, preferably in CSV format with locations.'
    ),
});
export type PredictMosquitoBreedingInput = z.infer<
  typeof PredictMosquitoBreedingInputSchema
>;

const PredictMosquitoBreedingOutputSchema = z.object({
  predictedHotspots: z.array(
    z.object({
      location: z.string().describe('The specific location of the predicted hotspot (e.g., neighborhood, district).'),
      riskLevel: z.enum(['Low', 'Medium', 'High']).describe('The predicted risk level of mosquito breeding.'),
      reasoning: z.string().describe('The reasoning behind the risk level prediction.'),
    })
  ).describe('A list of predicted mosquito breeding hotspots.'),
  foggingRecommendations: z.array(
    z.string()
  ).describe('A list of specific locations recommended for immediate fogging to control mosquito populations.'),
  summary: z.string().describe('A concise summary of the findings, including the overall risk outlook.'),
});
export type PredictMosquitoBreedingOutput = z.infer<
  typeof PredictMosquitoBreedingOutputSchema
>;

export async function predictMosquitoBreeding(
  input: PredictMosquitoBreedingInput
): Promise<PredictMosquitoBreedingOutput> {
  return predictMosquitoBreedingFlow(input);
}

const mosquitoPredictionPrompt = ai.definePrompt({
  name: 'mosquitoPredictionPrompt',
  input: { schema: PredictMosquitoBreedingInputSchema },
  output: { schema: PredictMosquitoBreedingOutputSchema },
  prompt: `You are an expert epidemiologist and environmental scientist specializing in vector-borne diseases like Dengue and Malaria.
  Your task is to predict mosquito breeding hotspots based on the provided data.

  Analyze the following data:
  1.  **Weather Data**: {{{weatherData}}}
  2.  **Satellite Imagery for Waterlogging**: {{media url=satelliteImageryData}}
  3.  **Historical Case Data**: {{{historicalCaseData}}}

  Based on your analysis, you must:
  - Identify specific locations that are likely to become mosquito breeding hotspots.
  - Assign a risk level (Low, Medium, High) to each hotspot and provide a brief reasoning.
  - Recommend a list of the most critical locations that require immediate fogging.
  - Provide a concise summary of the overall situation and your predictions.
  `,
});

const predictMosquitoBreedingFlow = ai.defineFlow(
  {
    name: 'predictMosquitoBreedingFlow',
    inputSchema: PredictMosquitoBreedingInputSchema,
    outputSchema: PredictMosquitoBreedingOutputSchema,
  },
  async (input) => {
    const { output } = await mosquitoPredictionPrompt(input);
    return output!;
  }
);
