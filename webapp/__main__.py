import os

import uvicorn


if __name__ == "__main__":
    uvicorn.run(
        "webapp.main:app",
        host=os.environ.get("SIGN_WEB_HOST", "0.0.0.0"),
        port=int(os.environ.get("SIGN_WEB_PORT", "8787")),
        proxy_headers=True,
        forwarded_allow_ips="127.0.0.1",
        log_level="info",
    )
