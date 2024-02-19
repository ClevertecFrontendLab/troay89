import React from "react";
import {Button, Checkbox, Form, Input, Space, Typography} from "antd";
import {GooglePlusOutlined} from "@ant-design/icons";
import {User} from "../../../type/User.ts";
import {useRegisterUserMutation} from "@redux/reducers/apiSlice.ts";
import {saveDataUser} from "@redux/reducers/userSlice.ts";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";

const {Link} = Typography;

export const AuthComponent: React.FC = () => {

    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [authUser3, { data, isLoading, error }] = useRegisterUserMutation();
    // const onChange = (e: CheckboxChangeEvent) => {
    //     console.log(`checked = ${e.target.checked}`);
    // };
    const onFinish = (values: User) => {
        console.log('auth values of form: ', values);
        authUser3({ email: values.email, password: values.password });
    };
    return (
        <Form form={form} name='auth' onFinish={onFinish}>
            <Space direction='vertical'>
                <Space direction='vertical'>
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
                    >
                        <Input
                            className={'auth-input auth-input-email'}
                            size={'large'}
                            addonBefore='e-mail:'
                        />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                    >
                        <Input.Password className={'auth-input'} placeholder='Пaроль'/>
                    </Form.Item>
                </Space>
                <Space className={'extra-container'}>
                    <Form.Item
                        className={'auth-check'}
                        name='isSave'>
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>
                    <Link className={'forgot-link'} href='https://ant.design' target='_blank'>
                        Забыли пароль?
                    </Link>
                </Space>
                <Space className={'container-auth-buttons'} direction={'vertical'}>
                    <Button className={'auth-enter'} type='primary' htmlType='submit'>
                        Войти
                    </Button>
                    <Button className={'auth-enter'} icon={<GooglePlusOutlined/>}>
                        Войти через Google
                    </Button>
                </Space>
            </Space>
        </Form>
    );
}
