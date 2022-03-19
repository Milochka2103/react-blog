import React from 'react';
import './NoMatch.css'
import { useHistory, useLocation } from "react-router";
import { Result, Button } from "antd";
import { Redirect } from "react-router-dom";

export const NoMatch = () => {
  const location = useLocation();
  const history = useHistory();
  const backHome = () => {
    history.push('/')
  }

  if (!location?.from?.pathname) return <Redirect to="/" />
  return (
    <div className="page404">
      <Result
        status="404"
        title="404"
        subTitle={`{Страница ${location.from.pathname} не найдена}`}
        extra={<Button onClick={backHome} type="primary">Вернуться на главную</Button>}
      />
    </div>
  );
}