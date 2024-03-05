import React from 'react';
import { Form, Input } from 'antd';

type PasswordInputProps = {
    className: string;
    placeholder: string;
    autoComplete: string;
    dataTestId: string;
    dependence: string;
    classNameForm?: string;
};

export const ConfirmPasswordInput: React.FC<PasswordInputProps> = ({
    className,
    placeholder,
    autoComplete,
    dataTestId,
    dependence,
    classNameForm,
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
