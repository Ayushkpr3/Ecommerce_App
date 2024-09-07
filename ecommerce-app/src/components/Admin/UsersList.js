import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { DataGrid } from '@material-ui/data-grid';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { getAllUsers, clearErrors, deleteUser } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';
import './usersList.css';

const UsersList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      history.push('/admin/users');
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, message, history]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    { field: 'id', headerName: 'User ID', minWidth: 180, flex: 0.8 },
    { field: 'email', headerName: 'Email', minWidth: 200, flex: 1 },
    { field: 'name', headerName: 'Name', minWidth: 150, flex: 0.5 },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) =>
        params.value === 'admin' ? 'greenColor' : 'redColor',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <>
          <Link to={`/admin/user/${params.id}`}>
            <button className="editBtn">Edit</button>
          </Link>
          <button
            className="deleteBtn"
            onClick={() => handleDeleteUser(params.id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  const rows = users
    ? users.map((user) => ({
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      }))
    : [];

  return (
    <div className="usersListWrapper">
      <MetaData title="All Users - Admin" />
      <Sidebar />
      <div className="usersListContainer">
        <h1 className="usersListHeading">All Users</h1>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="usersListTable"
          autoHeight
        />
      </div>
    </div>
  );
};

export default UsersList;
