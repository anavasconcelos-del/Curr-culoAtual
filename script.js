// ===========================
// Currículo – Ana Júlia
// ===========================

// Marca que o JavaScript está ativo (o CSS só esconde as seções para animar se o JS rodar)
document.documentElement.classList.add('js');

// ---------- 1. Tema claro / escuro ----------
const raiz = document.documentElement;
const btnTema = document.getElementById('btn-tema');
const temaLabel = document.getElementById('tema-label');

function aplicarTema(tema) {
  raiz.setAttribute('data-theme', tema);
  temaLabel.textContent = tema === 'dark' ? 'Tema claro' : 'Tema escuro';
}

function lerTemaSalvo() {
  try { return localStorage.getItem('tema'); } catch (e) { return null; }
}

function salvarTema(tema) {
  try { localStorage.setItem('tema', tema); } catch (e) { /* navegador bloqueou */ }
}

// Usa o tema salvo; se não houver, segue a preferência do sistema
const temaInicial = lerTemaSalvo() ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
aplicarTema(temaInicial);

btnTema.addEventListener('click', () => {
  const novo = raiz.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  aplicarTema(novo);
  salvarTema(novo);
});

// ---------- 2. Salvar em PDF (abre a impressão do navegador) ----------
document.getElementById('btn-imprimir').addEventListener('click', () => {
  mostrarAviso('Escolha "Salvar como PDF" no destino da impressão');
  setTimeout(() => window.print(), 600);
});

// ---------- 3. Copiar e-mail ----------
document.querySelectorAll('.copy-btn').forEach((botao) => {
  botao.addEventListener('click', async () => {
    const texto = botao.dataset.copy;
    try {
      await navigator.clipboard.writeText(texto);
      mostrarAviso('E-mail copiado!');
    } catch (e) {
      mostrarAviso(texto);
    }
  });
});

// ---------- 4. Aviso rápido (toast) ----------
const toast = document.getElementById('toast');
let timerAviso;

function mostrarAviso(mensagem) {
  toast.textContent = mensagem;
  toast.classList.add('show');
  clearTimeout(timerAviso);
  timerAviso = setTimeout(() => toast.classList.remove('show'), 2400);
}

// ---------- 5. Animação das seções ao rolar a página ----------
const secoes = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  secoes.forEach((secao, i) => {
    secao.style.transitionDelay = `${Math.min(i * 60, 300)}ms`;
    observador.observe(secao);
  });
} else {
  secoes.forEach((secao) => secao.classList.add('visible'));
}

// Garante que tudo aparece na impressão, mesmo o que ainda não foi rolado
window.addEventListener('beforeprint', () => {
  secoes.forEach((secao) => secao.classList.add('visible'));
});

// ---------- 6. Ano atual no rodapé ----------
document.getElementById('ano-atual').textContent = new Date().getFullYear();
