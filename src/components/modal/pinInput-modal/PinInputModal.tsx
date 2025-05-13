import {
    HStack,
    Icon,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    PinInput,
    PinInputField,
    Text,
} from '@chakra-ui/react';

import { peopleOnChair } from '~/assets/images/modal-mage';
import { CloseRoundModule } from '~/components/icons/CloseRoundModule';

import styles from './PinInputModal.module.css';

type PinInputModalType = {
    isOpen: boolean;
    onClose: () => void;
};

export const PinInputModal = ({ isOpen, onClose }: PinInputModalType) => {
    const message =
        'Мы отправили вам на e-mail ekaterinabaker@gmail.ruшестизначный код. Введите его ниже.';
    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backgroundColor='alpha.300' backdropFilter='blur(4px)' />
            <ModalContent maxW='396px' alignItems='center' m={0}>
                <Image src={peopleOnChair} boxSize='206px' mt={8} />
                <Icon
                    as={CloseRoundModule}
                    position='absolute'
                    top={6}
                    right={6}
                    boxSize={6}
                    onClick={onClose}
                />
                <ModalBody p={8} w='100%'>
                    <Text
                        className={styles.text}
                        textAlign='center'
                        pb={4}
                        whiteSpace='pre-line'
                        px={5}
                    >
                        {message}
                    </Text>
                    <HStack justify='center'>
                        <PinInput>
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                        </PinInput>
                    </HStack>
                    <Text textAlign='center' className={styles.secondMessage}>
                        Не пришло письмо? Проверьте папку Спам.
                    </Text>
                </ModalBody>
                {/* {isVerificationFailedOpen && <ErrorModal onClose={() => setIsVerificationFailedOpen(false)} title={title} notification={notification} />} */}
            </ModalContent>
        </Modal>
    );
};
