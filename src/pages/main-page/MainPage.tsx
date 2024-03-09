import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Card } from 'antd';
import { CardComponent } from '@components/card/Card.tsx';
import {
    AndroidFilled,
    AppleFilled,
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined,
} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import './MainContent.css';
import { LayoutComponent } from '@components/layout';
import { history } from '@redux/reducers/routerSlice.ts';
import { JVT_TOKEN, paths, statusCodes } from '@constants/constants.ts';
import { useLazyGetPersonalTrainingListQuery } from '@redux/reducers/apiSlice.ts';
import { Loader } from '@components/loader/Loader.tsx';
import { ErrorModal } from '@components/modal/error-modal/ErrorModal.tsx';

const { Content } = Layout;

type MainPageProps = {
    isCloseSide: boolean;
};

const MainContent: React.FC<MainPageProps> = ({ isCloseSide }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 815px)' });
    const isTable = useMediaQuery({ query: '(max-width: 1000px)' });
    const spaceDesktop = !isTable && !isMobile && !isCloseSide ? <br /> : '';
    const spaceTableSider = !isCloseSide && isTable && !isMobile ? <br /> : '';
    const spaceTableDefault = !isCloseSide || isMobile ? '' : <br />;
    const spaceMobile = !isMobile ? '' : <br />;
    const spaceMobileSiderClose = isMobile && isCloseSide ? <br /> : '';
    const changeMargin = isCloseSide && isMobile ? 'change-margin' : '';
    const MobilePadding = isCloseSide && isMobile ? '17px 20px 0 15px' : '17px 10px 0 15px';
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [
        getPersonalTrainingList,
        {
            data: dataPersonalTraining,
            isLoading: isLoadingPersonalTraining,
            error: errorPersonalTraining,
        },
    ] = useLazyGetPersonalTrainingListQuery();
    const handleClickCalendar = () => {
        getPersonalTrainingList();
    };

    useEffect(() => {
        if (dataPersonalTraining) {
            setIsOpenModal(true);
            history.push(paths.trainingList.path);
        } else if (errorPersonalTraining) {
            if (
                'status' in errorPersonalTraining &&
                errorPersonalTraining.status === statusCodes.ERROR_403
            ) {
                localStorage.removeItem(JVT_TOKEN);
                sessionStorage.removeItem(JVT_TOKEN);
                history.push(paths.auth.path);
            } else {
                setIsOpenModal(true);
            }
        }
    }, [dataPersonalTraining, errorPersonalTraining]);

    if (isLoadingPersonalTraining) {
        return <Loader />;
    }

    return (
        <>
            <ErrorModal isModal={isOpenModal} closeModal={() => setIsOpenModal(false)} />
            <Content className='site-layout-background'>
                <Card className={`main-card-about ${changeMargin}`}>
                    <p>
                        С CleverFit ты сможешь: <br />— планировать свои тренировки {spaceMobile} на
                        календаре, выбирая тип
                        {spaceTableSider}
                        {spaceMobile} и уровень нагрузки;
                        <br />— отслеживать свои достижения {spaceMobile} в разделе статистики,
                        сравнивая свои результаты с нормами {spaceMobile} и рекордами;
                        <br />— создавать свой профиль, где {spaceMobile} ты можешь загружать свои
                        фото, видео и отзывы {spaceTableDefault} {spaceDesktop} о тренировках;
                        <br />— выполнять расписанные тренировки для разных частей тела, следуя
                        подробным инструкциям {spaceMobileSiderClose} и советам профессиональных
                        тренеров.
                    </p>
                </Card>
                <Card className={`main-card-tagline ${changeMargin}`}>
                    <h4 style={isMobile ? { padding: MobilePadding } : undefined}>
                        CleverFit — это не просто приложение, а твой {spaceTableSider}
                        личный помощник {spaceTableDefault} {spaceDesktop} в мире фитнеса. Не
                        откладывай на завтра — начни тренироваться уже сегодня!
                    </h4>
                </Card>
                <div className={`small-cards ${changeMargin}`}>
                    <CardComponent
                        title={'Расписать тренировки'}
                        content={'Тренировки'}
                        icon={<HeartFilled />}
                        isCloseSide={isCloseSide}
                        onClick={handleClickCalendar}
                    />
                    <CardComponent
                        title={'Назначить календарь'}
                        content={'Календарь'}
                        icon={<CalendarTwoTone twoToneColor={'#2F54EB'} />}
                        isCloseSide={isCloseSide}
                        onClick={handleClickCalendar}
                    />
                    <CardComponent
                        title={'Заполнить профиль'}
                        content={'Профиль'}
                        icon={<IdcardOutlined />}
                        isCloseSide={isCloseSide}
                        onClick={handleClickCalendar}
                    />
                </div>
                <Card className={'contact-card-header'} bordered={false}>
                    <p className={'contact-card-header-first-title'}>Скачать на телефон</p>
                    <p className={'contact-card-header-second-title'}>Доступно в PRO-тарифе</p>
                    <div className={'bord-contact-card'}></div>
                    <p className={'icon-contact-card'}>
                        <span className={'container-icon-contact-card'}>
                            {<AndroidFilled />} <span>Android OS</span> {<AppleFilled />}
                            <span>Apple iOS</span>
                        </span>
                    </p>
                </Card>
            </Content>
        </>
    );
};

export const MainPage: React.FC = () => {
    return (
        <LayoutComponent>{(collapsed) => <MainContent isCloseSide={collapsed} />}</LayoutComponent>
    );
};
