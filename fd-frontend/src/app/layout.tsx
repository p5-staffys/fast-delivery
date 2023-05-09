import { GlobalContextProvider } from "@/context/store";
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en">
      <body className="body">
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
}
