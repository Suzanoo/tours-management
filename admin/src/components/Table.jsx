import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

import { deleteTour } from '../features/tour/tourSlice';

import '../public/css/table.scss';

const TourTable = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sortType, setSortType] = useState('asc');
  const [sortedBy, setSortedBy] = useState('name');
  const [filteredTours, setFilteredTours] = useState(props.data);

  const handleSort = (field) => {
    const isAsc = sortType === 'asc';
    setSortType(isAsc ? 'desc' : 'asc');
    setSortedBy(field);
    const sortedTours = [...filteredTours].sort((a, b) => {
      if (a[field] < b[field]) {
        return isAsc ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });
    setFilteredTours(sortedTours);
  };

  const handleFilter = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredTours = props.data.filter(
      (tour) =>
        tour.name.toLowerCase().includes(searchText) ||
        tour.price.toString().includes(searchText) ||
        tour.duration.toString().includes(searchText) ||
        tour.startDates[0].includes(searchText)
    );
    setFilteredTours(filteredTours);
  };

  const sortIcon = (field) => {
    if (sortedBy === field) {
      return sortType === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const handleUpdate = (id) => {
    navigate(`/update-tour/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this tour?'
    );
    if (confirmDelete) {
      dispatch(deleteTour(id));
    }
  };

  return (
    <div className="tour-table">
      <input type="text" placeholder="Filter..." onChange={handleFilter} />

      <table className="rwd-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name {sortIcon('name')}</th>
            <th onClick={() => handleSort('price')}>
              Price {sortIcon('price')}
            </th>
            <th onClick={() => handleSort('duration')}>
              Duration {sortIcon('duration')}
            </th>
            <th onClick={() => handleSort('startDates')}>
              Date {sortIcon('startDates')}
            </th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredTours.map((tour) => (
            <tr key={tour._id}>
              <td>{tour.name}</td>
              <td>{`$${tour.price}`}</td>
              <td>{`${tour.duration} days`}</td>
              <td>{tour.startDates[0].split('T')[0]}</td>
              <td>
                <button
                  className="updateBtn"
                  onClick={() => handleUpdate(tour._id)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="deleteBtn"
                  onClick={() => handleDelete(tour._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TourTable;