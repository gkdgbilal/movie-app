import React from 'react'
import { Layout as LayoutContainer } from 'antd';


const Layout = ({ children }) => {
    const { Header, Footer, Sider, Content } = LayoutContainer;
    return (
        <LayoutContainer
            style={{
                minHeight: '100vh',
            }}
        >
            <Header>Header</Header>
            <Content>{children}</Content>
            {/* <Footer>Footer</Footer> */}
        </LayoutContainer>
    )
}

export default Layout