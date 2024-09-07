document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario: usuario, senha: senha })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                alert('Login realizado com sucesso');
                // Redirecionar para a página principal ou de perfil
                window.location.href = 'curriculo.html';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});