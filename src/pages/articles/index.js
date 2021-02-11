import Link from "next/Link";

const Articles = ({ articles }) => {
  return (
    <ul>
      {articles.map((article) => (
        <li>
          <Link href={`/articles/${article.id}`}>{article.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Articles;

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`);
  const data = await res.json();

  const articles = data.data;

  return {
    props: {
      articles,
    },
  };
}
