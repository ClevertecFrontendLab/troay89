import React, { useEffect, useState } from 'react';
import { LayoutComponent } from '@components/layout';
import { Alert, DatePicker, Form, Input, Modal, Upload, UploadFile, UploadProps } from 'antd';
import { CalendarTwoTone, PlusOutlined } from '@ant-design/icons';
import { EmailInput } from '@components/input/EmailInput.tsx';
import { PasswordInput } from '@components/input/PasswordInput.tsx';
import { ConfirmPasswordInput } from '@components/input/ConfirmPasswordInput.tsx';
import './Profile.css';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';
import {
    useChangeUserInfoMutation,
    useGetUserInfoQuery,
    useUploadImageMutation,
} from '@redux/reducers/apiSlice.ts';
import { Loader } from '@components/loader/Loader.tsx';
import moment from 'moment';
import { RcFile } from 'antd/es/upload';
import { InfoUser } from '../../type/User.ts';
import { JVT_TOKEN, paths, statusCodes } from '@constants/constants.ts';
import { history } from '@redux/reducers/routerSlice.ts';
import { ErrorSaveTrainingModal } from '@components/modal/error-training-modal/ErrorSaveTrainingModal.tsx';

// https://training-api.clevertec.ru/${imageUrl}
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const ProfileForm: React.FC = () => {
    const [form] = Form.useForm();
    const [isShowAlert, setIsShowAlert] = useState(false);
    const [isModalErrorSave, setIsModalErrorSave] = useState(false);
    const [isModalErrorSavePhoto, setIsModalErrorSavePhoto] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [isDisable, setIsDisabled] = useState(true);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { data, isLoading, error } = useGetUserInfoQuery();
    const [
        changeUserInfo,
        { data: dataEditUser, isLoading: isLoadingEditUser, error: errorEditUser },
    ] = useChangeUserInfoMutation();

    const [
        uploadImage,
        { data: dataUpdatePhoto, isLoading: isLoadingUpdatePhoto, error: errorUpdatePhoto },
    ] = useUploadImageMutation();

    useEffect(() => {
        if (data) {
            console.log(data);
            if (data.imgSrc) {
                setUploadedImageUrl(data.imgSrc);
                setFileList([
                    {
                        uid: '-5',
                        name: 'image.png',
                        status: 'success',
                        url:
                            data.imgSrc &&
                            data.imgSrc.startsWith('https://lh3.googleusercontent.com')
                                ? data.imgSrc
                                : `https://training-api.clevertec.ru${data.imgSrc}`,
                    },
                ]);
            }
        } else if (error) {
            if ('status' in error && error.status === statusCodes.ERROR_403) {
                localStorage.removeItem(JVT_TOKEN);
                sessionStorage.removeItem(JVT_TOKEN);
                history.push(paths.auth.path);
            }
        }
    }, [data, error]);

    useEffect(() => {
        if (dataEditUser) {
            setIsShowAlert(true);
            form.setFieldsValue({
                firstName: dataEditUser.firstName,
                lastName: dataEditUser.lastName,
                email: dataEditUser.email,
                birthday: dataEditUser.birthday ? moment(dataEditUser.birthday) : undefined,
            });
        } else if (errorEditUser) {
            setIsModalErrorSave(true);
        }
    }, [dataEditUser, errorEditUser, form]);

    useEffect(() => {
        if (isLoadingUpdatePhoto) {
            const newFileList = fileList.map((file) => {
                if (file.status !== 'uploading') {
                    return { ...file, status: 'uploading' };
                }
                return file;
            });
            setFileList(newFileList);
        } else if (dataUpdatePhoto) {
            if ('url' in dataUpdatePhoto && dataUpdatePhoto.url) {
                console.log('I am here');
                setFileList([
                    {
                        uid: '-5',
                        name: 'image.png',
                        status: 'success',
                        url:
                            dataUpdatePhoto.url &&
                            'url' in dataUpdatePhoto &&
                            dataUpdatePhoto.url.startsWith('https://lh3.googleusercontent.com')
                                ? dataUpdatePhoto.url
                                : `https://training-api.clevertec.ru${dataUpdatePhoto.url}`,
                    },
                ]);
                setUploadedImageUrl(dataUpdatePhoto.url as string);
                setIsDisabled(false);
            }
        } else if (errorUpdatePhoto) {
            setFileList([{ uid: '-5', name: 'image.png', status: 'error', url: '' }]);
        }
    }, [dataUpdatePhoto, errorUpdatePhoto, isLoadingUpdatePhoto]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChangeInput = () => {
        if (isDisable) {
            setIsDisabled(false);
        }
    };

    const handleChange: UploadProps['onChange'] = ({ file, fileList }) => {
        const saveFile = file.originFileObj;
        if (saveFile) {
            const isBigSize = saveFile.size / 1024 / 1024 < 5;
            if (!isBigSize) {
                setFileList([{ uid: '-5', name: 'image.png', status: 'error', url: '' }]);
                setIsDisabled(true);
                setIsModalErrorSavePhoto(true);
                return;
            }
            const formData = new FormData();
            formData.append('file', saveFile);
            uploadImage(formData);
        }
        setFileList(fileList);
    };

    const uploadButton = (
        <div className={'wrapper-upload'}>
            <PlusOutlined />
            <div className={'upload-text'}>Загрузить фото профиля</div>
        </div>
    );

    const onFinish = (values: InfoUser) => {
        console.log(values);
        changeUserInfo({
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            birthday: values.birthday,
            password: values.password,
            imgSrc: uploadedImageUrl ? uploadedImageUrl : undefined,
        });
    };

    if (isLoading || isLoadingEditUser) {
        return <Loader />;
    }

    return (
        <>
            <div className={'wrapper-profile-form'}>
                <Form
                    className={'profile-form'}
                    layout='horizontal'
                    onFinish={onFinish}
                    form={form}
                    initialValues={{
                        email: data && data.email,
                    }}
                >
                    <h5 className={'title'}>Личная информация</h5>
                    <div className={'personal-profile'}>
                        <Form.Item label='' valuePropName='fileList' name={'imgSrc'}>
                            <>
                                <Upload
                                    fileList={fileList}
                                    listType='picture-card'
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                                <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
                                    <img
                                        alt='example'
                                        style={{ width: '100%' }}
                                        src={previewImage}
                                    />
                                </Modal>
                            </>
                        </Form.Item>
                        <div className={'wrapper-personal-input'}>
                            <Form.Item name={'firstName'}>
                                <Input
                                    placeholder={'Имя'}
                                    size={'large'}
                                    defaultValue={data && data.firstName}
                                    onChange={handleChangeInput}
                                />
                            </Form.Item>
                            <Form.Item name={'lastName'}>
                                <Input
                                    placeholder={'Фамилия'}
                                    size={'large'}
                                    defaultValue={data && data.lastName}
                                    onChange={handleChangeInput}
                                />
                            </Form.Item>
                            <Form.Item name={'birthday'}>
                                <DatePicker
                                    placeholder={'Дата рождения'}
                                    size={'large'}
                                    suffixIcon={<CalendarTwoTone twoToneColor={'#D9D9D9'} />}
                                    format={'DD-MM-YYYY'}
                                    defaultValue={
                                        data && data.birthday ? moment(data.birthday) : undefined
                                    }
                                    onChange={handleChangeInput}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <h2 className={'title'}>Приватность и авторизация</h2>
                    <div className={'private-profile'}>
                        <EmailInput
                            className={'profile-email'}
                            dataTestId={''}
                            autoComplete={'email'}
                            handleChangeInput={handleChangeInput}
                        />
                        <PasswordInput
                            className={'profile-password'}
                            placeholder={'Пароль'}
                            dataTestId={''}
                            autoComplete={'off'}
                            isCheckStartData={false}
                            helpText={'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
                            handleChangeInput={handleChangeInput}
                        />
                        <ConfirmPasswordInput
                            className={''}
                            dataTestId={''}
                            placeholder={'Повторите пароль'}
                            autoComplete={'off'}
                            isCheckStartData={false}
                            dependence={'password'}
                            handleChangeInput={handleChangeInput}
                        />
                    </div>
                    <PrimaryButton
                        className={'style-second'}
                        dataTestId={''}
                        htmlType={'submit'}
                        text={'Сохранить изменения'}
                        disabled={isDisable}
                    />
                </Form>
                {isShowAlert && (
                    <Alert
                        message='Данные профиля успешно обновлены'
                        type='success'
                        showIcon
                        closable
                    />
                )}
            </div>
            <ErrorSaveTrainingModal
                isModal={isModalErrorSavePhoto}
                closeModal={() => setIsModalErrorSavePhoto(false)}
                tittle={'Файл слишком большой '}
                text={'Выберите файл размером [......] МБ.'}
                className={'big-file'}
            />
            <ErrorSaveTrainingModal
                isModal={isModalErrorSave}
                closeModal={() => setIsModalErrorSave(false)}
                tittle={'При сохранении данных произошла ошибка'}
                text={'Придётся попробовать ещё раз'}
                className={'error-save'}
            />
        </>
    );
};

export const Profile: React.FC = () => {
    return <LayoutComponent>{() => <ProfileForm />}</LayoutComponent>;
};
