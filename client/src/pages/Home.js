import {useEffect, useState} from 'react';
import { Container } from '@mui/material';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import Cookies from 'js-cookie';

const Home = () => {
    const [transactions, setTransactions] = useState([]);
    const [editTransaction, setEditTransaction] = useState(null);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        const token = Cookies.get('token');
        try {
            const res = await fetch(`http://localhost:4000/transaction`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
            const {data} = await res.json();
            setTransactions(data);
        } catch (error) {
            console.error(error.message);
        }
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