import { Form, Input } from 'antd';
import React from 'react';

type ValidateStatus = '' | 'error' | 'validating' | 'success' | 'warning' | undefined;
type EmailInputProps = {
    className: string;
    dataTestId: string;
    validateStatus?: ValidateStatus;
};

export const EmailInput: React.FC<EmailInputProps> = ({
    className,
    validateStatus,
    dataTestId,
}) => (
    <Form.Item
        name='email'
        rules={[
            {
                type: 'email',
                message: '',
            },
            {
                required: true,
                message: '',
            },
        ]}
        validateStatus={validateStatus}
    >
        <Input
            className={className}
            size={'large'}
            autoComplete={'email'}
            addonBefore='e-mail:'
            data-test-id={dataTestId}
        />
    </Form.Item>
);
