"use client";
import { useEffect, useState } from "react";
import { DataTableDemo } from "@/components/tabel/page";
import { motion } from "framer-motion";
import { ShieldCheck, Terminal, Monitor, Globe, Lock } from "lucide-react";
import StatCard from "@/components/card/page";

export default function Dashboard() {
    const [ipAddress, setIpAddress] = useState<string>("Detecting...");
    const [totalRequests, setTotalRequests] = useState<number>(0);
    const [deviceName, setDeviceName] = useState<string>("-");
    const [osInfo, setOsInfo] = useState<string>("Unknown OS");

    useEffect(() => {
        // Ambil IP Address
        fetch("https://api.ipify.org?format=json")
            .then((res) => res.json())
            .then((data) => setIpAddress(data.ip))
            .catch(() => setIpAddress("127.0.0.1 (Local)"));

        // Simulasi total requests atau ambil dari API kamu
        fetch("/api/total-requests")
            .then((res) => res.json())
            .then((data) => setTotalRequests(data.total))
            .catch(() => setTotalRequests(404));

        // Deteksi Device & OS sederhana
        const ua = navigator.userAgent;
        setDeviceName(navigator.platform);
        if (ua.indexOf("Win") !== -1) setOsInfo("Windows System");
        else if (ua.indexOf("Mac") !== -1) setOsInfo("MacOS / Darwin");
        else if (ua.indexOf("Linux") !== -1) setOsInfo("Linux Kernel");
        else if (ua.indexOf("Android") !== -1) setOsInfo("Android OS");
    }, []);

    return (
        <div className="min-h-screen bg-[#08090a] text-gray-300 font-mono">
            <main className="max-w-7xl mx-auto p-6 space-y-6">
                {/* Stats Cards Section */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <StatCard
                        name="Target IP Node"
                        icon={Globe}
                        value={ipAddress}
                        color="#06b6d4" // Cyan
                    />
                    <StatCard
                        name="Traffic Handled"
                        icon={ShieldCheck}
                        value={`${totalRequests} Requests`}
                        color="#10b981" // Emerald
                    />
                    <StatCard
                        name="Access Terminal"
                        icon={Monitor}
                        value={deviceName}
                        color="#f59e0b" // Amber
                    />
                </motion.div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 gap-6">
                    <motion.div
                        className="bg-[#0d0f14] border border-white/5 rounded-2xl overflow-hidden shadow-2xl"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="bg-white/5 p-4 border-b border-white/5 flex items-center justify-between">
                            <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                <Terminal size={16} className="text-primary" /> Database_Logs.txt
                            </h2>
                            <div className="flex gap-1">
                                <div className="h-2 w-2 rounded-full bg-red-500/50" />
                                <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                                <div className="h-2 w-2 rounded-full bg-green-500/50" />
                            </div>
                        </div>

                        <div className="p-4 overflow-x-auto">
                            <DataTableDemo />
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Footer / Status Bar */}
            <footer className="max-w-7xl mx-auto p-6 text-[10px] text-gray-600 flex justify-between uppercase tracking-[0.2em]">
                <span>&copy; 2026 Kasyaf Labs - All Rights Reserved</span>
                <span className="flex items-center gap-2">
                    <Lock size={10} /> Encryption: AES-256-GCM
                </span>
            </footer>
        </div>
    );
}