document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('resultados');
    const campoPesquisa = document.getElementById('campo-pesquisa');
    const btnPesquisar = document.getElementById('btn-pesquisar');

    // Função para criar um card
    function criarCard(projeto) {
        const card = document.createElement('div');
        card.className = 'item-resultado';
        card.id = `card-${projeto.nome.replace(/\s+/g, '-')}`; // Substitui espaços por hífen no id

        // Cria o conteúdo HTML do card
        card.innerHTML = `
            ${projeto.imagem ? `<img src="${projeto.imagem}" alt="${projeto.nome}" class="imagem-card" />` : ''}
            <div class="conteudo-card">
                <h3>${projeto.nome}</h3>
                <p class="desenvolvedor">Desenvolvedor: ${projeto.desenvolvedor}</p>
                <p class="descricao">${projeto.descricao}</p>
                ${projeto.linkSite ? `<a href="${projeto.linkSite}" target="_blank" class="link-site">Visite o site</a>` : ''}
                <a href="${projeto.linkGitHub}" target="_blank" class="link-github">GitHub</a>
                ${projeto.objetivo ? `<p class="objetivo">${projeto.objetivo}</p>` : ''}
            </div>
        `;

        container.appendChild(card);
    }

    // Função para filtrar cards com base na pesquisa
    function filtrarCards() {
        // Limpa os resultados atuais
        container.innerHTML = '';

        const textoPesquisa = campoPesquisa.value.toLowerCase();
        let resultadosEncontrados = false;

        // Itera sobre os projetos e filtra com base no nome, descrição, desenvolvedor ou tags
        projetos.forEach(projeto => {
            if (projeto.nome.toLowerCase().includes(textoPesquisa) || 
                projeto.descricao.toLowerCase().includes(textoPesquisa) ||
                projeto.desenvolvedor.toLowerCase().includes(textoPesquisa) ||
                projeto.tags.toLowerCase().includes(textoPesquisa)) {
                criarCard(projeto);
                resultadosEncontrados = true; // Marca que ao menos um resultado foi encontrado
            }
        });

        // Adiciona uma mensagem se nenhum resultado for encontrado
        if (!resultadosEncontrados) {
            const mensagem = document.createElement('p');
            mensagem.textContent = 'Nenhum resultado encontrado.';
            mensagem.style.textAlign = 'center'; // Centraliza a mensagem
            container.appendChild(mensagem);
        }
    }

    // Adiciona o evento de pesquisa
    btnPesquisar.addEventListener('click', filtrarCards);

    // Adiciona o evento de pesquisa ao pressionar a tecla Enter
    campoPesquisa.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            filtrarCards();
        }
    });
});
