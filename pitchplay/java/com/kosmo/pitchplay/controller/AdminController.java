package com.kosmo.pitchplay.controller;

import com.kosmo.pitchplay.dto.NoticeDTO;
import com.kosmo.pitchplay.dto.UserOutDTO;
import com.kosmo.pitchplay.service.NoticeService;
import com.kosmo.pitchplay.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final UserService userService;
    private final NoticeService noticeService;

    // ------------------- 유저 관련 API -------------------
    // 유저 조회
    // 유저 전체 목록 조회 혹은 가입년도 유저목록 조회 혹은 탈퇴회원 유저목록 조회(페이지 처리)
    @GetMapping("/users")
    public ResponseEntity<Page<UserOutDTO>> getUsersByFilters(
            @RequestParam(required = false, name="year") Integer year,
            @RequestParam(required = false, name="isDeleted") Boolean isDeleted,
            Pageable pageable) {

        Page<UserOutDTO> users;

        if (year != null && isDeleted != null) {
            // 가입년도와 탈퇴 여부 모두 필터링 (ex : ?year=2023&isDeleted=true&page=1&size=10 )
            users = userService.getUsersByYearAndIsDeleted(year, isDeleted, pageable);
        } else if (year != null) {
            // 가입년도만 필터링(ex : ?year=2023&page=1&size=10 )
            users = userService.getUsersByYear(year, pageable);
        } else if (isDeleted != null) {
            // 탈퇴 여부만 필터링 (ex: ?isDeleted=true&page=1&size=10 )
            users = userService.getUsersByIsDeleted(isDeleted, pageable);
        } else {
            // 필터링 없이 전체 목록 조회 (ex : ?page=1&size=10 )
            users = userService.getAllUsers(pageable);
        }

        return ResponseEntity.ok(users);
    }

    // 유저번호로 유저 조회
    @GetMapping("/users/user-number/{userNumber}")
    public ResponseEntity<UserOutDTO> getUserByUserNumber(@PathVariable("userNumber") Integer userNumber) {
        UserOutDTO user = userService.getUserByUserNumber(userNumber);
        return ResponseEntity.ok(user);
    }

    // 유저 이메일로 유저 조회
    @GetMapping("/users/email/{email}")
    public ResponseEntity<UserOutDTO> getUserByEmail(@PathVariable("email") String email) {
        UserOutDTO user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    // 유저 ID로 유저 조회
    @GetMapping("/users/user-id/{userId}")
    public ResponseEntity<UserOutDTO> getUserById(@PathVariable("userId") String userId) {
        UserOutDTO user = userService.getUserByUserId(userId);
        return ResponseEntity.ok(user);
    }

    // 유저 별명으로 유저 조회
    @GetMapping("/users/nickname/{nickname}")
    public ResponseEntity<UserOutDTO> getUserByNickname(@PathVariable("nickname") String nickname) {
        UserOutDTO user = userService.getUserByNickname(nickname);
        return ResponseEntity.ok(user);
    }
    
    
    
    //공지사항 글쓰기  --내일할게요
    @PostMapping("/notice-board/write")
    public NoticeDTO createNotice(@RequestBody NoticeDTO noticeDTO) {
        System.out.println("NoticeType: " + noticeDTO.getNoticeType());  // 로그로 출력 확인
        return noticeService.createNotice(noticeDTO);
    }

    //공지사항,자주묻는질문 글 불러오기
    @GetMapping("notice-board")
    public List<NoticeDTO>  getAllNotices() {
        return noticeService.getNoticeALLList(); // 모든 필드 반환
    }
    
    //자주묻는 질문 글쓰기  --내일할게요..


    //자주묻는 질문 글 불러오기
//    @GetMapping
//    public List<NoticeDTO> getAllFAQ(){
//        return noticeService.getFAQSummaryList();
//    }

}
