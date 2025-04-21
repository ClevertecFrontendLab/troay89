import { ChakraProvider, extendTheme, theme as baseTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router';

import AppRouter from '~/router/AppRoter';

const customBreakpoints = {
    ...baseTheme.breakpoints,
    bp189: '1891px',
    bp160: '1601px',
    bp115: '1151px',
    bp95: '951px',
    bp76: '761px',
};

const alphaColors = {
    50: 'rgba(0, 0, 0, 0.04)',
    100: 'rgba(0, 0, 0, 0.06)',
    300: 'rgba(0, 0, 0, 0.16)',
    400: 'rgba(0, 0, 0, 0.24)',
    600: 'rgba(0, 0, 0, 0.48)',
    800: 'rgba(0, 0, 0, 0.8)',
    900: 'rgba(0, 0, 0, 0.92)',
};

const customTheme = extendTheme({
    styles: {
        global: {
            body: {
                color: 'black',
            },
        },
    },
    breakpoints: customBreakpoints,
    components: {
        Heading: {
            baseStyle: {
                color: 'black',
            },
        },
        Text: {
            baseStyle: {
                color: 'black',
            },
        },
    },
    colors: {
        alpha: alphaColors,
    },
});

function App() {
    return (
        <ChakraProvider theme={customTheme}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
