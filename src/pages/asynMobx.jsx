import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { todos } from '../store/store';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AsyncMobx = observer(() => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState('all');

  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');

  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    todos.getuser();
  }, []);

  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => {
    setAddOpen(false);
    setNewName('');
    setNewAge('');
  };

  const handleAdd = () => {
    todos.adduser({
      name: newName,
      age: newAge,
      status: false,
    });
    handleAddClose();
  };

  const handleEditOpen = (user) => {
    setEditName(user.name);
    setEditAge(user.age);
    setEditId(user.id);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditName('');
    setEditAge('');
    setEditId(null);
  };

  const handleEdit = () => {
    todos.edituser({
      name: editName,
      age: editAge,
      id: editId,
    });
    handleEditClose();
  };

  const filteredData = todos.data
    ?.filter((el) => {
      if (filtered === 'all') return true;
      if (filtered === 'true') return el.status === true;
      if (filtered === 'false') return el.status === false;
      return true;
    })
    ?.filter((el) =>
      el.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddOpen}>
          Add User
        </Button>

        <TextField
          size="small"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Filter</InputLabel>
          <Select value={filtered} label="Filter" onChange={(e) => setFiltered(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Age</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredData?.map((el) => (
                <TableRow key={el.id} hover>
                  <TableCell>{el.name}</TableCell>
                  <TableCell>{el.age}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {el.status ? (
                        <span style={{ color: 'green' }}>Active</span>
                      ) : (
                        <span style={{ color: 'red' }}>Inactive</span>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleEditOpen(el)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => todos.deleteuser(el.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      color={el.status ? 'default' : 'success'}
                      onClick={() => todos.chexbox(el)}
                    >
                      {el.status ? <DeleteIcon /> : <AddIcon />}
                    </IconButton>
                    <Button
                      size="small"
                      variant="outlined"
                      disabled={!el.id}  
                      component={Link}
                      to={`/infobyid/${el.id}`}
                      sx={{ ml: 1 }}
                    >
                      Info
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={addOpen} onClose={handleAddClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Age"
            fullWidth
            value={newAge}
            onChange={(e) => setNewAge(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={!newName.trim() || !newAge.trim()}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Age"
            fullWidth
            value={editAge}
            onChange={(e) => setEditAge(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" onClick={handleEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

export default AsyncMobx;