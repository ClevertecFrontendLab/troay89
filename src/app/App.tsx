import { ChakraProvider } from '@chakra-ui/react';

import Layout from './layout/Layout';
import MainPage from './pages/start-page/MainPage';

function App() {
    return (
        <ChakraProvider>
            <Layout>
                <MainPage />
            </Layout>
        </ChakraProvider>
    );
}

export default App;
