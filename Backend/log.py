import logging
from logging.handlers import RotatingFileHandler
from datetime import datetime
from zoneinfo import ZoneInfo
import os
import builtins

# === Timezone Configuration ===
KOLKATA_TZ = ZoneInfo("Asia/Kolkata")

# === Log Directory & File ===
LOG_DIR = os.path.join(os.path.dirname(__file__), "logs")
os.makedirs(LOG_DIR, exist_ok=True)

LOG_FILE     = os.path.join(LOG_DIR, "app.log")
MAX_BYTES    = 5 * 1024 * 1024   # 5 MB
BACKUP_COUNT = 3                 # keep up to 3 old files

# === Log Levels ===
LOG_LEVEL = logging.INFO

# === Formatter with Kolkata Time ===
class KolkataFormatter(logging.Formatter):
    def __init__(self, fmt=None, datefmt=None):
        super().__init__(fmt=fmt, datefmt=datefmt)

    def formatTime(self, record, datefmt=None):
        # convert record.created (a POSIX timestamp) to aware datetime
        dt = datetime.fromtimestamp(record.created, tz=KOLKATA_TZ)
        if datefmt:
            return dt.strftime(datefmt)
        # default ISO format if no datefmt given
        return dt.isoformat()

_formatter = KolkataFormatter(
    fmt="%(asctime)s %(levelname)-8s [%(name)s] %(message)s",
    datefmt="%d-%m-%Y %H:%M:%S %z"
)

# === Handlers ===
_console_handler = logging.StreamHandler()
_console_handler.setLevel(LOG_LEVEL)
_console_handler.setFormatter(_formatter)

_file_handler = RotatingFileHandler(
    filename=LOG_FILE,
    maxBytes=MAX_BYTES,
    backupCount=BACKUP_COUNT,
    encoding="utf-8"
)
_file_handler.setLevel(logging.DEBUG)
_file_handler.setFormatter(_formatter)

# === Logger Factory ===
def get_logger(name: str) -> logging.Logger:
    """
    Returns a logger that writes to both console and rotating file,
    with timestamps in Asia/Kolkata time.
    Usage:
        logger = get_logger(__name__)
        logger.info("Something happened")
    """
    logger = logging.getLogger(name)
    if not logger.handlers:
        logger.setLevel(LOG_LEVEL)
        logger.addHandler(_console_handler)
        logger.addHandler(_file_handler)
    return logger

# === Override built-in print ===
_root_logger = get_logger("print_override")

def _print(*args, sep=" ", end="\n", **kwargs):
    """
    Replacement for built-in print: routes output to logger.info
    """
    text = sep.join(str(a) for a in args)
    _root_logger.info(text)

builtins.print = _print
