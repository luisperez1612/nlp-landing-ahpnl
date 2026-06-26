import RegistrationForm from '@/components/RegistrationForm'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── Main Content ── */}
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">

        {/* Page title */}
        <h1 className="font-dancing text-5xl md:text-6xl text-[#2563EB] mb-10 leading-tight">
          NLP MetaFest
        </h1>

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/logo.jpeg"
            alt="NLP MetaFest – A Global Gathering of Excellence"
            width={200}
            height={200}
            className="rounded-full"
            priority
          />
        </div>

        {/* Section heading */}
        <h2 className="font-dancing text-3xl md:text-4xl text-[#2563EB] mb-7 leading-snug">
          Continue the Transformation – A Free Resource from Fabian Tejada
        </h2>

        {/* Body copy */}
        <div className="space-y-5 text-gray-700 text-[15px] md:text-base leading-relaxed mb-8">
          <p>
            Following on from my session on <strong>Reprogramming the Subconscious Mind for
            Automatic Success</strong> — this free workbook is a hands-on companion to the
            methodology I use every day with my clients, and that I&apos;ve refined over years of
            training thousands of professionals across Latin America, the US, and Europe.
          </p>
          <p>
            In it, I walk you through the exact process your brain uses to form automatic
            patterns — and more importantly, how to interrupt the ones keeping you stuck and
            install new ones aligned with the results you actually want.
          </p>
          <p>
            Through guided exercises rooted in NLP and neuroscience, you&apos;ll begin to see why
            willpower alone never works — and how true, lasting change happens at the subconscious
            level, where your behaviors are already running on autopilot.
          </p>
          <p>To get your free copy, complete the form below.</p>
        </div>

        {/* Form */}
        <RegistrationForm />
      </div>

      {/* ── Footer ── */}
      <Footer />
    </main>
  )
}
