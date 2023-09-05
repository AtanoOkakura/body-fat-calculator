import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Typography, Snackbar } from '@mui/material';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import MuiAlert from '@mui/material/Alert';

interface AppProps { }

interface Record {
  date: string;
  height: number;
  neck: number;
  waist: number;
  hip: number;
  bodyFat: number;
}

const dummyData: Record[] = [
  { date: '2022-01-01', height: 170, neck: 38, waist: 80, hip: 100, bodyFat: 20 },
  { date: '2022-01-02', height: 170, neck: 37, waist: 79, hip: 99, bodyFat: 19 },
  { date: '2022-01-03', height: 170, neck: 36, waist: 78, hip: 98, bodyFat: 18 },
  { date: '2022-01-04', height: 170, neck: 35, waist: 77, hip: 97, bodyFat: 17 },
  { date: '2022-01-05', height: 170, neck: 34, waist: 76, hip: 96, bodyFat: 16 },
  { date: '2022-01-06', height: 170, neck: 33, waist: 75, hip: 95, bodyFat: 15 },
  { date: '2022-01-07', height: 170, neck: 32, waist: 74, hip: 94, bodyFat: 14 },
];

const App: React.FC<AppProps> = () => {
  const [height, setHeight] = useState<number>(Number(localStorage.getItem('height')) || 170);
  const [neck, setNeck] = useState<number>(Number(localStorage.getItem('neck')) || 38);
  const [waist, setWaist] = useState<number>(Number(localStorage.getItem('waist')) || 80);
  const [hip, setHip] = useState<number>(Number(localStorage.getItem('hip')) || 100);
  const [gender, setGender] = useState<string>(localStorage.getItem('gender') || 'male');
  const [bodyFat, setBodyFat] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  //const [records, setRecords] = useState<Record[]>(JSON.parse(localStorage.getItem('records') || '[]'));

  const [records, setRecords] = useState<Record[]>(dummyData);

  useEffect(() => {
    calculateBodyFat();
  }, [height, neck, waist, hip, gender]);

  useEffect(() => {
    localStorage.setItem('gender', gender);
    localStorage.setItem('height', height.toString());
    localStorage.setItem('neck', neck.toString());
    localStorage.setItem('waist', waist.toString());
    localStorage.setItem('hip', hip.toString());
    localStorage.setItem('records', JSON.stringify(records));
  }, [height, neck, waist, hip, gender, records]);

  const calculateBodyFat = () => {
    let bodyFat: number;
    if (gender === 'male') {
      bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 30.30;
    } else {
      bodyFat = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 104.912;
    }
    setBodyFat(bodyFat.toFixed(2));
  };

  const handleRecord = () => {
    const date = new Date().toISOString().slice(0, 10);
    setRecords((prevRecords) => [...prevRecords.filter((record) => record.date !== date), { date, height, neck, waist, hip, bodyFat: Number(bodyFat) }]);
    setOpenSnackbar(true);
    setTimeout(() => setOpenSnackbar(false), 3000);
  };

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        US Navy Body Fat Calculator
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>性別</InputLabel>
        <Select value={gender} onChange={(e) => setGender(e.target.value)}>
          <MenuItem value="male">男性</MenuItem>
          <MenuItem value="female">女性</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="身長(cm)"
        type="number"
        value={height}
        onChange={(e) => setHeight(Number(e.target.value))}
        fullWidth
        margin="normal"
      />
      <TextField
        label="首回り - いちばん細い部分(cm)"
        type="number"
        value={neck}
        onChange={(e) => setNeck(Number(e.target.value))}
        fullWidth
        margin="normal"
      />
      <TextField
        label="腹囲  - いちばん細い部分(cm)"
        type="number"
        value={waist}
        onChange={(e) => setWaist(Number(e.target.value))}
        fullWidth
        margin="normal"
      />
      {gender === 'female' && (
        <TextField
          label="臀囲 - いちばん太い部分 (cm)"
          type="number"
          value={hip}
          onChange={(e) => setHip(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
      )}
      {bodyFat && (
        <p>
          推定体脂肪率: {bodyFat}%
        </p>
      )}
      <Button variant="contained" onClick={handleRecord}>
        Record
      </Button>
      <Snackbar open={openSnackbar}>
        <MuiAlert severity="success">記録しました！</MuiAlert>
      </Snackbar>
      {records.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom style={{ marginTop: '16px' }}>
            Records
          </Typography>
          <ResponsiveContainer width="95%" height={300}>
            <LineChart data={records}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* <Line type="monotone" dataKey="height" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
              <Line type="monotone" dataKey="neck" stroke="#82ca9d" />
              <Line type="monotone" dataKey="waist" stroke="#ffc658" />
              {gender === 'female' && (
                <Line type="monotone" dataKey="hip" stroke="#ff7300" />
              )}
              <Line type="monotone" dataKey="bodyFat" stroke="#ff0000" />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default App;
