import { useState, useEffect, useRef, useCallback } from 'react';
import myAudio from '../../assets/audio/my-heart.mp3';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Ayat {
  id: number;
  ayatNo: string;
  arabic: string;
  bangla: string;
  startTime: number; // seconds
}

interface Quote {
  text: string;
  ref: string;
}

type Section = 'all' | 'jahannam' | 'jannat';

// ─── Data with timestamps ─────────────────────────────────────────────────────
// ⚠️ startTime গুলো আপনার অডিও শুনে নিজে সঠিক করুন।
// প্রতিটি আয়াত কত সেকেন্ডে শুরু হয় সেটা দিন।

const data: Ayat[] = [
  {
    id: 1,
    ayatNo: '40',
    startTime: 0,
    arabic: 'إِنَّ يَوْمَ الْفَصْلِ مِيقَاتُهُمْ أَجْمَعِينَ',
    bangla: 'নিশ্চয় ফয়সালার দিন তাদের সবারই নির্ধারিত সময়।',
  },
  {
    id: 2,
    ayatNo: '41',
    startTime: 7.8,
    arabic:
      'يَوْمَ لَا يُغْنِي مَوْلًى عَن مَّوْلًى شَيْئًا وَلَا هُمْ يُنصَرُونَ',
    bangla:
      'যেদিন কোন বন্ধুই কোন বন্ধুর উপকারে আসবে না এবং তারা সাহায্যপ্রাপ্তও হবে না।',
  },
  {
    id: 3,
    ayatNo: '42',
    startTime: 22.31,
    arabic: 'إِلَّا مَن رَّحِمَ اللَّهُ ۚ إِنَّهُ هُوَ الْعَزِيزُ الرَّحِيمُ',
    bangla:
      'তবে আল্লাহ যার প্রতি দয়া করেন, তার কথা ভিন্ন। নিশ্চয় তিনি পরাক্রমশালী দয়াময়।',
  },
  {
    id: 4,
    ayatNo: '43',
    startTime: 34.95,
    arabic: 'إِنَّ شَجَرَتَ الزَّقُّومِ',
    bangla: 'নিশ্চয় যাক্কুম বৃক্ষ',
  },
  {
    id: 5,
    ayatNo: '44',
    startTime: 38.87,
    arabic: 'طَعَامُ الْأَثِيمِ',
    bangla: 'পাপীর খাদ্য হবে',
  },
  {
    id: 6,
    ayatNo: '45',
    startTime: 42.65,
    arabic: 'كَالْمُهْلِ يَغْلِي فِي الْبُطُونِ',
    bangla: 'গলিত তাম্রের মত পেটে ফুটতে থাকবে।',
  },
  {
    id: 7,
    ayatNo: '46',
    startTime: 49.27,
    arabic: 'كَغَلْيِ الْحَمِيمِ',
    bangla: 'যেমন ফুটে পানি।',
  },
  {
    id: 8,
    ayatNo: '47',
    startTime: 53.92,
    arabic: 'خُذُوهُ فَاعْتِلُوهُ إِلَىٰ سَوَاءِ الْجَحِيمِ',
    bangla: 'একে ধর এবং টেনে নিয়ে যাও জাহান্নামের মধ্যস্থলে,',
  },
  {
    id: 9,
    ayatNo: '48',
    startTime: 62.22,
    arabic: 'ثُمَّ صُبُّوا فَوْقَ رَأْسِهِ مِنْ عَذَابِ الْحَمِيمِ',
    bangla: 'অতঃপর তার মাথার উপর ফুটন্ত পানির আযাব ঢেলে দাও',
  },
  {
    id: 10,
    ayatNo: '49',
    startTime: 70.86,
    arabic: 'ذُقْ إِنَّكَ أَنتَ الْعَزِيزُ الْكَرِيمُ',
    bangla: 'স্বাদ গ্রহণ কর, তুমি তো সম্মানিত, সম্ভ্রান্ত।',
  },
  {
    id: 11,
    ayatNo: '50',
    startTime: 79.93,
    arabic: 'إِنَّ هَـٰذَا مَا كُنتُم بِهِ تَمْتَرُونَ',
    bangla: 'এ সম্পর্কে তোমরা সন্দেহে পতিত ছিলে।',
  },
  {
    id: 12,
    ayatNo: '51',
    startTime: 89.43,
    arabic: 'إِنَّ الْمُتَّقِينَ فِي مَقَامٍ أَمِينٍ',
    bangla: 'নিশ্চয়ই মুত্তাকীরা থাকবে নিরাপদ স্থানে,',
  },
  {
    id: 13,
    ayatNo: '52',
    startTime: 98.33,
    arabic: 'فِي جَنَّاتٍ وَعُيُونٍ',
    bangla: 'বাগান আর ঝরণার মাঝে',
  },
  {
    id: 14,
    ayatNo: '53',
    startTime: 106.63,
    arabic: 'يَلْبَسُونَ مِن سُندُسٍ وَإِسْتَبْرَقٍ مُّتَقَابِلِينَ',
    bangla: 'তারা পরিধান করবে পাতলা ও পুরু রেশমী কাপড়, আর বসবে মুখোমুখী হয়ে।',
  },
  {
    id: 15,
    ayatNo: '54',
    startTime: 125.7,
    arabic: 'كَذَٰلِكَ وَزَوَّجْنَاهُم بِحُورٍ عِينٍ',
    bangla:
      'এ রকমই হবে, আর তাদের বিয়ে দিয়ে দেব ডাগর ডাগর সুন্দর উজ্জ্বল চোখওয়ালা কুমারীদের সাথে।',
  },
  {
    id: 16,
    ayatNo: '55',
    startTime: 133.61,
    arabic: 'يَدْعُونَ فِيهَا بِكُلِّ فَاكِهَةٍ آمِنِينَ',
    bangla: 'তারা সেখানে শান্ত মনে বিভিন্ন ফল-মূল আনতে বলবে।',
  },
  {
    id: 17,
    ayatNo: '56',
    startTime: 141.1,
    arabic:
      'لَا يَذُوقُونَ فِيهَا الْمَوْتَ إِلَّا الْمَوْتَةَ الْأُولَىٰ ۖ وَوَقَاهُمْ عَذَابَ الْجَحِيمِ',
    bangla:
      'তারা সেখানে মৃত্যু আস্বাদন করবে না, প্রথম মৃত্যু ব্যতীত এবং আল্লাহ তাদেরকে জাহান্নামের আযাব থেকে রক্ষা করবেন।',
  },
  {
    id: 18,
    ayatNo: '57',
    startTime: 153.23,
    arabic: 'فَضْلًا مِّن رَّبِّكَ ۚ ذَٰلِكَ هُوَ الْفَوْزُ الْعَظِيمُ',
    bangla: 'আপনার পালনকর্তার কৃপায় এটাই মহা সাফল্য।',
  },
  {
    id: 19,
    ayatNo: '58',
    startTime: 164.19,
    arabic: 'فَإِنَّمَا يَسَّرْنَاهُ بِلِسَانِكَ لَعَلَّهُمْ يَتَذَكَّرُونَ',
    bangla: 'আমি আপনার ভাষায় কোরআনকে সহজ করে দিয়েছি, যাতে তারা স্মরণ রাখে।',
  },
  {
    id: 20,
    ayatNo: '59',
    startTime: 174.15,
    arabic: 'فَارْتَقِبْ إِنَّهُم مُّرْتَقِبُونَ',
    bangla: 'অতএব, আপনি অপেক্ষা করুন, তারাও অপেক্ষা করছে।',
  },
];

const quotes: Quote[] = [
  {
    text: 'এই পার্থিব জীবণ খেল-তামাশা ব্যতীত কিছুই নয়!',
    ref: 'সুরা আনকাবুত (২৯:৬৪)',
  },
  {
    text: 'জাহান্নামকে প্রবৃত্তি এবং জান্নাত কষ্ট দ্বারা পরিবেষ্টন করা হয়েছে!',
    ref: 'বুখারী-মুসলিম ২৮২২',
  },
  {
    text: 'দুনিয়াতে এমনভাবে জীবণ-যাপন করো যেন তুমি একজন অপরিচিত মুসাফির!',
    ref: 'মিশকাত ৫২৭৪',
  },
];

const DAYS: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// ─── Style helpers ────────────────────────────────────────────────────────────

const navBtnStyle = (active: boolean, color: string) => ({
  padding: '8px 20px',
  borderRadius: 24,
  border: `1px solid ${active ? color : 'rgba(255,255,255,0.1)'}`,
  background: active ? `${color}22` : 'transparent',
  color: active ? color : '#8a8a8a',
  cursor: 'pointer',
  fontSize: 13,
  letterSpacing: 1,
  transition: 'all 0.3s ease',
  fontFamily: 'inherit',
});

const actionBtnStyle = (color: string) => ({
  padding: '5px 14px',
  borderRadius: 20,
  border: `1px solid ${color}44`,
  background: `${color}11`,
  color,
  cursor: 'pointer',
  fontSize: 12,
  letterSpacing: 1,
  fontFamily: 'inherit',
  transition: 'all 0.2s',
});

// ─── Helper ───────────────────────────────────────────────────────────────────

const getActiveIdFromTime = (time: number): number => {
  let active = data[0].id;
  for (let i = 0; i < data.length; i++) {
    if (time >= data[i].startTime) active = data[i].id;
    else break;
  }
  return active;
};

const fmtTime = (s: number): string => {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

// ─── AudioPlayer ─────────────────────────────────────────────────────────────

interface AudioPlayerProps {
  src: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  onTimeUpdate: (time: number) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  audioRef,
  onTimeUpdate,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);

  const togglePlay = (): void => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) a.pause();
    else a.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = (): void => {
    const a = audioRef.current;
    if (!a) return;
    setCurrentTime(a.currentTime);
    onTimeUpdate(a.currentTime);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const a = audioRef.current;
    if (!a) return;
    const val = Number(e.target.value);
    a.currentTime = val;
    setCurrentTime(val);
    onTimeUpdate(val);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const a = audioRef.current;
    if (!a) return;
    const val = Number(e.target.value);
    a.volume = val;
    setVolume(val);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      style={{
        background:
          'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(0,0,0,0.3))',
        border: '1px solid rgba(212,175,55,0.25)',
        borderRadius: 14,
        padding: '18px 24px',
        margin: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Row 1: play + info + time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={togglePlay}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #d4af37, #b8860b)',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            boxShadow: '0 0 20px rgba(212,175,55,0.35)',
            transition: 'all 0.2s',
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 13,
              color: '#d4af37',
              letterSpacing: 2,
              marginBottom: 2,
            }}
          >
            🎵 সূরা আদ-দুখান তিলাওয়াত
          </div>
          <div style={{ fontSize: 11, color: '#5a5a4a' }}>
            অডিও চললে আয়াত স্বয়ংক্রিয়ভাবে হাইলাইট ও স্ক্রল হবে
          </div>
        </div>
        <div
          style={{
            fontSize: 12,
            color: '#8a7a5a',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {fmtTime(currentTime)} / {fmtTime(duration)}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ position: 'relative', height: 6 }}>
        <div
          style={{
            height: 6,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.08)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #b8860b, #f0c040)',
              borderRadius: 3,
              transition: 'width 0.3s linear',
            }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            opacity: 0,
            cursor: 'pointer',
            height: '100%',
          }}
        />
      </div>

      {/* Volume */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, color: '#6a6a5a' }}>
          {volume === 0 ? '🔇' : volume < 0.5 ? '🔈' : '🔊'}
        </span>
        <div
          style={{
            position: 'relative',
            flex: 1,
            maxWidth: 100,
            height: 4,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${volume * 100}%`,
              background: 'rgba(212,175,55,0.5)',
              borderRadius: 2,
            }}
          />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              opacity: 0,
              cursor: 'pointer',
            }}
          />
        </div>
        <span style={{ fontSize: 11, color: '#5a5a4a', minWidth: 28 }}>
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Home: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [showDate, setShowDate] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<Section>('all');
  const [manualAyat, setManualAyat] = useState<number | null>(null);
  const [audioActiveId, setAudioActiveId] = useState<number | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [quoteIdx, setQuoteIdx] = useState<number>(0);
  const [copied, setCopied] = useState<number | null>(null);
  const [visibleAyats, setVisibleAyats] = useState<Record<number, boolean>>({});

  const audioRef = useRef<HTMLAudioElement>(null);
  const ayatRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Auto-rotate quotes
  useEffect(() => {
    const t = setInterval(
      () => setQuoteIdx((i) => (i + 1) % quotes.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);

  // Scroll-reveal observer
  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = Number((e.target as HTMLElement).dataset.id);
            setVisibleAyats((prev) => ({ ...prev, [id]: true }));
          }
        }),
      { threshold: 0.05 },
    );
    document
      .querySelectorAll<HTMLElement>('[data-id]')
      .forEach((c) => observerRef.current!.observe(c));
    return () => observerRef.current?.disconnect();
  }, [search, activeSection]);

  // Track audio play/pause from outside
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onPlay = () => setIsAudioPlaying(true);
    const onPause = () => setIsAudioPlaying(false);
    const onEnded = () => {
      setIsAudioPlaying(false);
      setAudioActiveId(null);
    };
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('ended', onEnded);
    return () => {
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('ended', onEnded);
    };
  }, []);

  // Time → active ayat + auto-scroll
  const handleTimeUpdate = useCallback((time: number) => {
    const newId = getActiveIdFromTime(time);
    setAudioActiveId((prev) => {
      if (prev === newId) return prev;
      ayatRefs.current[newId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return newId;
    });
  }, []);

  // Click on ayat card → seek audio + start playing
  const handleAyatClick = (item: Ayat): void => {
    // toggle manual highlight if audio is not playing
    if (!isAudioPlaying) {
      setManualAyat((prev) => (prev === item.id ? null : item.id));
    }
    // Always seek audio to that ayat's time
    const a = audioRef.current;
    if (a) {
      a.currentTime = item.startTime;
      handleTimeUpdate(item.startTime);
      if (a.paused) a.play();
    }
  };

  // Active id: audio-driven when playing, manual otherwise
  const activeId = isAudioPlaying ? audioActiveId : manualAyat;

  const filtered: Ayat[] = data.filter((item) => {
    const n = parseInt(item.ayatNo, 10);
    const matchSearch =
      search === '' ||
      item.ayatNo.includes(search) ||
      item.bangla.includes(search) ||
      item.arabic.includes(search);
    const matchSection =
      activeSection === 'all' ||
      (activeSection === 'jahannam' && n <= 50) ||
      (activeSection === 'jannat' && n >= 51);
    return matchSearch && matchSection;
  });

  const handleCopy = (text: string, id: number): void => {
    navigator.clipboard.writeText(text).catch(console.error);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const now = new Date();

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #0a0a0f 0%, #0d1117 40%, #0a0f0a 100%)',
        fontFamily: "'Georgia', serif",
        color: '#e8dcc8',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes fadeIn  { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse   { 0%,100%{ box-shadow:0 0 0 0 rgba(212,175,55,0.4); } 50%{ box-shadow:0 0 0 10px rgba(212,175,55,0); } }
        @keyframes glow    { 0%,100%{ opacity:0.6; } 50%{ opacity:1; } }
        @keyframes barUp   { 0%,100%{ transform:scaleY(0.4); } 50%{ transform:scaleY(1); } }
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#0a0a0f; }
        ::-webkit-scrollbar-thumb { background:#3a2a0a; border-radius:4px; }
        input::placeholder { color:#4a4a3a; }
        button:hover { filter:brightness(1.15); transform:translateY(-1px); }
      `}</style>

      {/* Background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(184,134,11,0.06) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(0,100,50,0.06) 0%, transparent 50%),
          repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(184,134,11,0.015) 40px, rgba(184,134,11,0.015) 41px)
        `,
        }}
      />

      <div
        style={{
          maxWidth: 860,
          margin: '0 auto',
          padding: '0 16px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── HEADER ── */}
        <div
          style={{
            textAlign: 'center',
            padding: '48px 24px 32px',
            borderBottom: '1px solid rgba(184,134,11,0.2)',
          }}
        >
          <div
            style={{
              fontSize: 36,
              color: '#d4af37',
              marginBottom: 8,
              fontFamily: "'Traditional Arabic','Scheherazade New',serif",
              letterSpacing: 2,
              textShadow: '0 0 30px rgba(212,175,55,0.4)',
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>
          <div
            style={{
              fontSize: 13,
              letterSpacing: 6,
              color: '#8a7a5a',
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            Surah
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#f0e0a0',
              marginBottom: 4,
            }}
          >
            الدُّخَان — Ad-Dukhan
          </div>
          <div style={{ fontSize: 13, color: '#7a8a7a', letterSpacing: 3 }}>
            আয়াত ৪০ – ৫৯
          </div>
        </div>

        {/* ── AUDIO PLAYER ── */}
        <AudioPlayer
          src={myAudio}
          audioRef={audioRef}
          onTimeUpdate={handleTimeUpdate}
        />

        {/* Now-playing banner */}
        {isAudioPlaying && audioActiveId && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'rgba(212,175,55,0.08)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: 8,
              padding: '8px 16px',
              marginBottom: 12,
              animation: 'fadeIn 0.3s ease',
            }}
          >
            {/* Animated sound bars */}
            <div
              style={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                height: 18,
              }}
            >
              {[0.5, 1, 0.7, 0.9, 0.4, 1, 0.6].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: 3,
                    borderRadius: 2,
                    background: '#d4af37',
                    height: `${h * 18}px`,
                    animation: `barUp ${0.5 + i * 0.07}s ease-in-out infinite`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: 13, color: '#d4af37', letterSpacing: 1 }}>
              এখন পড়া হচ্ছে — আয়াত{' '}
              {data.find((d) => d.id === audioActiveId)?.ayatNo}
            </span>
            <span
              style={{ fontSize: 11, color: '#6a6a5a', marginLeft: 'auto' }}
            >
              যেকোনো আয়াতে ক্লিক করলে সেখান থেকে শুরু হবে
            </span>
          </div>
        )}

        {/* ── ROTATING QUOTE ── */}
        <div
          style={{
            background:
              'linear-gradient(135deg, rgba(184,134,11,0.08), rgba(0,80,40,0.08))',
            border: '1px solid rgba(184,134,11,0.15)',
            borderRadius: 12,
            padding: '24px 32px',
            margin: '16px 0',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: 20,
              fontSize: 60,
              color: 'rgba(212,175,55,0.08)',
              userSelect: 'none',
              lineHeight: 1,
            }}
          >
            "
          </div>
          <div
            style={{
              fontSize: 17,
              color: '#e8d8a0',
              lineHeight: 1.8,
              marginBottom: 8,
            }}
          >
            {quotes[quoteIdx].text}
          </div>
          <div style={{ fontSize: 12, color: '#8a7a5a', letterSpacing: 2 }}>
            {quotes[quoteIdx].ref}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 6,
              marginTop: 12,
            }}
          >
            {quotes.map((_, i) => (
              <div
                key={i}
                onClick={() => setQuoteIdx(i)}
                style={{
                  width: i === quoteIdx ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background:
                    i === quoteIdx ? '#d4af37' : 'rgba(212,175,55,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── NAV FILTER ── */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
            padding: '16px 0',
            flexWrap: 'wrap',
          }}
        >
          {(
            [
              { key: 'all', label: '🌟 সকল আয়াত', color: '#d4af37' },
              {
                key: 'jahannam',
                label: '🔥 জাহান্নাম (৪০–৫০)',
                color: '#e05020',
              },
              { key: 'jannat', label: '🌿 জান্নাত (৫১–৫৯)', color: '#20a060' },
            ] as { key: Section; label: string; color: string }[]
          ).map(({ key, label, color }) => (
            <button
              key={key}
              style={navBtnStyle(activeSection === key, color)}
              onClick={() => setActiveSection(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── SEARCH ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(184,134,11,0.2)',
            borderRadius: 8,
            padding: '10px 16px',
            margin: '4px 0 8px',
            gap: 10,
          }}
        >
          <span style={{ color: '#6a6a5a', fontSize: 16 }}>🔍</span>
          <input
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#e8dcc8',
              fontSize: 15,
              flex: 1,
              fontFamily: 'inherit',
            }}
            type="text"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="আয়াত নম্বর বা বাংলা শব্দ দিয়ে খুঁজুন..."
          />
          {search && (
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#6a6a5a',
                cursor: 'pointer',
                fontSize: 16,
              }}
              onClick={() => setSearch('')}
            >
              ✕
            </button>
          )}
        </div>

        <div
          style={{
            fontSize: 12,
            color: '#6a7a6a',
            textAlign: 'right',
            marginBottom: 12,
            letterSpacing: 1,
          }}
        >
          {filtered.length} টি আয়াত পাওয়া গেছে
        </div>

        {/* ── AYAT LIST ── */}
        {filtered.map((item) => {
          const n = parseInt(item.ayatNo, 10);
          const isJahannam = n <= 50;
          const isActive = activeId === item.id;
          const isVisible = visibleAyats[item.id] ?? false;

          const accentColor = isJahannam ? '#ff5533' : '#33cc77';
          const borderColor = isJahannam
            ? 'rgba(220,80,40,0.55)'
            : 'rgba(40,180,80,0.55)';
          const bgActive = isJahannam
            ? 'linear-gradient(135deg, rgba(220,60,20,0.16), rgba(100,20,5,0.10))'
            : 'linear-gradient(135deg, rgba(20,160,70,0.16), rgba(5,80,30,0.10))';

          return (
            <div
              key={item.id}
              data-id={item.id}
              ref={(el) => {
                ayatRefs.current[item.id] = el;
              }}
              onClick={() => handleAyatClick(item)}
              style={{
                background: isActive ? bgActive : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isActive ? borderColor : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 12,
                padding: '20px 24px',
                marginBottom: 12,
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                position: 'relative',
                overflow: 'hidden',
                animation:
                  isActive && isAudioPlaying
                    ? 'pulse 2s ease-in-out infinite'
                    : 'none',
              }}
            >
              {/* Color strip bg */}
              <div
                style={{
                  background: isJahannam
                    ? 'linear-gradient(90deg, rgba(180,30,10,0.18), transparent)'
                    : 'linear-gradient(90deg, rgba(0,120,60,0.18), transparent)',
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 12,
                  pointerEvents: 'none',
                }}
              />

              {/* Left accent bar when active */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    borderRadius: '12px 0 0 12px',
                    background: isJahannam
                      ? 'linear-gradient(180deg, #ff4422, #cc2200)'
                      : 'linear-gradient(180deg, #22cc66, #009933)',
                    animation: 'glow 1s ease-in-out infinite alternate',
                  }}
                />
              )}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  position: 'relative',
                }}
              >
                {/* Ayat badge */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    flexShrink: 0,
                    border: `1px solid ${isActive ? borderColor : 'rgba(212,175,55,0.3)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: isActive ? accentColor : '#d4af37',
                    background: isActive ? `${accentColor}18` : 'transparent',
                    boxShadow: isActive ? `0 0 14px ${accentColor}40` : 'none',
                    transition: 'all 0.3s',
                  }}
                >
                  {item.ayatNo}
                </div>

                <div style={{ flex: 1 }}>
                  {/* Arabic */}
                  <div
                    style={{
                      fontSize: 22,
                      lineHeight: 2,
                      textAlign: 'right',
                      direction: 'rtl',
                      color: isActive ? '#fff8e0' : '#f0e8c0',
                      fontFamily:
                        "'Traditional Arabic','Scheherazade New',serif",
                      marginBottom: 8,
                      transition: 'color 0.3s',
                    }}
                  >
                    {item.arabic}
                  </div>

                  {/* Bangla */}
                  <div
                    style={{
                      fontSize: 15,
                      lineHeight: 1.9,
                      color: isActive ? '#d0c8a0' : '#b0a888',
                      transition: 'color 0.3s',
                    }}
                  >
                    {item.bangla}
                  </div>

                  {/* Playing indicator */}
                  {isActive && isAudioPlaying && (
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 11,
                        color: accentColor,
                        letterSpacing: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        animation: 'glow 1s ease-in-out infinite alternate',
                      }}
                    >
                      ● এখন তিলাওয়াত হচ্ছে
                    </div>
                  )}

                  {/* Manual expand — copy + tag */}
                  {isActive && !isAudioPlaying && (
                    <div
                      style={{
                        marginTop: 12,
                        paddingTop: 12,
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex',
                        gap: 8,
                        justifyContent: 'flex-end',
                        flexWrap: 'wrap',
                      }}
                    >
                      <button
                        style={actionBtnStyle('#d4af37')}
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          handleCopy(`${item.arabic}\n${item.bangla}`, item.id);
                        }}
                      >
                        {copied === item.id ? '✓ কপি হয়েছে' : 'কপি করুন'}
                      </button>
                      <div
                        style={{
                          padding: '5px 14px',
                          borderRadius: 20,
                          fontSize: 12,
                          letterSpacing: 1,
                          background: isJahannam
                            ? 'rgba(200,50,10,0.15)'
                            : 'rgba(20,150,60,0.15)',
                          border: isJahannam
                            ? '1px solid #c0301044'
                            : '1px solid #20a06044',
                          color: isJahannam ? '#e06040' : '#40c080',
                        }}
                      >
                        {isJahannam
                          ? '🔥 জাহান্নামের আয়াত'
                          : '🌿 জান্নাতের আয়াত'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div
            style={{ textAlign: 'center', padding: '48px 0', color: '#4a4a3a' }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>☽</div>
            <div>কোনো আয়াত পাওয়া যায়নি</div>
          </div>
        )}

        {/* ── DATE SECTION ── */}
        <div style={{ textAlign: 'center', padding: '24px 0 8px' }}>
          <button
            style={{
              padding: '10px 28px',
              borderRadius: 24,
              border: '1px solid rgba(212,175,55,0.3)',
              background: showDate ? 'rgba(212,175,55,0.12)' : 'transparent',
              color: '#d4af37',
              cursor: 'pointer',
              fontSize: 14,
              letterSpacing: 1,
              fontFamily: 'inherit',
              transition: 'all 0.3s',
            }}
            onClick={() => setShowDate(!showDate)}
          >
            {showDate ? '📅 তারিখ লুকান' : '📅 আজকের তারিখ দেখুন'}
          </button>

          {showDate && (
            <div
              style={{
                background: 'rgba(0,80,40,0.15)',
                border: '1px solid rgba(0,150,60,0.2)',
                borderRadius: 10,
                padding: '16px 24px',
                textAlign: 'center',
                marginTop: 8,
                animation: 'fadeIn 0.4s ease',
              }}
            >
              <div
                style={{
                  color: '#d4af37',
                  fontSize: 13,
                  letterSpacing: 3,
                  marginBottom: 12,
                  textTransform: 'uppercase',
                }}
              >
                আজকের তারিখ
              </div>
              {(
                [
                  {
                    label: 'English',
                    value: now.toLocaleDateString('en-GB'),
                    icon: '🌍',
                  },
                  {
                    label: 'বাংলা',
                    value: now.toLocaleDateString('bn-BD'),
                    icon: '🇧🇩',
                  },
                  { label: 'দিন', value: DAYS[now.getDay()], icon: '📆' },
                ] as { label: string; value: string; icon: string }[]
              ).map(({ label, value, icon }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '6px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: '#8a8a6a' }}>
                    {icon} {label}
                  </span>
                  <span style={{ color: '#e8d8a0', fontWeight: 'bold' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        <div
          style={{
            textAlign: 'center',
            padding: '32px 16px',
            marginTop: 24,
            borderTop: '1px solid rgba(184,134,11,0.1)',
            fontSize: 12,
            color: '#4a4a3a',
            letterSpacing: 2,
          }}
        >
          <div style={{ color: '#d4af37', fontSize: 20, opacity: 0.4 }}>
            ❖ ✦ ❖
          </div>
          <div style={{ marginTop: 8 }}>SURA AD-DUKHAN · AYAT 40–59</div>
          <div style={{ marginTop: 4, color: '#3a3a2a' }}>سورة الدخان</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
