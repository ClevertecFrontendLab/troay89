import { Form, Input } from 'antd';
import React from 'react';

type ValidateStatus = '' | 'error' | 'validating' | 'success' | 'warning' | undefined;
type EmailInputProps = {
    className: string;
    dataTestId: string;
    autoComplete: string;
    validateStatus?: ValidateStatus;
    handleChangeInput?: () => void;
};

export const EmailInput: React.FC<EmailInputProps> = ({
    className,
    validateStatus,
    autoComplete,
    dataTestId,
    handleChangeInput,
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
            autoComplete={autoComplete}
            addonBefore='e-mail:'
            data-test-id={dataTestId}
            onChange={handleChangeInput}
        />
    </Form.Item>
);
