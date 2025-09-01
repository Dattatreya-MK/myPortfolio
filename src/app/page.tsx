import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Projects } from '@/components/sections/projects';
import { Publications } from '@/components/sections/publications';
import { Blog } from '@/components/sections/blog';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Publications />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
