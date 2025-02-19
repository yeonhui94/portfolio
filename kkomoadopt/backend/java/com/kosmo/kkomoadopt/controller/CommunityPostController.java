package com.kosmo.kkomoadopt.controller;

import com.kosmo.kkomoadopt.dto.*;
import com.kosmo.kkomoadopt.enums.Authority;
import com.kosmo.kkomoadopt.enums.PostCategory;
import com.kosmo.kkomoadopt.service.CommunityPostService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;

@RestController
@RequestMapping("/api/community/posts")
@RequiredArgsConstructor
public class CommunityPostController {

    @Autowired
    private final CommunityPostService communityPostService;

    // 마이페이지에서 community 전체 가져오기
    @GetMapping("mypage")
    public ResponseEntity<List<CommunityMypageDTO>> getMypageAll(){

        List<CommunityMypageDTO> result = communityPostService.getMypageCommunityList();

        // 상태 코드 200 OK와 함께 반환
        return ResponseEntity.ok(result);
    }

    // category 별 게시글 가져오기
    @GetMapping
    public ResponseEntity<List<CommunityListDTO>> getPostByCategory(@RequestParam(name = "category") String projectCategory) {
        try {
            List<CommunityListDTO> communities = communityPostService.getCommunityListByCategory(projectCategory);
            return ResponseEntity.ok(communities);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

//    @PostMapping
//    public ResponseEntity<Boolean> createPosts(@ModelAttribute CommunityDTO communityDTO, @RequestParam("files") MultipartFile[] files) {
//        Boolean result = communityPostService.savePost(communityDTO, files);
//        return new ResponseEntity<>(result, HttpStatus.CREATED);
//    }

    // 게시물 생성 API
    @PostMapping("/newposts")
    public ResponseEntity<String> createPost(@ModelAttribute CommunityDTO communityDTO,
                                             @RequestParam(value = "files", required = false) MultipartFile[] files, // 파일 필수 아님
                                             HttpServletRequest request) {

        // 세션에서 권한 값과 사용자 ID를 가져옴
        HttpSession session = request.getSession();
        Authority authority = (Authority) session.getAttribute("authority");
        String sessionUserId = (String) session.getAttribute("userId"); // 현재 로그인한 사용자 ID

        // 권한 확인: USER 또는 ADMIN만 접근 가능
        if (authority == null || (!authority.name().equals("USER") && !authority.name().equals("ADMIN"))) {
            return new ResponseEntity<>("권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        // 카테고리별 권한 체크: "ANNOUNCEMENT" 카테고리는 "ADMIN"만 작성 가능
//        if (communityDTO.postCategory() == PostCategory.ANNOUNCEMENT && !authority.name().equals("ADMIN")) {
//            return new ResponseEntity<>("공지사항 카테고리는 ADMIN만 작성할 수 있습니다.", HttpStatus.FORBIDDEN);
//        }

        if (communityDTO.getPostCategory() == PostCategory.ANNOUNCEMENT && !authority.name().equals("ADMIN")) {
            return new ResponseEntity<>("공지사항 카테고리는 ADMIN만 작성할 수 있습니다.", HttpStatus.FORBIDDEN);
        }

        // CommunityDTO에서 받은 데이터를 CommunityPostEntity로 변환
        boolean isPostCreated = communityPostService.savePost(communityDTO, files, sessionUserId);

        if (isPostCreated) {
            return ResponseEntity.ok("게시물이 성공적으로 작성되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시물 작성에 실패했습니다.");
        }
    }

//    @GetMapping
//    public ResponseEntity<List<CommunityListDTO>> getCommunityPostAll() {
//        // 서비스에서 전체 커뮤니티 게시글을 가져옴
//        List<CommunityListDTO> result = communityPostService.getAllCommunities();
//
//        // 200 OK 상태로 리스트 반환
//        return ResponseEntity.ok(result);
//    }
    //    @GetMapping
//    public ResponseEntity<List<CommunityListDTO>> getCommunityPostAll() {
//        // 서비스에서 전체 커뮤니티 게시글을 가져옴
//        List<CommunityListDTO> result = communityPostService.getAllCommunities();
//
//        // 200 OK 상태로 리스트 반환
//        return ResponseEntity.ok(result);
//    }


    @GetMapping("/{postUid}")
    public ResponseEntity<CommunityListDTO> getPostByUid(@PathVariable(name = "postUid") String postUid) {
        CommunityListDTO post = communityPostService.getCommunityPostUid(postUid);
        return ResponseEntity.ok(post);
    }

//    @GetMapping("/{postUid}")
//    public ResponseEntity<CommunityListDTO> getPostByUid(@PathVariable String postUid){
//        CommunityListDTO post = communityPostService.getCommunityPostWithComments(postUid);
//        return ResponseEntity.ok(post);
//    }

    // 사용자 : 게시글 수정 (제몬, 내용, 파일첨부)
    // 관리자 : 게시글 삭제 상태로 업데이트 (글번호, 삭제 사유)
    @PutMapping("/update")
    public ResponseEntity<String> updateposts(
            @RequestBody CommunityDTO communityDTO, @RequestParam(value = "files", required = false) MultipartFile[] files,
            HttpServletRequest request) {
        HttpSession session = request.getSession();
        Authority authority = (Authority) session.getAttribute("authority");
        String sessionUserId = (String) session.getAttribute("userId"); // 현재 로그인한 사용자 ID

        // 권한 확인: USER만 접근 가능
        if (authority == null || (!authority.name().equals("USER") && !authority.name().equals("ADMIN"))) {
            return new ResponseEntity<>("권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        // QnA 업데이트 로직 호출
        boolean updated = communityPostService.updateCommunityPost(communityDTO, authority.name(), files, sessionUserId);
        if (updated) {
            return new ResponseEntity<>("게시글 업데이트 성공", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("게시글 업데이트 실패", HttpStatus.FORBIDDEN);
        }
    }


    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteCommunityPost(
            @RequestBody CommunityDTO communityDTO, // 게시글 정보 (postUid 등)
            @SessionAttribute("userId") String userId // 세션에서 userId 가져옴
    ) {
        boolean isDeleted = communityPostService.deleteCommunityPost(communityDTO, userId);

        if (isDeleted) {
            return ResponseEntity.ok("게시글이 성공적으로 삭제되었습니다.");
        } else {
            return ResponseEntity.status(403).body("삭제 실패: 본인이 작성한 게시글만 삭제할 수 있습니다.");
        }
    }
}