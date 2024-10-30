import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DiwaliCelebration = () => {


// console.log(id);
  const [showFireworks, setShowFireworks] = useState(false);
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });


  const { id } = useParams(); // Get the id from the URL parameters
  const [data, setData] = useState([]); // State to store product data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
      async function fetchProducts() {
          try {
              const response = await fetch(`https://diwali-be-2.onrender.com/api/v1/user/${id}`
                
              ); // Include id in the URL
              if (!response.ok) throw new Error('Network response was not ok');

              const result = await response.json();
              setData(result.result); // Update state with fetched data
          } catch (err) {
              setError(err.message);
              console.log("erro",err.message) // Update error state if fetch fails
          } finally {
              setLoading(false); // Stop loading after fetch completes
          }
      }

      fetchProducts();
  }, [id]); // Add id to the dependency array

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePos({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   },[1]);
// console.log(data)
  const createParticles = (x, y) => {
    const newParticles = [...Array(20)].map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (Math.PI * 2 * i) / 20,
      velocity: 2 + Math.random() * 2,
      life: 100
    }));
    setParticles(prev => [...prev, ...newParticles]);
  };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setParticles(prev => prev.filter(p => p.life > 0).map(p => ({
//         ...p,
//         x: p.x + Math.cos(p.angle) * p.velocity,
//         y: p.y + Math.sin(p.angle) * p.velocity,
//         life: p.life - 1
//       })));
//     }, 16);
//     return () => clearInterval(interval);
//   }, [1]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#070215] to-[#1f0c58] relative overflow-hidden">
       
      {/* Particle Effects */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-yellow-400"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.life / 100,
            transform: `scale(${particle.life / 100})`
          }}
        />
      ))}

      {/* Custom Sparkle SVGs */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`
          }}
        >
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-yellow-200 opacity-60">
            <path
              d="M12 0 L14 9 L23 12 L14 15 L12 24 L10 15 L1 12 L10 9 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}

      {/* Floating Lanterns */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`lantern-${i}`}
          className="absolute animate-float"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + (i % 3) * 15}%`,
            animationDelay: `${i * 0.5}s`
          }}
        >
          <svg viewBox="0 0 60 100" className="w-16 h-24">
            <path
              d="M30,0 L30,20 M20,20 Q30,50 40,20 L30,60 L20,20"
              className="stroke-red-500 fill-orange-400"
              strokeWidth="2"
            />
            <circle
              cx="30"
              cy="40"
              r="12"
              className="fill-yellow-400 animate-glow"
            />
            <path
              d="M25,35 Q30,45 35,35"
              className="stroke-orange-600"
              fill="none"
              strokeWidth="1"
            />
          </svg>
        </div>
      ))}

      {/* Animated Firecrackers */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`cracker-${i}`}
          className="absolute animate-rise"
          style={{
            left: `${15 + i * 25}%`,
            bottom: '0',
            animationDelay: `${i * 1}s`
          }}
        >
          <svg viewBox="0 0 40 120" className="w-8 h-24">
            <path
              d="M20,120 L20,40"
              className="stroke-yellow-600"
              strokeWidth="2"
            />
            <circle
              cx="20"
              cy="30"
              r="8"
              className="fill-red-500 animate-pulse"
            />
            {/* Spark trails */}
            {[...Array(5)].map((_, j) => (
              <path
                key={j}
                d={`M20,${40 + j * 10} L${25 + Math.random() * 10},${45 + j * 10}`}
                className="stroke-yellow-400 animate-sparkle"
                strokeWidth="1"
                style={{ animationDelay: `${j * 0.2}s` }}
              />
            ))}
          </svg>
        </div>
      ))}

      {/* Flower Rangoli */}
      <div className="absolute left-1/2 bottom-10 transform -translate-x-1/2">
        <svg viewBox="0 0 200 200" className="w-64 h-64">
          {[...Array(8)].map((_, i) => (
            <g
              key={`petal-${i}`}
              transform={`rotate(${i * 45} 100 100)`}
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <path
                d="M100,60 Q120,90 100,120 Q80,90 100,60"
                className="fill-pink-500 stroke-pink-600"
                strokeWidth="1"
              />
              <path
                d="M100,70 Q110,90 100,110"
                className="stroke-pink-400"
                fill="none"
              />
            </g>
          ))}
          <circle
            cx="100"
            cy="100"
            r="15"
            className="fill-yellow-400 animate-pulse"
          />
        </svg>
      </div>

      {/* Glowing Diyas */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`diya-${i}`}
          className="absolute animate-flicker"
          style={{
            left: `${10 + i * 18}%`,
            bottom: '20px',
            animationDelay: `${i * 0.3}s`
          }}
        >
          <svg viewBox="0 0 50 50" className="w-12 h-12">
            <path
              d="M25,10 Q35,20 25,30 Q15,20 25,10"
              className="fill-yellow-400 animate-flame"
            />
            <path
              d="M20,30 H30 L28,40 H22 Z"
              className="fill-amber-700"
            />
            <circle
              cx="25"
              cy="15"
              r="3"
              className="fill-orange-300 animate-glow"
            />
          </svg>
        </div>
      ))}

      {/* Interactive Area */}
      <div
        className="absolute inset-0 cursor-crosshair"
        onClick={(e) => {
          setShowFireworks(true);
          createParticles(e.clientX, e.clientY);
          setTimeout(() => setShowFireworks(false), 1000);
        }}
      />

      {/* Light Trail Effect */}
      <div
        className="pointer-events-none absolute w-8 h-8 rounded-full bg-yellow-400/20 blur-xl"
        style={{
          left: mousePos.x - 16,
          top: mousePos.y - 16,
          transition: 'all 0.1s ease-out'
        }}
      />

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className='absolute left-auto right-auto md:top-[100px] top-[90px]'>
<div className='flex flex-col justify-center items-center gap-6 md:gap-0'>
    <img src={data.img} alt="profile pic" className='md:w-36 md:h-36 w-24 h-24 rounded-full' />
    <h1 className='text-[#c46e28] text-center md:text-2xl text-xl font-mono md:bg-transparent bg-[#0000007a]'>{data.name}</h1>
</div>
</div>
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-800 mb-6 animate-pulse">
          Happy Diwali
        </h1>
        <p className="md:text-xl text-yellow-100 mb-8 max-w-md text-sm">
         {data.discripiton}
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes flame {
          0%, 100% { transform: scaleY(1) translateY(0); }
          50% { transform: scaleY(1.1) translateY(-2px); }
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes rise {
          0% { transform: translateY(0); opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-300px); opacity: 0; }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-flame { animation: flame 0.5s ease-in-out infinite; }
        .animate-flicker { animation: flicker 1.5s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-rise { animation: rise 3s ease-out infinite; }
        .animate-sparkle { animation: sparkle 0.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default DiwaliCelebration;