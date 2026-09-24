import os
import json
from pathlib import Path
from bs4 import BeautifulSoup
from datetime import datetime

_CALENDAR_CACHE = None

class CalendarService:
    @staticmethod
    def load_embedded_calendar():
        global _CALENDAR_CACHE
        if _CALENDAR_CACHE is not None:
            return _CALENDAR_CACHE

        possible_paths = [
            Path(__file__).parent.parent / "data" / "calendar_data.json",
            Path(__file__).parent.parent.parent / "tools" / "cli" / "internal" / "data" / "calendar_data.json",
        ]

        for p in possible_paths:
            if p.exists():
                try:
                    _CALENDAR_CACHE = json.loads(p.read_text(encoding="utf-8"))
                    return _CALENDAR_CACHE
                except Exception:
                    pass

        _CALENDAR_CACHE = []
        return _CALENDAR_CACHE

    @staticmethod
    def get_today_info(events=None):
        if events is None:
            events = CalendarService.load_embedded_calendar()

        now = datetime.now()
        date_str = now.strftime("%d %b %Y")  # e.g. "24 Sep 2026"
        day_name = now.strftime("%a")

        today_match = next((e for e in events if e.get("date") == date_str), None)
        if today_match:
            order = today_match.get("order", "-")
            desc = today_match.get("description", "")
            is_holiday = order == "-" or "holiday" in desc.lower() or "sunday" in desc.lower()
            return {
                "date": date_str,
                "day": today_match.get("day", day_name),
                "dayOrder": order if order != "-" else "-",
                "isHoliday": is_holiday,
                "description": desc,
            }

        return {
            "date": date_str,
            "day": day_name,
            "dayOrder": "-",
            "isHoliday": day_name in ["Sat", "Sun"],
            "description": "Weekend" if day_name in ["Sat", "Sun"] else "Working Day",
        }

    @staticmethod
    def parse_calendar(html_content):
        cal = []
        day_order = "-"
        if not html_content:
            return cal, day_order

        soup = BeautifulSoup(html_content, 'lxml')

        now = datetime.now()
        current_day_num = str(now.day)
        current_month_label = now.strftime("%b '%y")

        tbl = None
        for t in soup.find_all('table'):
            if "Dt" in t.get_text():
                tbl = t
                break

        if tbl:
            rows = tbl.find_all('tr')
            month_block_index = -1
            header_cells = rows[0].find_all(['td', 'th'])

            block_count = 0
            for cell in header_cells:
                cell_text = cell.get_text(strip=True)
                if current_month_label in cell_text:
                    month_block_index = block_count
                    break
                block_count += 1

            for r in rows:
                cells = r.find_all('td')
                if not cells:
                    continue

                for block_idx in range(len(cells) // 4):
                    start_i = block_idx * 4
                    dt_txt = cells[start_i].get_text(strip=True)
                    if not dt_txt.isdigit():
                        continue

                    day_val = cells[start_i + 1].get_text(strip=True)
                    desc_val = cells[start_i + 2].get_text(strip=True)
                    do_val = cells[start_i + 3].get_text(strip=True)

                    cal.append({
                        "date": dt_txt,
                        "day": day_val,
                        "description": desc_val,
                        "dayOrder": do_val
                    })

                    if block_idx == month_block_index and dt_txt == current_day_num:
                        day_order = do_val if do_val else "-"

        return cal, day_order

    @classmethod
    def get_calendar_summary(cls, html_content=None):
        cal_events, live_order = cls.parse_calendar(html_content) if html_content else ([], "-")
        embedded_events = cls.load_embedded_calendar()
        today_info = cls.get_today_info(embedded_events)

        effective_day_order = live_order if live_order != "-" else today_info.get("dayOrder", "-")
        today_info["dayOrder"] = effective_day_order

        return {
            "dayOrder": effective_day_order,
            "today": today_info,
            "events": embedded_events if embedded_events else cal_events,
            "liveEvents": cal_events if cal_events else []
        }