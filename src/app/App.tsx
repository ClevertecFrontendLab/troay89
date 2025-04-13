import { ChakraProvider, extendTheme, theme as baseTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router';

import AppRouter from '~/router/AppRoter';

import Layout from './layout/Layout';

const customBreakpoints = {
    ...baseTheme.breakpoints,
    bp189: '1891px',
    bp95: '951px',
    bp76: '761px',
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
});

function App() {
    return (
        <ChakraProvider theme={customTheme}>
            <BrowserRouter>
                <Layout>
                    <AppRouter />
                </Layout>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
