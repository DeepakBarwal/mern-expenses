import {useEffect, useState} from 'react';

function App() {
  const initialFormState = {
    amount: 0,
    description: '',
    date: '',
  };

  const [form, setForm] = useState(initialFormState);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await fetch(`http://localhost:4000/transaction`);
    const {data} = await res.json();
    setTransactions(data);
  };

  const handleInput = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/transaction`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
      }
      });
      if (res.ok) {
        fetchTransactions();
      }
      setForm(initialFormState);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='number'
        name='amount'
        placeholder='Enter transaction amount'
        onChange={handleInput}
        value={form.amount}
        />
        <input type='text'
        name='description'
        placeholder='Enter transaction details'
        onChange={handleInput}
        value={form.description}
        />
        <input type='date'
        name='date'
        onChange={handleInput}
        value={form.date}
        />
        <button type='submit'>Submit</button>
      </form>

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
