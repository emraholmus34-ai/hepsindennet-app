/* global HepsindenNet, EmlakIlanDetay, EmlakIlanFormuKonut, EmlakIlanFormuIsyeri, EmlakIlanFormuArsa */
const { useState, useEffect } = React;

const App = () => {
  const [hash, setHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const renderRoute = () => {
    switch (hash) {
      case '#/detay':
        return <EmlakIlanDetay />;
      case '#/form/konut':
        return <EmlakIlanFormuKonut />;
      case '#/form/isyeri':
        return <EmlakIlanFormuIsyeri />;
      case '#/form/arsa':
        return <EmlakIlanFormuArsa />;
      case '#/':
      default:
        return <HepsindenNet />;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-sm mx-auto px-2 pt-3">
        <nav className="mb-3 flex items-center justify-between gap-2 text-xs">
          <div className="flex gap-2">
            <a href="#/" className={`px-2 py-1 rounded ${hash === '#/' ? 'bg-black text-white' : 'bg-white border'}`}>Ana Sayfa</a>
            <a href="#/detay" className={`px-2 py-1 rounded ${hash === '#/detay' ? 'bg-black text-white' : 'bg-white border'}`}>İlan Detayı</a>
          </div>
          <div className="flex gap-2">
            <a href="#/form/konut" className={`px-2 py-1 rounded ${hash === '#/form/konut' ? 'bg-yellow-500 text-white' : 'bg-white border'}`}>Konut Formu</a>
            <a href="#/form/isyeri" className={`px-2 py-1 rounded ${hash === '#/form/isyeri' ? 'bg-yellow-500 text-white' : 'bg-white border'}`}>İşyeri Formu</a>
            <a href="#/form/arsa" className={`px-2 py-1 rounded ${hash === '#/form/arsa' ? 'bg-yellow-500 text-white' : 'bg-white border'}`}>Arsa Formu</a>
          </div>
        </nav>
        {renderRoute()}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

