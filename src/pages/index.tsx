// pages/index.js

const HomePage = () => {
  return <div>Home Page</div>;
};

export default HomePage;

import { ServerResponse } from "http";

export async function getServerSideProps({ res }: { res: ServerResponse }) {
  // Redirect to /locations/1
  res.writeHead(302, { Location: "/locations/1" });
  res.end();

  return {
    props: {},
  };
}
