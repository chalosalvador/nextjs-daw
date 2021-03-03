import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginBottom: 40,
  },
  media: {
    height: 140,
  },
  title: {
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  body: {
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical",
  },
});

const Articles = ({ articles }) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="space-between">
      {articles.map((article, index) => (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              // image={`http://localhost:8000/storage/${article.image}`}
              image={`https://picsum.photos/200/300?sig=${index}`}
              title={article.title}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.title}
              >
                {article.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.body}
              >
                {article.body}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link href={`/articles/${article.id}`}>
              <Button size="small" color="primary">
                Ver más
              </Button>
            </Link>
          </CardActions>
        </Card>
        // <li>
        //   <Link href={`/articles/${article.id}`}>{article.title}</Link>
        // </li>
      ))}
    </Grid>
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
