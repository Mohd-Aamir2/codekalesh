import {
  AlertCircle,
  BarChart,
  ShieldAlert,
  Thermometer,
  TrendingUp,
  Users,
} from 'lucide-react';
import type { Alert, StatCard, TrendData, DiseaseReportData } from './types';

export const STAT_CARDS: StatCard[] = [
  {
    id: 'total-cases',
    title: 'Total Cases',
    value: '12,402',
    change: '+12.5%',
    changeType: 'increase',
    icon: BarChart,
  },
  {
    id: 'active-alerts',
    title: 'Active Alerts',
    value: '8',
    change: '+2',
    changeType: 'increase',
    icon: ShieldAlert,
  },
  {
    id: 'high-risk-regions',
    title: 'High-Risk Regions',
    value: '3',
    change: '-1',
    changeType: 'decrease',
    icon: AlertCircle,
  },
  {
    id: 'avg-temperature',
    title: 'Avg. Temp',
    value: '28.5°C',
    change: '+1.2°C',
    changeType: 'increase',
    icon: Thermometer,
  },
];

export const RECENT_ALERTS: Alert[] = [
  {
    id: '1',
    location: 'West Suburb',
    disease: 'Influenza Type B',
    severity: 'High',
    date: '2024-07-20',
  },
  {
    id: '2',
    location: 'North District',
    disease: 'Dengue Fever',
    severity: 'Medium',
    date: '2024-07-19',
  },
  {
    id: '3',
    location: 'East Bay',
    disease: 'COVID-19 Variant',
    severity: 'High',
    date: '2024-07-19',
  },
  {
    id: '4',
    location: 'Central City',
    disease: 'Norovirus',
    severity: 'Low',
    date: '2024-07-18',
  },
  {
    id: '5',
    location: 'South Valley',
    disease: 'Influenza Type A',
    severity: 'Medium',
    date: '2024-07-17',
  },
];

export const TREND_DATA: TrendData[] = [
  { date: 'Jul 14', 'New Cases': 230 },
  { date: 'Jul 15', 'New Cases': 250 },
  { date: 'Jul 16', 'New Cases': 275 },
  { date: 'Jul 17', 'New Cases': 260 },
  { date: 'Jul 18', 'New Cases': 310 },
  { date: 'Jul 19', 'New Cases': 330 },
  { date: 'Jul 20', 'New Cases': 350 },
];

export const DISEASE_REPORTS_DATA: DiseaseReportData[] = [
  { name: 'Influenza Type B', value: 400, fill: 'hsl(var(--chart-1))' },
  { name: 'Dengue Fever', value: 300, fill: 'hsl(var(--chart-2))' },
  { name: 'COVID-19 Variant', value: 300, fill: 'hsl(var(--chart-3))' },
  { name: 'Norovirus', value: 200, fill: 'hsl(var(--chart-4))' },
];

export const ALERTS_BY_SEVERITY_DATA = [
  {
    name: 'Low',
    count: 15,
    fill: 'var(--color-low)',
  },
  {
    name: 'Medium',
    count: 25,
    fill: 'var(--color-medium)',
  },
  {
    name: 'High',
    count: 10,
    fill: 'var(--color-high)',
  },
];
