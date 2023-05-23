import React from "react";
import Header from "../../management/components/header";

interface Props {
  children: React.ReactNode;
}

function WorkingDayLayout({ children }: Props): React.ReactElement {
  return (
    <div style={{ marginTop: "3rem" }}>
      <Header />
      {children}
    </div>
  );
}

export default WorkingDayLayout;
