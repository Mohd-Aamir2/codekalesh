'use server';
/**
 * @fileOverview An AI flow for analyzing user-provided health reports from text and/or images.
 *
 * - analyzeHealthReport - A function that analyzes the text and/or image of a health report.
 * - AnalyzeHealthReportInput - The input type for the analyzeHealthReport function.
 * - AnalyzeHealthReportOutput - The return type for the analyzeHealthReport function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeHealthReportInputSchema = z.object({
  reportText: z
    .string()
    .optional()
    .describe('The text content of the health report to be analyzed.'),
  reportImageDataUri: z
    .string()
    .optional()
    .describe(
      "An image of the health report, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeHealthReportInput = z.infer<
  typeof AnalyzeHealthReportInputSchema
>;

const AnalyzeHealthReportOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the health report.'),
  keyFindings: z
    .array(z.string())
    .describe('A list of the most important findings or data points from the report.'),
  recommendations: z
    .array(z.string())
    .describe('A list of actionable recommendations based on the report. These should be for lifestyle, diet, or follow-up questions for a doctor, not a medical diagnosis.'),
});
export type AnalyzeHealthReportOutput = z.infer<
  typeof AnalyzeHealthReportOutputSchema
>;

export async function analyzeHealthReport(
  input: AnalyzeHealthReportInput
): Promise<AnalyzeHealthReportOutput> {
  return analyzeHealthReportFlow(input);
}

const analyzeReportPrompt = ai.definePrompt({
  name: 'analyzeHealthReportPrompt',
  input: { schema: AnalyzeHealthReportInputSchema },
  output: { schema: AnalyzeHealthReportOutputSchema },
  prompt: `You are an expert medical analyst AI. Your task is to analyze the following health report provided as text and/or an image.
  Carefully review all available information and extract the most critical data.

  Health Report Text (if provided):
  {{{reportText}}}

  Health Report Image (if provided):
  {{#if reportImageDataUri}}
    {{media url=reportImageDataUri}}
  {{/if}}

  Your analysis should be structured into three parts:
  1. Summary: Provide a brief, easy-to-understand overview of the report's contents.
  2. Key Findings: List the most significant data points, results, and observations. Focus on anything that is outside of normal ranges or noteworthy.
  3. Recommendations: Based on the findings, suggest actionable next steps. IMPORTANT: You are NOT a doctor. Do not provide a diagnosis. Recommendations should focus on lifestyle changes (diet, exercise), questions to ask a doctor, or specific tests to follow up on. Frame your recommendations in a non-prescriptive way.

  Provide a thorough but clear analysis.
  `,
});

const analyzeHealthReportFlow = ai.defineFlow(
  {
    name: 'analyzeHealthReportFlow',
    inputSchema: AnalyzeHealthReportInputSchema,
    outputSchema: AnalyzeHealthReportOutputSchema,
  },
  async (input) => {
    if (!input.reportText?.trim() && !input.reportImageDataUri) {
      throw new Error('Health report text or image must be provided.');
    }
    const { output } = await analyzeReportPrompt(input);
    return output!;
  }
);
