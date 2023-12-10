import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './transactions.css';
import { format } from 'date-fns';


const TransactionDetails = () => {
    const { account } = useParams();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:3001/api/transactions/${account}`)
            .then(response => {
                setTransactions(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(`Error fetching transactions for account ${account}:`, error);
                setLoading(false);
            });
    }, [account]);

    const [expandedTransactions, setExpandedTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);

    const handleAccordionToggle = (index) => {
        const updatedExpandedTransactions = [...expandedTransactions];
        updatedExpandedTransactions[index] = !expandedTransactions[index];
        setExpandedTransactions(updatedExpandedTransactions);
    };

    const paginate = (pageNumber, index) => setCurrentPage(pageNumber);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy');
    };

    const displayTransactions = (index) => {
        const currentTransactions = transactions[index].transactions.slice(indexOfFirstRecord, indexOfLastRecord);
        return currentTransactions.map((transaction, idx) => (
            <div key={idx} className="transaction">
                <p>Date: {formatDate(transaction.date)}</p>
                <p>Amount: {transaction.amount}</p>
                <p>Transaction Code: {transaction.transaction_code}</p>
                <p>Total: {parseFloat(transaction.total).toFixed(2)}</p>
            </div>
        ));
    };

    return (
        <div className="transaction-details">
            <div className="breadcrumb">
                <Link to="/customer-list">Customers</Link> / Transaction Details
            </div>
            <div className="transaction-header">
                <h2>Transaction Details</h2>
            </div>
            <div className="transaction-list">
                {transactions.map((account, index) => (
                    <div key={account._id} className="account-transaction">
                        <h3>Account ID: {account.account_id}</h3>
                        <p>Transaction Count: {account.transaction_count}</p>
                        <p>Bucket Start Date: {formatDate(account.bucket_start_date)}</p>
                        <p>Bucket End Date: {formatDate(account.bucket_end_date)}</p>
                        <div className="accordion">
                            <button className="accordion-btn" onClick={() => handleAccordionToggle(index)}>
                                Transactions:
                                <i className={`arrow-icon ${expandedTransactions[index] ? 'expanded' : ''}`}>&#9660;</i>
                            </button>
                            <div className={`accordion-content ${expandedTransactions[index] ? 'active' : ''}`}>
                                {expandedTransactions[index] && (
                                    <div className="transactions">
                                        {displayTransactions(index)}
                                        <div className="pagination">
                                            <button onClick={() => paginate(currentPage - 1, index)} disabled={currentPage === 1}>
                                                Previous
                                            </button>
                                            <button
                                                onClick={() => paginate(currentPage + 1, index)}
                                                disabled={indexOfLastRecord >= transactions[index].transactions.length}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionDetails;
