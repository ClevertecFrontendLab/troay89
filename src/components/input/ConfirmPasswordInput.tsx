import React from 'react';
import { Form, Input } from 'antd';

interface PasswordInputProps {
    className: string;
    classNameForm?: string;
    placeholder: string;
    autoComplete: string;
    dataTestId: string;
    dependence: string;
}

export const ConfirmPasswordInput: React.FC<PasswordInputProps> = ({
    className,
    classNameForm,
    placeholder,
    autoComplete,
    dataTestId,
    dependence,
}) => (
    <Form.Item
        name='confirmPassword'
        className={classNameForm}
        dependencies={[dependence]}
        rules={[
            {
                required: true,
                message: '',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли не совпадают'));
                },
            }),
        ]}
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
