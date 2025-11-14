
'use client';
import { Pie, PieChart, ResponsiveContainer, Cell } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ALERTS_BY_SEVERITY_DATA } from '@/lib/data';

const chartConfig = {
  alerts: {
    label: 'Alerts',
  },
  low: {
    label: 'Low',
    color: 'hsl(var(--chart-1))',
  },
  medium: {
    label: 'Medium',
    color: 'hsl(var(--chart-2))',
  },
  high: {
    label: 'High',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function AlertsBySeverityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Alerts by Severity</CardTitle>
        <CardDescription>
          A breakdown of alerts by their severity level.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[300px]"
        >
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={ALERTS_BY_SEVERITY_DATA}
                dataKey="count"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                {ALERTS_BY_SEVERITY_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
