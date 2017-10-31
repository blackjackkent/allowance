import AxiosHttp from './axiosHttp';

class BudgetApi {
	static getBudget() {
		return AxiosHttp.get('http://localhost:32676/api/budgets')
			.then(function (response) {
				return response.data;
			});
	}

	static editBudget(budgetId, budget) {
		return AxiosHttp.put(`http://localhost:32676/api/budgets/${budgetId}`, budget)
			.then(function (response) {
				return response.data;
			});
	}

	static addTransaction(budgetId, transaction) {
		return AxiosHttp.post(`http://localhost:32676/api/budgets/${budgetId}/transactions`, transaction)
			.then(function (response) {
				return response.data;
			});
	}

	static editTransaction(budgetId, transaction) {
		return AxiosHttp.put(`http://localhost:32676/api/budgets/${budgetId}/transactions/${transaction.transactionId}`, transaction)
			.then(function (response) {
				return response.data;
			});
	}

	static getTransactionTypes() {
		return [
			{
				id: 1,
				key: "income",
				title: "Income"
			},
			{
				id: 2,
				key: "bill",
				title: "Bills"
			},
			{
				id: 3,
				key: "expense",
				title: "Expenses"
			}
		]
	}

	static getTransactionTypeByKey(transactionTypeKey) {
		return BudgetApi.getTransactionTypes().find(t => t.key == transactionTypeKey);
	}

	static getTransactionTypeById(transactionTypeId) {
		return BudgetApi.getTransactionTypes().find(t => t.id == transactionTypeId);
	}

	static deleteTransactions(budgetId, transactions) {
		let promises = [];
		for (const transaction of transactions) {
			promises.push(new Promise((resolve, reject) => {
				AxiosHttp.delete(`http://localhost:32676/api/budgets/${budgetId}/transactions/${transaction.transactionId}`).then(resolve, reject);
			}))
		}
		return Promise.all(promises);
	}
}

export default BudgetApi;
