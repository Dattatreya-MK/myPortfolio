// This is a server-side file, mark it with `'use server'`
'use server';

/**
 * @fileOverview Integrates publications from external sources like Google Scholar or Arxiv,
 * validates their relevance to data science using AI, and incorporates them into the portfolio.
 *
 * - integratePublications - A function that handles the integration of publications.
 * - IntegratePublicationsInput - The input type for the integratePublications function.
 * - IntegratePublicationsOutput - The return type for the integratePublications function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PublicationSchema = z.object({
  title: z.string().describe('The title of the publication.'),
  authors: z.string().describe('The authors of the publication.'),
  source: z.string().describe('The source of the publication (e.g., Google Scholar, Arxiv).'),
  url: z.string().url().describe('The URL of the publication.'),
  topic: z.string().optional().describe('The topic of the paper'),
  summary: z.string().optional().describe('Short summary of the paper'),
});

const IntegratePublicationsInputSchema = z.object({
  topic: z.string().describe('The topic to search for publications (e.g., \"Deep Learning in Healthcare\").'),
  numPublications: z.number().min(1).max(10).default(5).describe('The maximum number of publications to retrieve.'),
});
export type IntegratePublicationsInput = z.infer<typeof IntegratePublicationsInputSchema>;

const IntegratePublicationsOutputSchema = z.object({
  publications: z.array(PublicationSchema).describe('An array of validated publications related to data science.'),
});
export type IntegratePublicationsOutput = z.infer<typeof IntegratePublicationsOutputSchema>;

async function fetchPublications(topic: string, numPublications: number = 5): Promise<any[]> {
  // Placeholder implementation for fetching publications from Google Scholar or Arxiv.
  // In a real application, this would use the Google Scholar or Arxiv API to search for publications.
  // For demonstration purposes, return some mock data.
  console.log(`Fetching ${numPublications} publications related to ${topic}...`);

  // const arxiv = await import('arxiv');
  // return await arxiv.search({search: topic}, {limit: numPublications});

  return Array.from({length: numPublications}, (_, i) => ({
    title: `Mock Publication ${i + 1} on ${topic}`,
    authors: 'John Doe, Jane Smith',
    source: 'Mock Source',
    url: 'https://example.com/publication',
    topic,
    summary: 'This is a mock publication for demonstration purposes.',
  }));
}

const publicationValidatorTool = ai.defineTool({
  name: 'isDataScienceRelated',
  description: 'Checks if a publication is related to data science.  Useful for filtering publications before displaying them in a data science portfolio.',
  inputSchema: PublicationSchema,
  outputSchema: z.boolean(),
},
async (input) => {
  // Use AI to determine if the publication is related to data science.
  const {text} = await ai.generate({
    prompt: `Is the following publication related to data science? Answer yes or no.\nTitle: ${input.title}\nSummary: ${input.summary}`,
  });
  return text?.toLowerCase().includes('yes') ?? false;
});

const integratePublicationsPrompt = ai.definePrompt({
  name: 'integratePublicationsPrompt',
  input: {schema: IntegratePublicationsInputSchema},
  output: {schema: IntegratePublicationsOutputSchema},
  tools: [publicationValidatorTool],
  prompt: `You are an expert at identifying data science publications.

  You will receive a list of publications and must validate which ones are related to data science using the provided tool.

  Topic: {{{topic}}}

  Validate each publication using the 'isDataScienceRelated' tool, and only include publications that are validated as related to data science in the final output.
  Do not modify the publication object, only filter the publications that are not related to data science.
`,
});

const integratePublicationsFlow = ai.defineFlow(
  {
    name: 'integratePublicationsFlow',
    inputSchema: IntegratePublicationsInputSchema,
    outputSchema: IntegratePublicationsOutputSchema,
  },
  async input => {
    const publications = await fetchPublications(input.topic, input.numPublications);
    const validatedPublications: any[] = [];

    for (const publication of publications) {
      if (await publicationValidatorTool(publication)) {
        validatedPublications.push(publication);
      }
    }

    return {publications: validatedPublications};
  }
);

export async function integratePublications(input: IntegratePublicationsInput): Promise<IntegratePublicationsOutput> {
  return integratePublicationsFlow(input);
}
