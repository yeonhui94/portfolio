import { Outlet } from "react-router-dom";
import AdminNavi from "../../components/MyPage/MypageNaviBar/Adim/AdminNavi";
import Profile from "../../components/MyPage/Profile/Profile";

function AdminPage ({ gridArea }) {
    return(
        <div style={{ gridArea: gridArea }}>
            <div>
                <Profile
                    name={"관리자"}
                    text1={"소개글이 없습니다"}
                    btnName1={"관리자 정보 변경"}
                    btnName2={"로그아웃"}
                    btnLink1={"/"}
                >
                </Profile>
                <div>
                    <AdminNavi/>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}
export default AdminPage;