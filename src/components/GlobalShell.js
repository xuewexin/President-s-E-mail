import React from 'react';
import './GlobalShell.css';

function GlobalShell({ children, compact = false, mode = 'light' }) {
  const today = new Date();
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日 ${weekDays[today.getDay()]}`;

  return (
    <div className={`theme-${mode} global-shell`}>
      <div className="hau-topbar">
        <div className="hau-topbar-inner">
          <span className="hau-welcome">校长信箱 · 倾听每一份心声</span>
          <span className="hau-date">{dateStr}</span>
          <div className="hau-topbar-links">
            <a href="https://www.henau.edu.cn/" target="_blank" rel="noreferrer">学校首页</a>
            <a href="http://xyh.henau.edu.cn/" target="_blank" rel="noreferrer">校友会</a>
            <a href="https://jjh.henau.edu.cn/jjh/index/" target="_blank" rel="noreferrer">教育发展基金会</a>
          </div>
        </div>
      </div>

      {!compact && (
        <div
          className="hau-header"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/head-bg.jpg)` }}
        >
          <div className="hau-header-inner">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="校徽" className="hau-logo" />
            <img src={`${process.env.PUBLIC_URL}/logo-text.png`} alt="河南农业大学" className="hau-logo-text" />
          </div>
        </div>
      )}

      <div className="hau-body">
        {children}
      </div>

      {!compact && <div className="hau-footer">
        <div className="hau-footer-content">
          <p className="hau-footer-copyright">版权所有 © {today.getFullYear()} 河南农业大学</p>
          <p className="hau-footer-addr">地址：郑州市郑东新区龙子湖高校园区（龙子湖校区）| 郑州市金水区农业路63号（文化路校区）| 许昌市建安区劳动北路（许昌校区） &nbsp;|&nbsp; 电话：0371-63558001 &nbsp;|&nbsp; 邮编：450046</p>
        </div>
      </div>}
    </div>
  );
}

export default GlobalShell;
