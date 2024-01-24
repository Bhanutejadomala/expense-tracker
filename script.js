document.getElementById('expForm').addEventListener('submit', addExpense);
const expenses = JSON.parse(localStorage.getItem('expenses')) ?? [];
function addExpense(e) {
    e.preventDefault();
    const type = document.getElementById('type').value;
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const amount = document.getElementById('amount').value;
    if (type !== 'chooseOne'
        && name.length
        && date !== 0
        && amount) {
        const expense = {
            type,
            name,
            date,
            amount,
            id: expenses.length ? expenses[expenses.length - 1].id + 1 : 1,
        }
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
    document.getElementById('expForm').reset();
    showExpenses();
}

const showExpenses = () => {
    const expenseTable = document.getElementById('expenseTable');
    expenseTable.innerHTML = '';
    for (let i = 0; i < expenses.length; i++) {
        expenseTable.innerHTML += `
            <tr>
                <td>${expenses[i].type}</td>
                <td>${expenses[i].name}</td>
                <td>${expenses[i].date}</td>
                <td>$${expenses[i].amount}</td>
                <td><a class="deleteButton" onclick="deleteExpense(${expenses[i].id})">
                Delete</td>
            </tr>
        `;
    }
}

const deleteExpense = (id) => {
    const index = expenses.findIndex(each => each.id === id)
    expenses.splice(index,1)
    localStorage.setItem('expenses', JSON.stringify(expenses));
    showExpenses();
}
showExpenses();
