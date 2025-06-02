import {
    Button,
    Icon,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';

import { noExit } from '~/assets/images/modal-mage';
import { CloseRoundModule } from '~/components/icons/CloseRoundModule';
import { PencilWhite } from '~/components/icons/PencilWhite';
import { DATA_TEST_ID } from '~/constants/dataTestId';

import styles from './DraftSaveModal.module.css';

type LoginFailedModuleType = {
    isOpen: boolean;
    onSaveDraft: () => Promise<void>;
    onClose: () => void;
    onConfirm: () => void;
};

export const DraftSaveModal = ({
    isOpen,
    onSaveDraft,
    onClose,
    onConfirm,
}: LoginFailedModuleType) => {
    const message = 'Чтобы сохранить, нажмите кнопку сохранить черновик';
    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backgroundColor='alpha.300' backdropFilter='blur(4px)' />
            <ModalContent
                maxW={{ base: '316px', bp115: '396px' }}
                alignItems='center'
                m={0}
                borderRadius='16px'
                data-test-id={DATA_TEST_ID.RECIPE_PREVENTIVE_MODAL}
            >
                <Image src={noExit} boxSize={{ base: '108px', bp115: '206px' }} mt={8} />
                <Icon
                    as={CloseRoundModule}
                    position='absolute'
                    top={6}
                    right={6}
                    boxSize={6}
                    onClick={onClose}
                    data-test-id={DATA_TEST_ID.CLOSE_BUTTON}
                />
                <ModalBody p={8} w='100%'>
                    <ModalHeader
                        as='h1'
                        className={styles.header}
                        pt={0}
                        pb={4}
                        m={0}
                        textAlign='center'
                        px={0}
                    >
                        Выйти без сохранение?
                    </ModalHeader>
                    <Text
                        className={styles.text}
                        textAlign='center'
                        pb={8}
                        whiteSpace='pre-line'
                        color='alpha.700'
                    >
                        {message}
                    </Text>
                    <Button
                        className={styles.button}
                        mb={4}
                        maxW='100%'
                        width='100%'
                        px={0}
                        bg='alpha.900'
                        color='white'
                        size='lg'
                        colorScheme='teal'
                        onClick={onSaveDraft}
                        leftIcon={<PencilWhite />}
                    >
                        Сохранить черновик
                    </Button>
                    <Button
                        size='lg'
                        className={styles.button}
                        maxW='100%'
                        width='100%'
                        variant='ghost'
                        onClick={onConfirm}
                    >
                        Выйти без сохранения
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
