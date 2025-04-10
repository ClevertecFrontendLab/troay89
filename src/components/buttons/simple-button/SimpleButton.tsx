import { Button } from '@chakra-ui/react';

import styled from './SimpleButton.module.css';

function SimpleButton() {
    return (
        <Button className={`${styled.button} ${styled.extra}`} bg='blackAlpha.900' color='white'>
            Готовить
        </Button>
    );
}

export default SimpleButton;
