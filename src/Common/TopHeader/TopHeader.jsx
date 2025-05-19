/*
    파일명 : TopHeader.jsx
    설명 : pess의 공통 컴포넌트인 윗부분 로고에 대한 jsx 파일입니다.
    작성자 : 정여진
    작성일 : 2025.05.18.
*/
import React from 'react';
import './TopHeader.css';
import logoImage from './pess_logo.png';
import { useNavigate } from 'react-router-dom';
import {ROUTES} from "../Routes";

const TopHeader = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate(ROUTES.MAIN); // 또는 원하는 경로
    };

    return (
        <div className="top-header">
            <img
                src={logoImage}
                alt="PESS Logo"
                className="logo"
                onClick={handleLogoClick}
                style={{ cursor: 'pointer' }} // 클릭 가능하게 커서 추가
            />
            <span className="title"><strong>PESS</strong> <span className="subtitle">Personal Encrypted Secret Storage</span></span>
        </div>
    );
};

export default TopHeader;
