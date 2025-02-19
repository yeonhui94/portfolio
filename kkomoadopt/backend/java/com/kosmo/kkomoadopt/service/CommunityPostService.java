package com.kosmo.kkomoadopt.service;

import com.kosmo.kkomoadopt.dto.*;
import com.kosmo.kkomoadopt.entity.AdoptionNoticeEntity;
import com.kosmo.kkomoadopt.enums.NoticeCategory;
import com.kosmo.kkomoadopt.entity.CommentEntity;
import com.kosmo.kkomoadopt.enums.PostCategory;
import com.kosmo.kkomoadopt.entity.CommunityPostEntity;
import com.kosmo.kkomoadopt.entity.UserEntity;
import com.kosmo.kkomoadopt.repository.CommentRepository;
import com.kosmo.kkomoadopt.repository.CommunityPostRepository;
import com.kosmo.kkomoadopt.repository.UserRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Collections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RequiredArgsConstructor
@Service
public class CommunityPostService {

    @Autowired
    private final CommunityPostRepository communityPostRepository;
    @Autowired
    private final CommentRepository commentRepository;
    @Autowired
    private final FileService fileService;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private EntityManager em;




    // 게시물 저장 메서드
    public boolean savePost(CommunityDTO communityDTO, MultipartFile[] files, @SessionAttribute("userId") String userId) {
        try {
            // CommunityPostEntity 객체 생성
            CommunityPostEntity communityPostEntity = new CommunityPostEntity();

            // postId 설정 (DB에서 maxPostId를 조회하여 자동 증가)
            Integer maxPostId = communityPostRepository.findMaxPostId();
            communityPostEntity.setPostId(maxPostId == null ? 1 : maxPostId + 1); // 첫 번째 게시물의 ID는 1

            // DTO에서 전달받은 데이터로 엔티티 채우기
            communityPostEntity.setPostCategory(communityDTO.getPostCategory());
            communityPostEntity.setPostTitle(communityDTO.getPostTitle());
            communityPostEntity.setPostContent(communityDTO.getPostContent());
            communityPostEntity.setPostCreatedAt(LocalDateTime.now()); // 생성 시간
            communityPostEntity.setPostUpdatedAt(LocalDateTime.now()); // 수정 시간
            communityPostEntity.setPostViewCount(0); // 기본 뷰 카운트

            if (userId == null) {
                throw new RuntimeException("User is not logged in or userId is not in session");
            }

            // userId로 작성자 설정
            communityPostEntity.setUserId(userId);

            // 파일 업로드 처리
            if (files != null && files.length > 0) {
                String[] fileNames = fileService.saveFiles(files);
                if (fileNames != null && fileNames.length > 0) {
                    communityPostEntity.setPostImgUrl(Arrays.stream(fileNames).toList());
                }
            }

            // 게시글 저장
            try {
                communityPostRepository.save(communityPostEntity);
            } catch (Exception e) {
                e.printStackTrace();
                return false; // DB 저장 실패 시
            }

            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false; // 전체적인 예외 발생 시
        }
    }


    private static final Logger logger = LoggerFactory.getLogger(CommunityPostService.class);

    // Service
    public boolean updateCommunityPost(CommunityDTO communityDTO, String authority, MultipartFile[] files, @SessionAttribute("userId") String userId) {


        // userId가 세션에 없으면 예외 처리
        if (userId == null) {
            throw new RuntimeException("User is not logged in or userId is not in session");
        }

        // 게시글 ID가 null인지 확인
        if (communityDTO.getPostUid() == null) {
            throw new IllegalArgumentException("Post ID must not be null");
        }

        // 게시글을 DB에서 조회
        Optional<CommunityPostEntity> existingCommunityOptional = communityPostRepository.findById(communityDTO.getPostUid());
        if (existingCommunityOptional.isEmpty()) {
            return false; // 게시글이 존재하지 않으면 업데이트 실패
        }

        CommunityPostEntity communityPostEntity = existingCommunityOptional.get();

        // USER 권한인 경우: 본인이 작성한 게시글만 수정 가능
        if (authority.equals("USER")) {
            if (userId == null || !userId.equals(communityPostEntity.getUserId())) {
                return false; // 본인이 작성한 게시글이 아니면 업데이트 실패
            }

            // 게시글 내용과 수정 시간을 업데이트
            communityPostEntity.setPostTitle(communityDTO.getPostTitle());
            communityPostEntity.setPostContent(communityDTO.getPostContent());
            communityPostEntity.setPostUpdatedAt(LocalDateTime.now()); // 수정 시간을 현재 시간으로 설정
        }
        // ADMIN 권한인 경우: 모든 게시글 수정 가능
        else if (authority.equals("ADMIN")) {
            // ADMIN은 게시글을 수정할 수 있으므로, 삭제 상태를 설정하거나 다른 수정 사항을 업데이트할 수 있습니다.
            communityPostEntity.setPostUpdatedAt(LocalDateTime.now()); // 수정 시간을 현재 시간으로 설정

            // ADMIN 권한일 때는 isDeleted 값을 자동으로 true로 설정 (삭제 처리)
            communityPostEntity.setIsDeleted(true); // 게시글을 삭제 상태로 설정
            if (communityDTO.getDeleteReason() != null) {
                communityPostEntity.setDeleteReason(communityDTO.getDeleteReason()); // 삭제 이유 저장
            }
        }

        // 파일 업로드 처리
        String[] fileNames = null;
        if (files != null && files.length > 0) {
            try {
                fileNames = fileService.saveFiles(files);
            } catch (IOException e) {
                logger.error("Error saving files", e); // 로깅

                return false; // 파일 저장 실패 시
            }

            if (fileNames != null && fileNames.length > 0) {
                communityPostEntity.setPostImgUrl(Arrays.stream(fileNames).toList());
            } else {
                communityPostEntity.setPostImgUrl(Collections.emptyList()); // 이미지 URL이 없을 경우 빈 리스트로 설정
            }
        }

        // 게시글 저장
        try {
            communityPostRepository.save(communityPostEntity);
        } catch (Exception e) {
            logger.error("Error saving community post", e); // 로깅
            return false; // DB 저장 실패 시
        }

        return true; // 게시글 업데이트 성공
    }


    public boolean deleteCommunityPost(CommunityDTO communityDTO, @SessionAttribute("userId") String userId) {
        // userId가 세션에 없으면 예외 처리
        if (userId == null) {
            throw new RuntimeException("User is not logged in or userId is not in session");
        }

        // 게시글 ID가 null인지 확인
        if (communityDTO.getPostUid() == null) {
            throw new IllegalArgumentException("Post ID must not be null");
        }

        // 게시글을 DB에서 조회
        Optional<CommunityPostEntity> existingCommunityOptional = communityPostRepository.findById(communityDTO.getPostUid());
        if (existingCommunityOptional.isEmpty()) {
            return false; // 게시글이 존재하지 않으면 삭제 실패
        }

        CommunityPostEntity communityPostEntity = existingCommunityOptional.get();

        // 게시글 작성자(userId)와 로그인한 사용자가 일치하는지 확인
        if (!communityPostEntity.getUserId().equals(userId)) {
            return false; // 본인이 작성한 게시글이 아니면 삭제 실패
        }

        // 게시글을 DB에서 삭제
        try {
            communityPostRepository.delete(communityPostEntity); // 게시글 삭제
        } catch (Exception e) {
            // 예외 처리 및 로깅
            logger.error("게시글 삭제 중 오류 발생: ", e);
            return false; // DB 삭제 실패 시
        }

        return true; // 삭제 성공
    }




    private CommunityListDTO convertToCommunityDTO(CommunityPostEntity entity) {
        // UserEntity에서 PostAuthor를 가져오기 위한 로직
        Optional<UserEntity> user = userRepository.findById(entity.getUserId());

        // UserEntity가 존재하는 경우에만 PostAuthor를 설정
        String postAuthor = user.map(UserEntity::getUserId).orElse("Unknown");
        List<CommentListDTO> comments = null;

        // CommunityListDTO 생성
        return new CommunityListDTO(
                entity.getPostUid(),
                entity.getPostId(),
                entity.getPostCategory(),
                entity.getPostTitle(),
                entity.getPostContent(),
                entity.getPostCreatedAt(),
                entity.getPostUpdatedAt(),
                entity.getPostImgUrl(),
                entity.getIsDeleted(),
                entity.getDeleteReason(),
                entity.getUserId(),
                entity.getPostViewCount(),
                postAuthor,
                comments
        );
    }

    private CommentListDTO convertToCommentDTO(CommentEntity commentEntity) {
        // 사용자 정보를 가져오기 위해 userRepository를 사용
        Optional<UserEntity> user = userRepository.findById(commentEntity.getUserId()); // commentEntity에 userId가 있다고 가정

        // 사용자 정보가 있을 경우 nickname을 가져오고, 없으면 기본값 사용
        String nickname = user.map(UserEntity::getNickname).orElse("Unknown");

        // CommentListDTO를 반환하면서 nickname을 추가
        return new CommentListDTO(
                commentEntity.getCommentId(),
                commentEntity.getCommentContent(),
                commentEntity.getCommentCreatedAt(),
                commentEntity.getPostUid(),
                nickname, // nickname 추가
                commentEntity.getIsDeleted(),
                commentEntity.getCommentDelReason()
        );
    }
    // 전체 게시글글 조회
    public List<CommunityListDTO> getAllCommunities(){
        List<CommunityPostEntity> communityPostEntities = communityPostRepository.findAll();

        return communityPostEntities.stream()
                .map(this::convertToCommunityDTO)
                .collect(Collectors.toList());
    }


    // category별로 게시물 가져오기
    public List<CommunityListDTO> getCommunityListByCategory(String category) {
        PostCategory category1 = PostCategory.valueOf(category.toUpperCase());

        // Assuming you have a UserRepository injected here
        List<CommunityListDTO> CommunityListDTOList = communityPostRepository.findByPostCategory(category1).stream()
                .map(community -> {
                    // Fetch the user entity by userId
                    Optional<UserEntity> user = userRepository.findById(community.getUserId());
                    List<CommentListDTO> comments = null;
                    // Create CommunityListDTO using the nickname as postAuthor
                    return new CommunityListDTO(
                            community.getPostUid(),
                            community.getPostId(),
                            community.getPostCategory(),
                            community.getPostTitle(),
                            community.getPostContent(),
                            community.getPostCreatedAt(),
                            community.getPostUpdatedAt(),
                            community.getPostImgUrl(),
                            community.getIsDeleted(),
                            community.getDeleteReason(),
                            community.getUserId(),
                            community.getPostViewCount(),
                            user.isPresent() ? user.get().getNickname() : "Unknown",
                            comments
                    );
                })
                .collect(Collectors.toList());

        return CommunityListDTOList;
    }

//    // 카테고리로 커뮤니티글 가져오기
//    public CommunityListDTO getCommunityByCategory(PostCategory postCategory, Pageable pageable) {
//        Page<AdoptionNoticeEntity> adoptionNoticePage = communityPostRepository.findByNoticeCategory(noticeCategory, pageable);
//
//        // 결과를 DTO로 변환
//        List<AdoptNoticeListDTO.Notice> notices = adoptionNoticePage.getContent().stream()
//                .map(this::convertToNoticeDTO)
//                .collect(Collectors.toList());
//
//        // DTO를 리턴
//        return new AdoptNoticeListDTO(notices, adoptionNoticePage.getTotalElements(), adoptionNoticePage.getNumber());
//    }

    
    // 페이지 별 특정 글 가져오기
    public CommunityListDTO getCommunityPostUid (String postUid) {
        Optional<CommunityPostEntity> optionalPost = communityPostRepository.findByPostUid(postUid);

        if(optionalPost.isEmpty()){
            throw new RuntimeException("Post with UID" + postUid + "not found");
        }

        CommunityPostEntity post = optionalPost.get();

        //유저 정보 조회
        Optional<UserEntity> userOptional = userRepository.findById(post.getUserId());
        String nickname = userOptional.map(UserEntity::getNickname).orElse("Unknown");


        //댓글 리스트 조회
        List<CommentEntity> commentEntities = commentRepository.findByPostUid(postUid);
        List<CommentListDTO> comments = commentEntities.stream().map(comment ->{
            Optional<UserEntity> commenterOptional = userRepository.findById(comment.getUserId());
            String commenterNickname = commenterOptional.map(UserEntity::getNickname).orElse("Unknown");

            return new CommentListDTO(
                    comment.getCommentId(),         // 댓글 ID
                    comment.getCommentContent(),    // 댓글 내용
                    comment.getCommentCreatedAt(),  // 작성일
                    comment.getPostUid(),
                    commenterNickname,
                    comment.getIsDeleted(),
                    comment.getCommentDelReason()
            );
        }).toList();

        System.out.println("AnnouncementNum: " + post.getPostUid());

        // 조회수 1 증가
        post.setPostViewCount(post.getPostViewCount() + 1);

        // 변경된 데이터를 데이터베이스에 저장
        communityPostRepository.save(post);

        return new CommunityListDTO(
                post.getPostUid(),
                post.getPostId(),
                post.getPostCategory(),
                post.getPostTitle(),
                post.getPostContent(),
                post.getPostCreatedAt(),
                post.getPostUpdatedAt(),
                post.getPostImgUrl(),
                post.getIsDeleted(),
                post.getDeleteReason(),
                post.getUserId(),
                post.getPostViewCount(),
                nickname,
                comments
        );
    };

// 댓글로직 추가 예정입니다............
//    public CommunityListDTO getCommunityPostWithComments (String postUid) {
//        Optional<CommunityPostEntity> optionalPost = communityPostRepository.findByPostUid(postUid);
//
//        if(optionalPost.isEmpty()){
//            throw new RuntimeException("Post with UID" + postUid + "not found");
//        }
//
//        CommunityPostEntity post = optionalPost.get();
//        System.out.println("User ID: " + post.getUserId());
//
//
//        //유저 정보 조회
//        Optional<UserEntity> userOptional = userRepository.findById(post.getUserId());
//        String nickname = userOptional.map(UserEntity::getNickname).orElse("Unknown");
//
//        List<CommentListDTO> comments = CommentRepository.findByPostUid(postUid).stream();
//
//        return new CommunityListDTO(
//                post.getPostUid(),
//                post.getPostId(),
//                post.getPostCategory(),
//                post.getPostTitle(),
//                post.getPostContent(),
//                post.getPostCreatedAt(),
//                post.getPostUpdatedAt(),
//                post.getPostImgUrl(),
//                post.getIsDeleted(),
//                post.getDeleteReason(),
//                post.getUserId(),
//                post.getPostViewCount(),
//                nickname,
//                comments
//        );
//    };


//                ProjectCategory category = ProjectCategory.valueOf(projectCategory.toUpperCase());
//                return projectRepository.findProjectsByCategoryAndFundingStatusAndDateRange(category, fundingStatus, now)
//                        .stream()
//                        .map(project -> projectConverter.toOutDTO(project))
//                        .collect(Collectors.toList());
//            } catch (IllegalArgumentException e) {
//                // Enum 변환 실패 시 빈 리스트 반환
//                return Collections.emptyList();
//            }
//        }
//    }

//        // 전체 게시글 수 가져오기
//        long totalCnt = em.createQuery("select count(c) from CommunityPostEntity c where c.postCategory = :category", Long.class)
//                .setParameter("category", postCategory)  // category를 바인딩
//                .getSingleResult();
//
//        // 결과를 CommunityDto에 담아서 반환
//        return new CommunityListDTO(postDtos, totalCnt, pageNum);
//    }

//    // 게시물 10개씩 가져오기
//    public CommunityListDTO getListCommunity2(PostCategory postCategory, int pageNum) {
//
//        // 쿼리 로그 추가
//        System.out.println("Fetching posts for category: " + postCategory);
//
//        // 사용자 닉네임 가져오기
//        List<CommunityPostEntity> communityPostEntities = em.createQuery(
//                        "select c from CommunityPostEntity c where c.postCategory = :category ORDER BY c.postId", CommunityPostEntity.class)
//                .setParameter("category", postCategory)  // category를 바인딩
//                .setFirstResult((pageNum - 1) * 10)  // 페이지네이션
//                .setMaxResults(10)  // 한 페이지에 10개씩
//                .getResultList();
//
//        // 게시글 정보를 CommunityDto.Post 형식으로 변환
//        List<CommunityListDTO.Post> postDtos = new ArrayList<>();
//        for (CommunityPostEntity post : communityPostEntities) {
//            String userId = post.getUserId();
//            UserEntity user = userRepository.findById(userId).orElse(null);
//            String nickname = (user != null) ? user.getNickname() : "닉네임과 일치하는 사용자 없음";
//
//            // CommunityDto.Post로 변환
//            CommunityListDTO.Post postDto = new CommunityListDTO.Post(
//                    post.getPostId(),
//                    post.getPostCategory(),
//                    post.getPostTitle(),
//                    post.getPostContent(),
//                    post.getPostCreatedAt(),
//                    post.getPostImgUrl(),
//                    post.getIsDeleted(),
//                    post.getDeleteReason(),
//                    post.getPostViewCount(),
//                    nickname
//            );
//            postDtos.add(postDto);
//        }
//
//        // 전체 게시글 수 가져오기
//        long totalCnt = em.createQuery("select count(c) from CommunityPostEntity c where c.postCategory = :category", Long.class)
//                .setParameter("category", postCategory)  // category를 바인딩
//                .getSingleResult();
//
//        // 결과를 CommunityDto에 담아서 반환
//        return new CommunityListDTO(postDtos, totalCnt, pageNum);
//    }

    // CommunityMypageDTO 변환 함수
    private CommunityMypageDTO communitytoDTO(CommunityPostEntity entity) {
        return new CommunityMypageDTO(
                entity.getPostUid(),
                entity.getPostId(),
                entity.getPostCategory(),
                entity.getPostTitle(),
                entity.getPostCreatedAt(),
                entity.getUserId(),
                entity.getPostViewCount()
        );
    }

    // 마이페이지 Comment 전체 데이터 불러오기
    public List<CommunityMypageDTO> getMypageCommunityList(){
        List<CommunityPostEntity> communityPostEntities = communityPostRepository.findAll();

        // CommunityPostEntity 객체를 CommunityMypageDTO 변환
        return communityPostEntities.stream()
                .map(this::communitytoDTO)  // convertToCommunityDTO 변환
                .collect(Collectors.toList());  // List로 수집
    }

}
