// Base de Dados de Posts Simulado
const postsAlgoritmo = [
  {
    titulo: "Por que apenas quem pensa como você tem razão no debate atual",
    texto: "Análise exclusiva mostra como as opiniões contrárias são infundadas. Continue consumindo este tipo de conteúdo para reforçar sua visão.",
    tag: "Bolha do Conforto",
    autor: "@bolha_inteligente • Patrocinado",
    eco: true
  },
  {
    titulo: "O grupo rival está prestes a tomar uma atitude drástica!",
    texto: "Conteúdo gerado para provocar indignação imediata. Postagens com forte carga emocional geram 400% mais engajamento e compartilhamento.",
    tag: "Ultrapolarização",
    autor: "@noticias_urgentes",
    eco: true
  },
  {
    titulo: "Você PRECISA comprar isto agora antes que acabe",
    texto: "Com base nos seus microdados de navegação das últimas 2 horas, identificamos a sua maior fraqueza de consumo.",
    tag: "Hiper-Targeting",
    autor: "@anunciante_invisivel",
    eco: true
  }
];

const postsNeutros = [
  {
    titulo: "Entenda os múltiplos pontos de vista sobre a questão global",
    texto: "Uma cobertura equilibrada que apresenta visões divergentes sem induzir ao conflito ou sensacionalismo.",
    tag: "Visão Plural",
    autor: "@jornalismo_aberto",
    eco: false
  },
  {
    titulo: "Como funcionam os algoritmos de recomendação social?",
    texto: "Aprenda sobre câmaras de eco, viés de confirmação e como retomar o controle sobre a sua dieta de informação diária.",
    tag: "Letramento Digital",
    autor: "@educacao_media",
    eco: false
  },
  {
    titulo: "Avanço científico traz novas perspectivas para o oceano",
    texto: "Pesquisadores internacionais publicam estudo conjunto sobre ecossistemas marinhos sem qualquer viés político ou comercial.",
    tag: "Ciência Aberta",
    autor: "@ciencia_hoje",
    eco: false
  }
];

// Elementos da DOM
const feedContainer = document.getElementById('feed');
const btnAlgoritmo = document.getElementById('btn-algoritmo');
const btnNeutro = document.getElementById('btn-neutro');

// Elementos das Métricas
const valVicio = document.getElementById('val-vicio');
const barVicio = document.getElementById('bar-vicio');

const valDiversidade = document.getElementById('val-diversidade');
const barDiversidade = document.getElementById('bar-diversidade');

const valPolarizacao = document.getElementById('val-polarizacao');
const barPolarizacao = document.getElementById('bar-polarizacao');

const insightText = document.getElementById('insight-text');

// Função para renderizar os cards no Feed
function renderizarFeed(posts) {
  feedContainer.innerHTML = '';

  posts.forEach((post, index) => {
    const card = document.createElement('article');
    card.className = `post-card ${post.eco ? 'echo-chamber' : 'neutral'}`;
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
      <div class="card-header">
        <span class="tag-badge">${post.tag}</span>
        <span class="author-info">${post.autor}</span>
      </div>
      <h3>${post.titulo}</h3>
      <p>${post.texto}</p>
    `;

    feedContainer.appendChild(card);
  });

  // Re-inicializa os ícones do Lucide para dinamismo se necessário
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Função para atualizar as estatísticas laterais
function atualizarMetricas(modoAlgoritmo) {
  if (modoAlgoritmo) {
    // Modo Algoritmo (Valores Altos de Vício/Polarização)
    valVicio.textContent = '94%';
    barVicio.style.width = '94%';
    barVicio.className = 'progress-fill danger';

    valDiversidade.textContent = '08%';
    barDiversidade.style.width = '8%';
    barDiversidade.className = 'progress-fill danger';

    valPolarizacao.textContent = '91%';
    barPolarizacao.style.width = '91%';
    barPolarizacao.className = 'progress-fill danger';

    insightText.textContent = 'O algoritmo está priorizando conteúdos inflamatórios e hiper-personalizados para maximizar o seu tempo de tela.';
  } else {
    // Modo Neutro (Valores Saudáveis)
    valVicio.textContent = '25%';
    barVicio.style.width = '25%';
    barVicio.className = 'progress-fill success';

    valDiversidade.textContent = '88%';
    barDiversidade.style.width = '88%';
    barDiversidade.className = 'progress-fill success';

    valPolarizacao.textContent = '15%';
    barPolarizacao.style.width = '15%';
    barPolarizacao.className = 'progress-fill success';

    insightText.textContent = 'Modo cronológico e diversificado ativado. Você está exposto a múltiplas perspectivas sem indução do viés de confirmação.';
  }
}

// Event Listeners
btnAlgoritmo.addEventListener('click', () => {
  if (!btnAlgoritmo.classList.contains('active')) {
    btnAlgoritmo.classList.add('active');
    btnNeutro.classList.remove('active');
    renderizarFeed(postsAlgoritmo);
    atualizarMetricas(true);
  }
});

btnNeutro.addEventListener('click', () => {
  if (!btnNeutro.classList.contains('active')) {
    btnNeutro.classList.add('active');
    btnAlgoritmo.classList.remove('active');
    renderizarFeed(postsNeutros);
    atualizarMetricas(false);
  }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  renderizarFeed(postsAlgoritmo);
  atualizarMetricas(true);
  if (window.lucide) {
    lucide.createIcons();
  }
});