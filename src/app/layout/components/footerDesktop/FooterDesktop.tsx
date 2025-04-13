import { Icon, Link } from '@chakra-ui/react';

import LeaveDoor from '~/components/icons/LeaveDoor';

import styles from './Footer.module.css';

function FooterDesktop() {
    const textInfo = `Все права защищены,
ученический файл,
©Клевер Технолоджи, 2025`;

    return (
        <footer className={styles['desktop_footer']}>
            <span className={styles['footer_version']}>Версия программы 03.25</span>
            <span className={styles['footer_info']}>{textInfo}</span>
            <Link className={styles['footer_exit']} href='/'>
                <Icon as={LeaveDoor} /> Выйти
            </Link>
        </footer>
    );
}

export default FooterDesktop;
