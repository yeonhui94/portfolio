package com.kosmo.pitchplay.repository;


import com.kosmo.pitchplay.entity.Notice;
import com.kosmo.pitchplay.enums.NoticeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, String> {
//    Notice findByTitleContaining(String keyword);
//    Notice findByContentContaining(String keyword);
//    Notice findByTitleContainingOrContentContaining(String titleKeyword, String contentKeyword);

        // 공지사항 타입으로 조회
        List<Notice> findAllByNoticeType(NoticeType noticeType);
}
