import { ShieldCheck, Laptop, Award, Users, BookOpen, Clock } from "lucide-react";

export function WhyMcoa() {
  const pillars = [
    {
      icon: Laptop,
      title: "Real Hospital Chart Simulators",
      description: "Practice on 100+ de-identified operative notes, pathology reports, emergency records, and inpatient discharge summaries instead of basic theory.",
    },
    {
      icon: Award,
      title: "94%+ 1st Attempt Certification Rate",
      description: "Our structured AAPC CPC® and AHIMA CCS® test-taking strategy guarantees students clear international credentials on their first attempt.",
    },
    {
      icon: Users,
      title: "Placement Assistance & Interview Training",
      description: "Comprehensive technical mock interviews, resume crafting, and recruitment drives with 40+ leading US healthcare IT and RCM companies.",
    },
    {
      icon: BookOpen,
      title: "Up-to-Date Official Codebooks",
      description: "Learn current ICD-10-CM guidelines, latest CPT procedure changes, HCPCS Level II codes, and inpatient MS-DRG grouping methodologies.",
    },
    {
      icon: ShieldCheck,
      title: "Direct Doctor-Led Faculty",
      description: "Direct mentorship and clinically-backed explanations led by Dr. Jeevanantham Mariappan and dual-certified AAPC/AHIMA instructors.",
    },
    {
      icon: Clock,
      title: "Flexible Timings & Hybrid Access",
      description: "Weekend batches, weekday regular schedules, and evening fast-tracks. Switch between physical classroom and live interactive streaming anytime.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-mcoa-amethyst font-montserrat">
            The MCOA Advantage
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-mcoa-midnight mt-2 font-montserrat">
            Why Healthcare Graduates Choose MCOA
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 font-inter">
            We don't just train you to pass an exam — we train you to excel as an international Medical Coding Officer from Day 1 of your employment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-mcoa-pearl/50 border border-gray-100 hover:border-mcoa-gold/50 hover:bg-white hover:shadow-royal transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-mcoa-lavender/40 text-mcoa-amethyst flex items-center justify-center mb-5 group-hover:bg-mcoa-midnight group-hover:text-mcoa-gold transition-colors shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-montserrat font-bold text-base text-mcoa-midnight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-inter">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
