import { Inter } from "@next/font/google";
import { Layout } from "alias/components/layout";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  return (
    <>
      <main className="">
        <div className="logo">
          <img src="../asset/logoMoto.png" alt="" />
        </div>
        <div className="login"></div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
