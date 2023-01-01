import { Container } from '@mui/material';
import {useEffect, useState} from 'react';
import ButtonAppBar from './components/AppBar';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

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
      
      <Container>
        <TransactionForm fetchTransactions={fetchTransactions} />

        <TransactionList transactions={transactions} fetchTransactions={fetchTransactions} />
      </Container>
    </div>
  );
}

export default App;
