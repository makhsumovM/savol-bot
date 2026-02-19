"use client"

import { useState, useEffect, useRef } from "react"

interface TypewriterProps {
  text: string
  delay?: number
  speed?: number
  cursor?: boolean
  cursorChar?: string
  onComplete?: () => void
}

export function Typewriter({
  text,
  delay = 0,
  speed = 50,
  cursor = true,
  cursorChar = "|",
  onComplete
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const prevTextRef = useRef(text)
  const animationRef = useRef<NodeJS.Timeout | null>(null)
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Reset when text changes (language change fix)
  useEffect(() => {
    if (prevTextRef.current !== text) {
      // Clear any running animation
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
      // Reset state
      setDisplayedText("")
      setIsComplete(false)
      prevTextRef.current = text
    }
  }, [text])

  // Main typewriter effect
  useEffect(() => {
    if (!text) return

    let currentIndex = 0
    setDisplayedText("")
    setIsComplete(false)

    const startTyping = () => {
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          currentIndex++
          // Variable speed for natural feel
          const variance = Math.random() * 30 - 15
          animationRef.current = setTimeout(typeNextChar, speed + variance)
        } else {
          setIsComplete(true)
          onComplete?.()
        }
      }
      typeNextChar()
    }

    // Initial delay before starting
    animationRef.current = setTimeout(startTyping, delay)

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
    }
  }, [text, delay, speed, onComplete])

  // Cursor blink effect
  useEffect(() => {
    if (cursor) {
      cursorIntervalRef.current = setInterval(() => {
        setShowCursor(prev => !prev)
      }, 530)

      return () => {
        if (cursorIntervalRef.current) {
          clearInterval(cursorIntervalRef.current)
        }
      }
    }
  }, [cursor])

  return (
    <span suppressHydrationWarning className="inline">
      {displayedText}
      {cursor && (
        <span
          className={`
            inline-block ml-0.5 font-light
            transition-opacity duration-100
            ${showCursor ? 'opacity-100' : 'opacity-0'}
            ${isComplete ? 'animate-pulse' : ''}
          `}
          aria-hidden="true"
        >
          {cursorChar}
        </span>
      )}
    </span>
  )
}
