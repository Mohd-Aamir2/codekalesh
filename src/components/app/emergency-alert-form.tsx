'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { sendEmergencyAlert } from '@/ai/flows/send-emergency-alert';
import { Loader2 } from 'lucide-react';

export function EmergencyAlertForm() {
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState<'email' | 'sms'>('email');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Alert message cannot be empty.',
      });
      return;
    }
    setIsLoading(true);
    try {
      const result = await sendEmergencyAlert({ message, type: alertType });
      if (result.success) {
        toast({
          title: 'Alert Sent',
          description: result.confirmation,
        });
        setMessage('');
      } else {
        throw new Error('Failed to send alert.');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description:
          'Could not send the alert. Please try again later.',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compose Emergency Alert</CardTitle>
        <CardDescription>
          This message will be broadcast to all registered users. Use with
          caution.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full gap-2">
          <Label htmlFor="message">Alert Message</Label>
          <Textarea
            id="message"
            placeholder="Type your emergency message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label>Notification Channel</Label>
          <RadioGroup
            defaultValue="email"
            className="flex gap-4"
            value={alertType}
            onValueChange={(value: 'email' | 'sms') => setAlertType(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="r-email" />
              <Label htmlFor="r-email">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sms" id="r-sms" />
              <Label htmlFor="r-sms">SMS</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Broadcast Alert
        </Button>
      </CardFooter>
    </Card>
  );
}
