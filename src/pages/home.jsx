import { Helmet } from 'react-helmet-async';

import EcommerceLandingView from 'src/sections/_ecommerce/view/ecommerce-landing-view';


// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> The starting point for your next project</title>
      </Helmet>

      <EcommerceLandingView />
    </>
  );
}
