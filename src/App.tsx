import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Snowflake, Sparkles } from 'lucide-react';
import { SnowflakeItem, BalloonItem, ActiveEffect } from './types';
import Balloon from './components/Balloon';

const BALLOON_COLORS = [
  { color: '#3b82f6', glow: '#1d4ed8' }, // Corporate slate blue / royal
  { color: '#10b981', glow: '#047857' }, // Professional emerald / teal
  { color: '#ec4899', glow: '#be185d' }, // Executive rose / ruby
  { color: '#8b5cf6', glow: '#6d28d9' }, // Cool amethyst violet
  { color: '#f59e0b', glow: '#b45309' }, // Warm gold / amber
  { color: '#06b6d4', glow: '#0891b2' }, // Pacific steel / cyan
];

export default function App() {
  const [activeEffect, setActiveEffect] = useState<ActiveEffect>(null);
  const [triggerToken, setTriggerToken] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [snowflakes, setSnowflakes] = useState<SnowflakeItem[]>([]);
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);

  // Track the actual 5-second countdown precisely
  useEffect(() => {
    if (activeEffect) {
      setTimeLeft(5.0);
      const startTime = Date.now();
      
      const timerInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const remaining = Math.max(5.0 - elapsed, 0);
        setTimeLeft(remaining);
        
        if (elapsed >= 5.0) {
          clearInterval(timerInterval);
          setActiveEffect(null);
        }
      }, 30);

      return () => clearInterval(timerInterval);
    } else {
      setTimeLeft(0);
    }
  }, [activeEffect, triggerToken]);

  // Spawning logic for Snowflakes
  useEffect(() => {
    if (activeEffect === 'snow') {
      // Clean up past balloon particles instantly to change modes smoothly
      setBalloons([]);

      // Generate initial burst of elegant medium snow particles
      const initialSnow: SnowflakeItem[] = Array.from({ length: 15 }, (_, i) => ({
        id: `snow-init-${Date.now()}-${i}-${Math.random()}`,
        left: Math.random() * 92 + 4, // keep safe margins from edge
        size: Math.random() * 8 + 24, // 24px - 32px (medium size specification)
        opacity: Math.random() * 0.25 + 0.65, // high contrast visibility standard
        duration: Math.random() * 1.5 + 3.0, // 3s to 4.5s
        sway: Math.random() * 6 - 3, // gentle wind drift
        rotation: Math.random() * 360,
      }));
      setSnowflakes(initialSnow);

      // Smooth step continuous spawner for the 5 second window
      const spawner = setInterval(() => {
        const newSnow: SnowflakeItem = {
          id: `snow-spawn-${Date.now()}-${Math.random()}`,
          left: Math.random() * 92 + 4,
          size: Math.random() * 8 + 24,
          opacity: Math.random() * 0.25 + 0.65,
          duration: Math.random() * 1.5 + 3.0,
          sway: Math.random() * 6 - 3,
          rotation: Math.random() * 360,
        };
        setSnowflakes((prev) => [...prev, newSnow]);
      }, 160);

      return () => clearInterval(spawner);
    }
  }, [activeEffect, triggerToken]);

  // Spawning logic for Balloons
  useEffect(() => {
    if (activeEffect === 'balloons') {
      // Clean up past snowflake particles instantly to change modes smoothly
      setSnowflakes([]);

      // Generate initial burst of professional balloons
      const initialBalloons: BalloonItem[] = Array.from({ length: 8 }, (_, i) => {
        const pal = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
        return {
          id: `balloon-init-${Date.now()}-${i}-${Math.random()}`,
          left: Math.random() * 84 + 8, // keep away from screen absolute borders
          size: Math.random() * 8 + 44, // 44px to 52px (medium size specification)
          color: pal.color,
          glowColor: pal.glow,
          duration: Math.random() * 1.5 + 3.3, // elegant pace
          sway: Math.random() * 8 - 4,
        };
      });
      setBalloons(initialBalloons);

      // Smooth step continuous balloon spawner
      const spawner = setInterval(() => {
        const pal = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
        const newBalloon: BalloonItem = {
          id: `balloon-spawn-${Date.now()}-${Math.random()}`,
          left: Math.random() * 84 + 8,
          size: Math.random() * 8 + 44,
          color: pal.color,
          glowColor: pal.glow,
          duration: Math.random() * 1.5 + 3.3,
          sway: Math.random() * 8 - 4,
        };
        setBalloons((prev) => [...prev, newBalloon]);
      }, 250);

      return () => clearInterval(spawner);
    }
  }, [activeEffect, triggerToken]);

  // Remove individual completed items to maintain a lightweight DOM
  const removeSnowflake = (id: string) => {
    setSnowflakes((prev) => prev.filter((item) => item.id !== id));
  };

  const removeBalloon = (id: string) => {
    setBalloons((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSnowflakeTrigger = () => {
    setActiveEffect('snow');
    setTriggerToken((prev) => prev + 1);
  };

  const handleBalloonTrigger = () => {
    setActiveEffect('balloons');
    setTriggerToken((prev) => prev + 1);
  };

  return (
    <div className="w-screen h-screen bg-[#020617] text-slate-100 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out relative overflow-hidden select-none font-sans">
      
      {/* 1. LAYER 0: Ambient Blur Spheres representing the premium layout background */}
      <div className="absolute -top-48 -left-48 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 ease-in-out" />
      <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 ease-in-out" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[160px] pointer-events-none" />

      {/* 2. LAYER 1: Physics/Animation Stage */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        
        {/* Render Snowflakes */}
        <AnimatePresence>
          {snowflakes.map((snow) => (
            <motion.div
              key={snow.id}
              initial={{ y: '-10vh', x: `${snow.left}vw`, rotate: snow.rotation, opacity: 0 }}
              animate={{
                y: '112vh',
                x: [
                  `${snow.left}vw`,
                  `${snow.left + snow.sway}vw`,
                  `${snow.left - snow.sway}vw`,
                  `${snow.left}vw`,
                ],
                rotate: snow.rotation + 240,
                opacity: snow.opacity,
              }}
              transition={{
                duration: snow.duration,
                ease: 'linear',
                times: [0, 0.35, 0.7, 1],
              }}
              onAnimationComplete={() => removeSnowflake(snow.id)}
              className="absolute pointer-events-none text-sky-100/90"
              style={{
                width: snow.size,
                height: snow.size,
                filter: 'drop-shadow(0 2px 4px rgba(255, 255, 255, 0.15))',
              }}
            >
              <Snowflake size={snow.size} strokeWidth={1.5} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Render Balloons */}
        <AnimatePresence>
          {balloons.map((balloon) => (
            <motion.div
              key={balloon.id}
              initial={{ y: '115vh', x: `${balloon.left}vw`, rotate: -8, opacity: 0 }}
              animate={{
                y: '-25vh',
                x: [
                  `${balloon.left}vw`,
                  `${balloon.left + balloon.sway}vw`,
                  `${balloon.left - balloon.sway}vw`,
                  `${balloon.left}vw`,
                ],
                rotate: [-8, 8, -6, 4],
                opacity: [0.95, 1, 1, 0.75],
              }}
              transition={{
                duration: balloon.duration,
                ease: 'easeOut',
                times: [0, 0.3, 0.7, 1],
              }}
              onAnimationComplete={() => removeBalloon(balloon.id)}
              className="absolute pointer-events-none"
              style={{
                width: balloon.size,
                left: 0,
                top: 0,
              }}
            >
              <Balloon
                size={balloon.size}
                color={balloon.color}
                glowColor={balloon.glowColor}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 3. LAYER 2: Frosted Glass Central Control Card (Executive Design Suite) */}
      <main className="z-20 w-full max-w-[720px] px-6">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] sm:rounded-[40px] shadow-2xl p-8 sm:p-14 flex flex-col items-center gap-8 sm:gap-11 transition-all duration-500 hover:border-white/15">
          
          {/* Header Typography Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight text-white font-display">
              Atmospheric Control
            </h1>
            <p className="text-slate-400 text-xs uppercase tracking-[0.4em] font-medium">
              Executive Suite & Gala Interface
            </p>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-8"></div>
          </div>

          {/* Interactive Responsive Button Panel */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 w-full">
            
            {/* Snowflakes Button */}
            <button
              id="btnSnow"
              onClick={handleSnowflakeTrigger}
              className={`flex-1 py-5 px-6 rounded-2xl border transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 group text-center flex flex-col items-center justify-center relative overflow-hidden ${
                activeEffect === 'snow'
                  ? 'bg-white/15 border-sky-400/50 shadow-lg shadow-sky-500/10 scale-[0.98]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {/* Pulse line indicator inside active button */}
              {activeEffect === 'snow' && (
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-pulse" />
              )}
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 shadow-sm transition-colors duration-300 group-hover:text-white">
                Preset 01
              </div>
              <div className="text-lg sm:text-xl font-light flex items-center gap-2 text-white">
                <Snowflake size={18} className={`transition-transform ${activeEffect === 'snow' ? 'animate-spin text-sky-400' : 'text-slate-400 group-hover:text-white'}`} style={{ animationDuration: '5s' }} />
                <span>Snowflakes</span>
              </div>
            </button>

            {/* Balloons Button */}
            <button
              id="btnBalloons"
              onClick={handleBalloonTrigger}
              className={`flex-1 py-5 px-6 rounded-2xl border transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50 group text-center flex flex-col items-center justify-center relative overflow-hidden ${
                activeEffect === 'balloons'
                  ? 'bg-white/15 border-rose-400/50 shadow-lg shadow-rose-500/10 scale-[0.98]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {/* Pulse line indicator inside active button */}
              {activeEffect === 'balloons' && (
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent animate-pulse" />
              )}
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 shadow-sm transition-colors duration-300 group-hover:text-white">
                Preset 02
              </div>
              <div className="text-lg sm:text-xl font-light flex items-center gap-2 text-white">
                <Sparkles size={18} className={`transition-transform ${activeEffect === 'balloons' ? 'animate-bounce text-rose-400' : 'text-slate-400 group-hover:text-white'}`} />
                <span>Balloons</span>
              </div>
            </button>
          </div>

          {/* Real-time Dynamic Feedback Timer */}
          <div className="w-full min-h-[44px]">
            <AnimatePresence mode="wait">
              {activeEffect ? (
                <motion.div
                  key={activeEffect}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2.5"
                >
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${activeEffect === 'snow' ? 'bg-sky-400 animate-ping' : 'bg-rose-400 animate-ping'}`} />
                      {activeEffect === 'snow' ? 'Dispensing Ice Particles' : 'Inflating Helium Balloons'}
                    </span>
                    <span className="font-bold text-white tracking-widest">
                      {timeLeft.toFixed(1)}s remaining
                    </span>
                  </div>

                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        activeEffect === 'snow' ? 'bg-sky-400 shadow-[0_0_8px_#38bdf8]' : 'bg-rose-400 shadow-[0_0_8px_#fb7185]'
                      }`}
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{ duration: 5.0, ease: 'linear' }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-xs text-slate-400 font-mono tracking-widest"
                >
                  System Standby • Event Sequencing Ready
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. Executive Status and Telemetry panel matching the spec layout perfectly */}
          <div className="grid grid-cols-3 gap-8 sm:gap-12 w-full pt-8 border-t border-white/5 justify-center items-center">
            
            {/* Status Segment */}
            <div className="text-center space-y-1">
              <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-semibold">
                Status
              </div>
              <div className="text-xs text-emerald-400 flex items-center justify-center gap-1.5 font-medium">
                <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${activeEffect ? 'animate-pulse' : ''}`}></span>
                {activeEffect ? 'Active' : 'Ready'}
              </div>
            </div>

            {/* Venue Segment */}
            <div className="text-center space-y-1">
              <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-semibold">
                Venue
              </div>
              <div className="text-xs text-slate-300 font-medium truncate max-w-full px-1">
                Hall of Mirrors
              </div>
            </div>

            {/* Active Particle Counter */}
            <div className="text-center space-y-1">
              <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-semibold">
                Particles
              </div>
              <div className="text-xs text-slate-300 font-mono font-medium">
                {activeEffect === 'snow' ? snowflakes.length : activeEffect === 'balloons' ? balloons.length : '0'}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
