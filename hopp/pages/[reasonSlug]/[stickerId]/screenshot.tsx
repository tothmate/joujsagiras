import { Container } from '@material-ui/core';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Canvas from '../../../components/Canvas';
import { emptySticker } from '../../../src/models';
import store from '../../../src/SupabaseStore';

export async function getServerSideProps({ res, query }: GetServerSidePropsContext) {
  const result = await store.load(query.stickerId as string);
  return result.match(
    (sticker) => {
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=2678400');
      return { props: { sticker, error: null } };
    },
    (error) => {
      return { props: { sticker: emptySticker, error } };
    }
  );
}

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (props.error) {
    return <div />;
  }

  return (
    <Container maxWidth="sm">
      <Canvas sticker={props.sticker} loadingSource={false} />
    </Container>
  );
}
