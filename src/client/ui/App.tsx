import { useState, useEffect } from 'react';

export default function App() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data.type === 'init') {
        setMessages((prev) => [...prev, '✅ Connected to TypeScript client']);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const callNui = async (action: string) => {
    try {
      const res = await fetch(`https://${GetParentResourceName()}/${action}`, {
        method: 'POST',
        body: JSON.stringify({ source: GetPlayerServerId(), amount: 500, reason: 'test', item: 'burger' }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, `✅ ${action} sent via tRPC`]);
    } catch (err) {
      setMessages((prev) => [...prev, `❌ Error: ${err}`]);
    }
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen p-10 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-emerald-400 text-center mb-2">MERCY</h1>
        <p className="text-center text-zinc-400 mb-12">TypeScript + React 19 + tRPC NUI</p>

        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => callNui('giveMoney')} className="bg-emerald-600 hover:bg-emerald-700 p-6 rounded-2xl text-xl font-medium">💰 Give Money (tRPC)</button>
          <button onClick={() => callNui('giveItem')} className="bg-purple-600 hover:bg-purple-700 p-6 rounded-2xl text-xl font-medium">📦 Give Item (tRPC)</button>
          <button onClick={() => callNui('joinVoice')} className="bg-blue-600 hover:bg-blue-700 p-6 rounded-2xl text-xl font-medium">🎙️ Join Voice (tRPC)</button>
          <button onClick={() => callNui('spinWheel')} className="bg-orange-600 hover:bg-orange-700 p-6 rounded-2xl text-xl font-medium">🎰 Spin Casino Wheel</button>
        </div>

        <div className="mt-12 bg-black/60 p-8 rounded-3xl border border-zinc-800">
          <h3 className="text-xl mb-4 font-medium">Live Debug Log</h3>
          <div className="font-mono text-sm text-emerald-300 h-64 overflow-y-auto space-y-1">
            {messages.length === 0 && <div className="text-zinc-500">Click buttons above...</div>}
            {messages.map((m, i) => <div key={i}>{m}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}