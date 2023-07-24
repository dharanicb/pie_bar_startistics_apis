const express = require("express");
const axios = require("axios");

const app = express();
const THIRD_PARTY_API_URL =
  "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

async function fetchDataFromAPI() {
  try {
    const response = await axios.get(THIRD_PARTY_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the API:", error.message);
    return [];
  }
}

function filterDataByMonth(data, selectedMonth) {
  return data.filter(
    (item) => new Date(item.dateOfSale).getMonth() === selectedMonth
  );
}

app.get("/api/init", async (req, res) => {
  const data = await fetchDataFromAPI();
  res.json(data);
});

app.get("/api/statistics/:selectedMonth", async (req, res) => {
  const data = await fetchDataFromAPI();
  const selectedMonth = Number(req.params.selectedMonth) - 1;
  const filteredData = filterDataByMonth(data, selectedMonth);
  const totalSaleAmount = filteredData.reduce(
    (total, item) => total + item.price,
    0
  );
  const totalSoldItems = filteredData.length;
  const totalNotSoldItems = data.length - totalSoldItems;

  res.json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
});

app.get("/api/bar-chart/:selectedMonth", async (req, res) => {
  const data = await fetchDataFromAPI();
  const selectedMonth = Number(req.params.selectedMonth) - 1;

  const filteredData = filterDataByMonth(data, selectedMonth);
  const priceRanges = [
    { range: "0 - 100", count: 0 },
    { range: "101 - 200", count: 0 },
    { range: "201 - 300", count: 0 },
    { range: "301 - 400", count: 0 },
    { range: "401 - 500", count: 0 },
    { range: "501 - 600", count: 0 },
    { range: "601 - 700", count: 0 },
    { range: "701 - 800", count: 0 },
    { range: "801 - 900", count: 0 },
    { range: "901 - above", count: 0 },
  ];

  filteredData.forEach((item) => {
    const price = item.price;
    if (price >= 0 && price <= 100) priceRanges[0].count++;
    else if (price <= 200) priceRanges[1].count++;
    else if (price <= 300) priceRanges[2].count++;
    else if (price <= 400) priceRanges[3].count++;
    else if (price <= 500) priceRanges[4].count++;
    else if (price <= 600) priceRanges[5].count++;
    else if (price <= 700) priceRanges[6].count++;
    else if (price <= 800) priceRanges[7].count++;
    else if (price <= 900) priceRanges[8].count++;
    else priceRanges[9].count++;
  });

  res.json(priceRanges);
});

app.get("/api/pie-chart/:selectedMonth", async (req, res) => {
  const data = await fetchDataFromAPI();
  const selectedMonth = Number(req.params.selectedMonth) - 1;

  const filteredData = filterDataByMonth(data, selectedMonth);
  const categoryCountMap = new Map();

  filteredData.forEach((item) => {
    const category = item.category;
    if (categoryCountMap.has(category)) {
      categoryCountMap.set(category, categoryCountMap.get(category) + 1);
    } else {
      categoryCountMap.set(category, 1);
    }
  });

  const pieChartData = [];
  categoryCountMap.forEach((count, category) => {
    pieChartData.push({ category, count });
  });

  res.json(pieChartData);
});

app.get("/api/combined/:selectedMonth", async (req, res) => {
  const selectedMonth = Number(req.params.selectedMonth);

  const statisticsResponse = await axios.get(
    `/api/statistics/${selectedMonth}`
  );
  const barChartResponse = await axios.get(`/api/bar-chart/${selectedMonth}`);
  const pieChartResponse = await axios.get(`/api/pie-chart/${selectedMonth}`);

  const combinedResponse = {
    statistics: statisticsResponse.data,
    barChart: barChartResponse.data,
    pieChart: pieChartResponse.data,
  };

  res.json(combinedResponse);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
