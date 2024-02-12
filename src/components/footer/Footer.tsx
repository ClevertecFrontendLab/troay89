import React from "react";
import {Layout} from "antd";
import './Footer.css';


const { Footer } = Layout;

export const FooterComponent: React.FC = () => {
    return (
        <Footer className={'footer-configuration'}>
           <p className={'footer-review'}>Смотреть отзывы </p>
        </Footer>
    );
};
