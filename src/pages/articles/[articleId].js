import Comments from "@/components/Comments";

const ArticleDetails = ({ article }) => {
  if (!article) {
    return "No se pudo obtener el artículo";
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <div>{article.user_data.name}</div>
      <p>{article.body}</p>

      <Comments articleId={article.id} />
    </div>
  );
};

export default ArticleDetails;

export async function getStaticProps(context) {
  console.log("context", context);

  try {
    const { articleId } = context.params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${articleId}`
    );
    const data = await res.json();

    console.log("data", data);

    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        article: data,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return {
      props: {
        article: null,
      },
    };
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`);
  const data = await res.json();

  const articles = data.data;

  const paths = articles.map((article) => {
    return { params: { articleId: "" + article.id } };
  });

  return {
    paths,
    fallback: true, // See the "fallback" section below
  };
}
