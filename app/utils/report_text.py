"""Translate the platform's rich text into editable text and safe paragraphs."""

import re
from html import escape
from html.parser import HTMLParser


class _ReportTextParser(HTMLParser):
    blocks = {"p", "div", "li", "ul", "ol", "blockquote", "pre", "tr",
              "h1", "h2", "h3", "h4", "h5", "h6"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self.hidden = 0

    def newline(self):
        if self.parts and not self.parts[-1].endswith("\n"):
            self.parts.append("\n")

    def handle_starttag(self, tag, attrs):
        if tag in {"script", "style"}:
            self.hidden += 1
        if self.hidden:
            return
        if tag == "br":
            self.parts.append("\n")
        elif tag in self.blocks:
            self.newline()

    def handle_endtag(self, tag):
        if tag in {"script", "style"}:
            self.hidden = max(0, self.hidden - 1)
        elif not self.hidden and tag in self.blocks:
            self.newline()

    def handle_data(self, data):
        if not self.hidden:
            self.parts.append(data)


def report_body_text(value: str) -> str:
    value = str(value or "").replace("\r\n", "\n").replace("\r", "\n")
    # Plain text may contain comparisons such as "A < B"; only parse markup.
    if not re.search(r"</?(?:p|div|br|span|strong|b|em|i|u|ul|ol|li|h[1-6]|"
                     r"blockquote|pre|table|tr|td|script|style|img)\b[^>]*>",
                     value, re.IGNORECASE):
        return value.strip()
    parser = _ReportTextParser()
    parser.feed(value)
    parser.close()
    return re.sub(r"\n{3,}", "\n\n", "".join(parser.parts).replace("\xa0", " ")).strip()


def report_body_html(value: str) -> str:
    text = report_body_text(value)
    return "".join(f"<p>{escape(line, quote=False) if line else '<br>'}</p>"
                   for line in text.split("\n"))


def readable_blog_list(value):
    if isinstance(value, list):
        return [readable_blog_list(item) for item in value]
    if isinstance(value, dict):
        result = dict(value)
        if "blogBody" in result:
            result["blogBodyText"] = report_body_text(result["blogBody"])
        for key in ("list", "items", "records", "rows", "blogs", "data"):
            if isinstance(result.get(key), (list, dict)):
                result[key] = readable_blog_list(result[key])
        return result
    return value
