package com.kosmo.pitchplay.controller;

import com.kosmo.pitchplay.dto.NoticeDTO;
import com.kosmo.pitchplay.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    //공지사항 가져오기
    @GetMapping
    public List<NoticeDTO> getNotices(){
        return noticeService.getNoticeSummaryList();
    }

    //자주묻는 질문 가져오기
    @GetMapping("/faqs")
    public List<NoticeDTO> getFAQS(){
        return noticeService.getFAQList();
    }
}
