export default function Footer() {
  return (
    <footer className="w-full bg-[#2f3e46] text-white z-50">
      
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

   
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold tracking-wide">
            Izaberu Creations
          </h2>
          <p className="text-sm text-white/60">
            Watercolors & Handmade Jewelry
          </p>
        </div>

     
        <nav className="flex flex-col md:flex-row items-center gap-4 text-sm text-white/70">

          <a href="#" className="hover:text-[#84a98c] transition">
            Mentions légales
          </a>

          <a href="#" className="hover:text-[#84a98c] transition">
            Politique de confidentialité
          </a>

          <a href="#" className="hover:text-[#84a98c] transition">
            CGU
          </a>

        </nav>

      </div>

   
      <div className="border-t border-white/10 text-center py-4 text-xs text-white/40">
        © {new Date().getFullYear()} Izaberu Creations. All rights reserved.
      </div>

    </footer>
  );
}