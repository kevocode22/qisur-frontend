import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import SkeletonChart from "./skeleton/skeletonChart";

export default function SalesChart() {
  const [loading, setLoading] = useState(true);
  const [dataCharts, setDataCharts] = useState({ monthly: [], yearly: [] });

  useEffect(() => {
    (async () => {
      const monthlyDataFetch = await fetch(
        "https://qisur-api.onrender.com/sales/monthly"
      );
      const yearlyDataFetch = await fetch(
        "https://qisur-api.onrender.com/sales/yearly"
      );
      const dataMonth = await monthlyDataFetch.json();
      dataMonth;
      const dataAnnual = await yearlyDataFetch.json();
      setDataCharts({ monthly: dataMonth, yearly: dataAnnual });
      setLoading(false);
    })();
  }, []);

  const monthlyChart = {
    options: {
      chart: { id: "monthly-sales" },
      xaxis: {
        categories: dataCharts && dataCharts.monthly.map((item) => item.month),
      },
      title: {
        text: "Ventas mensuales",
        align: "center" as const,
      },
    },
    series: [
      {
        name: "Ventas",
        data: dataCharts?.monthly.map((item) => item.value),
      },
    ],
  };

  const yearlyChart = {
    options: {
      chart: { id: "yearly-sales" },
      xaxis: { categories: dataCharts.yearly.map((item) => item.year) },
      title: { text: "Ventas Anuales", align: "center" as const },
    },
    series: [
      {
        name: "Total",
        data: dataCharts.yearly.map((item) => item.total),
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 h-full w-full">
      <div className="dark:bg-gray-800 text-black p-4 rounded shadow">
        {loading ? (
          <SkeletonChart />
        ) : (
          <Chart
            options={monthlyChart.options}
            series={monthlyChart.series}
            type="line"
            height={400}
          />
        )}
      </div>
      <div className="dark:bg-gray-800 text-black p-4 rounded shadow">
        {loading ? (
          <SkeletonChart />
        ) : (
          <Chart
            options={yearlyChart.options}
            series={yearlyChart.series}
            type="bar"
            height={400}
          />
        )}
      </div>
    </div>
  );
}
