const API_URL = 'http://localhost:3000/ocorrencias';

async function carregarOcorrencias() {
    const resposta = await fetch(API_URL);
    const ocorrencias = await resposta.json();
    const tbody = document.getElementById('tabela-ocorrencias');
    tbody.innerHTML = '';

    ocorrencias.forEach(item => {
        const dataFormatada = new Date(item.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nomeUsuario}</td>
            <td>${item.local}</td>
            <td>${item.tipoResiduo}</td>
            <td>${item.nivelRisco}</td>
            <td>${dataFormatada}</td>
            <td>${item.status}</td>
        `;
        tbody.appendChild(tr);
    });
}

document.getElementById('form-ocorrencia').addEventListener('submit', async (e) => {
    e.preventDefault();
    const novaOcorrencia = {
        usuarioId: document.getElementById('usuarioId').value,
        local: document.getElementById('local').value,
        nivelRisco: document.getElementById('nivelRisco').value,
        tipoResiduo: document.getElementById('tipoResiduo').value,
        data: document.getElementById('data').value
    };

    const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaOcorrencia)
    });

    if (resposta.ok) {
        document.getElementById('form-ocorrencia').reset();
        document.getElementById('usuarioId').value = '1';
        carregarOcorrencias();
    } else {
        alert('Erro ao cadastrar. Verifique se o banco está rodando.');
    }
});

carregarOcorrencias();
