document.addEventListener('DOMContentLoaded', function () {
    fetchJobs();
});

function fetchJobs() {
    fetch('http://0.0.0.0:8080/api/jobs')  // Altere a URL se o backend estiver rodando em um servidor diferente
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar vagas');
            }
            return response.json();
        })
        .then(jobs => {
            const jobList = document.getElementById('job-list');
            jobList.innerHTML = '';

            // Loop para cada vaga retornada pelo backend
            jobs.forEach(job => {
                const jobElement = document.createElement('div');
                jobElement.classList.add('job');

                // Ajuste a estrutura HTML conforme o que o backend retorna
                jobElement.innerHTML = `
                    <h3>${job.title}</h3>
                    <p><strong>Empresa:</strong> ${job.company}</p>
                    <p><strong>Localização:</strong> ${job.location}</p>
                    <p><strong>Descrição:</strong> ${job.description}</p>
                    <p><strong>Requisitos:</strong> ${job.requirements}</p>
                `;

                jobList.appendChild(jobElement);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar vagas:', error);
        });
}
