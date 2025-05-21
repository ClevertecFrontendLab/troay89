import {
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { DATA_TEST_ID } from '~/constants/dataTestId';

import styles from './CommonInputField.module.css';

type CommonInputFieldProps = {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    autoComplete?: string;
    register: UseFormRegisterReturn;
    error?: string;
    handleBlur?: React.FocusEventHandler<HTMLInputElement>;
    inputRightElement?: ReactNode;
    dataTestId?: string;
    borderColor?: string;
    prompt?: ReactNode;
};

export const CommonInputField = ({
    id,
    label,
    type = 'text',
    placeholder,
    autoComplete,
    register,
    error,
    handleBlur,
    inputRightElement,
    dataTestId,
    borderColor,
    prompt,
}: CommonInputFieldProps) => {
    const mergedOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        register.onBlur(e);
        if (handleBlur) {
            handleBlur(e);
        }
    };
    return (
        <FormControl id={id}>
            <FormLabel className={styles.form_control} mb={1}>
                {label}
            </FormLabel>
            {inputRightElement ? (
                <InputGroup>
                    <Input
                        className={styles.form_input}
                        type={type}
                        placeholder={placeholder}
                        bg='white'
                        size='lg'
                        borderColor={error ? 'red' : borderColor || 'lime.150'}
                        autoComplete={autoComplete}
                        _focus={{ boxShadow: 'none' }}
                        {...register}
                        onBlur={mergedOnBlur}
                        data-test-id={dataTestId}
                    />
                    <InputRightElement
                        boxSize={12}
                        data-test-id={DATA_TEST_ID.PASSWORD_VISIBILITY_BUTTON}
                    >
                        {inputRightElement}
                    </InputRightElement>
                </InputGroup>
            ) : (
                <Input
                    className={styles.form_input}
                    type={type}
                    placeholder={placeholder}
                    bg='white'
                    size='lg'
                    borderColor={error ? 'red' : borderColor || 'lime.150'}
                    autoComplete={autoComplete}
                    _focus={{ boxShadow: 'none' }}
                    {...register}
                    onBlur={mergedOnBlur}
                    data-test-id={dataTestId}
                />
            )}
            {prompt}
            {error ? (
                <Text className={styles.message} color='red.500' mt={1}>
                    {error}
                </Text>
            ) : (
                <Box h={5} />
            )}
        </FormControl>
    );
};
