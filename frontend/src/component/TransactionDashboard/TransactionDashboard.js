import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../Modal'
import Statisctic from '../statistics/Statisctic';
import BaRChart from '../Barchart/BarChart';
import PieChart from '../PieChart/PieChart';


import "../TransactionDashboard/transactionDashboard.css"

import {
    TextField,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,

} from '@mui/material';


export default function TransactionDashboard() {

    const [transactions, setTransactions] = useState([]);
    const [search, setSeach] = useState("");
    const [month, setMonth] = useState(3)

    const [start, setStart] = useState(1);


    const [isOpen, setIsOpen] = useState(false);
    const [isBarChartOpen, setIsBarChartOpen] = useState(false);
    const [isPieChartOpen , setisPieChartOpen] = useState(false);




    useEffect(() => {
        axios.get('http://localhost:4000/list-transactions', {
            params: {
                page: start,      
                perPage: 10,    
                search: search,    
                month: month,       
            },
        })
            .then(response => {
                setTransactions(response.data);

            })
            .catch(error => {
                console.error('Error fetching data:', error);

            });


    }, [search, month, start]);


    const handlePreviousClick = () => {

        if (start > 1) {
            setStart(start - 1);

        }
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    const openBarChartModal = () => {
        setIsBarChartOpen(true);
      };
      
      const closeBarChartModal = () => {
        setIsBarChartOpen(false);
      };

      const openPieChartModal = () => {
        setisPieChartOpen(true);
      };
      
      const closePieChartModal = () => {
        setisPieChartOpen(false);
      };

      









    return (
        <div className="dashboard-container">

            <div className="header">
                <div className="circle">
                    <span>Transaction Dashboard</span>
                </div>
            </div>
            <div className="search-container">

                <TextField
                    label='Search'
                    variant='outlined'
                    size='small'
                    value={search}
                    onChange={(e) => {
                        setSeach(e.target.value)
                    }}
                    sx={{ backgroundColor: '#edc27b ' }}
                    InputLabelProps={{ style: { color: 'black' } }}

                />


                <FormControl variant='outlined' size='small' sx={{ backgroundColor: 'goldenrod ' }}  >
                    <InputLabel style={{ color: 'black' }} >Month</InputLabel>
                    <Select
                        label='Month'
                        value={month}
                        onChange={(e) => {
                            setMonth(e.target.value)
                        }}

                    >
                        <MenuItem value={1}>January</MenuItem>
                        <MenuItem value={2}>February</MenuItem>
                        <MenuItem value={3}>March</MenuItem>
                        <MenuItem value={4}>April</MenuItem>
                        <MenuItem value={5}>May</MenuItem>
                        <MenuItem value={6}>June</MenuItem>
                        <MenuItem value={7}>July</MenuItem>
                        <MenuItem value={8}>August</MenuItem>
                        <MenuItem value={9}>September</MenuItem>
                        <MenuItem value={10}>October</MenuItem>
                        <MenuItem value={11}>November</MenuItem>
                        <MenuItem value={12}>December</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="view-buttons">
                <div>
                    <Button
                        variant="outlined"
                        onClick={openModal}

                    >
                        Statistics
                    </Button>

                    { isOpen && (
                        <Modal onClose={closeModal}>
                            <Statisctic month={month} />
                        </Modal>
                    )}
                </div>
                <div>
                    <Button
                        variant="outlined"
                        onClick={openBarChartModal}

                    >
                        BarChart
                    </Button>
                    { isBarChartOpen && (
                        <Modal onClose={closeBarChartModal}>
                            <BaRChart month={month} />
                        </Modal>
                    )}
                </div>
                <div>
                    <Button
                        variant="outlined"
                        onClick={openPieChartModal}

                    >
                        Pie Chart
                    </Button>
                    {
                        isPieChartOpen&& (<Modal onClose={closePieChartModal}><PieChart month = {month}/></Modal>)
                    }
                </div>
            </div>
            <div>
                <TableContainer component={Paper} sx={{ backgroundColor: '#edc27b ', borderRadius: '8px', height: '350px', width: '1100px', overflow: 'auto' }} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Sold</TableCell>
                                <TableCell>Image</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>{item.sold ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>
                                        <img
                                            src={item.image}
                                            alt={`Image for ${item.title}`}
                                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="pagination-controls">
                    <span>Page : {start}</span>
                    <Button color="primary" sx={{ color: 'black', marginRight: '10px' }}
                        onClick={handlePreviousClick} 
                        disabled={start === 1}  >
                        Previous
                    </Button>
                    <Button color="primary" sx={{ color: 'black' }}
                        onClick={() => {
                            setStart(start + 1)
                        }}
                        disabled = {start===transactions.length|| transactions.length ===0}
                    >
                        Next
                    </Button>
                    <span >Per Page : 10 </span>

                </div>
            </div>
        </div>
    );
}
