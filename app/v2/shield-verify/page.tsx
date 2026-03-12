"use client";
import { useEffect, useState } from "react";

export default function CikawanShield() {
  const [rayId, setRayId] = useState("");

  useEffect(() => {
    // Ambil Ray ID dari URL atau generate baru untuk tampilan
    const id = `cik-${Math.random().toString(16).substring(2, 18)}-JKT`;
    setRayId(id.toUpperCase());

    // Simulasi JS Challenge selama 4 detik
    const timer = setTimeout(() => {
      const hash = Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
      
      // Pasang Cookie Clearance secara manual di sisi Client
      document.cookie = `__cik_clearance=cik_${hash}; path=/; max-age=86400; SameSite=Lax; Secure`;
      
      // Redirect balik ke halaman yang dituju
      window.location.href = "/";
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#313131] flex flex-col items-center justify-center font-sans p-4">
      <div className="max-w-xl w-full">
        <h1 className="text-4xl font-bold mb-2">Kasyaf Cv</h1>
        <h2 className="text-2xl font-semibold mb-8">Checking if the site connection is secure</h2>
        
        <div className="bg-[#f9f9f9] border border-gray-200 rounded-lg p-8 flex items-center shadow-sm mb-8">
          <div className="mr-6">
            <div className="w-12 h-12 border-4 border-[#ff7900] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div>
            <p className="text-lg font-medium">Kasyaf Cv needs to review the security of your connection before proceeding.</p>
          </div>
        </div>

        <div className="text-sm text-gray-500 space-y-2">
          <p>Verification is automatic. Your browser will redirect to your requested content shortly.</p>
          <p>Please allow up to 5 seconds…</p>
        </div>

        <div className="mt-20 pt-8 border-t border-gray-100 flex justify-between items-center text-[12px] text-gray-400 uppercase tracking-widest">
          <div>Ray ID: <span className="font-mono">{rayId}</span></div>
          <div>Performance & security by Cikawan Shield</div>
        </div>
      </div>
    </div>
  );
}