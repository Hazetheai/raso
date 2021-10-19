import React from 'react';
import './checkmarks.css';
import { useTranslation } from 'react-i18next';
import TickImg from './tick.svg';

const Checkmarks = () => {
  const { t } = useTranslation();
  return (
    <div className="checkmarks">
      <span className="checkmarks_key">
        <img src={TickImg} alt="" className="checkmarks_tick" />
        {t('no_credit_card_required')}
      </span>
      <span className="checkmarks_key">
        <img src={TickImg} alt="" className="checkmarks_tick" />
        {t('free_plan_available')}
      </span>
      <span className="checkmarks_key checkmarks_key_desktop">
        <img src={TickImg} alt="" className="checkmarks_tick" />
        {t('support_always_available')}
      </span>
    </div>
  );
};
export default Checkmarks;
