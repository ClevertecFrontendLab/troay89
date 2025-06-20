import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    Heading,
    Icon,
    Textarea,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useHandleError } from '~/hooks/useErrorHandler';
import { useCreateNoteMutation } from '~/store/slice/api/api-slice';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

import { ErrorModal } from '../alert/alert-failed/AlertFailed';
import { AlertSuccess } from '../alert/alert-success/AlertSuccess';
import CloseDrawer from '../icons/CloseDrawer';
import { Overlay } from '../overlay/Overlay';
import styles from './DrawerCreateNotes.module.css';

type DrawerCreateNotesProps = {
    isOpen: boolean;
    onClose: () => void;
    userId?: string;
};

type FormValues = {
    text: string;
};
const schema = yup.object({
    text: yup
        .string()
        .required('Текст обязателен')
        .min(10, 'Минимум 10 символов')
        .max(160, 'Максимум 160 символов'),
});

export const DrawerCreateNotes = ({ isOpen, onClose, userId }: DrawerCreateNotesProps) => {
    const [createNote, { isLoading }] = useCreateNoteMutation();
    const [isOpenError, setIsOpenError] = useState(false);
    const [isOpenSuccecc, setIsOpenSuccecc] = useState(false);
    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');
    const handleError = useHandleError(setTitle, setNotification, 'create-new-notes');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
        defaultValues: { text: '' },
    });

    const onSubmit = handleSubmit(async ({ text }) => {
        if (!userId) return;
        try {
            await createNote({ text, userId }).unwrap();
            setIsOpenSuccecc(true);
            console.log('I am here');
            reset();
            onClose();
        } catch (err) {
            if (isFetchBaseQueryError(err)) {
                setIsOpenError(true);
                handleError(err);
            }
        }
    });

    return (
        <>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
                <DrawerOverlay bg='alpha.300' backdropFilter=' blur(4px)' />
                <DrawerContent
                    maxW={{ base: '344px', bp95: '463px' }}
                    h='100vh'
                    py={{ base: '16px', bp95: '32px' }}
                >
                    <DrawerHeader
                        p={0}
                        mb={{ base: 8, bp95: 10 }}
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        px={{ base: '16px', bp95: '32px' }}
                    >
                        <Heading as='h2' className={styles.drawer_header} letterSpacing='0.25px'>
                            Новая заметка
                        </Heading>
                        <Icon
                            as={CloseDrawer}
                            onClick={onClose}
                            boxSize={6}
                            mr={{ base: 3, bp95: 0 }}
                        />
                    </DrawerHeader>
                    <DrawerBody
                        as='form'
                        display='flex'
                        flexDirection='column'
                        justifyContent='space-between'
                        mr={{ base: '20px', bp95: '32px' }}
                        ml={{ base: '16px', bp95: '32px' }}
                        onSubmit={onSubmit}
                        p={0}
                    >
                        <FormControl isInvalid={!!errors.text}>
                            <Textarea
                                className={styles.text_area}
                                px='11px'
                                py='7px'
                                placeholder='максимально 160 символов'
                                minH={{ base: '116px', bp95: '96px' }}
                                {...register('text')}
                                errorBorderColor='red.500'
                            />
                        </FormControl>
                        <Button
                            className={styles.button}
                            size={{ base: 'sm', bp95: 'lg' }}
                            bg='alpha.900'
                            color='white'
                            maxW='177px'
                            ml='auto'
                            type='submit'
                        >
                            Опубликовать
                        </Button>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            {isLoading && <Overlay />}
            {isOpenSuccecc && (
                <AlertSuccess
                    message='Заметка опубликована'
                    onClose={() => setIsOpenSuccecc(false)}
                    position='fixed'
                />
            )}
            {isOpenError && (
                <ErrorModal
                    onClose={() => setIsOpenError(false)}
                    title={title}
                    notification={notification}
                />
            )}
        </>
    );
};
