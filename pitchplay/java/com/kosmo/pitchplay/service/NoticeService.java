package com.kosmo.pitchplay.service;


import com.kosmo.pitchplay.dto.NoticeDTO;
import com.kosmo.pitchplay.entity.Notice;
import com.kosmo.pitchplay.entity.User;
import com.kosmo.pitchplay.enums.NoticeType;
import com.kosmo.pitchplay.repository.NoticeRepository;
import com.kosmo.pitchplay.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;

    //글 생성하기
    public NoticeDTO createNotice(NoticeDTO noticeDTO) {
        Notice notice = new Notice();
        notice.setTitle(noticeDTO.getTitle());
        notice.setNoticeContent(noticeDTO.getContent());

        // author 정보 설정
        String authorUserUid = noticeDTO.getAuthor();
        User author = userRepository.findByUserUid(authorUserUid)
                .orElseThrow(() -> new RuntimeException("작성자를 찾을 수 없습니다."));
        notice.setAuthorUserUid(author.getUserUid());

        // 공지사항 타입 설정 (기본 값 설정)
        notice.setNoticeType(noticeDTO.getNoticeType());

        // 공지사항 저장
        noticeRepository.save(notice);

        // DTO로 반환
        noticeDTO.setId(notice.getNoticeId());
        noticeDTO.setCreateAt(notice.getCreateAt());
        noticeDTO.setStatus("해당없음");

        return noticeDTO;
    }

    //모든 글 불러오기
    public List<NoticeDTO> getNoticeALLList(){
        List<Notice> noticeAllEntities = noticeRepository.findAll();

        return noticeAllEntities.stream()
                .map(this::convertToDTO)
                .toList();
    }

    //공지사항 목록 전부 가져오기
    public List<NoticeDTO> getNoticeList() {
        return noticeRepository.findAll()
                .stream()
                .map(notice -> {
                    NoticeDTO dto = new NoticeDTO();
                    dto.setId(notice.getNoticeId());
                    dto.setNoticeType(notice.getNoticeType());
                    dto.setTitle(notice.getTitle());
                    dto.setAuthor(notice.getAuthorUserUid());
                    dto.setCreateAt(notice.getCreateAt());
                    dto.setStatus(notice.getStatus());
                    dto.setContent(notice.getNoticeContent());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    // 제목과 글만 반환
    public List<NoticeDTO> getNoticeSummaryList() {
        return noticeRepository.findAll()
                .stream()
                .map(notice -> {
                    NoticeDTO dto = new NoticeDTO();
                    dto.setTitle(notice.getTitle());
                    dto.setContent(notice.getNoticeContent());
                    return dto;
                })
                .collect(Collectors.toList());
    }


    // 자주 묻는 질문 목록 전부 가져오기
    public List<NoticeDTO> getFAQList() {
        List<Notice> faqEntities = noticeRepository.findAllByNoticeType(NoticeType.FAQ);
        return faqEntities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    //자주 묻는 질문 제목, 글 반환
    public List<NoticeDTO> getFAQSummaryList(){
        return noticeRepository.findAll()
                .stream()
                .map(notice -> {
                    NoticeDTO dto = new NoticeDTO();
                    dto.setTitle(notice.getTitle());
                    dto.setContent(notice.getNoticeContent());
                    return dto;
                })
                .collect(Collectors.toList());
    }


    private NoticeDTO convertToDTO(Notice notice){
        NoticeDTO noticeDTO = new NoticeDTO();
        noticeDTO.setId(notice.getNoticeId());
        noticeDTO.setNoticeType(notice.getNoticeType());
        noticeDTO.setTitle(notice.getTitle());

        // user nickname 값 작성자로 불러오기
        String authorUserUid = notice.getAuthorUserUid();

        // User를 직접 찾아서 nickname을 설정 (작성자는 무조건 존재한다고 가정)
        User author = userRepository.findByUserUid(authorUserUid).orElseThrow(() -> new RuntimeException("작성자를 찾을 수 없습니다."));
        noticeDTO.setAuthor(author.getNickname());


        noticeDTO.setCreateAt(notice.getCreateAt());
        noticeDTO.setStatus("해당없음");
        noticeDTO.setContent(notice.getNoticeContent());

        return noticeDTO;
    }
}
