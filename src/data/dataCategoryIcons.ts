import {
    baclazan,
    bread,
    child,
    cup,
    eating,
    healthy,
    international,
    lavrovi,
    pan,
    pasta,
    pat,
    peas,
    wash,
} from '~/assets/images/aside/nav';

const dataCategoryIcons: { [key: string]: string } = {
    Салаты: baclazan,
    Закуски: eating,
    'Первые блюда': pat,
    'Вторые блюда': pan,
    'Десерты, выпечка': bread,
    'Блюда на гриле': wash,
    'Веганская кухня': lavrovi,
    'Детские блюда': child,
    'Лечебное питание': healthy,
    Национальные: international,
    Соусы: peas,
    Заготовки: pasta,
    Напитки: cup,
};

export default dataCategoryIcons;
