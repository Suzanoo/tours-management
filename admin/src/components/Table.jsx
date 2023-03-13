import React, { useState } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

import '../public/css/table.scss';

const TourTable = (props) => {
  const tours = props.data;

  const [sortType, setSortType] = useState('asc');
  const [sortedBy, setSortedBy] = useState('name');
  const [filteredTours, setFilteredTours] = useState(tours);

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
    const filteredTours = tours.filter(
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

  return (
    <div className="tour-table">
      <input
        type="text"
        placeholder="Filter by tour name, price, duration, difficulty, or start location"
        onChange={handleFilter}
      />

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
          </tr>
        </thead>
        <tbody>
          {filteredTours.map((tour) => (
            <tr key={tour._id}>
              <td>{tour.name}</td>
              <td>{`$${tour.price}`}</td>
              <td>{`${tour.duration} days`}</td>
              <td>{tour.startDates[0].split('T')[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TourTable;
