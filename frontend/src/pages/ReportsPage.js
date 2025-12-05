import { useState, useContext } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import { AuthContext } from "../context/AuthContext";
import { can } from "../utils/checkAccess";

export default function ReportsPage() {
  const { user } = useContext(AuthContext);
  const [reportType, setReportType] = useState("donors");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleGenerateReport = () => {
    console.log("Generating report:", { reportType, dateFrom, dateTo });
    // Add report generation logic here
  };

  const reportTypes = [
    { value: "donors", label: "Donor Report" },
    { value: "donations", label: "Donation Report" },
    { value: "summary", label: "Summary Report" },
    { value: "monthly", label: "Monthly Report" },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Reports
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Generate and download various reports
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Generate Report
            </Typography>
            <Box sx={{ mt: 3 }}>
              <TextField
                fullWidth
                select
                label="Report Type"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                sx={{ mb: 2 }}
              >
                {reportTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="From Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="To Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                sx={{ mb: 3 }}
              />

              {can(user, "report", "generate") && (
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AssessmentIcon />}
                  onClick={handleGenerateReport}
                  size="large"
                >
                  Generate Report
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Quick Reports
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <PictureAsPdfIcon
                      sx={{ fontSize: 40, color: "#f44336", mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        Donor List PDF
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Complete donor database
                      </Typography>
                    </Box>
                  </Box>
                  {can(user, "report", "export") && (
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      size="small"
                    >
                      Download PDF
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <TableChartIcon
                      sx={{ fontSize: 40, color: "#4caf50", mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        Donations Excel
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        All donation records
                      </Typography>
                    </Box>
                  </Box>
                  {can(user, "report", "export") && (
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      size="small"
                    >
                      Download Excel
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <AssessmentIcon
                      sx={{ fontSize: 40, color: "#2196f3", mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        Monthly Summary
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Current month overview
                      </Typography>
                    </Box>
                  </Box>
                  {can(user, "report", "generate") && (
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      size="small"
                    >
                      Download Report
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <PictureAsPdfIcon
                      sx={{ fontSize: 40, color: "#ff9800", mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        Annual Report
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Year-end summary
                      </Typography>
                    </Box>
                  </Box>
                  {can(user, "report", "export") && (
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      size="small"
                    >
                      Download PDF
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
