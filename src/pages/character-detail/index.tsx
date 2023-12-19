const CharacterDetail = () => {
  return null;
};

export default CharacterDetail;

import { ServerResponse } from "http";

export async function getServerSideProps({ res }: { res: ServerResponse }) {
  // Redirect to /locations/1
  res.writeHead(302, { Location: "/locations/1" });
  res.end();

  return {
    props: {},
  };
}
