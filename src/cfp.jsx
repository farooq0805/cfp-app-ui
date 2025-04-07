import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

const initialData = [
  {
    type: "1",
    category: "Category 1",
    source_category: "",
    source_of_energy: "Total quantity of coal consumed (tons)",
    emmision_factor: 2600,
    unit: "Kg Co2 / Ton",
    user_input: "0.00",
    co2_emission: "0.00",
  },
  {
    type: "1",
    category: "Category 1",
    source_category: "",
    source_of_energy: "Total quantity of natural gas consumed (m3 or SCM)",
    emmision_factor: 2692,
    unit: "Kg Co2 / Ton",
    user_input: "0.00",
    co2_emission: "0.00",
  },
  {
    type: "1",
    category: "Category 1",
    source_category: "",
    source_of_energy: "Total quantity of diesel consumed (litres)",
    emmision_factor: 10.21,
    unit: "Kg / L",
    user_input: "0.00",
    co2_emission: "0.00",
  },
  {
    type: "1",
    category: "Category 1",
    source_category: "",
    source_of_energy: "Total quantity of petrol consumed (litres)",
    emmision_factor: 2.33,
    unit: "Kg / L",
    user_input: "0.00",
    co2_emission: "0.00",
  },
  {
    type: "1",
    category: "Category 1",
    source_category: "",
    source_of_energy: "Total quantity of LPG consumed (kg)",
    emmision_factor: 1.55,
    unit: "Kg / L",
    user_input: "0.00",
    co2_emission: "0.00",
  },
  {
    type: "2",
    category: "Category 2",
    source_category: "",
    source_of_energy: "Total quantity of electricity purchased from grid (kWh)",
    emmision_factor: 0.716,
    unit: "tCO2/MWh",
    user_input: "0.00",
    co2_emission: "0.00",
  },
  {
    type: "3",
    category: "Category 3",
    source_category: "Business Travel",
    source_of_energy: "Domestic flight (passenger kms)",
    emmision_factor: 0.129,
    unit: "kg/passenger-kilometer",
    user_input: "0.00",
    co2_emission: "0.00",
  },
  {
    type: "3",
    category: "Category 3",
    source_category: "Business Travel",
    source_of_energy: "Short haul international flight (passenger kms)",
    emmision_factor: 0.079,
    unit: "kg/passenger-kilometer",
    user_input: "0.00",
    co2_emission: "0.00",
  },
  {
    type: "3",
    category: "Category 4",
    source_category: "Waste",
    source_of_energy: "Office waste (kgs)",
    emmision_factor: 3.5,
    unit: "kgCO2e per day per person",
    user_input: "0.00",
    co2_emission: "0.00",
  },
  {
    type: "3",
    category: "Category 3",
    source_category: "Office Commute",
    source_of_energy: "Two Wheeler (total kms)",
    emmision_factor: 0.098,
    unit: "Kg/km",
    user_input: "0.00",
    co2_emission: "0.00",
  },
  {
    type: "3",
    category: "Category 3",
    source_category: "Office Commute",
    source_of_energy: "Three Wheeler (total kms)",
    emmision_factor: 0.11,
    unit: "Kg/km",
    user_input: "0.00",
    co2_emission: "0.00",
  },
  {
    type: "3",
    category: "Category 3",
    source_category: "Office Commute",
    source_of_energy: "Personal car (total kms)",
    emmision_factor: 0.178,
    unit: "Kg/km",
    user_input: "0.00",
    co2_emission: "0.00",
  },
  {
    type: "3",
    category: "Category 3",
    source_category: "Office Commute",
    source_of_energy: "Train (passenger - km)",
    emmision_factor: 11.5,
    unit: "gm/passenger km",
    user_input: "0.00",
    co2_emission: "0.00",
  },
  {
    type: "3",
    category: "Category 3",
    source_category: "Office Commute",
    source_of_energy: "Bus (total passenger- kms)",
    emmision_factor: 0.117,
    unit: "kg/passenger-kilometer",
    user_input: "0.00",
    co2_emission: "0.00",
  },
  {
    type: "3",
    category: "Category 3",
    source_category: "Logistics",
    source_of_energy: "Light duty truck (< 3.5 tons) (total kms)",
    emmision_factor: 0.566,
    unit: "kg/ton - kilometer",
    user_input: "0.00",
    co2_emission: "0.00",
  },
  {
    type: "3",
    category: "Category 3",
    source_category: "Logistics",
    source_of_energy: "Medium duty truck (< 12 tons) (total kms)",
    emmision_factor: 0.507,
    unit: "kg/ton - kilometer",
    user_input: "0.00",
    co2_emission: "0.00",
  },
  {
    type: "3",
    category: "Category 3",
    source_category: "Logistics",
    source_of_energy: "Heavy duty truck (> 12 tons) (total kms)",
    emmision_factor: 0.35,
    unit: "kg/ton - kilometer",
    user_input: "0.00",
    co2_emission: "0.00",
  },
  {
    type: "3",
    category: "Category 3",
    source_category: "Logistics",
    source_of_energy: "Train material movement (total ton-kms)",
    emmision_factor: 0.027,
    unit: "kg/ton - kilometer",
    user_input: "0.00",
    co2_emission: "0.00",
  },
];

const CFPCalculator = () => {
  const [data, setData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [emissions, setEmissions] = useState({});

  const uniqueCategories = Array.from(
    new Set(initialData.map((d) => d.category))
  );

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.includes(category);
      const updatedCategories = isSelected
        ? prev.filter((c) => c !== category)
        : [...prev, category];

      // Filter data from initialData based on new category selection
      const newData = initialData.filter((item) =>
        updatedCategories.includes(item.category)
      );

      setData(
        newData.map((item) => ({
          ...item,
          user_input: item.user_input || "0.00",
          co2_emission: (
            parseFloat(item.user_input || 0) * parseFloat(item.emmision_factor)
          ).toFixed(2),
        }))
      );

      return updatedCategories;
    });
  };
  const handleInputChange = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;

    // recalculate CO2 if related fields change
    const input = parseFloat(updated[index].user_input) || 0;
    const factor = parseFloat(updated[index].emmision_factor) || 0;
    updated[index].co2_emission = (input * factor).toFixed(2);

    setData(updated);
  };
  const handleAddRow = () => {
    const newRow = {
      type: "",
      category: "",
      source_category: "",
      source_of_energy: "",
      emmision_factor: 0,
      unit: "",
      user_input: "0.00",
      co2_emission: "0.00",
      isCustom: true,
    };
    setData((prev) => [...prev, newRow]);
  };
  const handleReset = () => {
    setData(
      initialData.map((item) => ({
        ...item,
        user_input: "0.00",
        co2_emission: "0.00",
      }))
    );
    setSelectedCategories([]);
  };

  const handleCalculate = () => {
    const updated = [...data];
    const emissionsByType = {};

    updated.forEach((row) => {
      const input = parseFloat(row.user_input) || 0;
      const factor = parseFloat(row.emmision_factor) || 0;
      const co2 = input * factor;
      row.co2_emission = co2.toFixed(2);

      const type = row.type?.trim() || "";
      if (type) {
        emissionsByType[type] = (emissionsByType[type] || 0) + co2;
      }
    });

    setData(updated);
    setEmissions(emissionsByType); // store for rendering below
  };

  const filteredData = data.filter((row) =>
    row.isCustom || selectedCategories.length === 0
      ? true
      : selectedCategories.includes(row.category)
  );

  const totalEmission = filteredData.reduce(
    (sum, item) => sum + parseFloat(item.co2_emission || "0"),
    0
  );

  return (
    <Box p={2}>
      <Box mb={2}>
        <Typography variant="h6">Filter by Category</Typography>
        <Grid container spacing={1}>
          {uniqueCategories.map((category) => (
            <Grid item key={category}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCheckboxChange(category)}
                  />
                }
                label={category}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Source Category</TableCell>
              <TableCell>Source of Energy</TableCell>
              <TableCell>Emission Factor</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>User Input</TableCell>
              <TableCell>CO₂ Emission</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => {
              const isCustom = row.isCustom;

              return (
                <TableRow key={index}>
                  <TableCell>
                    {isCustom ? (
                      <TextField
                        select
                        size="small"
                        value={row.type}
                        onChange={(e) =>
                          handleInputChange(index, "type", e.target.value)
                        }
                        SelectProps={{ native: true }}
                      >
                        <option value="">Select Scope</option>
                        <option value="Scope 1">Scope 1</option>
                        <option value="Scope 2">Scope 2</option>
                        <option value="Scope 3">Scope 3</option>
                      </TextField>
                    ) : (
                      row.type
                    )}
                  </TableCell>

                  <TableCell>
                    {isCustom ? (
                      <TextField
                        value={row.source_category}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "source_category",
                            e.target.value
                          )
                        }
                        size="small"
                      />
                    ) : (
                      row.source_category
                    )}
                  </TableCell>

                  <TableCell>
                    {isCustom ? (
                      <TextField
                        value={row.source_of_energy}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "source_of_energy",
                            e.target.value
                          )
                        }
                        size="small"
                      />
                    ) : (
                      row.source_of_energy
                    )}
                  </TableCell>

                  <TableCell>
                    <TextField
                      type="number"
                      value={row.emmision_factor}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "emmision_factor",
                          e.target.value
                        )
                      }
                      size="small"
                      disabled={!isCustom}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      value={row.unit}
                      onChange={(e) =>
                        handleInputChange(index, "unit", e.target.value)
                      }
                      size="small"
                      disabled={!isCustom}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      type="number"
                      value={row.user_input}
                      onChange={(e) =>
                        handleInputChange(index, "user_input", e.target.value)
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      type="number"
                      value={row.co2_emission}
                      size="small"
                      disabled
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {Object.keys(emissions).length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">CO₂ Emissions by Scope</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Scope</TableCell>
                <TableCell>Emissions (kg CO₂)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(emissions).map(([type, total]) => (
                <TableRow key={type}>
                  <TableCell>{type}</TableCell>
                  <TableCell>{total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddRow}
            sx={{ mr: 2 }}
          >
            Add Row
          </Button>
          <Button variant="contained" color="primary" onClick={handleCalculate}>
            Calculate
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleReset}
            sx={{ ml: 2 }}
          >
            Reset
          </Button>
        </Box>
        <Typography variant="h6">
          Total CO₂ Emission: {totalEmission.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CFPCalculator;
