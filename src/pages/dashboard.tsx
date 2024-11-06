import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from "recharts";


interface BarData {
  name: string;
  Users: number;
  Products: number;
  Orders: number;
}

interface PieData {
  name: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  const barData: BarData[] = [
    { name: "Jan", Users: 30, Products: 20, Orders: 10 },
    { name: "Feb", Users: 40, Products: 25, Orders: 15 },
    { name: "Mar", Users: 35, Products: 30, Orders: 20 },
  ];

  const pieData: PieData[] = [
    { name: "Users", value: 400 },
    { name: "Products", value: 300 },
    { name: "Orders", value: 300 },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Bar Chart
              </Typography>
              {isMounted && (
                <BarChart width={500} height={300} data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Users" fill="#8884d8" />
                  <Bar dataKey="Products" fill="#82ca9d" />
                  <Bar dataKey="Orders" fill="#ffc658" />
                </BarChart>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Pie Chart
              </Typography>
              {isMounted && (
                <PieChart width={400} height={400}>
                  <Pie
                    data={pieData}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  />
                  <Tooltip />
                </PieChart>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleLogout}
        style={{ marginTop: "20px" }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
