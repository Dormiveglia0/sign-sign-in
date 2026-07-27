from PySide6.QtCore import QThread, Signal

from app.utils.gotify import notify_gotify


class GotifyWorker(QThread):
    result_signal = Signal(bool, str)

    def __init__(
        self,
        server_url: str,
        token: str,
        title: str,
        content: str,
    ):
        super().__init__()
        self.server_url = server_url
        self.token = token
        self.title = title
        self.content = content

    def run(self):
        try:
            text = notify_gotify(
                title=self.title,
                content=self.content,
                server_url=self.server_url,
                token=self.token,
            )
            self.result_signal.emit(True, text[:200] or "success")
        except Exception as exc:
            self.result_signal.emit(False, str(exc))
