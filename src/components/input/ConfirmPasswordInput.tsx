import React, { useState } from 'react';
import { Form, Input } from 'antd';

type PasswordInputProps = {
    className: string;
    placeholder: string;
    autoComplete: string;
    dataTestId: string;
    dependence: string;
    isCheckStartData: boolean;
    classNameForm?: string;
    handleChangeInput?: () => void;
};

export const ConfirmPasswordInput: React.FC<PasswordInputProps> = ({
    className,
    placeholder,
    autoComplete,
    dataTestId,
    dependence,
    isCheckStartData,
    classNameForm,
    handleChangeInput,
}) => {
    const [hasBeenTouched, setHasBeenTouched] = useState(isCheckStartData);

    const handleChange = () => {
        setHasBeenTouched(true);
        handleChangeInput && handleChangeInput();
    };

    return (
        <Form.Item
            name='confirmPassword'
            className={classNameForm}
            dependencies={[dependence]}
            rules={
                hasBeenTouched
                    ? [
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
                      ]
                    : undefined
            }
        >
            <Input.Password
                className={className}
                placeholder={placeholder}
                autoComplete={autoComplete}
                data-test-id={dataTestId}
                size={'large'}
                onFocus={() => setHasBeenTouched(true)}
                onChange={handleChange}
            />
        </Form.Item>
    );
};
