'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, Menu, X, Database } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#publications', label: 'Publications' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = ({
    className,
    onLinkClick,
  }: {
    className?: string;
    onLinkClick?: () => void;
  }) => (
    <nav className={cn('flex items-center gap-4', className)}>
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onLinkClick}
          className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border/40 bg-background/95 backdrop-blur-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">
            DataVerse Portfolio
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <NavLinks />
          <Button asChild size="sm">
            <a href="/resume.pdf" download>
              <Download />
              Resume
            </a>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex h-full flex-col p-6">
                <div className="mb-8 flex items-center justify-between">
                   <Link href="/" className="flex items-center gap-2" onClick={() => setIsSheetOpen(false)}>
                      <Database className="h-6 w-6 text-primary" />
                      <span className="font-headline text-xl font-bold">
                        DataVerse
                      </span>
                    </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                       <X/>
                     </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.label}>
                       <Link
                          href={item.href}
                          className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                       >
                          {item.label}
                       </Link>
                    </SheetClose>
                  ))}
                </nav>
                <Button asChild size="lg" className="mt-auto">
                   <a href="/resume.pdf" download>
                      <Download />
                      Download Resume
                   </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
