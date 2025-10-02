const { useState } = React;

const HepsindenNet = () => {
  const [currentPage, setCurrentPage] = useState('homePage');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [walletBalance, setWalletBalance] = useState(250.75);
  const [userPoints, setUserPoints] = useState(1250);
  
  const [showWalletPage, setShowWalletPage] = useState(false);
  const [showSettingsPage, setShowSettingsPage] = useState(false);
  const [settingsActiveTab, setSettingsActiveTab] = useState('main');
  const [showCartPage, setShowCartPage] = useState(false);
  const [showMessagesPage, setShowMessagesPage] = useState(false);
  const [showOrdersPage, setShowOrdersPage] = useState(false);
  const [showFavoritesPage, setShowFavoritesPage] = useState(false);
  const [showHistoryPage, setShowHistoryPage] = useState(false);
  const [showFollowedStoresPage, setShowFollowedStoresPage] = useState(false);
  const [showShareEarnPage, setShowShareEarnPage] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const [currentPropertyType, setCurrentPropertyType] = useState('');
  const [currentAdType, setCurrentAdType] = useState('');
  const [selectedPropertySubType, setSelectedPropertySubType] = useState('');
  
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [comingSoonMessage, setComingSoonMessage] = useState('');
  
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [areaRange, setAreaRange] = useState({ min: '', max: '' });
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedAge, setSelectedAge] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [notificationsSaved, setNotificationsSaved] = useState(false);
  const [ibanList, setIbanList] = useState([]);

  const categories = [
    { id: 1, name: 'Emlak', icon: '🏠', iconClass: 'ic-yellow', subtitle: 'Ev, Arsa, İş Yeri' },
    { id: 2, name: 'Vasıta', icon: '🚗', iconClass: 'ic-blue', subtitle: 'Otomobil, Motosiklet' },
    { id: 3, name: 'Alışveriş', icon: '👕', iconClass: 'ic-purple', subtitle: 'Giyim, Elektronik' },
    { id: 4, name: 'İkinci El Ürünler', icon: '♻️', iconClass: 'ic-green', subtitle: 'Mobilya, Eşya' },
    { id: 5, name: 'Bilet', icon: '✈️', iconClass: 'ic-orange', subtitle: 'Uçak, Otobüs, Konser' },
    { id: 6, name: 'Turizm & Otel', icon: '⛱️', iconClass: 'ic-blue', subtitle: 'Tatil, Konaklama' },
    { id: 7, name: 'Hizmetler & Ustalar', icon: '🔧', iconClass: 'ic-orange', subtitle: 'Tamir, Temizlik' },
    { id: 8, name: 'Yemek', icon: '🍕', iconClass: 'ic-red', subtitle: 'Restoran, Cafe' },
    { id: 9, name: 'Market', icon: '🛒', iconClass: 'ic-green', subtitle: 'Gıda, İçecek' },
    { id: 10, name: 'İş İlanları', icon: '💼', iconClass: 'ic-red', subtitle: 'Tam Zamanlı, Yarı' },
    { id: 11, name: 'Taksi Çağır', icon: '🚕', iconClass: 'ic-yellow', subtitle: 'Şehir İçi, Havaalanı' },
    { id: 12, name: 'Çiçek Gönder', icon: '🌹', iconClass: 'ic-purple', subtitle: 'Buket, Aranjman' },
    { id: 13, name: 'Hayvanlar Alemi', icon: '🐾', iconClass: 'ic-green', subtitle: 'Kedi, Köpek, Kuş' },
    { id: 14, name: 'Kiralık Hizmetler', icon: '📋', iconClass: 'ic-blue', subtitle: 'Araç, Ekipman' },
    { id: 15, name: 'Sigorta & Kasko', icon: '🛡️', iconClass: 'ic-orange', subtitle: 'Araç, Sağlık, Konut' },
    { id: 16, name: 'Kadın Emeği', icon: '🧵', iconClass: 'ic-purple', subtitle: 'El İşi, Tasarım, Pasta' },
    { id: 17, name: 'Organizasyon & Etkinlik', icon: '🎉', iconClass: 'ic-yellow', subtitle: 'Düğün, Sünnet, Doğum Günü' }
  ];

  const residentialTypes = [
    { name: 'Daire', icon: '🏠', iconClass: 'ic-blue', subtitle: 'Apartman Dairesi' },
    { name: 'Villa', icon: '🏰', iconClass: 'ic-purple', subtitle: 'Lüks Villa' },
    { name: 'Müstakil Ev', icon: '🏡', iconClass: 'ic-green', subtitle: 'Bahçeli Ev' },
    { name: 'Rezidans', icon: '🏢', iconClass: 'ic-orange', subtitle: 'Lüks Rezidans' },
    { name: 'Yazlık', icon: '🏖️', iconClass: 'ic-orange', subtitle: 'Tatil Evi' },
    { name: 'Çiftlik Evi', icon: '🌾', iconClass: 'ic-green', subtitle: 'Kırsal Alan' },
    { name: 'Komple Bina', icon: '🏬', iconClass: 'ic-blue', subtitle: 'Tüm Bina' },
    { name: 'Kooperatif', icon: '🏘️', iconClass: 'ic-yellow', subtitle: 'Ortak Mülk' }
  ];

  const businessTypes = [
    { name: 'Dükkan', icon: '🏪', iconClass: 'ic-blue', subtitle: 'Mağaza' },
    { name: 'Ofis', icon: '🏢', iconClass: 'ic-green', subtitle: 'İş Merkezi' },
    { name: 'Depo', icon: '🏭', iconClass: 'ic-orange', subtitle: 'Antrepo' },
    { name: 'Fabrika', icon: '🏭', iconClass: 'ic-red', subtitle: 'Üretim Tesisi' },
    { name: 'Cafe/Restoran', icon: '☕', iconClass: 'ic-yellow', subtitle: 'Yemek İçmek' },
    { name: 'Market', icon: '🛒', iconClass: 'ic-green', subtitle: 'Gıda Mağazası' },
    { name: 'Büro', icon: '🏢', iconClass: 'ic-blue', subtitle: 'İş Ofisi' },
    { name: 'Plaza', icon: '🏬', iconClass: 'ic-purple', subtitle: 'İş Merkezi' },
    { name: 'Atölye', icon: '🔧', iconClass: 'ic-orange', subtitle: 'Üretim Yeri' },
    { name: 'Garaj', icon: '🚗', iconClass: 'ic-gray', subtitle: 'Oto Park' },
    { name: 'Otel', icon: '🏨', iconClass: 'ic-green', subtitle: 'Konaklama' },
    { name: 'Pastane', icon: '🍰', iconClass: 'ic-yellow', subtitle: 'Fırın/Tatlıcı' },
    { name: 'Berber/Kuaför', icon: '✂️', iconClass: 'ic-purple', subtitle: 'Güzellik' }
  ];

  const myAds = [
    { id: 1, title: 'Merkezi konumda 3+1 daire', category: 'Konut', type: 'Satılık', price: '850,000 ₺', views: 234, favorites: 12, status: 'active', image: '🏠' },
    { id: 2, title: 'İşlek caddede kiralık dükkan', category: 'İş Yeri', type: 'Kiralık', price: '15,000 ₺/ay', views: 89, favorites: 5, status: 'active', image: '🏪' }
  ];

  const sampleAds = [
    { id: 1, title: 'Merkezi konumda lüks 3+1 daire', location: 'İstanbul, Kadıköy', price: '2,500,000 ₺', area: '135 m²', rooms: '3+1', age: '5 yaşında', floor: '8. kat', image: '🏠' },
    { id: 2, title: 'Deniz manzaralı modern daire', location: 'İstanbul, Kartal', price: '1,850,000 ₺', area: '110 m²', rooms: '2+1', age: '2 yaşında', floor: '12. kat', image: '🏠' },
    { id: 3, title: 'Geniş bahçeli dubleks villa', location: 'İstanbul, Zekeriyaköy', price: '4,200,000 ₺', area: '280 m²', rooms: '5+2', age: '8 yaşında', floor: 'Dubleks', image: '🏡' },
    { id: 4, title: 'Yatırımlık merkezi daire', location: 'İstanbul, Şişli', price: '1,650,000 ₺', area: '95 m²', rooms: '2+1', age: '15 yaşında', floor: '6. kat', image: '🏠' },
    { id: 5, title: 'Panoramik şehir manzaralı penthouse', location: 'İstanbul, Etiler', price: '5,800,000 ₺', area: '200 m²', rooms: '4+1', age: '3 yaşında', floor: 'Çatı katı', image: '🏰' }
  ];

  const filteredCategories = categories.filter(cat => 
    !searchTerm || cat.name.toLowerCase().includes(searchTerm.toLowerCase()) || cat.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isSpecialPage = showWalletPage || showCartPage || showMessagesPage || showOrdersPage || showFavoritesPage || showHistoryPage || showSettingsPage || showFollowedStoresPage || showShareEarnPage;

  const selectCategory = (categoryId) => {
    if (categoryId === 1) {
      setCurrentPage('realEstateAdPage');
    } else {
      setComingSoonMessage('Bu kategori yakında hizmete girecek!\n\nŞimdilik Emlak kategorimizi keşfedin.');
      setShowComingSoonModal(true);
    }
  };

  const selectPropertyType = (type) => {
    setCurrentPropertyType(type);
    setCurrentPage('adTypeSelectionPage');
  };

  const selectAdType = (type) => {
    setCurrentAdType(type);
    if (currentPropertyType === 'commercial') {
      setCurrentPage('commercialSubPage');
    } else if (currentPropertyType === 'residential') {
      setCurrentPage('residentialSubPage');
    } else {
      setCurrentPage('adListPage');
    }
  };

  const proceedToAdForm = (type) => {
    setSelectedPropertySubType(type);
    setCurrentPage('adListPage');
  };

  const resetAllPages = () => {
    setShowWalletPage(false);
    setShowCartPage(false);
    setShowMessagesPage(false);
    setShowOrdersPage(false);
    setShowFavoritesPage(false);
    setShowHistoryPage(false);
    setShowSettingsPage(false);
    setShowFollowedStoresPage(false);
    setShowShareEarnPage(false);
    setSettingsActiveTab('main');
    setCurrentPage('homePage');
    setPriceRange({ min: '', max: '' });
    setAreaRange({ min: '', max: '' });
    setSelectedRooms([]);
    setSelectedAge('');
    setSortBy('newest');
    setShowFilters(false);
  };

  const toggleRoomFilter = (room) => {
    setSelectedRooms(prev => prev.includes(room) ? prev.filter(r => r !== room) : [...prev, room]);
  };

  const clearFilters = () => {
    setPriceRange({ min: '', max: '' });
    setAreaRange({ min: '', max: '' });
    setSelectedRooms([]);
    setSelectedAge('');
  };

  const getFilteredAndSortedAds = () => {
    let filtered = [...sampleAds];

    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter(ad => {
        const price = parseInt(ad.price.replace(/[^0-9]/g, ''));
        const min = priceRange.min ? parseInt(priceRange.min) : 0;
        const max = priceRange.max ? parseInt(priceRange.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    if (areaRange.min || areaRange.max) {
      filtered = filtered.filter(ad => {
        const area = parseInt(ad.area);
        const min = areaRange.min ? parseInt(areaRange.min) : 0;
        const max = areaRange.max ? parseInt(areaRange.max) : Infinity;
        return area >= min && area <= max;
      });
    }

    if (selectedRooms.length > 0) {
      filtered = filtered.filter(ad => selectedRooms.includes(ad.rooms));
    }

    if (selectedAge) {
      filtered = filtered.filter(ad => {
        const age = parseInt(ad.age);
        switch(selectedAge) {
          case '0-5': return age <= 5;
          case '6-10': return age >= 6 && age <= 10;
          case '11-20': return age >= 11 && age <= 20;
          case '20+': return age > 20;
          default: return true;
        }
      });
    }

    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'price-low': return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
        case 'price-high': return parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''));
        case 'area-large': return parseInt(b.area) - parseInt(a.area);
        case 'area-small': return parseInt(a.area) - parseInt(b.area);
        case 'newest':
        default: return b.id - a.id;
      }
    });

    return filtered;
  };

  const renderCard = (item, onClick) => (
    <div 
      key={item.id || item.name}
      className="bg-white rounded-lg p-2 flex flex-col items-center justify-center gap-1 shadow-sm min-h-[85px] text-center cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md select-none"
      onClick={onClick}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold ${
        item.iconClass === 'ic-yellow' ? 'text-yellow-600' :
        item.iconClass === 'ic-blue' ? 'text-blue-600' :
        item.iconClass === 'ic-green' ? 'text-green-600' :
        item.iconClass === 'ic-purple' ? 'text-purple-600' :
        item.iconClass === 'ic-orange' ? 'text-orange-600' :
        item.iconClass === 'ic-red' ? 'text-red-600' : 'text-blue-600'
      }`}>
        {item.icon}
      </div>
      <div className="text-xs text-gray-800 font-bold leading-tight">{item.name}</div>
      <div className="text-[9px] text-gray-600 leading-tight font-medium">{item.subtitle}</div>
    </div>
  );

  const UserMenu = () => (
    <>
      {showUserMenu && <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowUserMenu(false)} />}
      <div className={`fixed top-0 left-0 w-72 h-full bg-white z-50 transition-transform duration-300 shadow-xl overflow-y-auto ${showUserMenu ? 'transform translate-x-0' : 'transform -translate-x-full'}`}>
        <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white p-6 text-center relative">
          <button className="absolute top-3 left-3 bg-white bg-opacity-20 border-0 text-white w-7 h-7 rounded-full cursor-pointer flex items-center justify-center text-base" onClick={() => setShowUserMenu(false)}>×</button>
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">👤</div>
          <div className="text-base font-semibold mb-1">{isLoggedIn ? currentUser.name : 'Giriş Yapın'}</div>
          <div className="text-xs opacity-80">{isLoggedIn ? currentUser.email : 'Hesabınıza erişin'}</div>
        </div>
        
        <div className="p-0">
          <div className="flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => { setShowUserMenu(false); resetAllPages(); }}>
            <div className="w-6 h-6 mr-4 flex items-center justify-center text-lg">🏠</div>
            <div className="flex-1 text-sm text-gray-800">Ana Sayfa</div>
          </div>
          
          <div className="flex items-center p-4 border-b border-gray-100 cursor-pointer bg-green-50 border-l-4 border-l-green-500 hover:bg-green-100 transition-colors" onClick={() => { setShowUserMenu(false); setCurrentPage('categoryPage'); }}>
            <div className="w-6 h-6 mr-4 flex items-center justify-center text-lg text-green-600">📝</div>
            <div className="flex-1 text-sm text-green-600 font-semibold">Ücretsiz İlan Ver</div>
          </div>
          
          {!isLoggedIn ? (
            <>
              <div className="flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => alert('Giriş sayfası açılacak')}>
                <div className="w-6 h-6 mr-4 flex items-center justify-center text-lg">🔐</div>
                <div className="flex-1 text-sm text-gray-800">Giriş Yap</div>
              </div>
              
              <div className="flex items-center p-4 border-b border-gray-100 cursor-pointer bg-blue-50 border-l-4 border-l-blue-500 hover:bg-blue-100 transition-colors" 
                   onClick={() => {
                     setIsLoggedIn(true);
                     setCurrentUser({ name: 'Demo Kullanıcı', email: 'demo@hepsindenet.com' });
                     alert('Demo hesabıyla başarıyla giriş yapıldı!');
                   }}>
                <div className="w-6 h-6 mr-4 flex items-center justify-center text-lg text-blue-600">⚡</div>
                <div className="flex-1 text-sm text-blue-600 font-semibold">Demo Giriş Yap</div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => { setShowUserMenu(false); resetAllPages(); setShowWalletPage(true); }}>
                <div className="w-6 h-6 mr-4 flex items-center justify-center text-lg">💰</div>
                <div className="flex-1 text-sm text-gray-800">Cüzdan Hesabım</div>
              </div>
              
              <div className="flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => { setShowUserMenu(false); resetAllPages(); setShowCartPage(true); }}>
                <div className="w-6 h-6 mr-4 flex items-center justify-center text-lg">🛒</div>
                <div className="flex-1 text-sm text-gray-800">Sepetim</div>
              </div>
              
              <div className="flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => { setShowUserMenu(false); resetAllPages(); setShowOrdersPage(true); }}>
                <div className="w-6 h-6 mr-4 flex items-center justify-center text-lg">📦</div>
                <div className="flex-1 text-sm text-gray-800">Siparişlerim</div>
              </div>
              
              <div className="flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => { setShowUserMenu(false); resetAllPages(); setShowFavoritesPage(true); }}>
                <div className="w-6 h-6 mr-4 flex items-center justify-center text-lg">❤️</div>
                <div className="flex-1 text-sm text-gray-800">Favori İlanlarım</div>
              </div>
              
              <div className="flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => { setShowUserMenu(false); resetAllPages(); setShowHistoryPage(true); }}>
                <div className="w-6 h-6 mr-4 flex items-center justify-center text-lg">🕒</div>
                <div className="flex-1 text-sm text-gray-800">Önceden Gezdiklerim</div>
              </div>
              
              <div className="flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => { setShowUserMenu(false); resetAllPages(); setShowMessagesPage(true); }}>
                <div className="w-6 h-6 mr-4 flex items-center justify-center text-lg">💬</div>
                <div className="flex-1 text-sm text-gray-800">Mesajlarım</div>
              </div>
              
              <div className="flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => { setShowUserMenu(false); resetAllPages(); setShowFollowedStoresPage(true); }}>
                <div className="w-6 h-6 mr-4 flex items-center justify-center text-lg">🏪</div>
                <div className="flex-1 text-sm text-gray-800">Takip Ettiğim Mağazalar</div>
              </div>
              
              <div className="flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => { setShowUserMenu(false); resetAllPages(); setShowShareEarnPage(true); }}>
                <div className="w-6 h-6 mr-4 flex items-center justify-center text-lg">🎁</div>
                <div className="flex-1 text-sm text-gray-800">Paylaş Kazan</div>
              </div>
              
              <div className="flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors border-t mt-2" onClick={() => setShowLogoutConfirm(true)}>
                <div className="w-6 h-6 mr-4 flex items-center justify-center text-lg text-red-600">🚪</div>
                <div className="flex-1 text-sm text-red-600">Çıkış Yap</div>
              </div>
            </>
          )}
          
          <div className="flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => { setShowUserMenu(false); resetAllPages(); setShowSettingsPage(true); }}>
            <div className="w-6 h-6 mr-4 flex items-center justify-center text-lg">⚙️</div>
            <div className="flex-1 text-sm text-gray-800">Ayarlar</div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-black to-black rounded-3xl p-2 shadow-2xl">
      <div className="bg-gray-100 rounded-xl p-2 min-h-[660px] max-h-[680px] overflow-y-auto overflow-x-hidden">
        <div className="text-center mb-2 cursor-pointer p-1">
          <span className="text-xl font-extrabold text-gray-700">Hepsinden</span>
          <span className="text-xl font-extrabold text-yellow-500">Net</span>
        </div>

        <div className="flex gap-2 items-center mb-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer" onClick={() => setShowUserMenu(true)} title="Profil">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3.2" stroke="#9aa0a6" strokeWidth="2.5" />
              <path d="M4 20c0-3.3 4-5 8-5s8 1.7 8 5" stroke="#9aa0a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {(!isSpecialPage && currentPage === 'homePage') && (
            <div className="flex-1 bg-gray-200 p-2 rounded-lg flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-4.35-4.35" stroke="#9aa0a6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="11" cy="11" r="5" stroke="#9aa0a6" strokeWidth="2.2" />
              </svg>
              <input 
                className="border-0 bg-transparent outline-none w-full text-sm text-gray-800 placeholder-gray-500"
                placeholder="Ne arıyorsunuz?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>

        {!isSpecialPage && currentPage === 'homePage' && (
          <div className="grid grid-cols-4 gap-2">
            {filteredCategories.map(cat => renderCard(cat, () => selectCategory(cat.id)))}
          </div>
        )}

        {isSpecialPage && (
          <div>
            <div className="flex items-center mb-5">
              <button onClick={() => { resetAllPages(); setShowUserMenu(true); }} className="bg-gray-100 border-2 border-gray-300 text-2xl cursor-pointer mr-4 text-gray-800 font-black hover:bg-gray-200 transition-all rounded-lg w-10 h-10 flex items-center justify-center">←</button>
              <h2 className="m-0 text-base text-gray-800 font-semibold">
                {showWalletPage && 'Cüzdan Hesabım'}
                {showCartPage && 'Sepetim'}
                {showMessagesPage && 'Mesajlarım'}
                {showOrdersPage && 'Siparişlerim'}
                {showFavoritesPage && 'Favori İlanlarım'}
                {showHistoryPage && 'Önceden Gezdiklerim'}
                {showFollowedStoresPage && 'Takip Ettiğim Mağazalar'}
                {showShareEarnPage && 'Paylaş Kazan'}
                {showSettingsPage && (settingsActiveTab === 'main' ? 'Ayarlar' : settingsActiveTab === 'ads' ? 'İlanlarım' : 'Bildirim Ayarları')}
              </h2>
            </div>

            {showWalletPage && (
              <div>
                <div className="bg-gradient-to-r from-gray-600 to-gray-800 p-4 rounded-lg text-white mb-4">
                  <div className="text-sm opacity-90">Mevcut Bakiye</div>
                  <div className="text-2xl font-bold">{walletBalance.toFixed(2)} ₺</div>
                  <div className="text-xs opacity-75 mt-1">Son güncelleme: Bugün</div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button onClick={() => {
                      const amount = window.prompt('Yatırmak istediğiniz tutarı girin:');
                      if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
                        setWalletBalance(prev => prev + parseFloat(amount));
                        alert('✓ ' + amount + '₺ başarıyla hesabınıza yatırıldı.');
                      }
                    }} className="bg-green-500 text-white p-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
                    Para Yatır
                  </button>
                  <button onClick={() => {
                      const amount = window.prompt('Çekmek istediğiniz tutarı girin:');
                      if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
                        if (parseFloat(amount) <= walletBalance) {
                          setWalletBalance(prev => prev - parseFloat(amount));
                          alert('✓ ' + amount + '₺ başarıyla hesabınızdan çekildi.');
                        } else {
                          alert('❌ Yetersiz bakiye!');
                        }
                      }
                    }} className="bg-gray-500 text-white p-3 rounded-lg font-medium hover:bg-gray-600 transition-colors">
                    Para Çek
                  </button>
                </div>

                <div className="mb-4">
                  <button onClick={() => {
                    const iban = window.prompt('IBAN numaranızı girin (TR ile başlamalı):');
                    if (iban && iban.startsWith('TR')) {
                      setIbanList(prev => [...prev, iban]);
                      alert('✓ IBAN başarıyla eklendi!');
                    } else if (iban) {
                      alert('❌ Geçerli bir IBAN giriniz!');
                    }
                  }} className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    IBAN Ekle
                  </button>
                </div>

                {ibanList.length > 0 && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Kayıtlı IBAN'lar</h3>
                    <div className="space-y-2">
                      {ibanList.map((iban, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm text-gray-700">{iban}</span>
                          <button onClick={() => {
                            if (window.confirm('Bu IBAN\'ı silmek istediğinizden emin misiniz?')) {
                              setIbanList(prev => prev.filter((_, i) => i !== index));
                              alert('✓ IBAN silindi!');
                            }
                          }} className="text-red-500 hover:text-red-700 text-xs">
                            🗑️ Sil
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-600 p-3 rounded-lg text-white">
                    <div className="text-xs opacity-90">Puanlarım</div>
                    <div className="text-lg font-bold">{userPoints.toLocaleString()}</div>
                    <div className="text-xs opacity-75">HNet Puan</div>
                  </div>
                  
                  <div className="bg-gray-700 p-3 rounded-lg text-white">
                    <div className="text-xs opacity-90">Bu Ay Kazanç</div>
                    <div className="text-lg font-bold">85.50 ₺</div>
                    <div className="text-xs opacity-75">İlan gelirleri</div>
                  </div>
                </div>
              </div>
            )}

            {showSettingsPage && settingsActiveTab === 'main' && (
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between" onClick={() => setSettingsActiveTab('ads')}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg">📋</div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">İlanlarım</div>
                      <div className="text-xs text-gray-500">İlan yönetimi ve performans</div>
                    </div>
                  </div>
                  <div className="text-gray-400 text-lg">→</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between" onClick={() => setSettingsActiveTab('notifications')}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-lg">🔔</div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">Bildirim Ayarları</div>
                      <div className="text-xs text-gray-500">Push, e-posta ve SMS bildirimleri</div>
                    </div>
                  </div>
                  <div className="text-gray-400 text-lg">→</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">👤</div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">Hesap Bilgileri</div>
                      <div className="text-xs text-gray-500">Profil ve güvenlik ayarları</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div>Ad: {currentUser.name}</div>
                    <div>E-posta: {currentUser.email}</div>
                    <div>Üyelik: Demo Hesap</div>
                  </div>
                </div>
              </div>
            )}

            {showSettingsPage && settingsActiveTab === 'ads' && (
              <div>
                <div className="flex items-center mb-4">
                  <button onClick={() => setSettingsActiveTab('main')} className="bg-gray-100 border border-gray-300 text-lg cursor-pointer mr-3 text-gray-600 hover:bg-gray-200 transition-all rounded-lg w-8 h-8 flex items-center justify-center">←</button>
                  <div className="text-sm text-gray-600">İlanlarım</div>
                </div>

                <div className="space-y-3">
                  {myAds.map((ad) => (
                    <div key={ad.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">{ad.image}</div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-800 mb-1">{ad.title}</div>
                          <div className="text-xs text-gray-500 mb-1">{ad.category} • {ad.type}</div>
                          <div className="text-sm font-bold text-blue-600">{ad.price}</div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${ad.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {ad.status === 'active' ? 'Aktif' : 'Duraklatıldı'}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <span>👁</span>
                          <span>{ad.views} görüntülenme</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>❤️</span>
                          <span>{ad.favorites} favori</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button onClick={() => alert('İlan düzenleme özelliği yakında eklenecek!')} className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-xs font-medium hover:bg-blue-600 transition-colors">Düzenle</button>
                        <button onClick={() => alert(ad.status === 'active' ? 'İlan duraklatıldı!' : 'İlan aktifleştirildi!')} className="flex-1 bg-yellow-500 text-white py-2 px-3 rounded text-xs font-medium hover:bg-yellow-600 transition-colors">{ad.status === 'active' ? 'Duraklat' : 'Aktifleştir'}</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showSettingsPage && settingsActiveTab === 'notifications' && (
              <div>
                <div className="flex items-center mb-4">
                  <button onClick={() => setSettingsActiveTab('main')} className="bg-gray-100 border border-gray-300 text-lg cursor-pointer mr-3 text-gray-600 hover:bg-gray-200 transition-all rounded-lg w-8 h-8 flex items-center justify-center">←</button>
                  <div className="text-sm text-gray-600">Bildirim Ayarları</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Genel Bildirimler</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-800">Push Bildirimleri</div>
                        <div className="text-xs text-gray-500">Mobil cihazınızda bildirim alın</div>
                      </div>
                      <input type="checkbox" checked={pushNotifications} onChange={(e) => {setPushNotifications(e.target.checked); setNotificationsSaved(false);}} className="w-4 h-4" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-800">E-posta Bildirimleri</div>
                        <div className="text-xs text-gray-500">E-posta adresinize bildirim gönder</div>
                      </div>
                      <input type="checkbox" checked={emailNotifications} onChange={(e) => {setEmailNotifications(e.target.checked); setNotificationsSaved(false);}} className="w-4 h-4" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-800">SMS Bildirimleri</div>
                        <div className="text-xs text-gray-500">Telefon numaranıza SMS gönder</div>
                      </div>
                      <input type="checkbox" checked={smsNotifications} onChange={(e) => {setSmsNotifications(e.target.checked); setNotificationsSaved(false);}} className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {notificationsSaved && (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg mb-4 text-sm flex items-center gap-2">
                    <span>✓</span>
                    <span>Bildirim ayarları başarıyla kaydedildi!</span>
                  </div>
                )}

                <button onClick={() => {setNotificationsSaved(true);}} className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">Kaydet</button>
              </div>
            )}

            {showCartPage && <div className="bg-white p-4 rounded-lg text-center"><div className="text-4xl mb-2">🛒</div><div className="text-gray-600">Sepetiniz boş</div></div>}
            {showMessagesPage && <div className="bg-white p-4 rounded-lg text-center"><div className="text-4xl mb-2">💬</div><div className="text-gray-600">Henüz mesajınız yok</div></div>}
            {showOrdersPage && <div className="bg-white p-4 rounded-lg text-center"><div className="text-4xl mb-2">📦</div><div className="text-gray-600">Henüz siparişiniz yok</div></div>}
            {showFavoritesPage && <div className="bg-white p-4 rounded-lg text-center"><div className="text-4xl mb-2">❤️</div><div className="text-gray-600">Favori ilanınız yok</div></div>}
            {showHistoryPage && <div className="bg-white p-4 rounded-lg text-center"><div className="text-4xl mb-2">🕒</div><div className="text-gray-600">Geçmiş görüntüleme yok</div></div>}
            {showFollowedStoresPage && <div className="bg-white p-4 rounded-lg text-center"><div className="text-4xl mb-2">🏪</div><div className="text-gray-600">Takip ettiğiniz mağaza yok</div></div>}
            {showShareEarnPage && <div className="bg-white p-4 rounded-lg text-center"><div className="text-4xl mb-2">🎁</div><div className="text-lg font-bold mb-2">Paylaş Kazan</div><div className="text-gray-600">Arkadaşlarınızı davet edin</div></div>}
          </div>
        )}

        {!isSpecialPage && currentPage === 'categoryPage' && (
          <div>
            <div className="flex items-center mb-5">
              <button onClick={() => setCurrentPage('homePage')} className="bg-none border-none text-lg cursor-pointer mr-2 text-gray-600">←</button>
              <h2 className="m-0 text-base text-gray-800 font-semibold">İlan Kategorisi Seçin</h2>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {categories.map(cat => renderCard(cat, () => {
                if (cat.id === 1) {
                  setCurrentPage('realEstateAdPage');
                } else {
                  setComingSoonMessage('Bu kategori için ilan verme yakında hizmete girecek!\n\nŞimdilik Emlak ilanı verebilirsiniz.');
                  setShowComingSoonModal(true);
                }
              }))}
            </div>
          </div>
        )}

        {!isSpecialPage && currentPage === 'realEstateAdPage' && (
          <div>
            <div className="flex items-center mb-5">
              <button onClick={() => setCurrentPage('categoryPage')} className="bg-none border-none text-lg cursor-pointer mr-2 text-gray-600">←</button>
              <h2 className="m-0 text-base text-gray-800 font-semibold">Emlak İlanı Ver</h2>
            </div>

            <div className="mb-5">
              <h3 className="m-0 mb-3 text-sm text-gray-700 font-semibold">Mülk Türü Seçin</h3>
              <div className="grid grid-cols-3 gap-2">
                {renderCard({ name: 'Konut', icon: '🏠', iconClass: 'ic-blue', subtitle: 'Daire, Villa, Ev' }, () => selectPropertyType('residential'))}
                {renderCard({ name: 'İş Yeri', icon: '🏢', iconClass: 'ic-orange', subtitle: 'Ofis, Dükkan, Fabrika' }, () => selectPropertyType('commercial'))}
                {renderCard({ name: 'Arsa/Tarla', icon: '📍', iconClass: 'ic-green', subtitle: 'İmarlı, İmarsız' }, () => selectPropertyType('land'))}
              </div>
            </div>
          </div>
        )}

        {!isSpecialPage && currentPage === 'adTypeSelectionPage' && (
          <div>
            <div className="flex items-center mb-5">
              <button onClick={() => setCurrentPage('realEstateAdPage')} className="bg-none border-none text-lg cursor-pointer mr-2 text-gray-600">←</button>
              <h2 className="m-0 text-base text-gray-800 font-semibold">İşlem Türü Seçin</h2>
            </div>
            <div className="flex flex-col gap-3">
              <div onClick={() => selectAdType('sale')} className="flex items-center p-4 bg-white border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 text-xl">💰</div>
                <div className="flex-1">
                  <div className="text-base font-semibold text-gray-800 mb-0.5">Satılık</div>
                  <div className="text-xs text-gray-600">Mülkünüzü satın</div>
                </div>
                <div className="text-gray-400 text-lg">→</div>
              </div>

              <div onClick={() => selectAdType('rent')} className="flex items-center p-4 bg-white border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 text-xl">🏢</div>
                <div className="flex-1">
                  <div className="text-base font-semibold text-gray-800 mb-0.5">Kiralık</div>
                  <div className="text-xs text-gray-600">Mülkünüzü kiralayın</div>
                </div>
                <div className="text-gray-400 text-lg">→</div>
              </div>

              {currentPropertyType === 'commercial' && (
                <>
                  <div onClick={() => selectAdType('devren-sale')} className="flex items-center p-4 bg-white border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4 text-xl">🔄</div>
                    <div className="flex-1">
                      <div className="text-base font-semibold text-gray-800 mb-0.5">Devren Satılık</div>
                      <div className="text-xs text-gray-600">İşletmeyi devredin</div>
                    </div>
                    <div className="text-gray-400 text-lg">→</div>
                  </div>

                  <div onClick={() => selectAdType('devren-rent')} className="flex items-center p-4 bg-white border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 text-xl">🤝</div>
                    <div className="flex-1">
                      <div className="text-base font-semibold text-gray-800 mb-0.5">Devren Kiralık</div>
                      <div className="text-xs text-gray-600">İşletmeyi devren kiralayın</div>
                    </div>
                    <div className="text-gray-400 text-lg">→</div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {!isSpecialPage && currentPage === 'residentialSubPage' && (
          <div>
            <div className="flex items-center mb-5">
              <button onClick={() => setCurrentPage('adTypeSelectionPage')} className="bg-none border-none text-lg cursor-pointer mr-2 text-gray-600">←</button>
              <h2 className="m-0 text-base text-gray-800 font-semibold">Konut Türü Seçin</h2>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {residentialTypes.map((type) => renderCard(type, () => proceedToAdForm(type.name.toLowerCase().replace(/[^a-z0-9]/g, '_'))))}
            </div>
          </div>
        )}

        {!isSpecialPage && currentPage === 'commercialSubPage' && (
          <div>
            <div className="flex items-center mb-5">
              <button onClick={() => setCurrentPage('adTypeSelectionPage')} className="bg-none border-none text-lg cursor-pointer mr-2 text-gray-600">←</button>
              <h2 className="m-0 text-base text-gray-800 font-semibold">İş Yeri Türü Seçin</h2>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {businessTypes.map((type) => renderCard(type, () => proceedToAdForm(type.name.toLowerCase().replace(/[^a-z0-9]/g, '_'))))}
            </div>
          </div>
        )}

        {!isSpecialPage && currentPage === 'adListPage' && (
          <div>
            <div className="flex items-center mb-4">
              <button onClick={() => {
                  if (currentPropertyType === 'residential') {
                    setCurrentPage('residentialSubPage');
                  } else if (currentPropertyType === 'commercial') {
                    setCurrentPage('commercialSubPage');
                  } else {
                    setCurrentPage('adTypeSelectionPage');
                  }
                }} className="bg-gray-100 border-2 border-gray-300 text-xl cursor-pointer mr-3 text-gray-800 font-black hover:bg-gray-200 transition-all rounded-lg w-8 h-8 flex items-center justify-center">
                ←
              </button>
              <h2 className="m-0 text-base text-gray-800 font-semibold">{currentAdType === 'sale' ? 'Satılık' : 'Kiralık'} İlanlar</h2>
            </div>

            <div className="flex gap-2 mb-4">
              <button onClick={() => setShowFilters(!showFilters)} className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${showFilters ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                🔍 Filtrele
              </button>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="py-2 px-3 rounded-lg text-sm border border-gray-300 bg-white focus:border-blue-500 outline-none">
                <option value="newest">En Yeni</option>
                <option value="price-high">Fiyat En Yüksek</option>
                <option value="price-low">Fiyat En Düşük</option>
                <option value="area-large">Metrekare En Büyük</option>
                <option value="area-small">Metrekare En Küçük</option>
              </select>
            </div>

            {showFilters && (
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-800">Filtreler</h3>
                  <button onClick={clearFilters} className="text-xs text-blue-500 hover:text-blue-700">Temizle</button>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <button className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                      <span>📍</span>
                      <span>Etrafımdakileri Bul</span>
                    </button>
                    <div className="text-xs text-blue-600 mt-1 text-center">Konumunuza yakın ilanları gösterir</div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Konum</label>
                    <div className="space-y-2">
                      <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500">
                        <option value="">İl Seçin</option>
                        <option value="istanbul">İstanbul</option>
                        <option value="ankara">Ankara</option>
                        <option value="izmir">İzmir</option>
                        <option value="antalya">Antalya</option>
                        <option value="bursa">Bursa</option>
                        <option value="adana">Adana</option>
                        <option value="konya">Konya</option>
                        <option value="gaziantep">Gaziantep</option>
                      </select>
                      
                      <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500">
                        <option value="">İlçe Seçin</option>
                        <option value="kadikoy">Kadıköy</option>
                        <option value="besiktas">Beşiktaş</option>
                        <option value="sisli">Şişli</option>
                        <option value="uskudar">Üsküdar</option>
                        <option value="fatih">Fatih</option>
                        <option value="bakirkoy">Bakırköy</option>
                        <option value="beyoglu">Beyoğlu</option>
                      </select>
                      
                      <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500">
                        <option value="">Mahalle/Köy Seçin</option>
                        <option value="moda">Moda Mahallesi</option>
                        <option value="fenerbahce">Fenerbahçe Mahallesi</option>
                        <option value="goztepe">Göztepe Mahallesi</option>
                        <option value="sahrayicedit">Sahrayıcedit Mahallesi</option>
                        <option value="caferaga">Caferağa Mahallesi</option>
                        <option value="kozyatagi">Kozyatağı Mahallesi</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Fiyat Aralığı (₺)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="number" placeholder="Min" value={priceRange.min} onChange={(e) => setPriceRange(prev => ({...prev, min: e.target.value}))} className="px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500" />
                      <input type="number" placeholder="Max" value={priceRange.max} onChange={(e) => setPriceRange(prev => ({...prev, max: e.target.value}))} className="px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Metrekare (Brüt)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="number" placeholder="Min m²" value={areaRange.min} onChange={(e) => setAreaRange(prev => ({...prev, min: e.target.value}))} className="px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500" />
                      <input type="number" placeholder="Max m²" value={areaRange.max} onChange={(e) => setAreaRange(prev => ({...prev, max: e.target.value}))} className="px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500" />
                    </div>
                  </div>

                  {currentPropertyType === 'commercial' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Kat</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500">
                          <option value="">Seçin</option>
                          <option value="bodrum">Bodrum</option>
                          <option value="zemin">Zemin</option>
                          <option value="1-3">1-3. Kat</option>
                          <option value="4-7">4-7. Kat</option>
                          <option value="8+">8. Kat ve Üzeri</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Bina Yaşı</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500">
                          <option value="">Seçin</option>
                          <option value="0-5">0-5 yaş</option>
                          <option value="6-10">6-10 yaş</option>
                          <option value="11-20">11-20 yaş</option>
                          <option value="20+">20+ yaş</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Isıtma</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500">
                          <option value="">Seçin</option>
                          <option value="merkezi">Merkezi</option>
                          <option value="kombi">Kombi</option>
                          <option value="klima">Klima</option>
                          <option value="yok">Yok</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Durumu</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500">
                          <option value="">Seçin</option>
                          <option value="bos">Boş</option>
                          <option value="kiracili">Kiracılı</option>
                          <option value="calisiyor">Çalışıyor</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Asansör</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500">
                          <option value="">Seçin</option>
                          <option value="var">Var</option>
                          <option value="yok">Yok</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Otopark</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500">
                          <option value="">Seçin</option>
                          <option value="var">Var</option>
                          <option value="yok">Yok</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">WC</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500">
                          <option value="">Seçin</option>
                          <option value="icinde">İçinde</option>
                          <option value="disinda">Dışında</option>
                          <option value="yok">Yok</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Güvenlik</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500">
                          <option value="">Seçin</option>
                          <option value="var">Var</option>
                          <option value="yok">Yok</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Tapu Durumu</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500">
                          <option value="">Seçin</option>
                          <option value="kat-mulkiyetli">Kat Mülkiyetli</option>
                          <option value="kat-irtifakli">Kat İrtifaklı</option>
                          <option value="hisseli">Hisseli</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Krediye Uygun</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500">
                          <option value="">Seçin</option>
                          <option value="evet">Evet</option>
                          <option value="hayir">Hayır</option>
                          <option value="bilinmiyor">Bilinmiyor</option>
                        </select>
                      </div>
                    </>
                  )}

                  {currentPropertyType !== 'land' && currentPropertyType !== 'commercial' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">m² (Net)</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input type="number" placeholder="Min m²" className="px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500" />
                          <input type="number" placeholder="Max m²" className="px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Oda Sayısı</label>
                        <div className="flex flex-wrap gap-2">
                          {['1+0', '1+1', '2+1', '3+1', '4+1', '5+1', '5+2'].map(room => (
                            <button key={room} onClick={() => toggleRoomFilter(room)} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${selectedRooms.includes(room) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                              {room}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Bina Yaşı</label>
                        <select value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500">
                          <option value="">Seçin</option>
                          <option value="0-5">0-5 yaş</option>
                          <option value="6-10">6-10 yaş</option>
                          <option value="11-20">11-20 yaş</option>
                          <option value="20+">20+ yaş</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Bulunduğu Kat</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500">
                          <option value="">Seçin</option>
                          <option value="bodrum">Bodrum</option>
                          <option value="zemin">Zemin</option>
                          <option value="1-5">1-5. Kat</option>
                          <option value="6-10">6-10. Kat</option>
                          <option value="11+">11. Kat ve Üzeri</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Kat Sayısı</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500">
                          <option value="">Seçin</option>
                          <option value="1-3">1-3 Katlı</option>
                          <option value="4-7">4-7 Katlı</option>
                          <option value="8+">8+ Katlı</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Isıtma</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500">
                          <option value="">Seçin</option>
                          <option value="merkezi">Merkezi</option>
                          <option value="kombi">Kombi</option>
                          <option value="klima">Klima</option>
                          <option value="soba">Soba</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Banyo Sayısı</label>
                        <div className="flex flex-wrap gap-2">
                          {['1', '2', '3', '4+'].map(bathroom => (
                            <button key={bathroom} className="px-3 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">
                              {bathroom}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Balkon</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus;border-blue-500">
                          <option value="">Seçin</option>
                          <option value="var">Var</option>
                          <option value="yok">Yok</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Asansör</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus;border-blue-500">
                          <option value="">Seçin</option>
                          <option value="var">Var</option>
                          <option value="yok">Yok</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Eşyalı</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus;border-blue-500">
                          <option value="">Seçin</option>
                          <option value="evet">Evet</option>
                          <option value="hayir">Hayır</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Krediye Uygun</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus;border-blue-500">
                          <option value="">Seçin</option>
                          <option value="evet">Evet</option>
                          <option value="hayir">Hayır</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Tapu Durumu</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus;border-blue-500">
                          <option value="">Seçin</option>
                          <option value="kat-mulkiyetli">Kat Mülkiyetli</option>
                          <option value="kat-irtifakli">Kat İrtifaklı</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Kimden</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus;border-blue-500">
                          <option value="">Seçin</option>
                          <option value="sahibinden">Sahibinden</option>
                          <option value="emlak">Emlakçıdan</option>
                        </select>
                      </div>
                    </>
                  )}

                  {currentPropertyType === 'land' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">İmar Durumu</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus;border-blue-500">
                          <option value="">Seçin</option>
                          <option value="ada">Ada</option>
                          <option value="a-lejantli">A-Lejantlı</option>
                          <option value="arazi">Arazi</option>
                          <option value="bag-bahce">Bağ & Bahçe</option>
                          <option value="depo-antrepo">Depo & Antrepo</option>
                          <option value="egitim">Eğitim</option>
                          <option value="enerji-depolama">Enerji Depolama</option>
                          <option value="konut">Konut</option>
                          <option value="kulturel-tesis">Kültürel Tesis</option>
                          <option value="muhtelif">Muhtelif</option>
                          <option value="ozel-kullanim">Özel Kullanım</option>
                          <option value="saglik">Sağlık</option>
                          <option value="sanayi">Sanayi</option>
                          <option value="sera">Sera</option>
                          <option value="sit-alani">Sit Alanı</option>
                          <option value="spor-alani">Spor Alanı</option>
                          <option value="tarla">Tarla</option>
                          <option value="tarla-bag">Tarla + Bağ</option>
                          <option value="ticari">Ticari</option>
                          <option value="ticari-konut">Ticari + Konut</option>
                          <option value="toplu-konut">Toplu Konut</option>
                          <option value="turizm">Turizm</option>
                          <option value="turizm-konut">Turizm + Konut</option>
                          <option value="turizm-ticari">Turizm + Ticari</option>
                          <option value="villa">Villa</option>
                          <option value="zeytinlik">Zeytinlik</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Tapu Durumu</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus;border-blue-500">
                          <option value="">Seçin</option>
                          <option value="ciftlik-tapu">Çiftlik Tapu</option>
                          <option value="hisseli-tapu">Hisseli Tapu</option>
                          <option value="kat-irtifakli">Kat İrtifaklı Tapu</option>
                          <option value="kat-mulkiyetli">Kat Mülkiyetli Tapu</option>
                          <option value="tahsisli">Tahsisli</option>
                          <option value="tapu">Tapu</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Krediye Uygunluk</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus;border-blue-500">
                          <option value="">Seçin</option>
                          <option value="evet">Evet</option>
                          <option value="hayir">Hayır</option>
                          <option value="bilinmiyor">Bilinmiyor</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>

                <button onClick={() => setShowFilters(false)} className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                  Filtreleri Uygula
                </button>
              </div>
            )}

            <div className="space-y-3">
              {getFilteredAndSortedAds().length === 0 ? (
                <div className="bg-white p-6 rounded-lg text-center">
                  <div className="text-4xl mb-2">🔍</div>
                  <div className="text-gray-600 mb-2">Aradığınız kriterlere uygun ilan bulunamadı</div>
                  <button onClick={clearFilters} className="text-blue-500 text-sm hover:text-blue-700">Filtreleri temizle</button>
                </div>
              ) : (
                getFilteredAndSortedAds().map((ad) => (
                  <div key={ad.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex">
                      <div className="w-28 h-20 bg-gray-100 flex items-center justify-center text-4xl flex-shrink-0">{ad.image}</div>
                      <div className="flex-1 p-3 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">{ad.title}</h3>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500 flex items-center gap-1">📍 {ad.location}</div>
                          <div className="text-sm font-bold text-blue-600">{ad.price}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <UserMenu />

      {showComingSoonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 m-4 max-w-sm w-full shadow-lg">
            <div className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Yakında Hizmette!</h3>
              <p className="text-sm text-gray-600 mb-4 whitespace-pre-line">{comingSoonMessage}</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors" onClick={() => setShowComingSoonModal(false)}>
                  Anladım
                </button>
                {comingSoonMessage.includes('ilan verme') && (
                  <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors" onClick={() => { setShowComingSoonModal(false); setCurrentPage('realEstateAdPage'); }}>
                    Emlak'a Git
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-5 m-4 max-w-xs w-full shadow-lg">
            <h3 className="text-base font-semibold mb-2 text-gray-800">Çıkış Yap</h3>
            <p className="text-sm text-gray-600 mb-4">Çıkış yapmak istediğinizden emin misiniz?</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors" onClick={() => {
                  setIsLoggedIn(false);
                  setCurrentUser({ name: '', email: '' });
                  setShowUserMenu(false);
                  setShowLogoutConfirm(false);
                  resetAllPages();
                  setTimeout(() => alert('Güvenli bir şekilde çıkış yapıldı.'), 100);
                }}>
                Evet, Çıkış Yap
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors" onClick={() => setShowLogoutConfirm(false)}>
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Expose globally for router
window.HepsindenNet = HepsindenNet;

