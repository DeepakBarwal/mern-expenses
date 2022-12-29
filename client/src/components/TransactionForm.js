import {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from '@mui/material/Button';

const initialFormState = {
  amount: 0,
  description: '',
  date: new Date(),
};

export default function TransactionForm({fetchTransactions}) {

  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleDate = (newValue) => {
    setForm({...form, date: newValue});
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
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">Add New Transaction</Typography>
        <form onSubmit={handleSubmit}>
            <TextField sx={{marginRight: 5}} size='small' id="outlined-basic" label="Amount" variant="outlined" name='amount' value={form.amount} onChange={handleChange} />
            <TextField sx={{marginRight: 5}} size='small' id="outlined-basic" label="Description" variant="outlined" name='description' value={form.description} onChange={handleChange} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Transaction Date"
                    inputFormat="MM/DD/YYYY"
                    onChange={handleDate}
                    value={form.date}
                    renderInput={(params) => <TextField size='small' sx={{marginRight: 5}} {...params} />}
                />
            </LocalizationProvider>
            <Button type='submit' variant="contained">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}