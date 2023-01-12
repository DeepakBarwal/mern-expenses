import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { Autocomplete, Box } from '@mui/material';
import {useSelector} from 'react-redux';

const initialFormState = {
  amount: 0,
  description: '',
  date: new Date(),
  category_id: '',
};

export default function TransactionForm({fetchTransactions, editTransaction}) {
  const {categories} = useSelector(state => state.auth.user);

  const token = Cookies.get('token');

  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (editTransaction !== null) {
      setForm(editTransaction);
    }
  }, [editTransaction]);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleDate = (newValue) => {
    setForm({...form, date: newValue});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = editTransaction ? await update() : await submit();
      if (res.ok) {
        fetchTransactions();
      }
      setForm(initialFormState);
    } catch (error) {
      console.error(error.message);
    }
  };

  const submit = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  };

  const update = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`, {
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    return res;
  };

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">Add New Transaction</Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{display: 'flex'}}>
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
            <Autocomplete
              value={form.category_id}
              onChange={(event, newValue) => {
                setForm({...form, category: newValue._id});
              }}
              id="controllable-states-demo"
              options={categories}
              sx={{ width: 200, marginRight: 5 }}
              renderInput={(params) => <TextField {...params} size='small' label="Category" />}
              isOptionEqualToValue={(option, value) => option.id === value.id}
            />
            {
              editTransaction !== null && (
                <Button type='submit' variant="secondary">Update</Button>
              )
            }
            {
              editTransaction === null && (
                <Button type='submit' variant="contained">Submit</Button>
              )
            }
        </Box>
      </CardContent>
    </Card>
  );
}