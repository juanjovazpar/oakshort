import React from 'react';
import './Sidebar.css';
import { useTranslation } from 'react-i18next';

import { IShort } from '../../../../backend/models/short.model';
import Short from '../../components/Short/Short';

export interface SidebarComponentProps {
  onClose: Function;
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarComponentProps> = ({ onClose, isCollapsed }) => {
  const { t } = useTranslation();
  const shorts: IShort[] = [
    {
      _id: '6693bf918dd280c4837b1ce1',
      name: 'SF Living Store - Summer sale',
      active: true,
      target: 'http://expires.com',
      accessCount: 3,
      deleted: false,
      expires: new Date('2024-07-14T14:09:00.973Z'),
      short: 'QO97YEF0_I',
      createdAt: new Date('2024-07-14T12:07:45.488Z'),
      updatedAt: new Date('2024-07-14T12:11:00.525Z'),
      lastRead: new Date('2024-07-14T12:11:00.524Z'),
      accessAttendsOverLimit: 0,
    },
    {
      _id: '6693bf918dd280c4837b1ce1',
      name: 'SF Living Store - Summer sale',
      active: true,
      target: 'http://expires.com',
      accessCount: 3,
      deleted: false,
      expires: new Date('2024-07-14T14:09:00.973Z'),
      short: 'QO97YEF0_I',
      createdAt: new Date('2024-07-14T12:07:45.488Z'),
      updatedAt: new Date('2024-07-14T12:11:00.525Z'),
      lastRead: new Date('2024-07-14T12:11:00.524Z'),
      accessAttendsOverLimit: 0,
    },
    {
      _id: '6693bf918dd280c4837b1ce1',
      name: 'SF Living Store - Summer sale',
      active: true,
      target: 'http://expires.com',
      accessCount: 3,
      deleted: false,
      expires: new Date('2024-07-14T14:09:00.973Z'),
      short: 'QO97YEF0_I',
      createdAt: new Date('2024-07-14T12:07:45.488Z'),
      updatedAt: new Date('2024-07-14T12:11:00.525Z'),
      lastRead: new Date('2024-07-14T12:11:00.524Z'),
      accessAttendsOverLimit: 0,
    },
  ];
  const onCloseHandler = (e: any) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <section>
      {isCollapsed && (
        <>
          <button onClick={onCloseHandler}>X</button>
          <div>
            <button>{t('FILTERS.FILTER_BY_CREATED_DATE')}</button>
            <button>{t('FILTERS.FILTER_BY_LABEL')}</button>
            <button>{t('FILTERS.FILTER_BY_EXPIRED')}</button>
          </div>
          {shorts.map((short: IShort, key: number) => (
            <Short short={short} key={key} />
          ))}
        </>
      )}
    </section>
  );
};

export default Sidebar;
