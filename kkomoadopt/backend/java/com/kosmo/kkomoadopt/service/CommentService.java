package com.kosmo.kkomoadopt.service;

import com.kosmo.kkomoadopt.dto.AdoptMypageDTO;
import com.kosmo.kkomoadopt.dto.CommentDTO;
import com.kosmo.kkomoadopt.dto.CommentListDTO;
import com.kosmo.kkomoadopt.dto.CommentMypageDTO;
import com.kosmo.kkomoadopt.entity.AdoptionNoticeEntity;
import com.kosmo.kkomoadopt.entity.CommentEntity;
import com.kosmo.kkomoadopt.entity.CommunityPostEntity;
import com.kosmo.kkomoadopt.entity.UserEntity;
import com.kosmo.kkomoadopt.repository.CommentRepository;
import com.kosmo.kkomoadopt.repository.CommunityPostRepository;
import com.kosmo.kkomoadopt.repository.UserRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.SessionAttribute;

import javax.xml.stream.events.Comment;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final CommunityPostRepository communityPostRepository;

    @Autowired
    private EntityManager em;

    // post save 메서드
    public boolean saveComment(CommentDTO commentDTO, String userId) {
        try {
            // CommentEntity 객체 생성
            CommentEntity commentEntity = new CommentEntity();


            // 엔티티 설정
            commentEntity.setCommentContent(commentDTO.commentContent()); // 댓글 내용 설정
            commentEntity.setCommentCreatedAt(LocalDateTime.now()); // 댓글 생성 시간 설정
            commentEntity.setCommentUpdatedAt(LocalDateTime.now()); // 댓글 수정 시간 설정
            commentEntity.setPostUid(commentDTO.postUid()); // 해당 댓글이 달린 게시글의 UID 설정
            commentEntity.setUserId(commentDTO.userId()); // 댓글 작성자 ID 설정

            // 세션에서 userId 가져오기 (로그인된 사용자만 댓글을 작성할 수 있음)
            if (userId == null) {
                throw new RuntimeException("User is not logged in or userId is not in session");
            }

            // 실제로 세션에서 받은 userId를 댓글 엔티티에 설정
            commentEntity.setUserId(userId);

            // 댓글 엔티티를 DB에 저장
            try {
                commentRepository.save(commentEntity);
            } catch (Exception e) {
                e.printStackTrace();
                return false; // DB 저장 실패 시
            }

            return true; // 댓글 저장 성공
        } catch (Exception e) {
            e.printStackTrace();
            return false; // 예외 발생 시
        }
    }

    public boolean isCommentAuthor(String commentId, String userId) {
        // 댓글 ID와 작성자 ID를 기반으로 댓글 작성 여부 확인
        return commentRepository.existsByCommentIdAndUserId(commentId, userId);
    }

    // 댓글 업데이트 메서드
    public boolean updateComment(CommentDTO commentDTO, String authority, String sessionUserId) {

        // 댓글 ID로 DB에서 해당 댓글 조회
        Optional<CommentEntity> existingCommentOptional = commentRepository.findById(commentDTO.commentId());

        if (existingCommentOptional.isEmpty()) {
            return false; // 댓글이 존재하지 않으면 업데이트 실패
        }

        CommentEntity commentEntity = existingCommentOptional.get();

        // USER 권한인 경우: 본인이 작성한 댓글만 수정 가능
        if (authority.equals("USER")) {
            if (!commentEntity.getUserId().equals(sessionUserId)) {
                return false; // 본인이 작성한 댓글이 아니면 업데이트 실패
            }

            // 댓글 내용과 수정 시간을 업데이트
            commentEntity.setCommentContent(commentDTO.commentContent());
            commentEntity.setCommentUpdatedAt(LocalDateTime.now()); // 수정 시간을 현재 시간으로 설정
        }
        // ADMIN 권한인 경우: 모든 댓글 수정 가능
        else if (authority.equals("ADMIN")) {
            commentEntity.setIsDeleted(true); // 댓글 삭제 상태로 변경
            commentEntity.setCommentDelReason(commentDTO.commentDelReason()); // 삭제 이유 저장
            commentEntity.setCommentUpdatedAt(LocalDateTime.now()); // 수정 시간을 현재 시간으로 설정
        }

        // 수정된 댓글 저장
        commentRepository.save(commentEntity);

        return true; // 댓글 업데이트 성공
    }

    public boolean deleteCommentByCommentId(String commentId) {
        Optional<CommentEntity> commentEntityOptional = commentRepository.findById(commentId);

        if (commentEntityOptional.isEmpty()) {
            return false; // 댓글이 없으면 삭제 실패
        }

        CommentEntity commentEntity = commentEntityOptional.get();
        commentRepository.delete(commentEntity); // 댓글 삭제
        return true; // 삭제 성공
    }

    // CommentMypageDTO 변환 함수
    private CommentMypageDTO convertToCommentDTO(CommentEntity entity) {
        return new CommentMypageDTO(
                entity.getCommentId(),
                entity.getCommentContent(),
                entity.getCommentCreatedAt(),
                entity.getIsDeleted(),
                entity.getPostUid(),
                entity.getUserId()
        );
    }

    // 마이페이지 Comment 전체 데이터 불러오기
    public List<CommentMypageDTO> getMypageCommentList(){
        List<CommentEntity> commentEntities = commentRepository.findAll();

        // CommentEntity 객체를 CommentMypageDTO 변환
        return commentEntities.stream()
                .map(this::convertToCommentDTO)  // convertToCommentDTO 변환
                .collect(Collectors.toList());  // List로 수집
    }

}
