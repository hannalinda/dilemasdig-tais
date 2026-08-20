document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const meterBar = document.getElementById('meterBar');
    const strengthText = document.getElementById('strengthText');
    const percentText = document.getElementById('percentText');
    const crackTime = document.getElementById('crackTime');

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        if (!password) {
            resetMeter();
            return;
        }

        const result = evaluatePassword(password);
        updateUI(result);
    });

    function resetMeter() {
        meterBar.style.width = '0%';
        meterBar.style.backgroundColor = 'transparent';
        strengthText.textContent = 'Digite algo acima';
        strengthText.style.color = 'var(--text-secondary, #666)';
        percentText.textContent = '';
        crackTime.textContent = '';
    }

    function evaluatePassword(pwd) {
        let score = 0;
        let poolSize = 0;

        // Critérios de complexidade
        if (/[a-z]/.test(pwd)) poolSize += 26;
        if (/[A-Z]/.test(pwd)) poolSize += 26;
        if (/[0-9]/.test(pwd)) poolSize += 10;
        if (/[^a-zA-Z0-9]/.test(pwd)) poolSize += 32;

        // Pontuação base por comprimento
        score += pwd.length * 4;

        // Bônus por combinação de caracteres
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score += 10;
        if (/[0-9]/.test(pwd) && (/[a-z]/.test(pwd) || /[A-Z]/.test(pwd))) score += 10;
        if (/[^a-zA-Z0-9]/.test(pwd)) score += 15;

        // Penalidades por padrões simples
        if (/^([a-zA-Z0-9])\1+$/.test(pwd)) score -= 20; // Caracteres repetidos
        if (pwd.length < 8) score = Math.min(score, 25);

        const percentage = Math.min(Math.max(score, 5), 100);
        const timeToCrack = estimateCrackTime(pwd.length, poolSize);

        return { percentage, timeToCrack };
    }

    function estimateCrackTime(length, pool) {
        if (length === 0 || pool === 0) return 'Instantâneo';
        
        // Simulação de ~10 bilhões de tentativas por segundo (ataque de força bruta offline)
        const combinations = Math.pow(pool, length);
        const seconds = combinations / 10000000000;

        if (seconds < 1) return 'Tempo para quebrar: Instantâneo';
        if (seconds < 60) return `Tempo para quebrar: ~${Math.round(seconds)} segundos`;
        if (seconds < 3600) return `Tempo para quebrar: ~${Math.round(seconds / 60)} minutos`;
        if (seconds < 86400) return `Tempo para quebrar: ~${Math.round(seconds / 3600)} horas`;
        if (seconds < 31536000) return `Tempo para quebrar: ~${Math.round(seconds / 86400)} dias`;
        if (seconds < 3153600000) return `Tempo para quebrar: ~${Math.round(seconds / 31536000)} anos`;
        
        return 'Tempo para quebrar: Séculos';
    }

    function updateUI({ percentage, timeToCrack }) {
        meterBar.style.width = `${percentage}%`;
        percentText.textContent = `${percentage}%`;
        crackTime.textContent = timeToCrack;

        if (percentage < 35) {
            meterBar.style.backgroundColor = '#e74c3c'; // Vermelho (Fraca)
            strengthText.textContent = 'Senha Muito Fraca';
            strengthText.style.color = '#e74c3c';
        } else if (percentage < 60) {
            meterBar.style.backgroundColor = '#f39c12'; // Laranja (Média)
            strengthText.textContent = 'Senha Moderada';
            strengthText.style.color = '#f39c12';
        } else if (percentage < 85) {
            meterBar.style.backgroundColor = '#2ecc71'; // Verde (Forte)
            strengthText.textContent = 'Senha Forte';
            strengthText.style.color = '#2ecc71';
        } else {
            meterBar.style.backgroundColor = '#27ae60'; // Verde Escuro (Muito Forte)
            strengthText.textContent = 'Excelente Senha!';
            strengthText.style.color = '#27ae60';
        }
    }
});