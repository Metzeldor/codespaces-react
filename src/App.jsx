import { useEffect, useState } from 'react';
import './App.css';

const conceptos = [
  { id: 'glass', titulo: 'Glassmorphism', desc: 'Fondo translúcido con blur y borde sutil.' },
  { id: 'neu', titulo: 'Neumorfismo', desc: 'Sombras suaves que simulan relieve.' },
  { id: 'neon', titulo: 'Neón', desc: 'Resplandor con text-shadow y box-shadow.' },
  { id: 'gradient', titulo: 'Gradiente animado', desc: 'background-size + keyframes.' },
  { id: 'flip', titulo: 'Flip card 3D', desc: 'transform-style: preserve-3d al pasar el mouse.' },
  { id: 'led', titulo: 'Reloj LED', desc: 'Estética de 7 segmentos con fuente monoespaciada.' },
];

function RelojLed() {
  const [hora, setHora] = useState(new Date());
  const [formato12, setFormato12] = useState(false);
  const [color, setColor] = useState('#ff2d2d');

  useEffect(() => {
    const t = setInterval(() => setHora(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  let h = hora.getHours();
  const sufijo = h >= 12 ? 'PM' : 'AM';
  if (formato12) h = h % 12 || 12;
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="led-wrap">
      <div className="led-display" style={{ '--led': color }}>
        {pad(h)}:{pad(hora.getMinutes())}:{pad(hora.getSeconds())}
        {formato12 && <small>{sufijo}</small>}
      </div>
      <div className="led-controls">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          aria-label="Color del LED"
        />
        <button onClick={() => setFormato12(!formato12)}>
          {formato12 ? '12H' : '24H'}
        </button>
      </div>
    </div>
  );
}

function Demo({ id }) {
  switch (id) {
    case 'glass':
      return <div className="demo-glass">Vidrio esmerilado</div>;
    case 'neu':
      return <div className="demo-neu">Relieve suave</div>;
    case 'neon':
      return <div className="demo-neon">NEÓN</div>;
    case 'gradient':
      return <button className="demo-gradient">Hazme clic</button>;
    case 'flip':
      return (
        <div className="flip">
          <div className="flip-inner">
            <div className="flip-front">Frente</div>
            <div className="flip-back">Reverso</div>
          </div>
        </div>
      );
    case 'led':
      return <RelojLed />;
    default:
      return null;
  }
}

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <span className="badge">CSS Design Concepts</span>
        <h1>
          Diseños en <span className="grad-text">CSS puro</span>
        </h1>
        <p>Una colección de efectos y técnicas visuales construidos con React y CSS.</p>
        <a href="#galeria" className="cta">Ver galería</a>
      </header>

      <main id="galeria" className="grid">
        {conceptos.map((c) => (
          <article className="card" key={c.id}>
            <div className="stage">
              <Demo id={c.id} />
            </div>
            <h3>{c.titulo}</h3>
            <p>{c.desc}</p>
          </article>
        ))}
      </main>

      <footer className="footer">Hecho por Andrés Tejada · React + Vite</footer>
    </div>
  );
}