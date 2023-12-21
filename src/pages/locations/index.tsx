import { ServerResponse } from "http";

const Locations = () => {
  return null;
};

export default Locations;

export async function getServerSideProps({ res }: { res: ServerResponse }) {
  // Redirect to /locations/1
  res.writeHead(302, { Location: "/locations/1" });
  res.end();

  return {
    props: {},
  };
}
