import {useEffect, useState} from 'react';
import ButtonAppBar from './components/AppBar';
import TransactionForm from './components/TransactionForm';

function App() {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await fetch(`http://localhost:4000/transaction`);
    const {data} = await res.json();
    setTransactions(data);
  };

  return (
    <div>
      <ButtonAppBar />

      <TransactionForm fetchTransactions={fetchTransactions} />

      <br />

      <section>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length && transactions.map(transaction => {
              return (
                <tr key={transaction._id}>
                  <td>{transaction.amount}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
