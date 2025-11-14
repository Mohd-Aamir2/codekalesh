
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ClipboardPlus, Loader2, Lightbulb, Activity, FlaskConical } from 'lucide-react';
import { analyzeHealthReport } from '@/ai/flows/analyze-health-report';
import type { AnalyzeHealthReportOutput } from '@/ai/flows/analyze-health-report';
import { useToast } from '@/hooks/use-toast';

export default function HealthReportAnalysisPage() {
  const [reportText, setReportText] = useState('');
  const [analysis, setAnalysis] = useState<AnalyzeHealthReportOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalysis = async () => {
    if (!reportText.trim()) {
      toast({
        variant: 'destructive',
        title: 'Report is empty',
        description: 'Please paste the text from your health report.',
      });
      return;
    }
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await analyzeHealthReport({ reportText });
      setAnalysis(result);
    } catch (error) {
      console.error('Failed to get analysis:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description:
          'An error occurred while analyzing the report. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <ClipboardPlus className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold font-headline">
            Health Report Analysis
          </h1>
          <p className="text-muted-foreground">
            Get AI-powered insights from your health reports.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit Your Report</CardTitle>
          <CardDescription>
            Paste the text content from your health report into the text area
            below and click &quot;Analyze Report&quot; to get AI-driven insights.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your health report text here..."
            className="h-48"
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            disabled={isLoading}
          />
          <Button onClick={handleAnalysis} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Analyzing...' : 'Analyze Report'}
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Analysis Results</CardTitle>
            <CardDescription>
              Here is the AI-generated analysis of your report. This is not
              medical advice. Consult a healthcare professional.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Summary
              </h3>
              <p className="text-muted-foreground bg-secondary p-4 rounded-md">{analysis.summary}</p>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
                <FlaskConical className="h-5 w-5 text-primary" />
                Key Findings
              </h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {analysis.keyFindings.map((finding, index) => (
                  <li key={index}>{finding}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
                <Activity className="h-5 w-5 text-primary" />
                Recommendations
              </h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
