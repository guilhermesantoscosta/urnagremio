// Urna Eletrônica para Grêmio Estudantil
// Autor: Guilherme Henrique Santos da Costa (guilherme.santos.costa@alumni.usp.br)
// Licença: MIT com cláusula de autorização comercial
const $ = s => document.querySelector(s);
const PFX = 'gremio-v1-';
const sha = async t => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)))]
  .map(b => b.toString(16).padStart(2, '0')).join('');
const cod = n => { const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(n)), b => a[b % a.length]).join(''); };
const ls = {
  get: (k, d = null) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { alert('Armazenamento do navegador cheio'); } }
};
const redim = (file, max = 240) => new Promise(r => {
  const i = new Image();
  i.onload = () => { const k = Math.min(1, max / Math.max(i.width, i.height)), c = document.createElement('canvas');
    c.width = i.width * k; c.height = i.height * k; c.getContext('2d').drawImage(i, 0, 0, c.width, c.height);
    r(c.toDataURL('image/jpeg', .7)); };
  i.src = URL.createObjectURL(file);
});
const toast = t => {
  let m = $('#msg');
  if (!m) { m = document.createElement('div'); m.id = 'msg';
    m.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#f1c40f;color:#222;padding:10px 16px;border-radius:8px;font-weight:bold;z-index:99;max-width:90%;text-align:center';
    document.body.append(m); }
  m.textContent = t; m.style.display = 'block'; clearTimeout(m._t); m._t = setTimeout(() => m.style.display = 'none', 3500);
};
const wake = () => { try { navigator.wakeLock && navigator.wakeLock.request('screen').catch(() => {}); } catch {} };
document.addEventListener('visibilitychange', () => { if (!document.hidden) wake(); });
