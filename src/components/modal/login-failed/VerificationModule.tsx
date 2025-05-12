import {
    Image,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

import { verification } from '~/assets/images/modal-mage';

export const VerificationModule = () => {
    const { onClose } = useDisclosure();
    return (
        <>
            <Modal isOpen={false} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <Image src={verification} />
                    <ModalCloseButton />
                    <ModalHeader>Упс! Что-то пошло не так</ModalHeader>
                    <ModalBody>
                        <Text>
                            Ваша ссылка для верификации недействительна. Попробуйте
                            зарегистрироваться снова.
                        </Text>
                        <Text>
                            Остались вопросы? Свяжитесь <Link>свяжитесь с поддержкой</Link>
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
