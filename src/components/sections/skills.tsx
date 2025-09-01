'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { skills, skillsChartConfig } from '@/lib/data';
import { BrainCircuit } from 'lucide-react';

export function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-headline text-3xl font-bold md:text-4xl">
          Technical Skills
        </h2>
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <BrainCircuit className="text-primary" />
              Skills Proficiency
            </CardTitle>
            <CardDescription>
              A visual representation of my proficiency in various data science
              technologies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={skillsChartConfig} className="h-[400px] w-full">
              <ResponsiveContainer>
                <BarChart data={skills} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    width={100}
                  />
                  <XAxis dataKey="proficiency" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Bar
                    dataKey="proficiency"
                    radius={5}
                    background={{ fill: 'hsl(var(--muted))', radius: 5 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
