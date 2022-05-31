import { GetStaticProps } from "next";
import Head from "next/Head";
import { getPrismicClient } from "../../services/prismic";
import styles from "./styles.module.scss";
import Prismic from "@prismicio/client";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>
              Porque a carreira de dev tem que ser de muito estudo
            </strong>
            <p>Teste de texto.</p>
          </a>
          <a>
            <time>12 de março de 2021</time>
            <strong>
              Porque a carreira de dev tem que ser de muito estudo
            </strong>
            <p>Teste de texto.</p>
          </a>
          <a>
            <time>12 de março de 2021</time>
            <strong>
              Porque a carreira de dev tem que ser de muito estudo
            </strong>
            <p>Teste de texto.</p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    {
      fetch: ["post.title", "post.content"],
      pageSize: 100,
    }
  );

  console.log(response);

  return {
    props: {},
  };
};
