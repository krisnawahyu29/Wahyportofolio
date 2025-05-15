import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Instagram, LineChart, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

/** Komponen animasi fokus kata */
function TrueFocus({
  sentence = "Admin Logistik Analis Accounting",
  blurAmount = 5,
  borderColor = "cyan",
  glowColor = "rgba(0,255,255,.5)",
  animationDuration = 0.4,
  pauseBetweenAnimations = 1,
}) {
  const words = sentence.split(" ");
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const wordRefs = useRef([]);
  const [box, setBox] = useState({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % words.length),
      (animationDuration + pauseBetweenAnimations) * 1000
    );
    return () => clearInterval(id);
  }, [animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    const el = wordRefs.current[active];
    const parent = wrapRef.current;
    if (!el || !parent) return;
    const r1 = parent.getBoundingClientRect();
    const r2 = el.getBoundingClientRect();
    setBox({
      x: r2.left - r1.left,
      y: r2.top - r1.top,
      w: r2.width,
      h: r2.height,
    });
  }, [active]);

  return (
    <span ref={wrapRef} className="relative inline-block">
      {words.map((w, i) => (
        <span
          key={i}
          ref={(el) => (wordRefs.current[i] = el)}
          className="inline-block mx-1 font-semibold"
          style={{
            filter: i === active ? "blur(0)" : `blur(${blurAmount}px)`,
            transition: `filter ${animationDuration}s`,
          }}
        >
          {w}
        </span>
      ))}

      <motion.span
        className="absolute pointer-events-none rounded-md"
        animate={{
          x: box.x,
          y: box.y,
          width: box.w,
          height: box.h,
          opacity: 1,
        }}
        transition={{ duration: animationDuration }}
        style={{
          border: `2px solid ${borderColor}`,
          boxShadow: `0 0 10px 2px ${glowColor}`,
        }}
      />
    </span>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const gradientBg = isDark
    ? "bg-gradient-to-br from-gray-900 via-black to-gray-800"
    : "bg-gradient-to-br from-blue-100 via-white to-blue-50";

  const subTextColor = isDark ? "text-gray-300" : "text-gray-700";
  const mainTextColor = isDark ? "text-gray-100" : "text-gray-800";

  const backgroundDecoration = isDark
    ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black"
    : "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-200 via-white to-pink-100";

  return (
    <main
      className={clsx(
        "scroll-smooth font-sans min-h-screen transition-colors duration-500 snap-y snap-mandatory overflow-y-scroll h-screen",
        backgroundDecoration,
        isDark ? "text-white" : "text-gray-800"
      )}
    >
      {/* Header */}
      <header
        className={clsx(
          "fixed top-0 inset-x-0 z-50 backdrop-blur-md shadow-md p-4",
          isDark ? "bg-gray-800/90 text-white" : "bg-white/90 text-gray-700"
        )}
      >
        <nav className="max-w-6xl mx-auto flex justify-between items-center font-semibold">
          <div className="flex gap-6">
            {["hero", "about", "skills", "projects", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="hover:text-blue-600 capitalize"
              >
                {id}
              </a>
            ))}
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsDark((v) => !v)}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="hero"
        className={clsx(
          "snap-start min-h-screen flex items-center justify-center px-6 pt-24 scroll-mt-20",
          gradientBg
        )}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="text-center space-y-4"
        >
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white">
            <img
              src="https://previews.dropbox.com/p/thumb/ACr5efjGKl1dOmu1GTlaQwnMmpCgaVgq-E5S4T-1mTedwO2VM9MqhKy18_Sb5JsxcdSMwSULxc6PMBGy_BhZFAMii5_Tj3nfN2OVytNIufwzTpL58afpugKJY1v4YKKWzGDD1CteOy4NV76gMVG_C9iWfpEN1JlpqyEC-X3n9qhfBBMkCOOH4Jt9rI05ul3ko_bOP-c8ZDteKotdpxAb77JyhpISl6AtdiG1v0AmPEeqZPfTXD6l9FxGvfWzoMvZH5tN-Lpd1aC5UJ7BpozYfdG4_OE6gXcqUVruacTNOOLj-7ocrlEPppLxDIpxWOGy25q9U-626gghtXOM4yuBsnH0/p.jpeg?is_prewarmed=true"
              alt="Krisna Wahyu Mauludin"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <h1 className="text-4xl font-extrabold">Krisna Wahyu Mauludin</h1>

          {/* Animasi Fokus Kata */}
          <div className="text-lg">
            <TrueFocus
              borderColor={isDark ? "cyan" : "blue"}
              glowColor={isDark ? "rgba(0,255,255,.5)" : "rgba(0,0,255,.3)"}
            />
          </div>

          <p className="text-sm italic max-w-xl mx-auto">
            "Analytical thinker with a creative touch, passionate about financial data and decision‑making tools."
          </p>

          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {[
              [LineChart, "https://www.tradingview.com/u/Kyy_fx/", "TradingView"],
              [Mail, "mailto:Kress2735@gmail.com", "Email"],
              [Instagram, "https://www.instagram.com/wahy_fx/", "Instagram"],
              ["🌟", "https://www.tiktok.com/@kriss_scalp?is_from_webapp=1&sender_device=pc", "TikTok"],
            ].map(([Icon, href, label]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Button
                  variant="outline"
                  className="gap-2 text-gray-800 border-gray-300 dark:text-gray-800 dark:border-gray-300"
                >
                  {typeof Icon === "string" ? Icon : <Icon size={18} />} {label}
                </Button>
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className={clsx("snap-start min-h-screen flex items-center justify-center px-6 scroll-mt-20", gradientBg)}>
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl text-center space-y-4">
          <h2 className="text-3xl font-bold">About Me</h2>
          <p className="text-lg leading-relaxed">
            Saya adalah lulusan SMK Raden Rahmat jurusan TSM sekaligus seorang trader dan investor pemula dengan latar belakang teknik. Saya terbiasa menggunakan Excel dan TradingView untuk menganalisis pasar secara mandiri. Saya memiliki semangat belajar tinggi, pemikiran sistematis, dan siap membangun karier di dunia finansial digital.
          </p>
          <img src="https://media.giphy.com/media/eNAsjO55tPbgaor7ma/giphy.gif" alt="About Gif" className="w-32 mx-auto rounded-xl" />
        </motion.div>
      </section>

      {/* Skills */}
      <section id="skills" className={clsx("snap-start min-h-screen flex items-center justify-center px-6 scroll-mt-20", gradientBg)}>
              <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="max-w-4xl text-center space-y-6">
  <h2 className="text-3xl font-bold">Skills</h2>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
    <div>
      <img src="https://cdn-icons-png.flaticon.com/512/732/732220.png" alt="Excel" className="w-12 h-12 mx-auto" />
      <p className="mt-2 font-semibold">Microsoft Excel</p>
      <p className="text-sm">Pengolahan data, laporan keuangan, pivot, charting, dan automasi rumus untuk efisiensi kerja.</p>
    </div>
    <div>
      <img src="https://previews.dropbox.com/p/thumb/ACqXDa5DQJ_KWcSoJ5CpILQ44VSrMjPfgXjyhSAs0KeGec5zI91-dIQtHqdCtYuD9SX3rsuHDt1rC8mwfWIOl65Scxx0zTriAikG4TmRlsi-WFLnk57S_GAGtcokDLdivJkiYQlT26gcq3JDWTSbaz8OSW0494dkClAyz6mtFH6OZE5ho7IyNdy1Lb6ggoCAca2bCH94x5Lb3IlZ0kGLhJshV7E8EdQqnEFHUbwl6pvzbHOBAqmYyCfOfRvP4PKXgHUTwzyHDGurWgmnusMnFTaS4pDoDBIxBOUkIz4Xen70qv14ONQ5bJ8wT9L5oCjgqGz-rxVWHEcnW5oDXYoyzRL5/p.png?is_prewarmed=true" alt="TradingView" className="w-12 h-12 mx-auto" />
      <p className="mt-2 font-semibold">TradingView</p>
      <p className="text-sm">Membaca market structure, pola candle, serta membuat strategi berbasis FVG, SMC, dan trendline.</p>
    </div>
    <div>
      <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="Git" className="w-12 h-12 mx-auto" />
      <p className="mt-2 font-semibold">Git</p>
      <p className="text-sm">Mengelola versi dokumen & tracking perubahan pada laporan atau proyek coding sederhana.</p>
    </div>
    <div>
      <img src="https://previews.dropbox.com/p/thumb/ACpLS8m6b1hSWYn1eXJNVzRxtxn-hFDmVEIxGWUA9FNkYaxUDm_E7604L9QrdtQzGvkBs4cuFo55Gn-xtTVBjhBnwqXP9k2aqWr6RuBB1ftMZs5MV_q5hwE4EQv4fD7WSh58qJFcz0y-sZXwv031JSZBcyGSmO7wGLv6ES0O0ZwQ3nUBbZrA0jxgarkwkj6zqPrGBLxvC4f0g2CkjGCJfsQuQPHF1qvUqzQWK5CChtKhX9V7qrmZsLWilEPEZ3aOzyPYO6ZeYz2g9kZ5fR6ldvS-rpmzIy5nO_qrXOSiotSWcNAuwiZnUt5jGBeRV_dL3ZVZN7bFBgX3v455cSfZbr9I/p.jpeg?is_prewarmed=true" alt="Canva" className="w-12 h-12 mx-auto" />
      <p className="mt-2 font-semibold">Canva</p>
      <p className="text-sm">Mendesain presentasi kreatif, infografik laporan, dan visual strategi.</p>
    </div>
    <div>
      <img src="https://cdn-icons-png.flaticon.com/512/3105/3105613.png" alt="Teknik Otomotif" className="w-12 h-12 mx-auto" />
      <p className="mt-2 font-semibold">Teknik Otomotif</p>
      <p className="text-sm">Memahami mekanisme kerja mesin & sistem kendaraan, sebagai dasar teknis dalam logistik operasional.</p>
    </div>
    <div>
      <img src="https://previews.dropbox.com/p/thumb/ACqX4VHFyTeXuk7jH9O-RdzwK_gYwqy2O1iVI11jf236RAOGzyXJ8OhbYfCmOJA9gZaFR76QP0SU2sp7Z_JJaWwS62DERdTE2FKRG58Cmew-EVXjg-J2d0dbkuet3s1hQa2ar82avtBCWdkcRUCZ_7D7AEaQ56lT17pw2_seySY3tzhgMDiHgJcnvLn3WQE_4RLmQN8M7S6ju6lDl-i6kzxwCATB6C1A01nTDtAfPlNX74vySLVBSF27VnnUQx2qHg3WroiwK57buW8lpkzbSxX3ky9G86EEuZbcwGciqkRMAQbhH5FNx2l8QCWTlJqAKAg3IqrviaY0ySvWSNPwmX7u/p.png?is_prewarmed=true" alt="Administrasi" className="w-12 h-12 mx-auto" />
      <p className="mt-2 font-semibold">Administrasi & Pengolahan Data</p>
      <p className="text-sm">Menyusun data logistik, arsip manual & digital, serta analisa spreadsheet untuk laporan bulanan.</p>
    </div>
  </div>
</motion.div>

      </section>

      {/* Projects */}
      <section id="projects" className={clsx("snap-start min-h-screen flex items-center justify-center px-6 scroll-mt-20", gradientBg)}>
         <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="max-w-3xl space-y-8">
  <h2 className="text-3xl font-bold text-center">Projects</h2>
   <Card>
    <CardContent className="space-y-3 p-5">
  <h3 className="font-semibold text-xl text-gray-800">Simulasi Stok Gudang</h3>
  <p className="text-md text-gray-600 leading-relaxed">
    Menggunakan Excel untuk menghitung stok barang harian, distribusi barang masuk/keluar, dan rekap kebutuhan berdasarkan kategori dengan rumus: SUMIF, VLOOKUP, dan IF. Proyek ini mensimulasikan proses logistik gudang dengan 500 data baris.
  </p>
  <a
    href="https://docs.google.com/spreadsheets/d/1_zEyAT4M9Bt4NXOx63VymHgFaOZIK4Gm/edit?usp=sharing"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline font-semibold"
  >
    Lihat hasil latihan tersebut
  </a>
</CardContent>
  </Card>

  <Card>
    <CardContent className="space-y-6 p-5">
      <h3 className="font-semibold text-xl text-gray-800">Analisis Cripto</h3>

      <div className="space-y-2">
        <h4 className="font-semibold text-md text-gray-700">BTCUSD – Struktur Pasar</h4>
        <img src="https://i.ibb.co.com/q3KsFXGB/BTCUSD-2025-05-10-23-11-37.jpg" alt="BTCUSD Chart" className="rounded-md" />
        <p className="text-gray-700 text-sm">
          Analisa dilakukan dengan pendekatan Smart Money Concept (SMC), mencakup Break of Structure (BoS), FVG, dan area re-entry. Digunakan untuk memetakan potensi reversal dan continuation trend pada time frame H1.
        </p>
      </div>

      <hr className="border-t border-gray-300 my-4" />

      <div className="space-y-2">
        <h4 className="font-semibold text-md text-gray-700">RNDRUSD – Trend & Quasimodo</h4>
        <img src="https://i.ibb.co.com/ZR8ZYzsS/RNDRUSD-2025-05-10-23-10-14.jpg" alt="RNDRUSD Chart" className="rounded-md" />
        <p className="text-gray-700 text-sm">
          Menggunakan kombinasi struktur Quasimodo, trendline resistance dan FVG untuk menentukan zona entry dan exit. RNDRUSD dianalisis pada kerangka waktu intraday untuk menangkap pergerakan breakout potensial.
        </p>
      </div>
    </CardContent>
  </Card>
</motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className={clsx("snap-start min-h-screen flex items-center justify-center px-6 scroll-mt-20", gradientBg)}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-xl text-center space-y-6">
          <h2 className="text-3xl font-bold">Contact</h2>
          <p className={clsx("text-lg italic", subTextColor)}>
            Terima kasih telah mengunjungi portofolio saya. Jangan ragu untuk menghubungi saya melalui media di bawah ini.
          </p>
          <div className={clsx("text-lg space-y-1", mainTextColor)}>
            <p>📞 WhatsApp: <a href="https://wa.me/6285649151965" className="text-blue-600">0856-4915-1965</a></p>
            <p>✉️ Email: <a href="mailto:Kress2735@gmail.com" className="text-blue-600">Kress2735@gmail.com</a></p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}



