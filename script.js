// Ano automático no rodapé
document.getElementById('year').textContent = new Date().getFullYear();
 
// Menu mobile (hambúrguer)
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
 
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const aberto = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', aberto ? 'true' : 'false');
  });
 
  // Fecha o menu ao clicar em um link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
 
// Efeito de digitação no "terminal" do hero
const linhas = [
  'documentos ......... currículo, impressão, digitação',
  'gov.br .............. cpf, inss, carteira digital',
  'empresas (mei) ...... abertura, das, nota fiscal',
  'outros .............. digitalização, boletos'
];
 
const termOut = document.getElementById('termOut');
let linhaAtual = 0;
let charAtual = 0;
 
const coresLinha = ['tl-amber', 'tl-green', 'tl-blue', 'tl-red'];
 
function renderTerminal(linhasCompletas, linhaParcial) {
  if (!termOut) return;
  let html = linhasCompletas
    .map((linha, i) => `<span class="term-out-line ${coresLinha[i % coresLinha.length]}">${linha}</span>`)
    .join('');
  if (linhaParcial !== null && linhaParcial !== undefined) {
    const cor = coresLinha[linhasCompletas.length % coresLinha.length];
    html += `<span class="term-out-line ${cor}">${linhaParcial}</span>`;
  }
  termOut.innerHTML = html;
}
 
function digitar() {
  if (!termOut) return;
 
  if (linhaAtual >= linhas.length) {
    // reinicia o ciclo depois de uma pausa
    setTimeout(() => {
      termOut.innerHTML = '';
      linhaAtual = 0;
      charAtual = 0;
      digitar();
    }, 2200);
    return;
  }
 
  const linha = linhas[linhaAtual];
 
  if (charAtual <= linha.length) {
    renderTerminal(linhas.slice(0, linhaAtual), linha.slice(0, charAtual));
    charAtual++;
    setTimeout(digitar, 28);
  } else {
    linhaAtual++;
    charAtual = 0;
    setTimeout(digitar, 350);
  }
}
 
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  digitar();
} else if (termOut) {
  renderTerminal(linhas, null);
}
 
