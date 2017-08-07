import AxiosHttp from './axiosHttp';

class BudgetApi {
    static getBudget() {
        return AxiosHttp.get('http://localhost:32676/api/budgets');
    }
}

export default BudgetApi;