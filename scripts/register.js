document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const usuario = document.querySelector('input[name="usuario"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const senha = document.querySelector('input[name="senha"]').value;

    fetch('https://felipealves4.github.io/Central-estagios/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario: usuario, email: email, senha: senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);  // Mostra o erro se houver
        } else {
            alert('Registro realizado com sucesso, volte para pagina de login');
            window.location.href = 'Login.html';  // Redireciona para a página de login após o registro
        }
    })
    .catch(error => {
        console.error('Erro:', error);  // Tratamento de erros
    });
});