import { Button } from '@chakra-ui/react';

import styled from './SimpleButton.module.css';

function SimpleButton() {
    return (
        <Button
            className={`${styled.button} ${styled.extra}`}
            bg='blackAlpha.900'
            color='white'
            variant='solid'
            colorScheme='teal'
            px={{ bp95: '13px', base: 2 }}
            h={{ bp95: 8, base: 6 }}
        >
            Готовить
        </Button>
    );
}

export default SimpleButton;
