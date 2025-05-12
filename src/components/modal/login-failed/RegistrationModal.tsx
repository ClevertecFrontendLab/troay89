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

import { registaration } from '~/assets/images/modal-mage';

export const LoginFailed = () => {
    const { onClose } = useDisclosure();
    return (
        <>
            <Modal isOpen={false} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <Image src={registaration} />
                    <ModalCloseButton />
                    <ModalHeader>
                        Остался последний шаг. Нужно верифицировать ваш e-mail{' '}
                    </ModalHeader>
                    <ModalBody>
                        <Text>
                            Мы отправили вам на почту ekaterinabaker@gmail.ru ссылку для
                            верификации.
                        </Text>
                        <Text>
                            Не пришло письмо? Проверьте папку Спам. По другим вопросам{' '}
                            <Link>свяжитесь с поддержкой</Link>свяжитесь с поддержкой
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
