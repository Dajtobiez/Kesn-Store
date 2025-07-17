package com.controller.controller_admin;

import com.dto.*;
import com.service.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*")
public class ThongKeController {

    @Autowired
    private ThongKeService thongKeService;

    @GetMapping("/overview")
    public OverviewDTO getOverview(
    		@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
    	    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
    ) {
        return thongKeService.getOverview(from, to);
    }

    @GetMapping("/chart")
    public List<ChartDataDTO> getChart(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
    ) {
        return thongKeService.getChart(from, to);
    }

    @GetMapping("/recent-transactions")
    public List<TransactionDTO> getRecentTransactions() {
        return thongKeService.getRecentTransactions();
    }
}
