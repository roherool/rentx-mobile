import React from "react";

import * as s from "./styles";

interface Props {
  active?: boolean;
}

export function Bullet({ active = false }: Props) {
  return <s.Container active={active} />;
}
