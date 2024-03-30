import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './BreadcrumbComponent.css';
import { ReactElement } from 'react';
import { paths } from '@constants/constants.ts';

const breadcrumbNameMap: Record<string, string> = {
    '/main': 'Главная',
    '/feedbacks': 'Отзывы пользователей',
    '/calendar': 'Календарь',
};

export const BreadcrumbComponent = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    const extraBreadcrumbItems = pathSnippets.reduce((breadcrumbItems, _, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        if (breadcrumbNameMap[url]) {
            const breadcrumbItem = (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>{breadcrumbNameMap[url]}</Link>
                </Breadcrumb.Item>
            );
            breadcrumbItems.push(breadcrumbItem);
        }
        return breadcrumbItems;
    }, [] as ReactElement[]);

    const breadcrumbItems = [
        <Breadcrumb.Item key='home'>
            {extraBreadcrumbItems.length && extraBreadcrumbItems[0].key !== paths.main.path ? (
                <Link to={paths.main.path}>Главная</Link>
            ) : null}
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return (
        <div className='breadcrumbHeader-path'>
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        </div>
    );
};
