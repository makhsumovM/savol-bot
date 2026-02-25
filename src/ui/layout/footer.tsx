'use client'

import { siteConfig } from '@/lib/seo'
import { Button } from '@/ui/button/button'
import { Input } from '@/ui/input/input'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapIcon,
  Phone,
  Send,
  Youtube,
  Github,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import logo from '../../../public/icon.png'

const mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FooterLink {
  href: string
  label: string
}

interface ContactItem {
  href: string
  value: string
  icon: typeof Globe
  external?: boolean
}

const Footer = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')

  const year = new Date().getFullYear()

  const quickLinks: FooterLink[] = [
    { href: '/', label: t('header.home') },
    { href: '/marathon', label: t('header.marathon') },
    { href: '/random', label: t('header.random') },
    { href: '/leaderboard', label: t('header.leaderboard') },
    { href: '/login', label: t('header.login') },
  ]

  const contactItems: ContactItem[] = [
    {
      href: `tel:${siteConfig.contact.telephone.replace(/[^\d+]/g, '')}`,
      value: siteConfig.contact.telephone,
      icon: Phone,
    },
    {
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.location)}`,
      value: siteConfig.contact.location,
      icon: MapIcon,
      external: true,
    },
    {
      href: `mailto:${siteConfig.contact.email}`,
      value: siteConfig.contact.email,
      icon: Mail,
    },
  ]

  const socialLinks = [
    {
      href: siteConfig.social.youtube,
      label: t('siteFooter.social.youtube'),
      icon: Youtube,
    },
    {
      href: siteConfig.social.facebook,
      label: t('siteFooter.social.facebook'),
      icon: Facebook,
    },
    {
      href: siteConfig.social.telegram,
      label: t('siteFooter.social.telegram'),
      icon: Send,
    },
    {
      href: siteConfig.social.instagram,
      label: t('siteFooter.social.instagram'),
      icon: Instagram,
    },
  ].filter(({ href }) => Boolean(href))

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedEmail = email.trim()

    if (!mailPattern.test(normalizedEmail)) {
      toast.error(t('siteFooter.newsletter.invalidEmail'))
      return
    }

    toast.success(t('siteFooter.newsletter.success'))
    setEmail('')
  }

  return (
    <footer
      className="relative pt-20 pb-10 overflow-hidden border-t border-border/40"
      aria-label="Site Footer"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          { }
          <div className="lg:col-span-4 space-y-6" data-aos="fade-up" data-aos-delay="0">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                width={100}
                height={100}
                alt={`${siteConfig.name} logo`}
                className=" object-contain"
              />
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-md">
              {t('siteFooter.description')}
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background/50 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-lg hover:shadow-primary/5"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          { }
          <div className="lg:col-span-2 space-y-6" data-aos="fade-up" data-aos-delay="100">
            <h3 className="font-semibold text-foreground tracking-wide">
              {t('siteFooter.sections.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          { }
          <div className="lg:col-span-3 space-y-6" data-aos="fade-up" data-aos-delay="200">
            <h3 className="font-semibold text-foreground tracking-wide">
              {t('siteFooter.sections.contacts')}
            </h3>
            <ul className="space-y-4">
              {contactItems.map(({ href, value, icon: Icon, external }) => (
                <li key={value}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer noopener' : undefined}
                    className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-medium group-hover:underline decoration-primary/50 decoration-2 underline-offset-4">
                      {value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          { }
          <div className="lg:col-span-3 space-y-6" data-aos="fade-up" data-aos-delay="300">
            <h3 className="font-semibold text-foreground tracking-wide">
              {t('siteFooter.sections.newsletter')}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('siteFooter.newsletter.description')}
            </p>

            <form onSubmit={handleNewsletterSubmit} className="relative group">
              <div className="absolute -inset-0.5 rounded-xl bg-background/40 opacity-20 blur transition duration-500 group-hover:opacity-40" />
              <div className="relative flex">
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t('siteFooter.newsletter.placeholder')}
                  className="h-11 w-full rounded-xl border-border/50 bg-background/80 pr-12 text-sm placeholder:text-muted-foreground/60 focus-visible:ring-primary/30"
                  aria-label="Email for newsletter"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1 h-9 w-9 rounded-lg bg-primary hover:bg-primary/90 transition-all active:scale-95"
                  aria-label={t('siteFooter.newsletter.submitAria')}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        { }
        <div className="mt-16 pt-8 border-t border-border/40">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-xs text-muted-foreground font-medium">
            <p className="flex items-center gap-1.5">
              <span>
                © {year} {siteConfig.publisher}.
              </span>
              <span className="hidden sm:inline text-border/60">|</span>
              <span className="hidden sm:inline">
                {t('siteFooter.bottom.copyright', { year: '', publisher: '', creator: '' }).replace(
                  /^©\s*\d+\s*/,
                  '',
                )}
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                {t('siteFooter.bottom.sourceCode')}
              </a>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                {t('siteFooter.bottom.terms', 'Terms')}
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                {t('siteFooter.bottom.privacy', 'Privacy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
