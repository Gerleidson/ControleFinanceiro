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

    // Limpar os campos após adicionar
    document.getElementById('gasto-produto').value = '';
    document.getElementById('gasto-unitario').value = '';
    document.getElementById('gasto-quantidade').value = '';
    document.getElementById('gasto-pagamento').value = '';
}


function addVenda() {
    const produto = document.getElementById('vendas-produto').value;
    const valorUnitario = parseFloat(document.getElementById('vendas-unitario').value);
    const quantidade = parseInt(document.getElementById('vendas-quantidade').value);
    const pagamento = document.getElementById('vendas-pagamento').value;

    const total = valorUnitario * quantidade;

    vendasData.push({ produto, total, pagamento });
    updateVendasList();

    // Limpar os campos após adicionar
    document.getElementById('vendas-produto').value = '';
    document.getElementById('vendas-unitario').value = '';
    document.getElementById('vendas-quantidade').value = '';
    document.getElementById('vendas-pagamento').value = '';
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

// Gerar o PDF do relatório
function generatePdf() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Chama a função de atualizar o relatório antes de gerar o PDF
    updateRelatorio();

    // Obter o mês atual (0 a 11, Janeiro é 0)
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    // Define a fonte como negrito para o "Relatório do mês"
    doc.setFont("helvetica", "bold");
    doc.text(`RELATORIO DO MÊS DE ${currentMonth.toUpperCase()}`, 10, 10);  // Caixa alta e negrito

    let yPosition = 20; // Posição vertical inicial para o texto

    // Define a fonte como negrito para as seções "Gastos", "Vendas", "Lucro"
    doc.setFont("helvetica", "bold");

    // Adicionando valores de gastos
    doc.text(`Gastos`, 10, yPosition); 
    yPosition += 10;
    doc.setFont("helvetica", "normal");  // Volta para fonte normal para os detalhes
    doc.text(`Pix: R$ ${document.getElementById('gastos-pix').innerText}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Dinheiro: R$ ${document.getElementById('gastos-dinheiro').innerText}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Cartão: R$ ${document.getElementById('gastos-cartao').innerText}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Total de Gastos: R$ ${document.getElementById('total-gastos').innerText}`, 10, yPosition);
    yPosition += 15; // Espaçamento maior após a seção de Gastos

    // Adicionando valores de vendas
    doc.setFont("helvetica", "bold");  // Volta para negrito para a seção "Vendas"
    doc.text(`Vendas`, 10, yPosition);  
    yPosition += 10;
    doc.setFont("helvetica", "normal");  // Volta para fonte normal para os detalhes
    doc.text(`Pix: R$ ${document.getElementById('vendas-pix').innerText}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Dinheiro: R$ ${document.getElementById('vendas-dinheiro').innerText}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Cartão: R$ ${document.getElementById('vendas-cartao').innerText}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Total de Vendas: R$ ${document.getElementById('total-vendas').innerText}`, 10, yPosition);
    yPosition += 15; // Espaçamento maior após a seção de Vendas

    // Adicionando lucro
    doc.setFont("helvetica", "bold");  // Negrito para "Lucro"
    doc.text(`Lucro: R$ ${document.getElementById('lucro').innerText}`, 10, yPosition);

    // Salvar o PDF com o nome do mês atual
    doc.save(`Relatorio ${currentMonth}.pdf`);
}

// Estrutura para armazenar os dados por mês
const dataPorMes = {
    gastos: {},
    vendas: {},
    despesas: {},
    metas: {}
};

let mesSelecionado = 'janeiro';

// Função para alternar o mês selecionado
function selecionarMes(mes) {
    mesSelecionado = mes;
    renderizarDados();
}

// Função para renderizar os dados de acordo com o mês selecionado
function renderizarDados() {
    updateGastosList();
    updateVendasList();
    updateRelatorio();
    updateTotalDespesas();
}

// Função para inicializar os dados para cada mês, caso ainda não existam
function inicializarMes(tipo) {
    if (!dataPorMes[tipo][mesSelecionado]) {
        dataPorMes[tipo][mesSelecionado] = [];
    }
}

// Função para adicionar gastos
function addGasto() {
    inicializarMes('gastos');

    const produto = document.getElementById('gasto-produto').value;
    const valorUnitario = parseFloat(document.getElementById('gasto-unitario').value);
    const quantidade = parseInt(document.getElementById('gasto-quantidade').value);
    const pagamento = document.getElementById('gasto-pagamento').value;

    const total = valorUnitario * quantidade;

    if (produto && !isNaN(valorUnitario) && quantidade > 0 && pagamento) {
        const total = valorUnitario * quantidade;
        dataPorMes.gastos[mesSelecionado].push({ produto, total, pagamento });
        updateGastosList();

        // Limpar os campos após adicionar
        document.getElementById('gasto-produto').value = '';
        document.getElementById('gasto-unitario').value = '';
        document.getElementById('gasto-quantidade').value = '';
        document.getElementById('gasto-pagamento').value = '';
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

// Função para adicionar vendas
function addVenda() {
    inicializarMes('vendas');

    const produto = document.getElementById('vendas-produto').value;
    const valorUnitario = parseFloat(document.getElementById('vendas-unitario').value);
    const quantidade = parseInt(document.getElementById('vendas-quantidade').value);
    const pagamento = document.getElementById('vendas-pagamento').value;

    const total = valorUnitario * quantidade;

    if (produto && !isNaN(valorUnitario) && quantidade > 0 && pagamento) {
        const total = valorUnitario * quantidade;

        dataPorMes.vendas[mesSelecionado].push({ produto, total, pagamento });
        updateVendasList();

        // Limpar os campos após adicionar
        document.getElementById('vendas-produto').value = '';
        document.getElementById('vendas-unitario').value = '';
        document.getElementById('vendas-quantidade').value = '';
        document.getElementById('vendas-pagamento').value = '';
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
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

// Função para atualizar o total de despesas
function updateTotalDespesas() {
    inicializarMes('despesas');

    const despesasMes = dataPorMes.despesas[mesSelecionado];
    totalDespesas = despesasMes.reduce((sum, despesa) => sum + despesa.despesaValor, 0);
    document.getElementById('total-despesas').textContent = `R$ ${totalDespesas.toFixed(2)}`;
}



// Função para atualizar a lista de gastos
function updateGastosList() {
    inicializarMes('gastos');

    const list = document.getElementById('gastos-list');
    list.innerHTML = '';
    dataPorMes.gastos[mesSelecionado].forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        listItem.textContent = `${item.produto} - R$ ${item.total.toFixed(2)}`;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => {
            dataPorMes.gastos[mesSelecionado].splice(index, 1);
            updateGastosList();
        };

        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    });

    updateRelatorio();
}

// Função para atualizar a lista de vendas
function updateVendasList() {
    inicializarMes('vendas');

    const list = document.getElementById('vendas-list');
    list.innerHTML = '';
    dataPorMes.vendas[mesSelecionado].forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        listItem.textContent = `${item.produto} - R$ ${item.total.toFixed(2)}`;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => {
            dataPorMes.vendas[mesSelecionado].splice(index, 1);
            updateVendasList();
        };

        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    });

    updateRelatorio();
}

// Função para atualizar o relatório
function calcularTotalPorPagamento(data, tipoPagamento) {
    return data.filter(item => item.pagamento === tipoPagamento)
               .reduce((sum, item) => sum + item.total, 0);
}

function updateRelatorio() {
    inicializarMes('gastos');
    inicializarMes('vendas');

    const gastosMes = dataPorMes.gastos[mesSelecionado];
    const vendasMes = dataPorMes.vendas[mesSelecionado];

    const totalGastos = gastosMes.reduce((sum, gasto) => sum + gasto.total, 0);
    document.getElementById('total-gastos').innerText = totalGastos.toFixed(2);

    document.getElementById('gastos-pix').innerText = calcularTotalPorPagamento(gastosMes, 'pix').toFixed(2);
    document.getElementById('gastos-dinheiro').innerText = calcularTotalPorPagamento(gastosMes, 'dinheiro').toFixed(2);
    document.getElementById('gastos-cartao').innerText = calcularTotalPorPagamento(gastosMes, 'cartao').toFixed(2);

    const totalVendas = vendasMes.reduce((sum, venda) => sum + venda.total, 0);
    document.getElementById('total-vendas').innerText = totalVendas.toFixed(2);

    document.getElementById('vendas-pix').innerText = calcularTotalPorPagamento(vendasMes, 'pix').toFixed(2);
    document.getElementById('vendas-dinheiro').innerText = calcularTotalPorPagamento(vendasMes, 'dinheiro').toFixed(2);
    document.getElementById('vendas-cartao').innerText = calcularTotalPorPagamento(vendasMes, 'cartao').toFixed(2);

    const lucro = totalVendas - totalGastos;
    document.getElementById('lucro').innerText = lucro.toFixed(2);
}
