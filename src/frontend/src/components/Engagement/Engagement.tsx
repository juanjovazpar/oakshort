import React from 'react';
import { useTranslation } from 'react-i18next';

export interface SidebarComponentProps {
  metrics: any;
}

const Engagement: React.FC<SidebarComponentProps> = ({ metrics }) => {
  const { t } = useTranslation();

  return (
    <section>
      <p>{t('METRICS.TITLE')}</p>
    </section>
  );
};

export default Engagement;
