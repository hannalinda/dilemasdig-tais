const votos = {
  privacidade: 0,
  ia: 0,
  conectividade: 0
};

const nomesDilemas = {
  privacidade: "Privacidade vs. Conveniência",
  ia: "Inteligência Artificial no Trabalho",
  conectividade: "Conectividade vs. Presença"
};

function votar(dilema) {
  if (votos.hasOwnProperty(dilema)) {
    votos[dilema]++;
    
    const contador = document.getElementById(`votes-${dilema}`);
    contador.textContent = `${votos[dilema]} ${votos[dilema] === 1 ? 'voto' : 'votos'}`;
    
    const feedback = document.getElementById('feedback-text');
    feedback.textContent = `Você votou em "${nomesDilemas[dilema]}". Obrigado por participar!`;
  }
}