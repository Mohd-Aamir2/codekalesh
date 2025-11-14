import type { LucideIcon } from 'lucide-react';
import { z } from 'zod';

export type StatCard = {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: LucideIcon;
};

export type Alert = {
  id: string;
  location: string;
  disease: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  date: string;
};

export type TrendData = {
  date: string;
  'New Cases': number;
};

export type DiseaseReportData = {
  name: string;
  value: number;
  fill: string;
};

export const SendEmergencyAlertInputSchema = z.object({
  message: z.string().describe('The content of the alert message to be sent.'),
  type: z.enum(['email', 'sms']).describe('The channel to send the alert through.'),
});
export type SendEmergencyAlertInput = z.infer<typeof SendEmergencyAlertInputSchema>;

export const SendEmergencyAlertOutputSchema = z.object({
  success: z.boolean().describe('Indicates whether the alert was sent successfully.'),
  confirmation: z.string().describe('A confirmation message about the result of the operation.'),
});
export type SendEmergencyAlertOutput = z.infer<typeof SendEmergencyAlertOutputSchema>;
