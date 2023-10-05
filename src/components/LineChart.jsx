import React from "react";
import { Col, Row, Typography } from "antd";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement, // because i want to create a line chart
  CategoryScale, // X axis
  LinearScale, // Y axis
  PointElement, // for the dots in the chart
  Legend,
} from "chart.js";

const { Title } = Typography;

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
        <Col span={24}>
          <Line data={data} options={options} />
        </Col>
      </Row>
    </>
  );
};

export default LineChart;
