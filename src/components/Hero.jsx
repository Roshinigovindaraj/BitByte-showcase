import { useEffect, useRef, useState } from 'react'
import { SplineScene } from './ui/SplineScene'

export default function Hero() {
  const glowRef = useRef(null)
  const sectionRef = useRef(null)
  const [typedText, setTypedText] = useState('')

  const phrases = [
    'Premium Web Design Agency',
    'Welcome to Bit Byte Technologies',
    'Modern UI/UX Developers'
  ]

  useEffect(() => {
    let currentPhraseIdx = 0
    let currentLetterIdx = 0
    let isDeleting = false
    let typingSpeed = 100
    let timer

    const handleType = () => {
      const currentPhrase = phrases[currentPhraseIdx]
      if (!isDeleting) {
        setTypedText(currentPhrase.substring(0, currentLetterIdx + 1))
        currentLetterIdx++

        if (currentLetterIdx === currentPhrase.length) {
          isDeleting = true
          typingSpeed = 1500 // Wait before starting to delete
        } else {
          typingSpeed = 70 // Speed when typing
        }
      } else {
        setTypedText(currentPhrase.substring(0, currentLetterIdx - 1))
        currentLetterIdx--

        if (currentLetterIdx === 0) {
          isDeleting = false
          currentPhraseIdx = (currentPhraseIdx + 1) % phrases.length
          typingSpeed = 500 // Wait before starting to type next word
        } else {
          typingSpeed = 35 // Speed when deleting
        }
      }

      timer = setTimeout(handleType, typingSpeed)
    }

    handleType()

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const glow = glowRef.current
    if (!section || !glow) return

    let rafId
    let targetX = window.innerWidth * 0.75 // start near robot
    let targetY = window.innerHeight * 0.4
    let currentX = targetX
    let currentY = targetY

    // Smooth lerp loop
    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.08)
      currentY = lerp(currentY, targetY, 0.08)
      glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(animate)
    }

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
      // Update CSS variables for moving background effect
      section.style.setProperty('--bg-x', `${targetX}px`);
      section.style.setProperty('--bg-y', `${targetY}px`);
    }

    section.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(animate)

    return () => {
      section.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden flex items-center"
    >
      {/* ── Ambient background glows ── */}
      <div className="absolute top-1/4 right-[15%] w-[450px] h-[450px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none animate-float-slow z-0" />
      <div className="absolute bottom-1/4 left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[140px] pointer-events-none animate-float-delay z-0" />

      {/* ── Mouse-following radial glow ── */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 z-0"
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.05) 70%, transparent 100%)',
          willChange: 'transform',
          mixBlendMode: 'screen',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Animated pointer overlay */}
      <div className="bg-hero-pointer"></div>

      {/* ── Content grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12 flex h-screen min-h-[600px] items-center">
        <div className="flex w-full h-full gap-0">

          {/* ── Left — copy ── */}
          <div className="w-[45%] flex-shrink-0 flex flex-col justify-center py-8 pr-6">
            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-medium mb-4 animate-fade-in min-h-[34px]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent font-bold ml-1">
                {typedText}
              </span>
              <span className="w-[1.5px] h-3 bg-blue-400 ml-1 animate-ping" />
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-snug tracking-tight mb-3 animate-fade-in-up">
              Professional
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">Website Designs</span>
              <br />
              for Your Business
            </h1>


            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm mb-6 animate-fade-in-up animation-delay-100">
              Bring your business ideas to life with modern, high-performance website designs.
              Explore premium website templates, preview live demos instantly, and customize every detail to match your brand identity.
            </p>

            {/* Stats */}
            <div className="flex gap-6 mb-6 animate-fade-in-up animation-delay-200">
              {[
                { value: '150+', label: 'Projects' },
                { value: '98%', label: 'Satisfaction' },
                { value: '7+', label: 'Templates' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-lg font-black text-white">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-row gap-3 animate-fade-in-up animation-delay-300">
              <a
                href="#showcase"
                className="group px-5 py-2.5 text-sm bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 text-center"
              >
                View Designs
                <span className="inline-block ml-1.5 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 text-sm bg-white/5 border border-white/15 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-center backdrop-blur-sm"
              >
                Get Free Quote
              </a>
            </div>
          </div>

          {/* ── Right — Interactive 3D Robot ── */}
          <div className="flex-1 relative -ml-32 md:-ml-56 lg:-ml-72">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 animate-bounce z-10">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent" />
      </div>
    </section>
  )
}
