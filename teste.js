document.addEventListener('DOMContentLoaded', function() {
    const aulaForm = document.getElementById('aula-form');
    const aulaList = document.getElementById('aula-list');
    const aulaDetailContainer = document.getElementById('aula-detail-container');
    const aulaDetail = document.getElementById('aula-detail');

    let aulas = JSON.parse(localStorage.getItem('aulas')) || [];

    function renderAulas() {
        aulaList.innerHTML = '';
        aulas.forEach((aula, index) => {
            const li = document.createElement('li');
            li.textContent = aula.titulo;
            li.dataset.index = index;
            aulaList.appendChild(li);
        });
    }

    function showAulaDetail(index) {
        const aula = aulas[index];
        aulaDetail.innerHTML = `
            <h3>${aula.titulo}</h3>
            <p>${aula.descricao}</p>
            <p id="close-detail">[Fechar]</p>
        `;
        aulaDetailContainer.style.display = 'block';
        document.getElementById('close-detail').addEventListener('click', function() {
            aulaDetailContainer.style.display = 'none';
        });
    }

    aulaForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const titulo = document.getElementById('titulo').value;
        const descricao = document.getElementById('descricao').value;
        aulas.push({ titulo, descricao });
        localStorage.setItem('aulas', JSON.stringify(aulas));
        renderAulas();
        aulaForm.reset();
    });

    aulaList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            const index = event.target.dataset.index;
            showAulaDetail(index);
        }
    });

    renderAulas();
});