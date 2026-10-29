const LogoMarquee = () => {
  const brands = ["Locus Robotics", "MiR", "KUKA", "Fetch Robotics", "Geek+", "Hai Robotics"];
  
  return (
    <div className="border-y border-slate-100 bg-slate-50/50 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <p className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest">Compatible nativamente con</p>
      </div>
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-16 items-center px-8">
          {[...brands, ...brands, ...brands].map((brand, idx) => (
            <span key={idx} className="text-xl md:text-2xl font-bold text-slate-300 hover:text-orange-500 transition-colors cursor-default">
              {brand}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .animate-marquee { animation: marquee 25s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
};
export default LogoMarquee;