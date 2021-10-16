import Editor from '../components/Editor';
import store from '../src/SupabaseStore';

export default function Page() {
  return <Editor store={store} />;
}
