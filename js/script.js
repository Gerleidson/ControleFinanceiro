// despesas,vendas, gastos e metas
const expenses = Array(12).fill([]).map(() => []);
const sales = Array(12).fill([]).map(() => []);
const debts = Array(12).fill([]).map(() => []);
const goals = Array(12).fill([]).map(() => []);

// Função para adicionar gastos
function addExpense(index) {
    const product = document.getElementById(`expense-product-${index}`).value;
    const unitValue = parseFloat(document.getElementById(`expense-unit-value-${index}`).value);
    const quantity = parseInt(document.getElementById(`expense-quantity-${index}`).value);
    const paymentMethod = document.getElementById(`expense-payment-method-${index}`).value;
    const totalValue = unitValue * quantity;

    if (!product || isNaN(unitValue) || isNaN(quantity) || unitValue <= 0 || quantity <= 0) return;

    expenses[index].push({ product, unitValue, quantity, paymentMethod, totalValue });
    updateExpenses(index);
    updateReport(index);  // Atualiza o relatório
    document.getElementById(`expense-product-${index}`).value = '';
    document.getElementById(`expense-unit-value-${index}`).value = '';
    document.getElementById(`expense-quantity-${index}`).value = '';
}

// Função para adicionar vendas
function addSale(index) {
    const product = document.getElementById(`sales-product-${index}`).value;
    const unitValue = parseFloat(document.getElementById(`sales-unit-value-${index}`).value);
    const quantity = parseInt(document.getElementById(`sales-quantity-${index}`).value);
    const paymentMethod = document.getElementById(`sales-payment-method-${index}`).value;
    const totalValue = unitValue * quantity;

    if (!product || isNaN(unitValue) || isNaN(quantity) || unitValue <= 0 || quantity <= 0) return;

    sales[index].push({ product, unitValue, quantity, paymentMethod, totalValue });
    updateSales(index);
    updateReport(index);  // Atualiza o relatório
    document.getElementById(`sales-product-${index}`).value = '';
    document.getElementById(`sales-unit-value-${index}`).value = '';
    document.getElementById(`sales-quantity-${index}`).value = '';
}

// Função para adicionar despesas
function addDebt(index) {
    const name = document.getElementById(`debt-name-${index}`).value;
    const value = parseFloat(document.getElementById(`debt-value-${index}`).value);
    const dueDate = document.getElementById(`debt-due-date-${index}`).value;

    if (!name || isNaN(value) || value <= 0) return;

    debts[index].push({ name, value, dueDate });
    updateDebts(index);
    updateReport(index);  // Atualiza o relatório
    document.getElementById(`debt-name-${index}`).value = '';
    document.getElementById(`debt-value-${index}`).value = '';
    document.getElementById(`debt-due-date-${index}`).value = '';
}

// Função para adicionar metas
function addGoal(index) {
    const description = document.getElementById(`goal-description-${index}`).value;

    if (!description) return;

    goals[index].push({ description });
    updateGoals(index);
}


// Funções para excluir itens
function deleteItem(index, expenseIndex) {
    expenses[index].splice(expenseIndex, 1); // Remove o item da lista
    updateExpenses(index); // Atualiza a interface
}

function deleteSale(index, saleIndex) {
    sales[index].splice(saleIndex, 1); // Remove o item da lista de vendas
    updateSales(index); // Atualiza a interface
}

function deleteDebt(index, debtIndex) {
    debts[index].splice(debtIndex, 1); // Remove a dívida da lista
    updateDebts(index); // Atualiza a interface
}

function deleteGoal(index, goalIndex) {
    goals[index].splice(goalIndex, 1); // Remove a meta da lista
    updateGoals(index); // Atualiza a interface
}

// Funções de atualização para cada seção
function updateExpenses(index) {
    const expensesList = document.getElementById(`expenses-list-${index}`);
    expensesList.innerHTML = '';
    let total = 0;
    let pix = 0;
    let dinheiro = 0;
    let cartao = 0;

    expenses[index].forEach((expense, expenseIndex) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `
            ${expense.product} - R$ ${expense.totalValue.toFixed(2)} (${expense.paymentMethod})
            <button class="btn btn-danger btn-sm float-end" onclick="deleteItem(${index}, ${expenseIndex})">Excluir</button>
        `;
        expensesList.appendChild(li);
        total += expense.totalValue;
        
        if (expense.paymentMethod === 'pix') pix += expense.totalValue;
        if (expense.paymentMethod === 'dinheiro') dinheiro += expense.totalValue;
        if (expense.paymentMethod === 'cartao') cartao += expense.totalValue;
    });

    document.getElementById(`total-expenses-${index}`).textContent = `R$ ${total.toFixed(2)}`;
    document.getElementById(`expense-pix-${index}`).textContent = `R$ ${pix.toFixed(2)}`;
    document.getElementById(`expense-dinheiro-${index}`).textContent = `R$ ${dinheiro.toFixed(2)}`;
    document.getElementById(`expense-cartao-${index}`).textContent = `R$ ${cartao.toFixed(2)}`;
    updateReport(index);  // Atualiza o relatório

}
function updateSales(index) {
    const salesList = document.getElementById(`sales-list-${index}`);
    salesList.innerHTML = '';
    let total = 0;
    let pix = 0;
    let dinheiro = 0;
    let cartao = 0;

    sales[index].forEach((sale, saleIndex) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `

        ${sale.product} - R$ ${sale.totalValue.toFixed(2)} (${sale.paymentMethod})
            <button class="btn btn-danger btn-sm float-end" onclick="deleteSale(${index}, ${saleIndex})">Excluir</button>
        `;
        salesList.appendChild(li);
        total += sale.totalValue;

        if (sale.paymentMethod === 'pix') pix += sale.totalValue;
        if (sale.paymentMethod === 'dinheiro') dinheiro += sale.totalValue;
        if (sale.paymentMethod === 'cartao') cartao += sale.totalValue;
    });

    document.getElementById(`total-sales-${index}`).textContent = `R$ ${total.toFixed(2)}`;
    document.getElementById(`sales-pix-${index}`).textContent = `R$ ${pix.toFixed(2)}`;
    document.getElementById(`sales-dinheiro-${index}`).textContent = `R$ ${dinheiro.toFixed(2)}`;
    document.getElementById(`sales-cartao-${index}`).textContent = `R$ ${cartao.toFixed(2)}`;
    updateReport(index);  // Atualiza o relatório
}

function updateDebts(index) {
    const debtsList = document.getElementById(`debts-list-${index}`);
    debtsList.innerHTML = '';
    let total = 0;

    debts[index].forEach((debt, debtIndex) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `
            ${debt.name} - R$ ${debt.value.toFixed(2)} (Vencimento: ${debt.dueDate})
            <button class="btn btn-danger btn-sm float-end" onclick="deleteDebt(${index}, ${debtIndex})">Excluir</button>
        `;
        debtsList.appendChild(li);
        total += debt.value;
    });

    document.getElementById(`total-debts-${index}`).textContent = `R$ ${total.toFixed(2)}`;
}

function updateGoals(index) {
    const list = document.getElementById(`goals-list-${index}`);
    list.innerHTML = '';
    goals[index].forEach((goal, i) => {
        list.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${goal.description}
                <button class="btn btn-danger btn-sm" onclick="deleteGoal(${index}, ${i})">Excluir</button>

            </li>
        `;
    });
}

// Função para atualizar os totais do relatório
function updateReport(index) {
    // Soma os totais de despesas e vendas
    const totalExpenses = expenses[index].reduce((total, expense) => total + expense.totalValue, 0);
    const totalSales = sales[index].reduce((total, sale) => total + sale.totalValue, 0);
    const totalProfit = totalSales - totalExpenses;

    // Atualiza os elementos HTML do relatório
    document.getElementById(`report-total-expenses-${index}`).innerText = `R$ ${totalExpenses.toFixed(2)}`;
    document.getElementById(`report-total-sales-${index}`).innerText = `R$ ${totalSales.toFixed(2)}`;
    document.getElementById(`report-total-profit-${index}`).innerText = `R$ ${totalProfit.toFixed(2)}`;
}

// Função para gerar o PDF
function downloadReport(index) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const totalExpenses = expenses[index].reduce((total, expense) => total + expense.totalValue, 0);
    const totalSales = sales[index].reduce((total, sale) => total + sale.totalValue, 0);
    const totalProfit = totalSales - totalExpenses;

    doc.text(`Relatório de Gastos - Mês ${months[index]}`, 10, 10);
    doc.text(`Pix: ${document.getElementById(`expense-pix-${index}`).innerText}`, 10, 20);
    doc.text(`Dinheiro: ${document.getElementById(`expense-dinheiro-${index}`).innerText}`, 10, 30);
    doc.text(`Cartão: ${document.getElementById(`expense-cartao-${index}`).innerText}`, 10, 40);
    doc.text(`Total de Gastos: ${document.getElementById(`total-expenses-${index}`).innerText}`, 10, 50);

    doc.text(`Relatório de Vendas`, 10, 70);
    doc.text(`Pix: ${document.getElementById(`sales-pix-${index}`).innerText}`, 10, 80);
    doc.text(`Dinheiro: ${document.getElementById(`sales-dinheiro-${index}`).innerText}`, 10, 90);
    doc.text(`Cartão: ${document.getElementById(`sales-cartao-${index}`).innerText}`, 10, 100);
    doc.text(`Total de Vendas: ${document.getElementById(`total-sales-${index}`).innerText}`, 10, 110);

    doc.text(`Lucro: ${document.getElementById(`total-profit-${index}`).innerText}`, 10, 130);

    doc.save(`relatorio-${months[index]}.pdf`);
}
