import React from 'react';
import { Form, Input } from 'antd';

type PasswordInputProps = {
    className: string;
    placeholder: string;
    autoComplete: string;
    dataTestId: string;
    helpText: string;
    classNameForm?: string;
    setIsTextPass?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PasswordInput: React.FC<PasswordInputProps> = ({
    className,
    placeholder,
    autoComplete,
    dataTestId,
    helpText,
    classNameForm,
    setIsTextPass,
}) => (
    <Form.Item
        name='password'
        className={classNameForm}
        rules={[
            {
                required: true,
                message: '',
            },
            () => ({
                validator(_, value) {
                    if (value && !value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
                        setIsTextPass && setIsTextPass(false);
                        return Promise.reject(
                            Error('Пароль не менее 8 символов, с заглавной буквой и цифрой'),
                        );
                    }
                    setIsTextPass && setIsTextPass(true);
                    return Promise.resolve();
                },
            }),
        ]}
        help={helpText}
    >
        <Input.Password
            className={className}
            placeholder={placeholder}
            autoComplete={autoComplete}
            data-test-id={dataTestId}
            size={'large'}
        />
    </Form.Item>
);
