document.getElementById('curriculo-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar o envio padrão do formulário

    const formData = new FormData(event.target);
    const data = {
        nome: formData.get('nome'),
        experiencia: formData.get('experiencia'),
        educacao: formData.get('educacao'),
        habilidades: formData.get('habilidades')
    };

    fetch('http://127.0.0.1:5000/api/curriculo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('mensagem').textContent = result.message;
    })
    .catch(error => {
        console.error('Erro ao cadastrar currículo:', error);
        document.getElementById('mensagem').textContent = 'Erro ao cadastrar currículo.';
    });
});
