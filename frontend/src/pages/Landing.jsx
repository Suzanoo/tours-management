import Slide from '../components/Slide';
import Map from '../components/Map';
import Tour from '../components/Tour';

import '../public/css/main.css';

function Landing() {
  return (
    <>
      <div className="container py-4 rounded md:rounded-lg">
        <Slide />
        <Map />
        <Tour />
      </div>
    </>
  );
}

export default Landing;
