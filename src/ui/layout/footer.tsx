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
    <footer className="relative  py-4 overflow-hidden border-t border-border/30  ">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br " />
      <div className="pointer-events-none absolute -top-28 left-1/3 h-[360px] w-[360px] rounded-full bg-primary/25 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-28 right-1/4 h-80 w-[320px] rounded-full bg-primary-2/18 blur-[100px]" />

      <div className="relative  mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 md:pb-10 md:pt-12">
        <div className="grid items-start grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3.5">
          <div className="space-y-4 rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm sm:p-5">
            <div className="inline-flex items-center gap-3">
              <Image
                width={100}
                height={100}
                src={logo}
                alt={`${siteConfig.name} logo`}
                className="object-contain"
              />
            </div>
            <p className="max-w-sm text-[0.86rem] leading-7 text-foreground">
              {t('siteFooter.description')}
            </p>

            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/15 bg-foreground/7 text-foreground/40 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary/18 hover:text-foreground"
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-105" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm sm:p-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-foreground">
              {t('siteFooter.sections.quickLinks')}
            </h3>
            <nav className="space-y-2.5">
              {quickLinks.map(({ href, label }) => (
                <motion.div
                  key={href}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                >
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-[0.88rem] text-foreground transition-colors duration-300 hover:text-primary"
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          <div className="space-y-4 rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm sm:p-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-foreground">
              {t('siteFooter.sections.contacts')}
            </h3>
            <ul className="space-y-2.5">
              {contactItems.map(({ href, value, icon: Icon, external }) => (
                <li key={value}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer noopener' : undefined}
                    className="group flex items-center gap-2.5 rounded-xl border border-foreground/12 bg-foreground/6 p-2 transition-all duration-300 hover:border-primary/40 hover:bg-foreground/10"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/16 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="block text-[0.83rem] font-medium text-foreground/88">{value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm sm:p-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-foreground">
              {t('siteFooter.sections.newsletter')}
            </h3>
            <p className="max-w-sm text-[0.86rem] leading-7 text-foreground">
              {t('siteFooter.newsletter.description')}
            </p>

            <form onSubmit={handleNewsletterSubmit} className="group relative">
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t('siteFooter.newsletter.placeholder')}
                className="h-10 rounded-xl border-foreground/18 bg-background/75 pl-3.5 pr-12 text-[0.95rem] text-foreground placeholder:text-foreground/42 focus-visible:border-primary/55 focus-visible:ring-primary/30"
              />
              <Button
                type="submit"
                size="icon-sm"
                aria-label={t('siteFooter.newsletter.submitAria')}
                className="absolute right-1.5 top-1/2 h-8 w-8 -translate-y-1/2 rounded-lg"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 h-px bg-linear-to-r from-transparent via-foreground/28 to-transparent" />

        <div className="mt-5 flex flex-col gap-3 text-xs text-foreground/65 sm:text-sm md:flex-row md:items-center md:justify-between">
          <p className="leading-relaxed">
            {t('siteFooter.bottom.copyright', {
              year,
              publisher: siteConfig.publisher,
              creator: siteConfig.creator,
            })}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={siteConfig.url}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors duration-300 hover:text-primary"
            >
              {t('siteFooter.bottom.liveSite')}
            </a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors duration-300 hover:text-primary"
            >
              {t('siteFooter.bottom.sourceCode')}
            </a>
            <a
              href={siteConfig.social.telegram}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors text-center duration-300 hover:text-primary"
            >
              {t('siteFooter.bottom.community')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
