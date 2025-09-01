import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/data';
import { ArrowRight, CalendarDays } from 'lucide-react';

export function Blog() {
  return (
    <section id="blog" className="bg-card py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-headline text-3xl font-bold md:text-4xl">
          From My Blog
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Card
              key={post.slug}
              className="flex flex-col overflow-hidden bg-background transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardHeader>
                <div className="relative mb-4 h-52 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    data-ai-hint={post.imageHint}
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <CardTitle className="pt-2 font-headline">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{post.excerpt}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="px-0">
                  <Link href={`/blog/${post.slug}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
