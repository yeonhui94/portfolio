package com.kosmo.kkomoadopt.controller;

import com.kosmo.kkomoadopt.dto.*;
import com.kosmo.kkomoadopt.entity.CommentEntity;
import com.kosmo.kkomoadopt.enums.Authority;
import com.kosmo.kkomoadopt.repository.CommentRepository;
import com.kosmo.kkomoadopt.service.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
public class CommentController {

    @Autowired
    private final CommentService commentService;

    // 마이페이지에서 comment 전체 가져오기
    @GetMapping("mypage")
    public ResponseEntity<List<CommentMypageDTO>> getMypageAll(){

        List<CommentMypageDTO> result = commentService.getMypageCommentList();

        // 상태 코드 200 OK와 함께 반환
        return ResponseEntity.ok(result);
    }

    @PostMapping("/save")
    public ResponseEntity<String> createComment(
            @RequestBody CommentDTO commentDTO, HttpServletRequest request) {
        // 세션에서 로그인한 사용자 ID를 가져옴
        HttpSession session = request.getSession();
        String sessionUserId = (String) session.getAttribute("userId"); // 현재 로그인한 사용자 ID

        // 로그인 여부 확인
        if (sessionUserId == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.FORBIDDEN); // 로그인하지 않은 경우
        }

        // 댓글 DTO에 로그인한 사용자 ID 설정
        commentDTO.setUserId(sessionUserId); // 로그인한 사용자 ID를 댓글 DTO에 설정

        // 댓글 저장 서비스 호출
        boolean result = commentService.saveComment(commentDTO, sessionUserId); // 로그인한 userId를 함께 전달

        // 댓글 저장 결과에 따른 응답
        if (result) {
            return ResponseEntity.status(HttpStatus.CREATED).body("댓글이 성공적으로 저장되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("댓글 저장에 실패했습니다.");
        }
    }

    //댓글 업데이트 (수정)
    @PutMapping("/update")
    public ResponseEntity<String> updateComment(
            @RequestBody CommentDTO commentDTO, HttpServletRequest request) {

        // 세션에서 권한 값과 사용자 ID를 가져옴
        HttpSession session = request.getSession();
        Authority authority = (Authority) session.getAttribute("authority");
        String sessionUserId = (String) session.getAttribute("userId"); // 현재 로그인한 사용자 ID

        // 권한 확인: USER 또는 ADMIN만 접근 가능
        if (authority == null || (!authority.name().equals("USER") && !authority.name().equals("ADMIN"))) {
            return new ResponseEntity<>("권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        // 댓글 업데이트 로직 호출
        boolean updated = commentService.updateComment(commentDTO, authority.name(), sessionUserId);

        if (updated) {
            return new ResponseEntity<>("댓글 업데이트 성공", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("댓글 업데이트 실패", HttpStatus.FORBIDDEN);
        }
    }



    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteComment(@RequestBody CommentDTO commentDTO, HttpServletRequest request) {

        // 1. 세션에서 권한 값과 사용자 ID를 가져옴
        HttpSession session = request.getSession();
        Authority authority = (Authority) session.getAttribute("authority");
        String sessionUserId = (String) session.getAttribute("userId"); // 현재 로그인한 사용자 ID

        // 2. 권한 확인: USER만 댓글 삭제 가능
        if (authority == null || !authority.name().equals("USER")) {
            return new ResponseEntity<>("권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        // 3. 댓글 ID를 DTO에서 가져옴
        String commentId = commentDTO.commentId();

        // 4. 본인이 작성한 댓글인지 확인 (1번 로직이 여기에 위치)
        boolean isAuthor = commentService.isCommentAuthor(commentId, sessionUserId);
        if (!isAuthor) {
            return new ResponseEntity<>("본인이 작성한 댓글만 삭제할 수 있습니다.", HttpStatus.FORBIDDEN);
        }

        // 5. 댓글 삭제 로직 호출
        boolean isDeleted = commentService.deleteCommentByCommentId(commentId);

        // 6. 삭제 결과에 따라 적절한 응답 반환
        if (isDeleted) {
            return new ResponseEntity<>("댓글 삭제 완료", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("댓글 삭제 실패", HttpStatus.NOT_FOUND);
        }
    }


}
