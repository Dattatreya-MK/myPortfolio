'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { generateBio } from '@/ai/flows/bio-generator';
import type { BioGeneratorOutput } from '@/ai/flows/bio-generator';
import { Wand2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  currentRole: z.string().min(2, 'Current role is required.'),
  background: z.string().min(10, 'Background needs more detail.'),
  desiredTone: z.string().min(2, 'Desired tone is required.'),
  desiredStyle: z.string().min(2, 'Desired style is required.'),
});

type FormValues = z.infer<typeof formSchema>;

export function About() {
  const [generatedBio, setGeneratedBio] = useState<BioGeneratorOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'Alex Doe',
      currentRole: 'Data Science Student',
      background:
        'Studying Computer Science with a focus on Data Science and Machine Learning. Completed several projects on sentiment analysis and time series forecasting. Proficient in Python, R, and SQL.',
      desiredTone: 'Professional yet approachable',
      desiredStyle: 'Concise and impactful',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setGeneratedBio(null);
    try {
      const result = await generateBio(values);
      setGeneratedBio(result);
    } catch (error) {
      console.error('Error generating bio:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate bio. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="about" className="bg-card py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-headline text-3xl font-bold md:text-4xl">
          About Me & AI Bio Generator
        </h2>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
             <Image
              src="https://picsum.photos/150/150"
              alt="Alex Doe"
              width={150}
              height={150}
              className="mb-6 rounded-full"
              data-ai-hint="person portrait"
            />
            <p className="mb-4 text-lg text-foreground/80">
              I am a driven and curious data science student with a knack for
              uncovering hidden patterns in data. My journey in tech is fueled by
              a passion for machine learning and a desire to build intelligent
              systems that solve real-world problems.
            </p>
            <p className="text-lg text-foreground/80">
              Below, you can use an AI-powered tool to generate different versions
              of my bio based on various tones and styles. Give it a try!
            </p>
          </div>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Generate a New Bio</CardTitle>
              <CardDescription>
                Customize the fields and let AI create a new bio.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="background"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Background</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="desiredTone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tone</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Formal" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="desiredStyle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Style</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Concise" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Hidden fields for name and current role */}
                  <FormField control={form.control} name="name" render={({ field }) => <Input type="hidden" {...field} />} />
                  <FormField control={form.control} name="currentRole" render={({ field }) => <Input type="hidden" {...field} />} />
                  
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Wand2 />
                    )}
                    Generate Bio
                  </Button>
                </form>
              </Form>
              {generatedBio && (
                <div className="mt-6 rounded-lg border bg-muted/50 p-4">
                  <h4 className="mb-2 font-headline font-semibold">
                    Generated Bio:
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {generatedBio.bio}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
