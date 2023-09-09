import React, { useEffect, useState } from 'react'
import '../statistics/statistics.css'
import axios from 'axios';

export default function Statisctic(props) {
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];


    const [statisctic, setStatisctic] = useState([]);



    useEffect(() => {
        axios.get('http://localhost:4000/statistics', {
            params: {

                month: props.month,
            }
        }).then(response => {
            setStatisctic(response.data)

        })
            .catch(error => {
                console.error('Error fetching data:', error);

            });
    }, [])


    return (

        <>
            <div className="statistics-title">
                <span>Statistics- {monthNames[props.month - 1]}</span>
            </div>
            <div className="statistics-box">

                <div className="statistics-content">
                    <div className="statistics-row">
                        <span>Total sale:</span>
                        <span>{statisctic.totalSaleAmount}</span>
                    </div>
                    <div className="statistics-row">
                        <span>Total sold items:</span>
                        <span>{statisctic.totalSoldItems}</span>
                    </div>
                    <div className="statistics-row">
                        <span>Total not sold items:</span>
                        <span>{statisctic.totalUnsoldItems}</span>
                    </div>
                </div>
            </div>
        </>
    );







}
