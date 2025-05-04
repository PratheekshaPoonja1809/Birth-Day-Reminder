import React, { Suspense } from "react";
import { FeatherIcons } from "./Constants";
import Tippy from "@tippyjs/react";

export const LazyLoadIcons = ({ name, content, ...props }) => {
  const Icon = FeatherIcons[name];

  if (!Icon) return null;

  return (
    <Suspense fallback={null}>
      {content ? (
        <Tippy content={content ?? null}>
          <Icon {...props} />
        </Tippy>
      ) : (
        <Icon {...props} />
      )}
    </Suspense>
  );
};
