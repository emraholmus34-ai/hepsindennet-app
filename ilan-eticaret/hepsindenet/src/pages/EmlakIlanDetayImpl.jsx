import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EmlakIlanDetay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bilgiler');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState('photos');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showReportOptions, setShowReportOptions] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('');
  const [reportText, setReportText] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [reportMessage, setReportMessage] = useState('');
  const [mediaMessage, setMediaMessage] = useState('');
  const [showLightbox, setShowLightbox] = useState(false);

  const listingData = {
    id: "1271652223",
    title: "ÖZKIR EMLAK'TAN MASRAFSIZ MÜKEMMEL KONUMDA YÜKSEK GİRİŞ FIRSAT",
    description: "Masrafsız, mükemmel konumda yer alan bu güzel dairemiz sizleri bekliyor. Yüksek giriş katında olup, çok aydınlık ve ferah. Merkezi konumda, ulaşım imkanları çok iyi. Krediye uygun. Site içerisinde yer alıyor.",
    price: "2919000",
    publishDate: "18.09.2025",
    city: "Ankara",
    district: "Sincan", 
    neighborhood: "Menderes Mah.",
    siteName: "Anadolu Residence",
    propertyType: "Satılık Arsa", // Arsa tipine değiştirdim
    netArea: "100",
    grossArea: "120",
    openArea: "25",
    rooms: "3+1",
    floor: "Yüksek Giriş",
    buildingFloors: "12",
    buildingAge: "15",
    heatingType: "Doğalgaz Kombi",
    bathrooms: "2",
    kitchenType: "Açık Mutfak",
    balconyType: "1 Balkon",
    deed: "Kat Mülkiyetli",
    usageStatus: "Boş",
    monthlyFee: "350",
    creditSuitable: "Evet",
    swapSuitable: false,
    groundSurvey: "Var",
    // Arsa için ada/parsel bilgileri
    adaNo: "123",
    parselNo: "45",
    paftaNo: "H23-d4-c2",
    mevkii: "Yenikent Mevkii",
    hasPhotos: true,
    has360Tour: false,
    hasVideo: true,
    contactOptions: {
      all: true,
      phone: true,
      whatsapp: true,
      siteMessage: true
    },
    hidePhoneNumber: false,
    features: {
      location: ['Güney Cephe', 'Şehir Manzara'],
      transport: ['Açık Otopark', 'Asansör', 'Otobüs Durağı'],
      security: ['Kapıcı', 'Güvenlik Kamerası'],
      interior: ['Parke Zemin', 'Klima', 'Ankastre Mutfak'],
      technology: ['Fiber İnternet', 'WiFi'],
      outdoor: ['Yüzme Havuzu', 'Fitness']
    },
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop'
    ]
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const params = new URLSearchParams(location.search);
  const listingIdFromQuery = params.get('id');

  // Helpers for responsive HD images (Unsplash-style URLs)
  const deriveRatio = (url) => {
    const w = url.match(/(?:[?&])w=(\d+)/);
    const h = url.match(/(?:[?&])h=(\d+)/);
    if (w && h) {
      const wi = parseInt(w[1], 10) || 400;
      const hi = parseInt(h[1], 10) || 300;
      return hi / wi;
    }
    return 3 / 4; // fallback 4:3
  };

  const resize = (url, width) => {
    const ratio = deriveRatio(url);
    const height = Math.round(width * ratio);
    if (url.includes('w=')) {
      return url
        .replace(/w=\d+/, `w=${width}`)
        .replace(/h=\d+/, `h=${height}`);
    }
    const hasQuery = url.includes('?');
    return `${url}${hasQuery ? '&' : '?'}w=${width}&h=${height}&fit=crop`;
  };

  const buildSrcSet = (url) => {
    const widths = [480, 800, 1200, 1600, 1920];
    return widths.map(w => `${resize(url, w)} ${w}w`).join(', ');
  };

  const activeImage = useMemo(() => listingData.images[currentImageIndex], [currentImageIndex]);

  const handleImageNavigation = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => 
        prev === listingData.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === 0 ? listingData.images.length - 1 : prev - 1
      );
    }
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
    setShowReportOptions(false); // Şikayet seçeneklerini kapat
  };

  const handleReport = () => {
    setShowReportOptions(!showReportOptions);
    setShowShareOptions(false); // Paylaşım seçeneklerini kapat
  };

  const handlePhotos = () => {
    setSelectedMedia('photos');
    setMediaMessage('Fotoğraf galerisi modu aktif!');
    setTimeout(() => setMediaMessage(''), 2000);
  };

  const handle360Tour = () => {
    setSelectedMedia('360tour');
    setMediaMessage('360° sanal tur başlatılıyor...');
    setTimeout(() => setMediaMessage(''), 3000);
  };

  const handleVideo = () => {
    setSelectedMedia('video');
    setMediaMessage('Video oynatılıyor...');
    setTimeout(() => setMediaMessage(''), 3000);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="max-w-sm mx-auto bg-yellow-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-4 py-1 flex items-center justify-between shadow-lg">
        <div className="flex items-center">
          <button className="mr-3 hover:bg-amber-600 rounded-full p-1 transition-colors" onClick={() => navigate(-1)}>
            <span className="text-lg">←</span>
          </button>
          <div className="text-lg font-bold">İlan Detayı</div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleShare}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
          <button 
            onClick={handleReport}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      {shareMessage && (
        <div className="bg-green-100 text-green-700 px-4 py-2 text-center text-sm">
          {shareMessage}
        </div>
      )}
      {reportMessage && (
        <div className="bg-red-100 text-red-700 px-4 py-2 text-center text-sm">
          {reportMessage}
        </div>
      )}
      {mediaMessage && (
        <div className="bg-blue-100 text-blue-700 px-4 py-2 text-center text-sm">
          {mediaMessage}
        </div>
      )}

      {/* Share Options */}
      {showShareOptions && (
        <div className="bg-white border-b border-amber-200 p-4">
          <div className="grid grid-cols-4 gap-3">
            <button 
              onClick={() => {
                setShowShareOptions(false);
                setShareMessage('WhatsApp\'ta paylaşıldı!');
                setTimeout(() => setShareMessage(''), 2000);
              }}
              className="flex flex-col items-center p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2 text-white text-sm">W</div>
              <span className="text-xs font-medium text-green-700">WhatsApp</span>
            </button>
            
            <button 
              onClick={() => {
                setShowShareOptions(false);
                setShareMessage('Facebook\'ta paylaşıldı!');
                setTimeout(() => setShareMessage(''), 2000);
              }}
              className="flex flex-col items-center p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-2 text-white text-sm">f</div>
              <span className="text-xs font-medium text-blue-700">Facebook</span>
            </button>
            
            <button 
              onClick={() => {
                setShowShareOptions(false);
                setShareMessage('Instagram\'ta paylaşıldı!');
                setTimeout(() => setShareMessage(''), 2000);
              }}
              className="flex flex-col items-center p-3 bg-pink-50 border border-pink-200 rounded-lg hover:bg-pink-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-2 text-white text-sm">@</div>
              <span className="text-xs font-medium text-pink-700">Instagram</span>
            </button>
            
            <button 
              onClick={() => {
                setShowShareOptions(false);
                setShareMessage('Link kopyalandı!');
                setTimeout(() => setShareMessage(''), 2000);
              }}
              className="flex flex-col items-center p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mb-2 text-white text-sm">📋</div>
              <span className="text-xs font-medium text-gray-700">Kopyala</span>
            </button>
          </div>
          
          <button 
            onClick={() => setShowShareOptions(false)}
            className="w-full mt-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕ Kapat
          </button>
        </div>
      )}

      {/* Report Options */}
      {showReportOptions && (
        <div className="bg-white border-b border-amber-200 p-4">
          {!selectedReportType ? (
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Şikayet Nedeni Seçiniz</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedReportType('misleading')}
                  className="w-full text-left p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <div className="text-sm font-medium text-red-800">Yanıltıcı Bilgi</div>
                  <div className="text-xs text-red-600">Fiyat, özellik veya açıklama yanlış</div>
                </button>
                
                <button 
                  onClick={() => setSelectedReportType('fraud')}
                  className="w-full text-left p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <div className="text-sm font-medium text-red-800">Dolandırıcılık</div>
                  <div className="text-xs text-red-600">Sahte ilan veya güvenilmez satıcı</div>
                </button>
                
                <button 
                  onClick={() => setSelectedReportType('spam')}
                  className="w-full text-left p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <div className="text-sm font-medium text-red-800">Spam İçerik</div>
                  <div className="text-xs text-red-600">Gereksiz veya tekrarlı ilan</div>
                </button>
                
                <button 
                  onClick={() => setSelectedReportType('other')}
                  className="w-full text-left p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <div className="text-sm font-medium text-red-800">Diğer</div>
                  <div className="text-xs text-red-600">Yukarıdakilerin dışında bir sorun</div>
                </button>
              </div>
              
              <button 
                onClick={() => setShowReportOptions(false)}
                className="w-full mt-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕ Kapat
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-800">Şikayet Detayları</h3>
                <button 
                  onClick={() => {
                    setSelectedReportType('');
                    setReportText('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ← Geri
                </button>
              </div>
              
              <div className="bg-red-50 p-3 rounded-lg mb-4">
                <div className="text-sm font-medium text-red-800">
                  {selectedReportType === 'misleading' && 'Yanıltıcı Bilgi'}
                  {selectedReportType === 'fraud' && 'Dolandırıcılık'}
                  {selectedReportType === 'spam' && 'Spam İçerik'}
                  {selectedReportType === 'other' && 'Diğer'}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şikayetinizi detaylandırın: <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="Lütfen şikayetinizi en az 20 karakter olacak şekilde açıklayın..."
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                  rows="4"
                />
                <div className="flex justify-between items-center mt-1">
                  <div className={`text-xs ${reportText.length >= 20 ? 'text-green-600' : 'text-red-500'}`}>
                    {reportText.length}/20 minimum karakter
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <div className="text-xs text-yellow-800">
                  <div className="font-semibold mb-1">Önemli Uyarı:</div>
                  <div>Gereksiz şikayetler hesabınıza kısıtlama getirebilir.</div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    setShowReportOptions(false);
                    setSelectedReportType('');
                    setReportText('');
                  }}
                  className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  İptal
                </button>
                <button 
                  onClick={() => {
                    if (reportText.length >= 20) {
                      setShowReportOptions(false);
                      setSelectedReportType('');
                      setReportText('');
                      setReportMessage('Şikayetiniz alındı. Teşekkür ederiz.');
                      setTimeout(() => setReportMessage(''), 4000);
                    }
                  }}
                  disabled={reportText.length < 20}
                  className={`flex-1 py-2 px-4 text-white rounded-lg text-sm font-medium transition-colors ${
                    reportText.length >= 20
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Gönder
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Title */}
      <div className="bg-white p-4 text-center border-b border-amber-200">
        <h1 className="text-sm font-bold text-gray-800 leading-tight break-words">
          {listingData.title}
        </h1>
      </div>

      {/* Image Carousel */}
      <div className="relative bg-gray-900">
        <div className="aspect-video bg-gray-200 flex items-center justify-center relative overflow-hidden">
          <img 
            src={resize(activeImage, 1200)}
            srcSet={buildSrcSet(activeImage)}
            sizes="(max-width: 640px) 100vw, 640px"
            alt="Property" 
            className="w-full h-full object-cover cursor-zoom-in"
            onClick={() => setShowLightbox(true)}
            loading="lazy"
            decoding="async"
          />
          
          <button 
            onClick={() => handleImageNavigation('prev')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-amber-500 bg-opacity-80 hover:bg-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors"
          >
            ‹
          </button>
          <button 
            onClick={() => handleImageNavigation('next')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-500 bg-opacity-80 hover:bg-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors"
          >
            ›
          </button>
          
          <div className="absolute bottom-2 right-2 bg-gray-900 bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1}/{listingData.images.length}
          </div>
          
          <div className="absolute top-2 right-2">
            <button 
              onClick={toggleFavorite}
              className={`rounded-full p-2 shadow-lg transition-all transform hover:scale-110 ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white bg-opacity-90 hover:bg-opacity-100 text-red-500'
              }`}
            >
              <svg 
                className="w-5 h-5" 
                fill={isFavorite ? "currentColor" : "none"} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Media Navigation */}
      <div className="bg-white border-b border-amber-200 py-2">
        <div className="flex justify-center space-x-1 px-4">
          <button 
            onClick={handlePhotos}
            className={`flex items-center justify-center space-x-1 px-4 py-1.5 border rounded-lg transition-colors flex-1 ${
              selectedMedia === 'photos'
                ? 'bg-amber-500 border-amber-500 text-white shadow-lg'
                : 'bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-700'
            }`}
          >
            <span className="text-xs">📷</span>
            <span className="text-xs font-medium">Fotoğraflar</span>
          </button>
          
          <button 
            onClick={handle360Tour}
            disabled={!listingData.has360Tour}
            className={`flex items-center justify-center space-x-1 px-4 py-1.5 border rounded-lg transition-colors flex-1 ${
              !listingData.has360Tour
                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                : selectedMedia === '360tour'
                ? 'bg-amber-500 border-amber-500 text-white shadow-lg'
                : 'bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-700'
            }`}
          >
            <span className="text-xs">🔄</span>
            <span className="text-xs font-medium">360°</span>
          </button>
          
          <button 
            onClick={handleVideo}
            className={`flex items-center justify-center space-x-1 px-4 py-1.5 border rounded-lg transition-colors flex-1 ${
              selectedMedia === 'video'
                ? 'bg-amber-500 border-amber-500 text-white shadow-lg'
                : 'bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-700'
            }`}
          >
            <span className="text-xs">🎥</span>
            <span className="text-xs font-medium">Video</span>
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setShowLightbox(false)}>×</button>
          <button className="absolute left-4 text-white text-3xl" onClick={() => handleImageNavigation('prev')}>‹</button>
          <img
            src={resize(activeImage, 1920)}
            srcSet={buildSrcSet(activeImage)}
            sizes="100vw"
            alt="HD"
            className="max-w-[95vw] max-h-[85vh] object-contain"
          />
          <button className="absolute right-4 text-white text-3xl" onClick={() => handleImageNavigation('next')}>›</button>
        </div>
      )}

      {/* Property Path & Price */}
      <div className="bg-white border-b border-amber-200 p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-amber-600 text-sm font-medium">Emlak › Konut › Daire</div>
            <div className="text-gray-600 text-sm mt-1">
              {listingData.city}, {listingData.district}, {listingData.neighborhood}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-amber-600">
              {formatPrice(listingData.price)} TL
            </div>
            <div className="text-xs text-gray-500">Fiyat</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-amber-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('bilgiler')}
            className={`flex-1 py-3 text-xs font-medium border-b-3 transition-colors ${
              activeTab === 'bilgiler' 
                ? 'text-amber-600 border-amber-500 bg-amber-50' 
                : 'text-gray-600 border-transparent hover:text-amber-500'
            }`}
          >
            İlan Bilgileri
          </button>
          <button
            onClick={() => setActiveTab('aciklama')}
            className={`flex-1 py-3 text-xs font-medium border-b-3 transition-colors ${
              activeTab === 'aciklama' 
                ? 'text-amber-600 border-amber-500 bg-amber-50' 
                : 'text-gray-600 border-transparent hover:text-amber-500'
            }`}
          >
            Açıklama
          </button>
          <button
            onClick={() => setActiveTab('konumu')}
            className={`flex-1 py-3 text-xs font-medium border-b-3 transition-colors ${
              activeTab === 'konumu' 
                ? 'text-amber-600 border-amber-500 bg-amber-50' 
                : 'text-gray-600 border-transparent hover:text-amber-500'
            }`}
          >
            Konumu
          </button>
          <button
            onClick={() => setActiveTab('satici')}
            className={`flex-1 py-3 text-xs font-medium border-b-3 transition-colors ${
              activeTab === 'satici' 
                ? 'text-amber-600 border-amber-500 bg-amber-50' 
                : 'text-gray-600 border-transparent hover:text-amber-500'
            }`}
          >
            Satıcı Bilgileri ve İletişim
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white">
        {activeTab === 'bilgiler' && (
          <div className="p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">İlan Tarihi</span>
                <span className="text-sm font-medium text-amber-600">{listingData.publishDate}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">İlan No</span>
                <span className="text-sm font-medium text-amber-600">{listingIdFromQuery || listingData.id}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Emlak Tipi</span>
                <span className="text-sm font-medium text-gray-800">{listingData.propertyType}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Net m²</span>
                <span className="text-sm font-bold text-gray-800">{listingData.netArea}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Brüt m²</span>
                <span className="text-sm font-bold text-gray-800">{listingData.grossArea}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Açık Alan m²</span>
                <span className="text-sm font-bold text-gray-800">{listingData.openArea}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Oda Sayısı</span>
                <span className="text-sm font-bold text-gray-800">{listingData.rooms}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Banyo Sayısı</span>
                <span className="text-sm font-medium text-gray-800">{listingData.bathrooms}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Mutfak Tipi</span>
                <span className="text-sm font-medium text-gray-800">{listingData.kitchenType}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Balkon</span>
                <span className="text-sm font-medium text-gray-800">{listingData.balconyType}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Bulunduğu Kat</span>
                <span className="text-sm font-medium text-gray-800">{listingData.floor}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Kat Sayısı</span>
                <span className="text-sm font-medium text-gray-800">{listingData.buildingFloors}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Bina Yaşı</span>
                <span className="text-sm font-medium text-gray-800">{listingData.buildingAge}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Isıtma</span>
                <span className="text-sm font-medium text-gray-800">{listingData.heatingType}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Aidat</span>
                <span className="text-sm font-medium text-gray-800">{listingData.monthlyFee} TL</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Tapu Durumu</span>
                <span className="text-sm font-medium text-gray-800">{listingData.deed}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Kullanım Durumu</span>
                <span className="text-sm font-medium text-gray-800">{listingData.usageStatus}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Zemin Etüdü</span>
                <span className="text-sm font-medium text-gray-800">{listingData.groundSurvey}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Krediye Uygunluk</span>
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">{listingData.creditSuitable}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Takasa Uygunluk</span>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  listingData.swapSuitable 
                    ? 'text-green-600 bg-green-100' 
                    : 'text-red-600 bg-red-100'
                }`}>
                  {listingData.swapSuitable ? 'Evet' : 'Hayır'}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Site İçerisinde</span>
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Evet</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Site Adı</span>
                <span className="text-sm font-medium text-gray-800">{listingData.siteName}</span>
              </div>

              {/* Ada/Parsel bilgileri - sadece arsa/tarla için gösterilir */}
              {(listingData.propertyType.includes('Arsa') || listingData.propertyType.includes('Tarla')) && (
                <>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Ada No</span>
                    <span className="text-sm font-medium text-gray-800">{listingData.adaNo}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Parsel No</span>
                    <span className="text-sm font-medium text-gray-800">{listingData.parselNo}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Pafta No</span>
                    <span className="text-sm font-medium text-gray-800">{listingData.paftaNo}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Mevkii</span>
                    <span className="text-sm font-medium text-gray-800">{listingData.mevkii}</span>
                  </div>

                  {/* TKGM Butonu */}
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-red-800">🏛️ Resmi Kayıtlar</h4>
                    </div>
                    <button 
                      onClick={() => {
                        // TKGM'nin gerçek parsel sorgulama sayfası
                        const tkgmUrl = `https://parselsorgu.tkgm.gov.tr/`;
                        window.open(tkgmUrl, '_blank');
                      }}
                      className="w-full bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 hover:bg-red-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>TKGM'de Parsel Sorgula</span>
                    </button>
                    <div className="text-xs text-red-600 mt-2 text-center bg-red-100 p-2 rounded">
                      <div className="font-medium mb-1">📋 Kopyalanacak Bilgiler:</div>
                      <div>İl: {listingData.city} | İlçe: {listingData.district}</div>
                      <div>Ada: {listingData.adaNo} | Parsel: {listingData.parselNo}</div>
                    </div>
                    <div className="text-xs text-red-600 mt-2 text-center">
                      Ada: {listingData.adaNo} | Parsel: {listingData.parselNo}
                    </div>
                  </div>
                </>
              )}
            </div>

            {Object.keys(listingData.features).map(category => (
              listingData.features[category].length > 0 && (
                <div key={category} className="border-t border-amber-200 pt-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">
                    {category === 'location' && '📍 Konum Özellikleri'}
                    {category === 'transport' && '🚗 Ulaşım'}
                    {category === 'security' && '🔒 Güvenlik'}
                    {category === 'interior' && '🏠 İç Özellikler'}
                    {category === 'technology' && '💻 Teknoloji'}
                    {category === 'outdoor' && '🌳 Dış Özellikler'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {listingData.features[category].map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-amber-100 to-yellow-200 text-amber-700 text-xs px-3 py-2 rounded-full font-medium border border-amber-200"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {activeTab === 'aciklama' && (
          <div className="p-4">
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <div className="text-sm text-gray-800 leading-relaxed">
                {listingData.description}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'konumu' && (
          <div className="p-4">
            <div className="bg-gradient-to-br from-amber-100 via-yellow-100 to-green-100 h-64 rounded-2xl flex items-center justify-center border border-amber-200">
              <div className="text-center">
                <div className="text-6xl mb-3">🗺️</div>
                <div className="text-gray-700 font-semibold text-lg">
                  {listingData.neighborhood}
                </div>
                <div className="text-gray-600 font-medium">
                  {listingData.district}, {listingData.city}
                </div>
                <div className="mt-3 text-sm text-gray-500 bg-white bg-opacity-80 px-3 py-1 rounded-full">
                  Harita yüklenecek
                </div>
              </div>
            </div>
            <div className="mt-4 bg-amber-50 rounded-xl p-4 border border-amber-200">
              <div className="text-sm text-gray-800">
                <div className="font-semibold mb-2 text-amber-700">📍 Tam Adres:</div>
                <div className="text-gray-700">{listingData.neighborhood}, {listingData.district}, {listingData.city}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'satici' && (
          <div className="p-4 space-y-3">
            {/* Ana İletişim Butonları - En Üstte */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <button className="bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center space-x-1 hover:bg-blue-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Ara</span>
              </button>
              <button className="bg-green-500 text-white py-2 px-2 rounded-lg text-xs font-medium flex items-center justify-center space-x-1 hover:bg-green-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>WhatsApp</span>
              </button>
              <button className="bg-amber-500 text-white py-2 px-1 rounded-lg text-xs font-medium flex items-center justify-center space-x-1 hover:bg-amber-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Uygulama</span>
              </button>
            </div>

            {/* Firma Logo Alanı */}
            <div className="bg-white border-2 border-dashed border-amber-200 rounded-lg p-4 text-center">
              <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl text-gray-400">🏢</span>
              </div>
              <p className="text-xs text-gray-500">Firma Logosu</p>
            </div>

            {/* Satıcı Bilgileri */}
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
              <h3 className="text-base font-bold text-amber-700 mb-2">ÖZKIR EMLAK</h3>
              <div className="space-y-1">
                <div className="text-xs">📍 Menderes Mah. Atatürk Cd. No:45 Sincan/Ankara</div>
                {!listingData.hidePhoneNumber && (
                  <div className="text-xs">📞 0312 123 45 67</div>
                )}
                <div className="text-xs">📧 info@ozkiremlak.com</div>
              </div>
              <button className="w-full mt-2 bg-gray-500 text-white py-1.5 px-3 rounded text-xs font-medium flex items-center justify-center space-x-1 hover:bg-gray-600 transition-colors">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Ofis Konumu</span>
              </button>
            </div>

            {/* Diğer İlanları */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-800 mb-3 text-sm">Diğer İlanları</h4>
              <div className="space-y-2">
                <div className="bg-white border border-gray-200 rounded-lg p-2 hover:shadow-sm transition-shadow">
                  <div className="flex space-x-2">
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-400 text-xs">🏠</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-medium text-gray-800 line-clamp-2 leading-tight">
                        Merkezi konumda 2+1 satılık daire
                      </h5>
                      <div className="text-xs text-gray-600 mt-1">Çankaya, Kızılay</div>
                      <div className="text-xs font-bold text-amber-600 mt-1">1.850.000 TL</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-2 hover:shadow-sm transition-shadow">
                  <div className="flex space-x-2">
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-400 text-xs">🏠</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-medium text-gray-800 line-clamp-2 leading-tight">
                        Site içerisinde 4+1 dubleks villa
                      </h5>
                      <div className="text-xs text-gray-600 mt-1">Sincan, Yenikent</div>
                      <div className="text-xs font-bold text-amber-600 mt-1">4.200.000 TL</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-2 hover:shadow-sm transition-shadow">
                  <div className="flex space-x-2">
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-400 text-xs">🏠</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-medium text-gray-800 line-clamp-2 leading-tight">
                        Yatırım için uygun 1+1 daire
                      </h5>
                      <div className="text-xs text-gray-600 mt-1">Sincan, Saraycık</div>
                      <div className="text-xs font-bold text-amber-600 mt-1">1.250.000 TL</div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-2 py-2 text-xs text-amber-600 hover:text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors">
                Tüm İlanları Görüntüle (12 ilan)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmlakIlanDetay;

