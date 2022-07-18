import React from 'react';
import DefaultLayout from '../../components/layout/DefaultLayoutComponent';
import SimulateurForms from '../../components/Simulateur/SimulateurForms';
import { withApollo } from '../../utils/withApollo';

const simulateur: React.FC = () => {
  return (
    <DefaultLayout headTitle="EMP - Simulateur">
      <SimulateurForms />
    </DefaultLayout>
  );
};
export default withApollo({ ssr: true })(simulateur);
