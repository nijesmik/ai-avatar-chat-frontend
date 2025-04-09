"use client";

import { useEffect } from "react";

const logging = {
  DEBUG: 0,
  INFO: 100,
  WARN: 200,
  ERROR: 300,
} as const;

const GLOBAL_LOG_LEVEL = logging.DEBUG;

export const OverrideConsole = () => {
  useEffect(() => {
    const _debug = console.debug.bind(console);
    const _info = console.info.bind(console);
    const _warn = console.warn.bind(console);
    const _error = console.error.bind(console);

    console.debug = (...args: Parameters<typeof _debug>) => {
      if (GLOBAL_LOG_LEVEL <= logging.DEBUG) {
        _debug("[DEBUG]", ...args);
      }
    };

    console.info = (...args: Parameters<typeof _info>) => {
      if (GLOBAL_LOG_LEVEL <= logging.INFO) {
        _info("[INFO]", ...args);
      }
    };

    console.warn = (...args: Parameters<typeof _warn>) => {
      if (GLOBAL_LOG_LEVEL <= logging.WARN) {
        _warn("[WARN]", ...args);
      }
    };

    console.error = (...args: Parameters<typeof _error>) => {
      if (GLOBAL_LOG_LEVEL <= logging.ERROR) {
        _error("[ERROR]", ...args);
      }
    };
  }, []);

  return null;
};
