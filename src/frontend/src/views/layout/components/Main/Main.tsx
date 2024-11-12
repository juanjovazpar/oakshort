import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Dashboard from '../../../../components/Dashboard/Dashboard';
import ShortsList from '../../../../components/ShortsList/ShortsList';
import './Main.css';
import { IShort } from '../../../../../../shared/interfaces/short.interface';

export interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const shorts: IShort[] = useLoaderData() as IShort[];

  return (
    <section className="main-content">
      <Dashboard />
      <ShortsList shorts={shorts} />
    </section>
  );
};

export default Main;
