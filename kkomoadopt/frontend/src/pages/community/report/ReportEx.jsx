import Report_Imgbox from "./Report_Imgbox";
import img1 from "../../../assets/img2/1.jpg"; // 이미지 파일 경로

const ReportEx = () => {
    const imgFile = img1; // imgFile을 문자열로 설정

    return (
        <div>
            <Report_Imgbox imgFile={imgFile}></Report_Imgbox>
        </div>
    );
};

export default ReportEx;
