import React from "react";

const Locations = () => {
  return <div>Locations</div>;
};

export default Locations;

import { ServerResponse } from "http";

export async function getServerSideProps({ res }: { res: ServerResponse }) {
  // Redirect to /locations/1
  res.writeHead(302, { Location: "/locations/1" });
  res.end();

  return {
    props: {},
  };
}
