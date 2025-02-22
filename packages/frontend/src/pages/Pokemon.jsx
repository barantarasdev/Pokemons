import { useParams } from 'react-router-dom';

function Pokemon() {
  const { id } = useParams();

  return <h1>{id}</h1>;
}

export default Pokemon;
