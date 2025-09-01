import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-[calc(100dvh-5rem)] w-full items-center justify-center bg-background"
    >
      <div className="absolute inset-0 bg-grid-slate-200/[0.2] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
      <div className="container relative mx-auto px-4 text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
          Crafting Insights from Data
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl">
          Welcome to my portfolio. I am a passionate data science student
          dedicated to transforming complex data into meaningful stories and
          actionable solutions.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
