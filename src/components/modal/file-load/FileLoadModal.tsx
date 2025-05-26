import {
    Button,
    Heading,
    Icon,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { fallback } from '~/assets/images/header';
import { CloseRoundModule } from '~/components/icons/CloseRoundModule';
import { useUploadFileMutation } from '~/store/slice/api/api-slice';

import styles from './FileLoadModal.module.css';

type LoginFailedModuleType = {
    isOpen: boolean;
    onClose: () => void;
    setloadImageUrl: (value: string) => void;
};

export const FileLoadModal = ({ isOpen, onClose, setloadImageUrl }: LoginFailedModuleType) => {
    const [uploadFile] = useUploadFileMutation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewSrc, setPreviewSrc] = useState<string>('');
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setSelectedFile(file);
            const previewURL = URL.createObjectURL(file);
            setPreviewSrc(previewURL);
        }
    };

    const handleFileSave = async () => {
        if (!selectedFile) return;
        try {
            const responce = await uploadFile({ file: selectedFile }).unwrap();
            setloadImageUrl(responce.url);
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(
        () => () => {
            if (previewSrc !== fallback) {
                URL.revokeObjectURL(previewSrc);
            }
        },
        [previewSrc],
    );

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backgroundColor='alpha.300' backdropFilter='blur(4px)' />
            <ModalContent
                maxW={{ base: '316px', bp115: '396px' }}
                alignItems='center'
                m={0}
                borderRadius='16px'
            >
                <Icon
                    as={CloseRoundModule}
                    position='absolute'
                    top={6}
                    right={6}
                    boxSize={6}
                    onClick={onClose}
                />
                <Heading className={styles.title} as='h1' pt={8} m={0}>
                    Изображение
                </Heading>
                <ModalBody p={8} w='100%'>
                    <Image
                        boxSize={{ base: '108px', bp115: '206px' }}
                        src={previewSrc}
                        alt='место для загрузки изображения'
                        background='alpha.200'
                        fallbackSrc={fallback}
                        objectFit={previewSrc ? 'unset' : 'none'}
                        objectPosition='center'
                        mx='auto'
                        mb={previewSrc ? 0 : 2}
                        onClick={handleImageClick}
                        cursor='pointer'
                    />
                    {previewSrc && (
                        <Button
                            className={styles.button}
                            maxW='100%'
                            width='100%'
                            mt={8}
                            px={0}
                            bg='alpha.900'
                            color='white'
                            size='lg'
                            colorScheme='teal'
                            onClick={handleFileSave}
                        >
                            Сохранить
                        </Button>
                    )}
                    <Input
                        type='file'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        display='none'
                        accept='image/*'
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
