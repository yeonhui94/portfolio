package com.kosmo.kkomoadopt.repository;

import com.kosmo.kkomoadopt.dto.CommunityListDTO;
import com.kosmo.kkomoadopt.entity.AdoptionNoticeEntity;
import com.kosmo.kkomoadopt.entity.CommunityPostEntity;
import com.kosmo.kkomoadopt.entity.QnAEntity;
import com.kosmo.kkomoadopt.enums.NoticeCategory;
import com.kosmo.kkomoadopt.enums.PostCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface CommunityPostRepository extends JpaRepository<CommunityPostEntity, String> {

    // MAX(postId)를 구하는 쿼리 추가
    @Query("SELECT MAX(p.postId) FROM CommunityPostEntity p")
    Integer findMaxPostId();

    List<CommunityPostEntity> findByPostCategory(PostCategory postCategory);
    long count();

    Long countByUserId(String userId);


    Optional<CommunityPostEntity> findByPostUid(String postUid);

    // 카테고리로 입양 공고 조회
    //Page<CommunityPostEntity> findByCommunityCategory(PostCategory postCategory, Pageable pageable);

    Optional<CommunityPostEntity> findByUserIdAndPostUid(String userId, String postUid);
}