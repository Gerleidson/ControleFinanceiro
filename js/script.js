let gastosData = [];
let vendasData = [];
let despesasData = [];
let metasData = [];

// Função para alternar entre as abas do menu lateral
function showTab(tab) {
    const tabs = document.querySelectorAll('.tab-pane');
    tabs.forEach((tabPane) => tabPane.classList.remove('active'));
    document.querySelector(`#${tab}`).classList.add('active');
}

// Função para adicionar gastos
function addGasto() {
    const produto = document.getElementById('gasto-produto').value;
    const valorUnitario = parseFloat(document.getElementById('gasto-unitario').value);
    const quantidade = parseInt(document.getElementById('gasto-quantidade').value);
    const pagamento = document.getElementById('gasto-pagamento').value;

    const total = valorUnitario * quantidade;

    gastosData.push({ produto, total, pagamento });
    updateGastosList();
}

// Função para adicionar vendas
function addVenda() {
    const produto = document.getElementById('vendas-produto').value;
    const valorUnitario = parseFloat(document.getElementById('vendas-unitario').value);
    const quantidade = parseInt(document.getElementById('vendas-quantidade').value);
    const pagamento = document.getElementById('vendas-pagamento').value;

    const total = valorUnitario * quantidade;

    vendasData.push({ produto, total, pagamento });
    updateVendasList();
}

// Função para adicionar despesas
let totalDespesas = 0;
function addDespesa() {
    const despesaNome = document.getElementById('despesa-nome').value;
    const despesaValor = parseFloat(document.getElementById('despesa-valor').value);
    const despesaVencimento = document.getElementById('despesa-vencimento').value;

    if (despesaNome && !isNaN(despesaValor) && despesaValor > 0 && despesaVencimento) {
        // Cria o item da lista
        const item = document.createElement('li');
        item.className = 'list-group-item d-flex justify-content-between align-items-center';

        // Cria o conteúdo da despesa
        item.innerHTML = `${despesaNome} - R$ ${despesaValor.toFixed(2)} - Vencimento: ${despesaVencimento}`;

        // Cria o botão de remover
        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger btn-sm';
        removeButton.textContent = 'Remover';

        // Adiciona o evento de click para remover
        removeButton.onclick = function() {
            // Remove o item da lista
            item.remove();
            // Atualiza o total de despesas após remoção
            totalDespesas -= despesaValor;
            updateTotalDespesas();
        };

        // Adiciona o botão de remover ao item
        item.appendChild(removeButton);

        // Adiciona o item à lista
        document.getElementById('despesas-list').appendChild(item);

        // Atualiza o total de despesas
        totalDespesas += despesaValor;
        updateTotalDespesas();

        // Limpa os campos após adicionar
        document.getElementById('despesa-nome').value = '';
        document.getElementById('despesa-valor').value = '';
        document.getElementById('despesa-vencimento').value = '';
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

function updateTotalDespesas() {
    // Atualiza o valor total das despesas na tela
    document.getElementById('total-despesas').textContent = `R$ ${totalDespesas.toFixed(2)}`;
}

// Função para adicionar metas
function addMeta() {
    const metaNome = document.getElementById('meta-nome').value;

    if (metaNome) {
        // Cria um item de lista
        const item = document.createElement('li');
        item.className = 'list-group-item d-flex justify-content-between align-items-center'; // Flexbox para alinhar
        
        // Cria o checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input me-2'; // Adiciona um pequeno espaçamento à direita do checkbox

        // Cria o texto da meta
        const metaText = document.createElement('span');
        metaText.textContent = metaNome;

        // Adiciona o evento para marcar/desmarcar a meta
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                item.style.textDecoration = 'line-through'; // Marca a meta como concluída (linha sobre o texto)
                item.style.color = 'gray'; // Muda a cor do texto para cinza
                item.style.backgroundColor = 'lightgreen'; // Muda o fundo para verde claro
            } else {
                item.style.textDecoration = 'none'; // Remove a linha sobre o texto
                item.style.color = 'black'; // Restaura a cor original do texto
                item.style.backgroundColor = ''; // Remove o fundo verde
            }
        });

        // Cria o botão de remover
        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger btn-sm';
        removeButton.textContent = 'Remover';

        // Adiciona o evento de click ao botão de remover
        removeButton.onclick = function() {
            item.remove();  // Remove o item da lista
        };

        // Alinha o checkbox e o nome da meta usando Flexbox
        const metaContainer = document.createElement('div');
        metaContainer.className = 'd-flex align-items-center'; // Flexbox container
        metaContainer.appendChild(checkbox);  // Adiciona o checkbox ao container
        metaContainer.appendChild(metaText);  // Adiciona o texto da meta ao container

        // Adiciona o container e o botão de remover ao item da lista
        item.appendChild(metaContainer);
        item.appendChild(removeButton);

        // Adiciona o item à lista
        document.getElementById('metas-list').appendChild(item);

        // Limpa o campo de entrada após adicionar
        document.getElementById('meta-nome').value = '';
    } else {
        alert('Por favor, insira um nome para a meta.');
    }
}

// Função para atualizar a lista de gastos
function updateGastosList() {
    const list = document.getElementById('gastos-list');
    list.innerHTML = ''; // Limpa a lista antes de atualizá-la
    gastosData.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        
        listItem.textContent = `${item.produto}  = R$ ${item.total}`;

        // Criando o botão de excluir
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => deleteItem('gastos', item);
        
        // Coloca o botão "Excluir" no lado direito usando um contêiner flex
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('d-flex', 'justify-content-end');
        buttonContainer.appendChild(deleteButton);

        // Adiciona o botão ao item da lista
        listItem.appendChild(buttonContainer);

        // Adicionando o item à lista
        list.appendChild(listItem);
    });

    // Atualiza o relatório com a nova lista de gastos
    updateRelatorio();
}

// Função para atualizar a lista de vendas
function updateVendasList() {
    const list = document.getElementById('vendas-list');
    list.innerHTML = '';
    vendasData.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        listItem.textContent = `${item.produto} - R$ ${item.total}`;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => deleteItem('vendas', item);

        // Coloca o botão "Excluir" no lado direito
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('d-flex', 'justify-content-end');
        buttonContainer.appendChild(deleteButton);

        listItem.appendChild(buttonContainer);

        list.appendChild(listItem);
    });
    updateRelatorio();
}

// Função para atualizar a lista de despesas
function updateDespesasList() {
    const list = document.getElementById('despesas-list');
    list.innerHTML = '';
    despesasData.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        listItem.textContent = `${item.nome} - R$ ${item.valor}`;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => deleteItem('despesas', item);

        // Coloca o botão "Excluir" no lado direito
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('d-flex', 'justify-content-end');
        buttonContainer.appendChild(deleteButton);

        listItem.appendChild(buttonContainer);

        list.appendChild(listItem);
    });
}

// Função para atualizar a lista de metas
function updateMetasList() {
    const list = document.getElementById('metas-list');
    list.innerHTML = '';
    metasData.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        listItem.textContent = `${item.nome} - R$ ${item.valor}`;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => deleteItem('metas', item);

        // Coloca o botão "Excluir" no lado direito
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('d-flex', 'justify-content-end');
        buttonContainer.appendChild(deleteButton);

        listItem.appendChild(buttonContainer);

        list.appendChild(listItem);
    });
}

// Função para excluir item de lista
function deleteItem(type, item) {
    if (type === 'gastos') {
        gastosData = gastosData.filter(gasto => gasto !== item);
    } else if (type === 'vendas') {
        vendasData = vendasData.filter(venda => venda !== item);
    } else if (type === 'despesas') {
        despesasData = despesasData.filter(despesa => despesa !== item);
    } else if (type === 'metas') {
        metasData = metasData.filter(meta => meta !== item);
    }
    updateGastosList();
    updateVendasList();
    updateDespesasList();
    updateMetasList();
}

// Função para atualizar o relatório
function calcularTotalPorPagamento(data, tipoPagamento) {
    return data.filter(item => item.pagamento === tipoPagamento)
               .reduce((sum, item) => sum + item.total, 0);
}

function updateRelatorio() {
    // Gastos
    const totalGastos = gastosData.reduce((sum, gasto) => sum + gasto.total, 0);
    document.getElementById('total-gastos').innerText = totalGastos.toFixed(2);

    document.getElementById('gastos-pix').innerText = calcularTotalPorPagamento(gastosData, 'pix').toFixed(2);
    document.getElementById('gastos-dinheiro').innerText = calcularTotalPorPagamento(gastosData, 'dinheiro').toFixed(2);
    document.getElementById('gastos-cartao').innerText = calcularTotalPorPagamento(gastosData, 'cartao').toFixed(2);

    // Vendas
    const totalVendas = vendasData.reduce((sum, venda) => sum + venda.total, 0);
    document.getElementById('total-vendas').innerText = totalVendas.toFixed(2);

    document.getElementById('vendas-pix').innerText = calcularTotalPorPagamento(vendasData, 'pix').toFixed(2);
    document.getElementById('vendas-dinheiro').innerText = calcularTotalPorPagamento(vendasData, 'dinheiro').toFixed(2);
    document.getElementById('vendas-cartao').innerText = calcularTotalPorPagamento(vendasData, 'cartao').toFixed(2);

    // Lucro
    const lucro = totalVendas - totalGastos;
    document.getElementById('lucro').innerText = lucro.toFixed(2);
}

// Gerar o PDF do relatório corrigir
function generatePdf() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Chama a função de atualizar o relatório antes de gerar o PDF
    updateRelatorio();

    // Obter o mês atual (0 a 11, janeiro é 0)
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    // Adiciona os dados no PDF
    doc.text(`Relatório Geral`, 10, 10);
    
    // Adicionando valores de gastos
    doc.text(`Total de Gastos: R$ ${document.getElementById('total-gastos').innerText}`, 10, 20);
    doc.text(`Pix: R$ ${document.getElementById('gastos-pix').innerText}`, 10, 30);
    doc.text(`Dinheiro: R$ ${document.getElementById('gastos-dinheiro').innerText}`, 10, 40);
    doc.text(`Cartão: R$ ${document.getElementById('gastos-cartao').innerText}`, 10, 50);

    // Adicionando valores de vendas
    doc.text(`Total de Vendas: R$ ${document.getElementById('total-vendas').innerText}`, 10, 60);
    doc.text(`Pix: R$ ${document.getElementById('vendas-pix').innerText}`, 10, 70);
    doc.text(`Dinheiro: R$ ${document.getElementById('vendas-dinheiro').innerText}`, 10, 80);
    doc.text(`Cartão: R$ ${document.getElementById('vendas-cartao').innerText}`, 10, 90);

    // Adicionando lucro
    doc.text(`Lucro: R$ ${document.getElementById('lucro').innerText}`, 10, 100);

    // Salvar o PDF com o nome do mês atual
    doc.save(`Relatorio_${currentMonth}.pdf`);
}
