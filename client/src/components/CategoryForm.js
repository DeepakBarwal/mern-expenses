import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { Autocomplete, Box } from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../store/auth.js';

const initialFormState = {
  label: '',
  icon: '',
};

const icons = [
  'User'
];

export default function CategoryForm({editCategory}) {
  const {categories} = useSelector(state => state.auth.user);

  const token = Cookies.get('token');

  const [form, setForm] = useState(initialFormState);

  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (editCategory !== null) {
      setForm(editCategory);
    }
  }, [editCategory]);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleDate = (newValue) => {
    setForm({...form, date: newValue});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = editCategory ? await update() : await submit();
      if (res.ok) {
        const _user = {...user, categories: [...user.categories, {...form}]};
        dispatch(setUser({user: _user}));
      }
      setForm(initialFormState);
    } catch (error) {
      console.error(error.message);
    }
  };

  const submit = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category`, {
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
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${editCategory._id}`, {
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    return res;
  };

  const getCategoryNameById = () => {
    return categories.find(category => category._id === form.category_id) && '';
  };

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">Add New Category</Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{display: 'flex'}}>
            <TextField sx={{marginRight: 5}} size='small' id="outlined-basic" label="Label" variant="outlined" name='label' value={form.label} onChange={handleChange} />
            <Autocomplete
              value={getCategoryNameById() || null}
              onChange={(event, newValue) => {
                setForm({...form, icon: newValue});
              }}
              id="icons"
              options={icons}
              sx={{ width: 200, marginRight: 5 }}
              renderInput={(params) => <TextField {...params} size='small' label="Icon" />}
              isOptionEqualToValue={(option, value) => option.id === value.id}
            />
            {
              editCategory !== null && (
                <Button type='submit' variant="secondary">Update</Button>
              )
            }
            {
              editCategory === null && (
                <Button type='submit' variant="contained">Submit</Button>
              )
            }
        </Box>
      </CardContent>
    </Card>
  );
}