import React from 'react';
import { Button, Checkbox, Input, Space, Typography } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const { Link } = Typography;

const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
};

export const contentList: Record<string, React.ReactNode> = {
    tab1: (
        <Space direction='vertical'>
            <Space direction='vertical'>
                <Input
                    className={'auth-input auth-input-email'}
                    size={'large'}
                    addonBefore='e-mail:'
                />
                <Input.Password className={'auth-input'} placeholder='Пaроль' />
            </Space>
            <Space className={'extra-container'}>
                <Checkbox onChange={onChange}>Запомнить меня</Checkbox>
                <Link className={'forgot-link'} href='https://ant.design' target='_blank'>
                    Забыли пароль?
                </Link>
            </Space>
            <Space className={'container-auth-buttons'} direction={'vertical'}>
                <Button className={'auth-enter'} type='primary'>
                    Войти
                </Button>
                <Button className={'auth-enter'} icon={<GooglePlusOutlined />}>
                    Войти через Google
                </Button>
            </Space>
        </Space>
    ),
    tab2: (
        <Space direction='vertical' style={{ columnGap: 0 }}>
            <Space className={'container-input-reg'} direction='vertical'>
                <Input
                    className={'reg-input reg-input-email'}
                    size={'large'}
                    addonBefore='e-mail:'
                />
                <Input.Password className={'reg-input'} placeholder='Пaроль' />
            </Space>
            <span className={'password-message'}>
                Пароль не менее 8 символов, с заглавной буквой и цифрой
            </span>
            <Input.Password className={'reg-input repeat-pass'} placeholder='Повторите пaроль' />
            <Button className={'reg-enter'} type='primary'>
                Войти
            </Button>
            <Button className={'auth-enter'} icon={<GooglePlusOutlined />}>
                Регистрация через Google
            </Button>
        </Space>
    ),
};
