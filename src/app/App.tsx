import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router';

import AppRouter from '~/router/AppRoter';

import Layout from './layout/Layout';

function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Layout>
                    <AppRouter />
                </Layout>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
