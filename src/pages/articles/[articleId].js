import Comments from "@/components/Comments";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/router";
import React from "react";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";

const ArticleDetails = () => {
  const router = useRouter();
  const { articleId } = router.query;
  const { data, error } = useSWR(`/articles/${articleId}`, fetcher);

  if (error) return <div>No se pudo cargar la información del artículo</div>;
  if (!data) return <Loading />;

  return (
    <div>
      <h1>{data.title}</h1>
      <div>{data.user_data.name}</div>
      <p>{data.body}</p>

      <Comments articleId={data.id} />
    </div>
  );
};

export default withAuth(ArticleDetails);

// export async function getStaticProps(context) {
//   console.log("context", context);
//
//   try {
//     const { articleId } = context.params;
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${articleId}`
//     );
//     const data = await res.json();
//
//     console.log("data", data);
//
//     if (!data) {
//       return {
//         notFound: true,
//       };
//     }
//
//     return {
//       props: {
//         article: data,
//       }, // will be passed to the page component as props
//     };
//   } catch (error) {
//     return {
//       props: {
//         article: null,
//       },
//     };
//   }
// }
//
// export async function getStaticPaths() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`);
//   const data = await res.json();
//
//   const articles = data.data;
//
//   const paths = articles.map((article) => {
//     return { params: { articleId: "" + article.id } };
//   });
//
//   return {
//     paths,
//     fallback: true, // See the "fallback" section below
//   };
// }
