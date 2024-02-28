import {Form, Input} from "antd";
import React from "react";

type ValidateStatus = "" | "error" | "validating" | "success" | "warning" | undefined;
interface EmailInputProps {
    className: string;
    validateStatus?: ValidateStatus;
    dataTestId: string
}

export const EmailInput: React.FC<EmailInputProps> = ({ className, validateStatus, dataTestId }) => (
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
