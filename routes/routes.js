const express = require('express');
const Product = require('../model/product');
const axios = require('axios');

//thirt party api url 
const dataUrl = process.env.API;

// these apis for all api data should come in one api 
const api1URL = process.env.api1URL;
const api2URL = process.env.api2URL;
const api3URL = process.env.api3URL;
const api4URL = process.env.api4URL;

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello world")
})

router.get('/initialize-database', async (req, res) => {
    try {
        // Fetch JSON data from the third-party API
        const response = await axios.get(dataUrl);
        const data = response.data;

        
        await Product.insertMany(data);

        res.json({ message: 'Database initialized successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while initializing the database.' });
    }
});



// Create an API endpoint to list product transactions with search and pagination

router.get('/list-transactions', async (req, res) => {
    try {
        const { page , perPage = 10, search = '', month } = req.query;

        
        const searchCriteria = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ],
            $expr: {
                $eq: [{ $month: '$dateOfSale' }, parseInt(month)],
            },
        };

        
        if (!isNaN(search)) {
            
            const searchNumber = parseFloat(search);
            if (!isNaN(searchNumber)) {
                searchCriteria.$or.push({ price: searchNumber });
            }
        }


        const transactions = await Product.find(searchCriteria)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));

        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching product transactions.' });
    }
});




router.get('/statistics', async (req, res) => {
    try {
        const { month } = req.query;

        
        const totalSaleAmount = await Product.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: '$dateOfSale' }, parseInt(month)],
                    },
                    sold: true,
                },
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$price' },
                    totalSoldItems: { $sum: 1 },
                },
            },
        ]);

        const totalUnsoldItems = await Product.countDocuments({
            $expr: {
                $eq: [{ $month: '$dateOfSale' }, parseInt(month)],
            },
            sold: false,
        });

        const result = {
            totalSaleAmount: totalSaleAmount[0] ? totalSaleAmount[0].totalAmount : 0,
            totalSoldItems: totalSaleAmount[0] ? totalSaleAmount[0].totalSoldItems : 0,
            totalUnsoldItems,
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while calculating statistics.' });
    }
});

// Create an API endpoint for bar chart data
router.get('/bar-chart-data', async (req, res) => {
    try {
        const { month } = req.query;

        const priceRanges = [
            { min: 0, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 300 },
            { min: 301, max: 400 },
            { min: 401, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: Number.MAX_SAFE_INTEGER },
        ];

        const barChartData = [];

        for (const range of priceRanges) {
            const count = await Product.countDocuments({
                $expr: {
                    $and: [
                        { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
                        { $gte: ['$price', range.min] },
                        { $lte: ['$price', range.max] },
                    ],
                },
            });

            barChartData.push({
                priceRange: `${range.min}-${range.max}`,
                itemCount: count,
            });
        }

        res.json(barChartData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching bar chart data.' });
    }
});

// Create an API endpoint for pie chart data
router.get('/pie-chart-data', async (req, res) => {
    try {
        const { month } = req.query;

        
        const pieChartData = await Product.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: '$dateOfSale' }, parseInt(month)],
                    },
                },
            },
            {
                $group: {
                    _id: '$category',
                    itemCount: { $sum: 1 },
                },
            },
        ]);

        res.json(pieChartData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching pie chart data.' });
    }
});

// Create an API endpoint to fetch and combine data from the three APIs
router.get('/combined-data', async (req, res) => {
    try {
      
    const { month } = req.query;

      const [response1, response2, response3, response4] = await Promise.all([
        axios.get(api1URL,{ params: { month } }),
        axios.get(api2URL,{ params: { month } }),
        axios.get(api3URL,{ params: { month } }),
        axios.get(api3URL,{ params: { month } })
      ]);
  
      
      const data1 = response1.data;
      const data2 = response2.data;
      const data3 = response3.data;
      const data4 = response3.data;
  
     
      const combinedData = {
        api1Data: data1,
        api2Data: data2,
        api3Data: data3,
        api4Data: data4
      };
  
      res.json(combinedData);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching and combining data.' });
    }
  });
  



module.exports = router;
