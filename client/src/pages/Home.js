import { Container } from '@mui/material';
import {useEffect, useState} from 'react';
import ButtonAppBar from '../components/AppBar';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

function App() {

  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);

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
        <TransactionForm fetchTransactions={fetchTransactions}
          editTransaction={editTransaction}
        />

        <TransactionList transactions={transactions} 
          fetchTransactions={fetchTransactions} 
          setEditTransaction={setEditTransaction}
        />
      </Container>
    </div>
  );
}

export default App;
