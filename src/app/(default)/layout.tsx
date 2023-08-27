import { type PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
    return <div className="min-h-screen bg-charade-900 text-charade-50">{children}</div>;
};

export default Layout;
