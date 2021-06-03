import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';

const InformationShow = () => {
  return (
    <PageContainer
      header={{
        title: false,
        extra: [],
      }}
      ghost
      className="page-header"
    >
      <div className="container"></div>
    </PageContainer>
  );
};

export default InformationShow;
