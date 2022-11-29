import React from 'react'
import { Layout as LayoutContainer } from 'antd';
import { Link } from 'react-router-dom';


const Layout = ({ children }) => {
    const { Header, Footer, Sider, Content } = LayoutContainer;
    return (
        <LayoutContainer
            style={{
                minHeight: '100vh',
            }}
        >
            <Header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                </nav>
            </Header>
            <Content>{children}</Content>
            {/* <Footer>Footer</Footer> */}
        </LayoutContainer>
    )
}

export default Layout