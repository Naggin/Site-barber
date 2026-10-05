import { site } from './data/site.js';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { Gallery } from './components/Gallery.jsx';
import { About } from './components/About.jsx';
import { Services } from './components/Services.jsx';
import { Contact } from './components/Contact.jsx';
import { Footer } from './components/Footer.jsx';
import './styles/global.css';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
      <Header navigation={site.navigation} brand={site.brand} />
      <main id="conteudo" tabIndex={-1}>
        <Hero contact={site.contact} />
        <Gallery photos={site.photos} />
        <About />
        <Services services={site.services} contact={site.contact} />
        <Contact contact={site.contact} />
      </main>
      <Footer brand={site.brand} />
    </>
  );
}
