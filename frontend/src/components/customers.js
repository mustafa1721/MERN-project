import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './customers.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(7);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/customers')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentCustomers = customers.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleAccountClick = (accountId) => {
    setSelectedAccount(accountId);
  };

  const paginate = (direction) => {
    if (direction === 'prev') {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='table-container'>
      <h2>Active Customers</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Account</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map(customer => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.address}</td>
              <td>
                {customer.accounts.map(account => (
                  <Link to={`/transactions/${account}`} key={account}>
                    <button
                      onClick={() => handleAccountClick(account)}
                      className='active-account'
                    >
                      Account {account}
                    </button>
                  </Link>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => paginate('prev')} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={() => paginate('next')} disabled={indexOfLastRecord >= customers.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerList;
