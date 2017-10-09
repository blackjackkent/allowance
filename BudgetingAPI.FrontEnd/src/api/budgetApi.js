import AxiosHttp from './axiosHttp';

class BudgetApi {
	static getBudget() {
		return AxiosHttp.get('http://localhost:32676/api/budgets')
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
}

export default BudgetApi;
