import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Dashboard from '../../../../components/Dashboard/Dashboard';
import ShortsList from '../../../../components/ShortsList/ShortsList';
import './Main.css';
import { IShort } from '../../../../../../shared/interfaces/short.interface';
import FadeInOut from '../../../../animations/fadeinout';

export interface IMainProps {}

const Main: React.FC<IMainProps> = () => {
  const shorts: IShort[] = useLoaderData() as IShort[];

  return (
    <section className="main-content overflow-y-scroll">
      <FadeInOut isVisible duration={1}>
        <Dashboard />
        <ShortsList shorts={shorts} />
      </FadeInOut>
    </section>
  );
};

export default Main;
