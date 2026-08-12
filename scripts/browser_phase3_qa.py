#!/usr/bin/env python3
"""Compatibility entry point. Runs the current v3.2 browser QA suite."""
from browser_v32_qa import run
if __name__ == '__main__':
    raise SystemExit(run())
