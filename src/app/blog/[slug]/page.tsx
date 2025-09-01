import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CalendarDays } from 'lucide-react';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <article className="container mx-auto max-w-3xl px-4 py-16">
          <header className="mb-8">
            <h1 className="mb-4 font-headline text-4xl font-bold leading-tight md:text-5xl">
              {post.title}
            </h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="mr-2 h-4 w-4" />
              <time dateTime={post.date}>{post.date}</time>
            </div>
          </header>
          <div className="relative mb-8 h-72 w-full sm:h-96">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="rounded-lg object-cover"
              priority
              data-ai-hint={post.imageHint}
            />
          </div>
          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
