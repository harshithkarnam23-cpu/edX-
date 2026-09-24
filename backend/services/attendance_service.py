import re
from selectolax.parser import HTMLParser
from utils.text import TextUtils

class AttendanceService:
    @staticmethod
    def parse_attendance(html_content):
        courses = []
        if not html_content:
            return courses

        parser = HTMLParser(html_content)
        for row in parser.css("tr"):
            # Exclude rows that contain a nested table (e.g. test performance / marks table)
            if row.css_first("table"):
                continue

            tds = row.css("td")
            if len(tds) < 6:
                continue

            cols = [TextUtils.clean(td.text(strip=True)) for td in tds]

            # Find the index of the column containing the course code (typically col 0 or col 1)
            code_idx = -1
            for i in range(min(3, len(cols))):
                if re.match(r"^[A-Z0-9]{7,12}(?:Regular)?$", cols[i]):
                    code_idx = i
                    break

            if code_idx == -1:
                continue

            raw_code = cols[code_idx]
            code = raw_code.replace("Regular", "").strip()
            title = cols[code_idx + 1] if len(cols) > code_idx + 1 else ""
            category = cols[code_idx + 2] if len(cols) > code_idx + 2 else "Theory"

            # Parse remaining columns for slot, conducted, absent, percent
            rem = cols[code_idx + 3:]
            if not rem:
                continue

            try:
                # Percentage is usually the final column
                percent_str = rem[-1].replace("%", "").strip()
                percent = float(percent_str)
            except (ValueError, IndexError):
                continue

            conducted = 0
            absent = 0
            slot = ""

            # Check column layout from the end:
            # Layout A (9 cols total: ..., slot, conducted, absent, percent)
            if len(rem) >= 3 and rem[-2].isdigit() and rem[-3].isdigit():
                conducted = int(rem[-3])
                absent = int(rem[-2])
                slot = rem[-4] if len(rem) >= 4 else ""
            # Layout B (8 or 7 cols: ..., slot, conducted, percent)
            elif len(rem) >= 2 and rem[-2].isdigit():
                conducted = int(rem[-2])
                absent = max(0, round(conducted * (1.0 - percent / 100.0))) if percent > 0 else 0
                slot = rem[-3] if len(rem) >= 3 else ""
            elif len(rem) >= 1:
                slot = rem[0] if len(rem) > 1 else ""

            courses.append({
                "code": code,
                "title": title,
                "category": category,
                "slot": slot,
                "conducted": conducted,
                "absent": absent,
                "percent": percent
            })

        return courses
