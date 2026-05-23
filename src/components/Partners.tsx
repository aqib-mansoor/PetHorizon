import { Calendar, Heart, Shield, Cpu, CloudLightning, Activity, Award, Compass } from 'lucide-react';

const PARTNERS = [
  { name: 'Google Calendar', icon: Calendar },
  { name: 'Apple Health Kit', icon: Heart },
  { name: 'Fitbit for Pets', icon: Activity },
  { name: 'Amazon Alexa', icon: Cpu },
  { name: 'Google Home Hub', icon: CloudLightning },
  { name: 'Chewy', icon: Compass },
  { name: 'Petco Veterinary', icon: Award },
  { name: 'Banfield Hospitals', icon: Shield },
];

export default function Partners() {
  // Duplicate the list to ensure seamless looping scroll coverage
  const marqueeList = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="py-10 bg-[#F8FAFC] border-y border-slate-100 overflow-hidden relative select-none">
      
      {/* Dynamic isolated CSS Keyframe animation injection */}
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .marquee-container {
          display: flex;
          width: max-content;
          animation: marqueeScroll 25s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Horizontal mask overlay to fade bounds */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black block">
          Connected Ecosystem Partners
        </span>
      </div>

      <div className="relative w-full overflow-hidden mt-2">
        <div className="marquee-container">
          {marqueeList.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 mx-8 text-slate-400 hover:text-emerald-600 font-extrabold uppercase tracking-widest text-xs transition duration-300 cursor-pointer"
              >
                <Icon className="w-4 h-4 flex-shrink-0 text-slate-400" />
                <span>{p.name}</span>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
