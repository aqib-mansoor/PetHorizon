import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, PhoneCall, MapPin, Printer, Search, Download } from 'lucide-react';

interface Clinic {
  name: string;
  phone: string;
  address: string;
  distance: string;
}

const MOCK_CLINICS: Record<string, Clinic[]> = {
  default: [
    {
      name: 'Metropolitan 24/7 Pet Emergency Hospital',
      phone: '(888) PET-EMERGENCY',
      address: '742 Evergreen Terrace, Springfield',
      distance: '1.8 miles',
    },
    {
      name: 'VCA Animal Trauma Center',
      phone: '(800) 555-ANML',
      address: '120 Pine Boulevard, Fairview',
      distance: '3.4 miles',
    },
    {
      name: 'Veterinary Specialty & Critical Care',
      phone: '(800) 555-CARE',
      address: '492 Oak Ridge Way, Maplewood',
      distance: '5.1 miles',
    },
  ],
  '78701': [
    {
      name: 'Austin 24-Hour Veterinary Emergency Clinic',
      phone: '(512) 555-9900',
      address: '1212 Red River St, Austin, TX 78701',
      distance: '0.8 miles',
    },
    {
      name: 'South Austin Veterinary Specialty Center',
      phone: '(512) 555-8811',
      address: '4434 Frontier Trail, Austin, TX 78745',
      distance: '4.2 miles',
    },
    {
      name: 'Heart of Texas Veterinary Specialty Hospital',
      phone: '(512) 555-7722',
      address: '115 E Rundberg Ln, Austin, TX 78753',
      distance: '6.8 miles',
    },
  ],
  '90210': [
    {
      name: 'Beverly Hills 24h Emergency Vet Hospital',
      phone: '(310) 555-1212',
      address: '9345 Santa Monica Blvd, Beverly Hills, CA 90210',
      distance: '1.2 miles',
    },
    {
      name: 'VCA West Los Angeles Animal Hospital',
      phone: '(310) 555-3000',
      address: '1919 S Sepulveda Blvd, Los Angeles, CA 90025',
      distance: '3.9 miles',
    },
    {
      name: 'Los Angeles Veterinary Specialty Center',
      phone: '(310) 555-4500',
      address: '3250 Larga Ave, Los Angeles, CA 90039',
      distance: '8.4 miles',
    },
  ],
};

export default function Emergency() {
  const [zip, setZip] = useState<string>('');
  const [clinics, setClinics] = useState<Clinic[]>(MOCK_CLINICS.default);
  const [searched, setSearched] = useState<boolean>(false);

  // Emergency medical card custom values
  const [cardData, setCardData] = useState({
    name: 'Max',
    type: 'Dog (Golden Retriever)',
    age: '18 months',
    bloodType: 'DEA 1.1 Positive',
    conditions: 'Diabetic, Insulin Alarm Set',
    owner: 'Sarah Jenkins',
    ownerPhone: '(512) 555-0199',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zip.trim();
    if (MOCK_CLINICS[cleanZip]) {
      setClinics(MOCK_CLINICS[cleanZip]);
    } else {
      setClinics(MOCK_CLINICS.default);
    }
    setSearched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="emergency" className="py-14 sm:py-24 bg-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* High-Impact Prioritized Hazard Crimson Warning Card */}
        <div className="max-w-5xl mx-auto rounded-[2.5rem] border border-red-200 bg-red-50/70 p-8 sm:p-10 relative overflow-hidden flex flex-col gap-8 text-left shadow-sm">
          
          {/* Crimson glow backdrop blobs */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
          
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-red-200 pb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 text-red-500 flex items-center justify-center flex-shrink-0 animate-pulse">
                <ShieldAlert className="w-6 h-6 animate-bounce" style={{ animationDuration: '3s' }} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  🐾 Emergency? Immediate Critical Care Access
                </h2>
                <p className="text-red-700/80 text-xs sm:text-sm mt-0.5 font-medium">
                  24/7 expert hotlines and trauma hospital search engines.
                </p>
              </div>
            </div>
            
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 text-[10px] uppercase font-black tracking-widest w-fit">
              ● Priority Action
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT AREA: Telehealth Hotlines & ZIP Lookup (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Telehealth hotlines grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Hotline 1 */}
                <a
                  href="tel:8887383637"
                  className="p-5 rounded-2xl bg-white border border-red-100 hover:border-red-300 hover:shadow-md transition flex flex-col gap-2 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <PhoneCall className="w-5 h-5 text-red-500" />
                    <span className="text-[9px] text-red-650 font-extrabold uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded-full">24/7 Telehealth</span>
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-base">Vet Telehealth Care</h3>
                  <p className="text-red-600 text-lg font-black mt-1">(888) PET-EMERGENCY</p>
                  <span className="text-[9px] text-slate-400 font-medium">Veterinarians standby on call.</span>
                </a>

                {/* Hotline 2 */}
                <a
                  href="tel:8002221222"
                  className="p-5 rounded-2xl bg-white border border-red-100 hover:border-red-300 hover:shadow-md transition flex flex-col gap-2 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <PhoneCall className="w-5 h-5 text-red-500" />
                    <span className="text-[9px] text-red-650 font-extrabold uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded-full">Poison Control</span>
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-base">Animal Poison Hotline</h3>
                  <p className="text-red-600 text-lg font-black mt-1">(800) 222-1222</p>
                  <span className="text-[9px] text-slate-400 font-medium">National toxicity guides.</span>
                </a>

              </div>

              {/* Zip Code Geospatial Lookup */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-4">
                <h3 className="font-extrabold text-slate-900 text-sm">24-Hour Trauma Hospital Search</h3>
                
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="Enter Zip Code (e.g. 78701 or 90210)"
                      className="w-full bg-white border border-slate-200 focus:border-red-500 rounded-xl p-3 pl-10 text-xs text-slate-800 focus:outline-none"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white border border-red-500 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-sm"
                  >
                    Query
                  </button>
                </form>

                {/* Clinics Result List */}
                <div className="space-y-3.5 mt-2">
                  {clinics.map((clinic, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-red-200 transition">
                      <div className="flex gap-2.5">
                        <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <div className="text-xs">
                          <p className="font-bold text-slate-800">{clinic.name}</p>
                          <p className="text-slate-400 text-[10px] mt-0.5 font-medium">{clinic.address}</p>
                          <p className="text-red-600 font-extrabold text-[10px] mt-1">{clinic.phone}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider flex-shrink-0">{clinic.distance}</span>
                    </div>
                  ))}
                </div>

              </div>

            </div>

            {/* RIGHT AREA: Printable Medical Card Generator (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <h3 className="font-extrabold text-slate-900 text-sm">Emergency Medical Card Generator</h3>
              
              {/* Card Preview Graphic */}
              <div id="print-emergency-card" className="rounded-2xl border border-red-400/20 bg-gradient-to-br from-red-500 to-rose-600 p-5 relative overflow-hidden flex flex-col justify-between aspect-[1.6/1] text-xs shadow-lg text-white">
                
                {/* Background watermarked layout */}
                <div className="absolute top-3 right-3 text-white/10 font-bold text-5xl select-none">EMERGENCY</div>

                {/* Card Title */}
                <div className="flex items-center justify-between pb-2 border-b border-white/20">
                  <div className="flex items-center gap-1.5 text-white font-extrabold tracking-widest text-[9px] uppercase">
                    <ShieldAlert className="w-3.5 h-3.5 text-white" />
                    <span>Pet Emergency File</span>
                  </div>
                  <span className="text-[8px] text-white/70">Pet Horizon Platform</span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 my-3 text-left">
                  <div>
                    <span className="text-[8px] text-red-100/70 uppercase tracking-widest font-black block">Pet Name</span>
                    <span className="text-white font-extrabold text-sm">{cardData.name}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-red-100/70 uppercase tracking-widest font-black block">Type / Breed</span>
                    <span className="text-white font-semibold text-[10px]">{cardData.type}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-red-100/70 uppercase tracking-widest font-black block">Critical Blood Type</span>
                    <span className="text-white font-extrabold text-[10px]">{cardData.bloodType}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-red-100/70 uppercase tracking-widest font-black block">Conditions</span>
                    <span className="text-white font-semibold text-[9px] truncate block">{cardData.conditions}</span>
                  </div>
                </div>

                {/* Owner info */}
                <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[9px] font-bold text-white/80 text-left">
                  <div>
                    <span>Owner: {cardData.owner}</span>
                  </div>
                  <div>
                    <span className="text-white">{cardData.ownerPhone}</span>
                  </div>
                </div>

              </div>

              {/* Form Input adjusters */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div>
                  <label className="text-[9px] text-slate-500 font-black uppercase tracking-wider">Modify Name</label>
                  <input
                    type="text"
                    value={cardData.name}
                    onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-slate-500 font-black uppercase tracking-wider">Modify Blood</label>
                  <input
                    type="text"
                    value={cardData.bloodType}
                    onChange={(e) => setCardData({ ...cardData, bloodType: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-1">
                <button
                  onClick={handlePrint}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-black py-3 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Card</span>
                </button>

                <button
                  onClick={() => {
                    alert('Emergency card profile downloaded successfully as PDF (simulated). Keep this file in your car or pet bag!');
                  }}
                  className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-black py-3 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
