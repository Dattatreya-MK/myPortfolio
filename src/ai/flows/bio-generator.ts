// BioGenerator flow generates different versions of a personal bio with varying tones and styles using AI.
// - generateBio - A function that handles the bio generation process.
// - BioGeneratorInput - The input type for the generateBio function.
// - BioGeneratorOutput - The return type for the generateBio function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BioGeneratorInputSchema = z.object({
  name: z.string().describe('The name of the person.'),
  currentRole: z.string().describe('The current role of the person.'),
  background: z.string().describe('Background of the person in detail.'),
  desiredTone: z.string().describe('The desired tone of the bio (e.g., formal, casual, enthusiastic).'),
  desiredStyle: z.string().describe('The desired style of the bio (e.g., concise, detailed, humorous).'),
});
export type BioGeneratorInput = z.infer<typeof BioGeneratorInputSchema>;

const BioGeneratorOutputSchema = z.object({
  bio: z.string().describe('The generated personal bio.'),
});
export type BioGeneratorOutput = z.infer<typeof BioGeneratorOutputSchema>;

export async function generateBio(input: BioGeneratorInput): Promise<BioGeneratorOutput> {
  return bioGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'bioGeneratorPrompt',
  input: {schema: BioGeneratorInputSchema},
  output: {schema: BioGeneratorOutputSchema},
  prompt: `You are an expert bio writer specializing in creating personal bios for professionals.

  Based on the information provided, generate a personal bio with the desired tone and style.

  Name: {{{name}}}
  Current Role: {{{currentRole}}}
  Background: {{{background}}}
  Desired Tone: {{{desiredTone}}}
  Desired Style: {{{desiredStyle}}}

  Generated Bio:`,
});

const bioGeneratorFlow = ai.defineFlow(
  {
    name: 'bioGeneratorFlow',
    inputSchema: BioGeneratorInputSchema,
    outputSchema: BioGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
