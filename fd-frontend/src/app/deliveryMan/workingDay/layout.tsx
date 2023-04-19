import Header from "./components/header";

interface Props {
  children: React.ReactNode;
}

function WorkingDayLayout({ children }: Props): React.ReactElement {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default WorkingDayLayout;
