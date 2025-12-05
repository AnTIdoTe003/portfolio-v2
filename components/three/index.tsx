"use client"

import dynamic from "next/dynamic"
import { HeroOrbFallback } from "./hero-orb"

// Dynamic import to prevent SSR issues with Three.js
export const HeroOrb = dynamic(
  () => import("./hero-orb").then((mod) => mod.HeroOrb),
  {
    ssr: false,
    loading: () => <HeroOrbFallback />,
  }
)

export { HeroOrbFallback } from "./hero-orb"

