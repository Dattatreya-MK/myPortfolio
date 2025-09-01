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
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { integratePublications } from '@/ai/flows/publication-integrator';
import type { IntegratePublicationsOutput } from '@/ai/flows/publication-integrator';
import { Loader2, Search, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  topic: z
    .string()
    .min(2, 'Topic must be at least 2 characters.')
    .default('Deep Learning in Healthcare'),
});

type FormValues = z.infer<typeof formSchema>;

export function Publications() {
  const [publications, setPublications] =
    useState<IntegratePublicationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: 'Deep Learning in Healthcare',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setPublications(null);
    try {
      const result = await integratePublications({
        topic: values.topic,
        numPublications: 5,
      });
      setPublications(result);
    } catch (error) {
      console.error('Error integrating publications:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch publications. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="publications" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-headline text-3xl font-bold md:text-4xl">
          AI-Powered Publication Finder
        </h2>
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle>Find Data Science Publications</CardTitle>
            <CardDescription>
              Enter a topic to find related publications. An AI tool will filter
              for relevance to data science.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mb-8 flex flex-col gap-4 sm:flex-row"
              >
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel className="sr-only">Topic</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter a data science topic..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : <Search />}
                  Search
                </Button>
              </form>
            </Form>

            {isLoading && (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse space-y-2 rounded-md bg-muted/50 p-4">
                    <div className="h-4 w-3/4 rounded bg-muted"></div>
                    <div className="h-3 w-1/2 rounded bg-muted"></div>
                  </div>
                ))}
              </div>
            )}

            {publications && (
              <div>
                <h3 className="mb-4 font-headline text-lg font-semibold">
                  Found {publications.publications.length} Relevant
                  Publications:
                </h3>
                <ul className="space-y-4">
                  {publications.publications.map((pub, index) => (
                    <li key={index} className="rounded-md border p-4">
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <h4 className="font-semibold text-primary group-hover:underline">
                          {pub.title}{' '}
                          <ExternalLink className="inline-block h-4 w-4 opacity-50 transition-opacity group-hover:opacity-100" />
                        </h4>
                      </a>
                      <p className="text-sm text-muted-foreground">
                        {pub.authors}
                      </p>
                      <p className="mt-2 text-sm">{pub.summary}</p>
                    </li>
                  ))}
                  {publications.publications.length === 0 && (
                     <p className="text-center text-muted-foreground">No data science related publications found for this topic.</p>
                  )}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
