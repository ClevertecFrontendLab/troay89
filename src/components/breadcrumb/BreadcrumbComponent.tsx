import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './BreadcrumbComponent.css';

const breadcrumbNameMap: Record<string, string> = {
    '/main': 'Главная',
    '/feedbacks': 'Отзывы пользователей',
};

export const BreadcrumbComponent = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [
        <Breadcrumb.Item key='home'>
            {extraBreadcrumbItems[0].key !== '/main' ? <Link to='/main'>Главная</Link> : null}
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return (
        <div className='breadcrumbHeader-path'>
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        </div>
    );
};
