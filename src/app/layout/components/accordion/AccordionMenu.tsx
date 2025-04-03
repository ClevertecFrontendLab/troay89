import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Link,
    List,
    ListItem,
} from '@chakra-ui/react';

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
} from './../../../../assets/images/aside/nav';
import styles from './AccordionMenu.module.css';

const menu: { [key: string]: string[] } = {
    Салаты: ['Мясные салаты', 'Рыбные салаты', 'Овощные салаты', 'Смешанные салаты'],
    Закуски: [
        'Мясные закуски',
        'Рыбные закуски',
        'Овощные закуски',
        'Теплые закуски',
        'Бутерброды',
        'Фастфуд',
    ],
    'Первые блюда': ['Овощные супы', 'Мясные супы', 'Бульоны', 'Холодные супы', 'Диетические супы'],
    'Вторые блюда': [
        'Мясные',
        'Рыбные',
        'Овощные',
        'Из птицы',
        'Из грибов',
        'Из субпродуктов',
        'На пару',
        'Пельмени, вареники',
        'Мучные гарниры',
        'Овощные гарниры',
        'Пицца',
    ],
    'Десерты, выпечка': [
        'Блины и оладьи',
        'Пироги и пончики',
        'Торты',
        'Рулеты',
        'Кексы и маффины',
        'Сырники и ватрушки',
        'Из слоеного теста',
        'Из заварного теста',
        'Из дрожжевого теста',
        'Булочки и сдоба',
        'Хлеб',
        'Тесто на пиццу',
        'Кремы',
    ],
    'Блюда на гриле': ['Говядина', 'Свинина', 'Птица', 'Рыба', 'Грибы', 'Овощи'],
    'Веганская кухня': [
        'Закуски',
        'Первые блюда',
        'Вторые блюда',
        'Гарниры',
        'Десерты',
        'Выпечка',
        'Сыроедческие блюда',
        'Напитки',
    ],
    'Детские блюда': [
        'Первые блюда',
        'Вторые блюда',
        'Гарниры',
        'Выпечка',
        'Без глютена',
        'Без сахара',
        'Без аллергенов',
        'Блюда для прикорма',
    ],
    'Лечебное питание': [
        'Детская диета',
        'Диета №1',
        'Диета №2',
        'Диета №3',
        'Диета №5',
        'Диета №6',
        'Диета №7',
        'Диета №8',
        'Диета №9',
        'Диета №10',
        'Диета №11',
        'Диета №12',
        'Диета №13',
        'Диета №14',
        'Без глютена',
        'Без аллергенов',
    ],
    Национальные: [
        'Американская кухня',
        'Армянская кухня',
        'Греческая кухня',
        'Грузинская кухня',
        'Итальянская кухня',
        'Испанская кухня',
        'Китайская кухня',
        'Мексиканская кухня',
        'Паназиатская кухня',
        'Русская кухня',
        'Турецкая кухня',
        'Французская кухня',
        'Шведская кухня',
        'Японская кухня',
        'Другая кухня',
    ],
    Соусы: ['Соусы мясные', 'Соусы сырные', 'Маринады'],
    Напитки: [
        'Соки и фреши',
        'Смузи',
        'Компоты',
        'Кисели',
        'Кофе',
        'Лечебный чай',
        'Квас',
        'Коктейли',
        'Алкогольные',
    ],
    Заготовки: [
        'Мясные заготовки',
        'Рыбные заготовки',
        'Из огурцов',
        'Из томатов',
        'Из грибов',
        'Овощные заготовки',
        'Салаты, икра',
        'Из фруктов и ягод',
    ],
};

const categoryIcons: { [key: string]: string } = {
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

function AccordionMenu() {
    return (
        <Accordion className={styles['navigation']} allowMultiple as='nav'>
            {Object.entries(menu).map(([category, items]) => (
                <AccordionItem key={category}>
                    <AccordionButton as='span'>
                        <Box className={styles['item_menu']} flex='1' textAlign='left'>
                            {categoryIcons[category] && (
                                <img
                                    src={categoryIcons[category]}
                                    alt={`${category} icon`}
                                    className={styles.icon}
                                />
                            )}
                            <span className={styles['title_nav']}>{category}</span>
                        </Box>
                        <AccordionIcon
                            className={styles['accordion_icon']}
                            height='26px'
                            width='26px'
                            viewBox='0 0 22 22'
                        />
                    </AccordionButton>
                    <AccordionPanel className={styles['accordion_panel']} pb={4}>
                        <List className={styles['list']} spacing={2}>
                            {items.map((item) => (
                                <ListItem key={item}>
                                    <Link className={styles['item_link']} href='/'>
                                        {item}
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

export default AccordionMenu;
