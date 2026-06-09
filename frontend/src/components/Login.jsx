import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'sheila' && password === '1234') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-brand-800/50 backdrop-blur-md p-8 rounded-2xl border border-brand-700 w-full max-w-md shadow-2xl"
      >
        <h1 className="font-pixel text-4xl text-center mb-8 text-purple-300">SYSTEM LOGIN</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-brand-900/80 border border-brand-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="usuario"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-900/80 border border-brand-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="••••"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm font-medium text-center"
            >
              Acceso denegado.
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] font-pixel text-lg"
          >
            INGRESAR
          </button>
        </form>
      </motion.div>
    </div>
  );
}
