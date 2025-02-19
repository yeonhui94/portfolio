import { useEffect ,useState} from "react";
import ConcertationForm from "./components/ConcertationForm";
import styles from "./ConcertationPage.module.css";

const mockData = {
  data: {
    nickname: "조랭삼",
    phoneNUm: "010-1234-5678",
    visitDate : "",
    visitTime: "",
    visitContent: "",
    visitPurpose: "",
  }
};

const ConcertationPage = () => {

  const [init, setInit] = useState(false)
  

  useEffect(()=> {
    let userInfo = JSON.parse(localStorage.getItem('user'));
    console.log(userInfo)
    mockData.data.nickname = userInfo.nickname
    mockData.data.phoneNUm = userInfo.phoneNumber

    setInit(true)

  },[init])

  
  
  
  return (
    <div className={styles.concertationPageContainer}>
      <div className={styles.concertationPage}>
        <h3>정보를 입력 해주세요</h3>
        <ConcertationForm initialValue={mockData.data} />
      </div>
    </div>
  );
};

export default ConcertationPage;
