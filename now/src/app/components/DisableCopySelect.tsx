"use client";

import { useEffect } from "react";

export default function DisableCopySelect() {
  useEffect(() => {
    const isEditableTarget = (target: EventTarget | null): boolean => {
      if (!(target instanceof HTMLElement)) {
        return false;
      }

      if (target.isContentEditable) {
        return true;
      }

      const tagName = target.tagName.toLowerCase();
      return tagName === "input" || tagName === "textarea" || tagName === "select";
    };

    const prevent = (event: Event) => {
      if (isEditableTarget(event.target)) {
        return;
      }

      event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) {
        return;
      }

      if (!(event.ctrlKey || event.metaKey)) {
        return;
      }

      const blocked = ["a", "c", "x", "u", "s"];
      if (blocked.includes(event.key.toLowerCase())) {
        event.preventDefault();
      }
    };

    document.addEventListener("copy", prevent);
    document.addEventListener("cut", prevent);
    document.addEventListener("selectstart", prevent);
    document.addEventListener("contextmenu", prevent);
    document.addEventListener("dragstart", prevent);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("copy", prevent);
      document.removeEventListener("cut", prevent);
      document.removeEventListener("selectstart", prevent);
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("dragstart", prevent);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
