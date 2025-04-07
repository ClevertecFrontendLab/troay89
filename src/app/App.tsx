import { ChakraProvider } from '@chakra-ui/react';

import Layout from './layout/Layout';
import VeganPage from './pages/vegan-page/VeganPage';

function App() {
    return (
        <ChakraProvider>
            <Layout>
                <VeganPage />
            </Layout>
        </ChakraProvider>
    );
}

export default App;
