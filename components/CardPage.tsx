import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MailIcon, MapPinIcon, DownloadIcon, ExternalLinkIcon, ArrowLeftIcon } from 'lucide-react';
import QRCode from 'qrcode';

// ── Inline SVGs ───────────────────────────────────────────────────────────
const GithubSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedInSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MediumSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

// ── Real QR Code using qrcode library ─────────────────────────────────────
function QRCanvas({ url, size = 160 }: { url: string; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, url, {
      width: size,
      margin: 1,
      color: {
        dark: '#4da6ff',   // sapphire blue modules
        light: '#060d1a',  // navy background
      },
    }).catch(() => {
      // Fallback: draw styled placeholder if qrcode fails
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#060d1a';
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = '#4da6ff';
      ctx.font = `bold 14px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('QR unavailable', size / 2, size / 2);
    });
  }, [url, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="rounded-xl"
      aria-label="QR code — scan to visit portfolio"
    />
  );
}

// ── Links ─────────────────────────────────────────────────────────────────
const links = [
  {
    icon: <GithubSVG className="w-5 h-5" />,
    label: 'GitHub',
    value: 'github.com/VihangaR11',
    href: 'https://github.com/VihangaR11',
    color: '#e2e8f0',
  },
  {
    icon: <LinkedInSVG className="w-5 h-5" />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/vihanga-rathnayake',
    href: 'https://linkedin.com/in/vihanga-rathnayake-a6a652321',
    color: '#4da6ff',
  },
  {
    icon: <MediumSVG className="w-5 h-5" />,
    label: 'Medium',
    value: 'medium.com/@vihangasan221',
    href: 'https://medium.com/@vihangasan221',
    color: '#e2e8f0',
  },
  {
    icon: <MailIcon className="w-5 h-5" />,
    label: 'Email',
    value: 'vihangasan221@gmail.com',
    href: 'mailto:vihangasan221@gmail.com',
    color: '#c8a03c',
  },
];

const PORTFOLIO_URL = 'https://vihangaR11.github.io/portfolio/';

// ── Main card page ────────────────────────────────────────────────────────
export default function CardPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('vihangasan221@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{ background: '#060d1a' }}
    >
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(30,107,196,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,107,196,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(30,107,196,0.08)' }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(200,160,60,0.06)' }} />
      </div>

      {/* Back to portfolio link */}
      <motion.a
        href="/portfolio/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-medium transition-all"
        style={{
          borderColor: 'rgba(77,166,255,0.2)',
          background: 'rgba(10,22,40,0.8)',
          color: '#4da6ff',
          backdropFilter: 'blur(12px)',
        }}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ borderColor: 'rgba(77,166,255,0.4)' }}
      >
        <ArrowLeftIcon className="w-3.5 h-3.5" />
        Portfolio
      </motion.a>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-sm z-10"
      >
        <div
          className="rounded-3xl overflow-hidden border"
          style={{
            background: 'rgba(10,22,40,0.97)',
            borderColor: 'rgba(77,166,255,0.15)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(77,166,255,0.08)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Top accent strip */}
          <div className="h-1 w-full"
            style={{ background: 'linear-gradient(90deg, #1e6bc4, #4da6ff, #c8a03c)' }} />

          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center">
            {/* Avatar */}
            <motion.div
              className="relative mx-auto mb-5"
              style={{ width: '96px', height: '96px' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="absolute inset-0 rounded-full blur-md opacity-50"
                style={{ background: 'linear-gradient(135deg, #1e6bc4, #c8a03c)' }} />
              <div className="relative w-full h-full rounded-full p-0.5"
                style={{ background: 'linear-gradient(135deg, #4da6ff, #c8a03c)' }}>
                <div className="w-full h-full rounded-full overflow-hidden bg-[#060d1a]">
                  <img
                    src="/portfolio/profile.jpeg"
                    alt="Vihanga Rathnayake"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.style.display = 'none';
                      t.parentElement!.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:900;background:linear-gradient(135deg,#1e6bc4,#c8a03c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">VR</div>`;
                    }}
                  />
                </div>
              </div>
              <div className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full border-2 animate-pulse"
                style={{ background: '#10b981', borderColor: '#0a1628' }} />
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-2xl font-bold mb-1"
              style={{
                background: 'linear-gradient(135deg, #4da6ff, #c8a03c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Vihanga Rathnayake
            </motion.h1>

            {/* Role pills */}
            <motion.div
              className="flex flex-wrap gap-1.5 justify-center mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {['SAP / ERP Analyst', 'Business Analyst', 'Full-Stack Dev'].map(r => (
                <span key={r} className="text-[10px] px-2.5 py-0.5 rounded-full border font-medium"
                  style={{ borderColor: 'rgba(77,166,255,0.25)', background: 'rgba(30,107,196,0.1)', color: '#4da6ff' }}>
                  {r}
                </span>
              ))}
            </motion.div>

            {/* Location */}
            <motion.div
              className="flex items-center justify-center gap-1.5 text-xs text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <MapPinIcon className="w-3 h-3" />
              Buttala, Sri Lanka · Open to opportunities
            </motion.div>
          </div>

          {/* Divider */}
          <div className="mx-8 border-t" style={{ borderColor: 'rgba(77,166,255,0.08)' }} />

          {/* Links */}
          <div className="px-6 py-5 space-y-2">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 group"
                style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.07 }}
                whileHover={{ borderColor: `${link.color}30`, background: `${link.color}08` }}
              >
                <span style={{ color: link.color }}>{link.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 font-medium">{link.label}</div>
                  <div className="text-xs text-gray-300 truncate">{link.value}</div>
                </div>
                <ExternalLinkIcon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  style={{ color: link.color }} />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-8 border-t" style={{ borderColor: 'rgba(77,166,255,0.08)' }} />

          {/* QR Code — real scannable QR */}
          <motion.div
            className="px-8 py-6 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-xs text-gray-600 font-mono tracking-widest uppercase">
              Scan to visit portfolio
            </p>
            <div className="p-3 rounded-2xl border"
              style={{ borderColor: 'rgba(77,166,255,0.15)', background: '#060d1a' }}>
              <QRCanvas url={PORTFOLIO_URL} size={160} />
            </div>
            <p className="text-[10px] text-gray-600 text-center font-mono">
              {PORTFOLIO_URL}
            </p>
          </motion.div>

          {/* Action buttons */}
          <div className="px-6 pb-8 flex gap-3">
            <a
              href="/portfolio/Vihanga_Rathnayake_CV.pdf"
              download
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #1e6bc4, #1557a0)' }}
            >
              <DownloadIcon className="w-4 h-4" />
              Download CV
            </a>
            <button
              onClick={copyEmail}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm border transition-all"
              style={{ borderColor: 'rgba(200,160,60,0.3)', background: 'rgba(200,160,60,0.08)', color: '#c8a03c' }}
            >
              <MailIcon className="w-4 h-4" />
              {copied ? '✓ Copied!' : 'Copy Email'}
            </button>
          </div>

          {/* Bottom tag */}
          <div className="px-6 py-3 text-center border-t"
            style={{ borderColor: 'rgba(77,166,255,0.08)', background: 'rgba(30,107,196,0.04)' }}>
            <p className="text-[10px] text-gray-600 font-mono tracking-widest">
              USJ · OUSL · 🏅 Presidential Medalist
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
