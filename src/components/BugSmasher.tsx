import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Bug {
  id: number;
  x: number;
  y: number;
  color: string;
}

const BugSmasher: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [gameActive, setGameActive] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [showGame, setShowGame] = useState(true);
  const [bugIdCounter, setBugIdCounter] = useState(0);

  const colors = [
    '#F59E0B', // Amber (primary accent)
    '#3B82F6', // Blueprint-500
    '#10B981', // Emerald-500 (green)
    '#8B5CF6', // Violet-500 (purple)
    '#EF4444', // Red-500
  ];

  const startGame = () => {
    setGameActive(true);
    setTimeLeft(15);
    setScore(0);
    setBugs([]);
    setGameEnded(false);
    setShowEndMessage(false);
    setBugIdCounter(0);
  };

  const spawnBug = useCallback(() => {
    if (!gameActive) return;

    const newBug: Bug = {
      id: bugIdCounter,
      x: Math.random() * 80 + 10, // 10% to 90% of container width
      y: Math.random() * 60 + 20, // 20% to 80% of container height
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setBugs(prev => [...prev, newBug]);
    setBugIdCounter(prev => prev + 1);

    // Remove bug after 2-4 seconds
    setTimeout(() => {
      setBugs(prev => prev.filter(bug => bug.id !== newBug.id));
    }, 2000 + Math.random() * 2000);
  }, [gameActive, bugIdCounter, colors]);

  const smashBug = (bugId: number) => {
    if (!gameActive) return;
    
    setScore(prev => prev + 10);
    setBugs(prev => prev.filter(bug => bug.id !== bugId));
  };

  // Timer effect
  useEffect(() => {
    if (!gameActive || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, gameActive]);

  // Bug spawning effect
  useEffect(() => {
    if (!gameActive) return;

    const spawnInterval = setInterval(() => {
      spawnBug();
    }, 800 + Math.random() * 400); // 800-1200ms intervals

    return () => clearInterval(spawnInterval);
  }, [gameActive, spawnBug]);

  // Game end effect
  useEffect(() => {
    if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      setGameEnded(true);
      
      // Show end message after a delay
      setTimeout(() => {
        setShowEndMessage(true);
        
        // Hide game and scroll to projects after tagline is shown
        setTimeout(() => {
          setShowGame(false);
          // Scroll to projects section with slower, more gradual scroll
          const projectsElement = document.getElementById('projects');
          if (projectsElement) {
            const startPosition = window.pageYOffset;
            const targetPosition = projectsElement.offsetTop;
            const distance = targetPosition - startPosition;
            const duration = 2000; // 2 seconds for slower scroll
            let startTime: number | null = null;

            const animation = (currentTime: number) => {
              if (startTime === null) startTime = currentTime;
              const timeElapsed = currentTime - startTime;
              const progress = Math.min(timeElapsed / duration, 1);
              
              // Easing function for smoother scroll
              const easeInOutCubic = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
              
              window.scrollTo(0, startPosition + distance * easeInOutCubic);
              
              if (progress < 1) {
                requestAnimationFrame(animation);
              }
            };
            
            requestAnimationFrame(animation);
          }
        }, 3000); // Wait 3 seconds after tagline appears
      }, 1000);
    }
  }, [timeLeft, gameActive]);


  return (
    <div className="h-[calc(100vh-4rem)] bg-[#0b0b0c] relative overflow-hidden flex items-start justify-center pt-0">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500 opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500 opacity-5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500 opacity-3 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>


      {showGame && (
        <div className="max-w-5xl mx-auto w-full px-6 relative z-10 h-full flex flex-col justify-center">
        {!gameEnded ? (
          // Game Interface
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >

            {/* Game Container */}
            <div className="bg-[#121214] backdrop-blur-sm rounded-3xl p-6 border border-[#1f1f21] shadow-2xl">
              {/* Score and Timer */}
              <div className="flex justify-center items-center space-x-12 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-amber-500">Score</div>
                  <motion.div
                    key={score}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-xl font-bold text-[#e6e6e6]"
                  >
                    {score}
                  </motion.div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-amber-500">Time</div>
                  <motion.div
                    key={timeLeft}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className={`text-xl font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-[#e6e6e6]'}`}
                  >
                    {timeLeft}
                  </motion.div>
                </div>
              </div>

              {/* Game Area */}
              <div className="relative w-full h-[450px] bg-gradient-to-br from-[#0A1828] to-[#051018] rounded-2xl border border-[#1f1f21] overflow-hidden shadow-2xl">
                {/* Start Button */}
                {!gameActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-[#0b0b0c] bg-opacity-90 backdrop-blur-sm"
                  >
                    <div className="text-center">
                      <h3 className="text-4xl font-bold text-[#e6e6e6] mb-6">Ready to Play?</h3>
                      <p className="text-xl text-amber-500 mb-8">Click the bugs as fast as you can!</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-amber-500 hover:bg-amber-600 text-[#0b0b0c] font-bold px-12 py-4 rounded-2xl transition-all duration-200 text-2xl shadow-2xl"
                        onClick={startGame}
                      >
                        START GAME
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Bugs */}
                <AnimatePresence>
                  {bugs.map((bug) => (
                    <motion.div
                      key={bug.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute w-16 h-16 cursor-pointer"
                      style={{
                        left: `${bug.x}%`,
                        top: `${bug.y}%`,
                      }}
                      onClick={() => smashBug(bug.id)}
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 5, -5, 0],
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-full h-full"
                      >
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle cx="50" cy="50" r="45" fill={bug.color} stroke="#1a202c" strokeWidth="2"/>
                          <circle cx="35" cy="40" r="8" fill="#1a202c"/>
                          <circle cx="65" cy="40" r="8" fill="#1a202c"/>
                          <circle cx="35" cy="40" r="4" fill="#ffffff"/>
                          <circle cx="65" cy="40" r="4" fill="#ffffff"/>
                          <path d="M30 60 Q50 45 70 60" stroke="#1a202c" strokeWidth="3" fill="none"/>
                          <circle cx="25" cy="25" r="3" fill="#1a202c"/>
                          <circle cx="75" cy="25" r="3" fill="#1a202c"/>
                          <circle cx="15" cy="45" r="2" fill="#1a202c"/>
                          <circle cx="85" cy="45" r="2" fill="#1a202c"/>
                          <circle cx="20" cy="70" r="2" fill="#1a202c"/>
                          <circle cx="80" cy="70" r="2" fill="#1a202c"/>
                        </svg>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          // End State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-[#121214] backdrop-blur-sm rounded-2xl p-6 border border-[#1f1f21]">
              <motion.h3
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-3xl font-bold text-[#e6e6e6] mb-4"
              >
                🎉 Game Over!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-amber-500 mb-6"
              >
                Final Score: <span className="text-4xl font-bold text-[#e6e6e6]">{score}</span>
              </motion.p>
              
              {/* End Message */}
              <AnimatePresence>
                {showEndMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-[#0b0b0c]">
                      <motion.h4
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-2xl font-bold mb-3"
                      >
                        I enjoy turning chaos into clarity.
                      </motion.h4>
                      <motion.h4
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 }}
                        className="text-2xl font-bold mb-4"
                      >
                        Here are a few examples.
                      </motion.h4>
                      <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        href="#projects"
                        className="inline-block bg-[#0b0b0c] text-amber-500 font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 text-xl"
                      >
                        View My Projects →
                      </motion.a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-amber-500 hover:bg-amber-600 text-[#0b0b0c] font-bold px-8 py-4 rounded-xl transition-all duration-200 text-xl"
                onClick={startGame}
              >
                Play Again
              </motion.button>
            </div>
          </motion.div>
        )}
        </div>
      )}
    </div>
  );
};

export default BugSmasher;
