import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        fontSize: 14,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 700,

        h1: { fontSize: '3rem' },
        h2: { fontSize: '2rem' },
        h3: { fontSize: '1.6rem' },
        h4: { fontSize: '1.4rem' },
        h5: { fontSize: '1.2rem' },
        h6: { fontSize: '1.1rem' },
        subtitle1: { fontSize: '0.8rem' },
        body1: { fontSize: 16 },
        button: { textTransform: 'none' },
    },
})