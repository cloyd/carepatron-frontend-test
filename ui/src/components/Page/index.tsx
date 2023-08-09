import React from 'react';

import './Page.css';

type Props = {
	children?: React.ReactNode;
};

export const Page = ({ children }: Props) => <div className='page'>{children}</div>;

export default Page;
