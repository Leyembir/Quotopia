import type { NextPage} from "next";
import Head from "next/head" ;
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Quotopia from "@/components/quotopia";


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>CopyKitt Tutorial | AI Generated Marketing</title>
        <meta
          name="description"
          content="Generate branding snippets for your product."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Quotopia/>
    </div>
  );
};
export default Home;