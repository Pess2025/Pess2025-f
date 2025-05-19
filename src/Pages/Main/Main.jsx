import { useNavigate } from 'react-router-dom';

//복호화 페이지 이동 임시 함수
function Main() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>메인 페이지입니다</h1>
      <button onClick={() => navigate('/decode')}>복호화 페이지로 이동</button>
    </div>
  );
}

export default Main;