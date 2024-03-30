import React, { useState } from 'react';
import { Form, Input } from 'antd';

type PasswordInputProps = {
    className: string;
    placeholder: string;
    autoComplete: string;
    dataTestId: string;
    helpText: string | React.ReactNode;
    isCheckStartData: boolean;
    classNameForm?: string;
    setIsTextPass?: React.Dispatch<React.SetStateAction<boolean>>;
    handleChangeInput?: () => void;
};

export const PasswordInput: React.FC<PasswordInputProps> = ({
    className,
    placeholder,
    autoComplete,
    dataTestId,
    helpText,
    isCheckStartData,
    classNameForm,
    setIsTextPass,
    handleChangeInput,
}) => {
    const [hasBeenTouched, setHasBeenTouched] = useState(isCheckStartData);
    const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const handleChange = () => {
        setHasBeenTouched(true);
        handleChangeInput && handleChangeInput();
    };

    return (
        <Form.Item
            name='password'
            className={classNameForm}
            rules={
                hasBeenTouched
                    ? [
                          {
                              required: true,
                              message: '',
                          },
                          () => ({
                              validator(_, value) {
                                  if (value && !value.match(PASSWORD_REGEX)) {
                                      setIsTextPass && setIsTextPass(false);
                                      return Promise.reject(
                                          Error(
                                              'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                          ),
                                      );
                                  }
                                  setIsTextPass && setIsTextPass(true);
                                  return Promise.resolve();
                              },
                          }),
                      ]
                    : undefined
            }
            help={helpText}
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
