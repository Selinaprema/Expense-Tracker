import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function ExpenseChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No chart data available</p>;
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Expenses by Category</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}
        margin={{ top: 10, right: 20, left: 10, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category"
          interval={0}
          angle={-20}
          textAnchor="end"
          height={60} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" radius={[6, 6, 0, 0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;