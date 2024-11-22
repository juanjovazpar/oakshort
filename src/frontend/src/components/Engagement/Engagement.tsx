import React from 'react';
import { useTranslation } from 'react-i18next';

export interface ISidebarComponentProps {
  metrics: any;
  className: string;
  [key: string]: unknown;
}

const Engagement: React.FC<ISidebarComponentProps> = ({
  className = '',
  metrics,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <section
      className={`bg-white rounded-lg py-4 px-6 ${className}`}
      {...props}
    >
      <p>{t('METRICS.TITLE')}</p>
    </section>
  );
};

export default Engagement;
