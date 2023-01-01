import {useEffect, useState} from 'react';
import { Container } from '@mui/material';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

const Home = () => {
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
        <>
            <Container>
                <TransactionForm fetchTransactions={fetchTransactions}
                editTransaction={editTransaction}
                />

                <TransactionList transactions={transactions} 
                fetchTransactions={fetchTransactions} 
                setEditTransaction={setEditTransaction}
                />
            </Container>
        </>
    );
};

export default Home;