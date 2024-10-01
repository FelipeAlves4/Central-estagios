document.addEventListener('DOMContentLoaded', async function() {
    const editButton = document.getElementById('edit-profile');

    // Fetch user data from the backend
    async function fetchProfile() {
        try {
            const response = await fetch('central-estagios.railway.internal/api/profile'); // Rota para puxar o perfil do backend
            const data = await response.json();

            // Preencher os campos existentes
            document.getElementById('student-name').textContent = data.name || 'Nome do Estagiário';
            document.getElementById('course-name').textContent = data.course || 'Nome do Curso';
            document.getElementById('institution-name').textContent = data.institution || 'Nome da Instituição';
            document.getElementById('email').textContent = data.email || 'email@example.com';
            document.getElementById('phone-number').textContent = data.phone || '(xx) xxxx-xxxx';

            // Preencher habilidades
            if (data.skills && data.skills.length > 0) {
                const skillsList = document.getElementById('skills-list');
                skillsList.innerHTML = '';
                data.skills.forEach(skill => {
                    let li = document.createElement('li');
                    li.textContent = skill;
                    skillsList.appendChild(li);
                });
            }

            // Preencher experiências
            if (data.experience && data.experience.length > 0) {
                const experienceList = document.getElementById('experience-list');
                experienceList.innerHTML = '';
                data.experience.forEach(exp => {
                    let li = document.createElement('li');
                    li.textContent = exp;
                    experienceList.appendChild(li);
                });
            }

            // Preencher foto de perfil
            if (data.photo) {
                document.getElementById('profile-pic').src = data.photo;
            }

        } catch (error) {
            console.error('Erro ao buscar perfil:', error);
        }
    }

    // Chamar a função ao carregar a página
    fetchProfile();

    // Edit profile
    editButton.addEventListener('click', function() {
        let name = prompt('Digite seu nome:');
        let course = prompt('Digite seu curso:');
        let institution = prompt('Digite sua instituição:');
        let email = prompt('Digite seu email:');
        let phone = prompt('Digite seu telefone:');
        let skills = prompt('Digite suas habilidades separadas por vírgula:');
        let experience = prompt('Digite suas experiências separadas por vírgula:');
        let photo = prompt('Insira a URL da sua foto de perfil:');

        // Atualizar os dados localmente
        if (name) document.getElementById('student-name').textContent = name;
        if (course) document.getElementById('course-name').textContent = course;
        if (institution) document.getElementById('institution-name').textContent = institution;
        if (email) document.getElementById('email').textContent = email;
        if (phone) document.getElementById('phone-number').textContent = phone;
        if (photo) document.getElementById('profile-pic').src = photo;

        // Atualizar habilidades
        if (skills) {
            const skillsList = document.getElementById('skills-list');
            skillsList.innerHTML = '';
            skills.split(',').forEach(skill => {
                let li = document.createElement('li');
                li.textContent = skill.trim();
                skillsList.appendChild(li);
            });
        }

        // Atualizar experiências
        if (experience) {
            const experienceList = document.getElementById('experience-list');
            experienceList.innerHTML = '';
            experience.split(',').forEach(exp => {
                let li = document.createElement('li');
                li.textContent = exp.trim();
                experienceList.appendChild(li);
            });
        }

        // Enviar dados atualizados para o backend
        const updatedData = {
            name,
            course,
            institution,
            email,
            phone,
            skills: skills ? skills.split(',').map(s => s.trim()) : null,
            experience: experience ? experience.split(',').map(e => e.trim()) : null,
            photo
        };

        fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        }).then(response => response.json())
          .then(data => console.log('Perfil atualizado:', data))
          .catch(error => console.error('Erro ao atualizar perfil:', error));
    });
});
