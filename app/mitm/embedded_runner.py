import argparse
import os


CAPTURE_HOST_PATTERN = r"(^|.+\.)(xybsyw\.com|jielong\.com):\d+$"


def build_mitmdump_args(args):
    addon = os.path.abspath(args.addon)
    confdir = os.path.abspath(args.confdir)
    result = [
        "--listen-host",
        args.host,
        "--listen-port",
        str(args.port),
        "--set",
        f"confdir={confdir}",
        "-s",
        addon,
        "--allow-hosts",
        CAPTURE_HOST_PATTERN,
        "--quiet",
    ]
    if args.allow_client:
        result.extend(["--set", "block_global=false"])
    return result


def parse_args(argv=None):
    parser = argparse.ArgumentParser(description="Run embedded mitmdump for SignSignIn")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, required=True)
    parser.add_argument("--addon", required=True)
    parser.add_argument("--confdir", required=True)
    parser.add_argument("--allow-client", default="")
    return parser.parse_args(argv)


def main(argv=None):
    args = parse_args(argv)
    if args.allow_client:
        os.environ["SIGN_MITM_ALLOWED_CLIENT"] = args.allow_client
    os.makedirs(os.path.abspath(args.confdir), exist_ok=True)
    from mitmproxy.tools.main import mitmdump

    return mitmdump(build_mitmdump_args(args)) or 0


if __name__ == "__main__":
    raise SystemExit(main())
