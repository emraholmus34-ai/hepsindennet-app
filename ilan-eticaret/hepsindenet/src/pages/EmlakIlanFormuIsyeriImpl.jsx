import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const EmlakIlanFormu = ({ formType = "isyeri" }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const adMode = params.get('mode') || '';
  const subType = params.get('sub') || '';
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'TL',
    propertyId: '',
    locationType: '',
    rentalStatus: '',
    frontage: '',
    floorPlan: '',
    city: '',
    district: '',
    neighborhood: '',
    netArea: '',
    grossArea: '',
    openArea: '',
    rooms: '',
    bathrooms: '',
    floor: '',
    buildingFloors: '',
    buildingAge: '',
    heatingType: '',
    monthlyFee: '',
    deed: '',
    usageStatus: '',
    kitchenType: '',
    balconyType: '',
    creditSuitable: '',
    swapSuitable: false,
    parkingType: '',
    elevatorType: '',
    storageAvailable: '',
    truckAccess: '',
    entranceHeight: '',
    electricPower: '',
    locationFeatures: [],
    transportFeatures: [],
    securityFeatures: [],
    interiorFeatures: [],
    technologyFeatures: [],
    outdoorFeatures: [],
    expandedSections: {},
    contactOptions: {
      all: true,
      phone: true,
      whatsapp: true,
      appMessage: false,
      siteMessage: true,
      sms: false
    },
    hidePhoneNumber: false,
    isInSite: false,
    siteName: '',
    locationCategory: '',
    elevatorFeatures: [],
    vehicleHeight: '',
    energyFeatures: [],
    groundSurvey: '',
    adMode,
    subType
  });
  // Draft auto-save
  useEffect(() => {
    const key = 'draft_isyeri';
    const saved = localStorage.getItem(key);
    if (saved) {
      try { setFormData(prev => ({ ...prev, ...JSON.parse(saved) })); } catch {}
    }
  }, []);

  useEffect(() => {
    const key = 'draft_isyeri';
    localStorage.setItem(key, JSON.stringify(formData));
  }, [formData]);

  const clearDraft = () => {
    localStorage.removeItem('draft_isyeri');
    alert('Taslak temizlendi');
  };

  const [showMapModal, setShowMapModal] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState({
    photos: [],
    videos: [],
    virtual360: []
  });

  const cities = ['Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin', 'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'];
  
  const districts = {
    'İstanbul': ['Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler', 'Bakırköy', 'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü', 'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt', 'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane', 'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer', 'Silivri', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Şişli', 'Tuzla', 'Ümraniye', 'Üsküdar', 'Zeytinburnu'],
    'Ankara': ['Akyurt', 'Altındağ', 'Ayaş', 'Bala', 'Beypazarı', 'Çamlıdere', 'Çankaya', 'Çubuk', 'Elmadağ', 'Etimesgut', 'Evren', 'Gölbaşı', 'Güdül', 'Haymana', 'Kalecik', 'Kızılcahamam', 'Mamak', 'Nallıhan', 'Polatlı', 'Pursaklar', 'Sincan', 'Şereflikoçhisar', 'Yenimahalle', 'Keçiören'],
    'İzmir': ['Aliağa', 'Balçova', 'Bayındır', 'Bayraklı', 'Bergama', 'Beydağ', 'Bornova', 'Buca', 'Çeşme', 'Çiğli', 'Dikili', 'Foça', 'Gaziemir', 'Güzelbahçe', 'Karabağlar', 'Karaburun', 'Karşıyaka', 'Kemalpaşa', 'Kınık', 'Kiraz', 'Konak', 'Menderes', 'Menemen', 'Narlıdere', 'Ödemiş', 'Seferihisar', 'Selçuk', 'Tire', 'Torbalı', 'Urla']
  };

  const neighborhoods = {
    'Kadıköy': ['19 Mayıs', 'Acıbadem', 'Bostancı', 'Caferağa', 'Caddebostan', 'Erenköy', 'Fenerbahçe', 'Feneryolu', 'Fikirtepe', 'Göztepe', 'Hasanpaşa', 'İçerenköy', 'Jale', 'Koşuyolu', 'Kozyatağı', 'Küçük Çamlıca', 'Moda', 'Ostim', 'Rasimpaşa', 'Sahrayıcedit', 'Selamiçeşme', 'Suadiye', 'Zühtüpaşa'],
    'Beşiktaş': ['Abbasağa', 'Arnavutköy', 'Akatlar', 'Bebek', 'Dikilitaş', 'Etiler', 'Gayrettepe', 'Konaklar', 'Kuruçeşme', 'Levent', 'Levazım', 'Muradiye', 'Nisbetiye', 'Ortaköy', 'Sinanpaşa', 'Ulus', 'Vişnezade', 'Yıldız'],
    'Şişli': ['19 Mayıs', 'Bozkurt', 'Cumhuriyet', 'Elmadağ', 'Eskişehir', 'Feriköy', 'Fulya', 'Gayrettepe', 'Halaskargazi', 'Harbiye', 'İnönü', 'Kaptanpaşa', 'Kuştepe', 'Mahmut Şevket Paşa', 'Mecidiyeköy', 'Merkez', 'Meşrutiyet', 'Nişantaşı', 'Osmanbey', 'Pangaltı', 'Teşvikiye'],
    'Çankaya': ['Aşağıayrancı', 'Ayrancı', 'Bahçelievler', 'Balgat', 'Beşevler', 'Birlik', 'Çayyolu', 'Dikmen', 'Emek', 'Gaziosmanpaşa', 'GOP', 'Hoşdere', 'Işıklar', 'İncek', 'Kavaklıdere', 'Kızılay', 'Konutkent', 'Küçükesat', 'Mesa', 'Mürsel', 'Öveçler', 'Sokullu', 'Şehit Daniş Tunalıgil', 'Tahran', 'Turan Güneş', 'Ümit', 'Üniversiteler', 'Yaşamkent', 'Yenimahalle', 'Yukarıayrancı', 'Yükseltepe'],
    'Keçiören': ['Akşemseddin', 'Atapark', 'Bağlarbaşı', 'Esertepe', 'Etimesgut', 'Güzelyurt', 'Haberal', 'Kalaba', 'Karşıyaka', 'Kuşcağız', 'Ovacık', 'Pınarbaşı', 'Sanatoryum', 'Şenyuva', 'Telsizler', 'Yakupabdal'],
    'Konak': ['Akarca', 'Alsancak', 'Bahri Baba', 'Basmane', 'Bozyaka', 'Cumhuriyet', 'Esrefpaşa', 'Fevzipaşa', 'Göztepe', 'Güzelyalı', 'Kahramanlar', 'Kültür', 'Mersinli', 'Mithatpaşa', 'Namazgah', 'Piri Reis', 'Postane', 'Salhane', 'Şair Eşref', 'Telsizler', 'Tepecik', 'Umurbey', 'Yenişehir', 'Zafer'],
    'Karşıyaka': ['Alaybey', 'Atakent', 'Bağdat', 'Bahçecik', 'Bıçakçılar', 'Bostanlı', 'Çarşı', 'Cumhuriyet', 'Demirciköy', 'Donanma', 'Girne', 'Gökdere', 'Mavişehir', 'Mücahitler', 'Nergiz', 'Onur', 'Örnekköy', 'Şemikler', 'Tuna', 'Ulukent', 'Yamanlar', 'Yalı']
  };

  const heatingTypes = ['Doğalgaz Kombi', 'Merkezi Sistem', 'Doğalgaz Soba', 'Elektrik', 'Soba', 'Klima', 'Kalorifer', 'Yerden Isıtma', 'Güneş Enerjisi', 'Jeotermal', 'Fuel Oil', 'Kömür Sobası', 'Pelet Sobası', 'Fan Coil Unit', 'Şömine', 'Radyant Isıtma', 'Isı Pompası'];
  
  const deedTypes = ['Kat Mülkiyetli (İskanlı)', 'Kat Mülkiyetli', 'Hisseli Tapu', 'Kat İrtifaklı', 'Kooperatif', 'Topraktan Hisseli', 'Arsa Payı', 'Müstakil Tapu', 'Emsal Tapu', 'Vakıf Tapu', 'Hazine Tapusu', 'Belediye Tapusu', 'Tahsis Belgesi'];

  const formatNumber = (value) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleInputChange = (field, value) => {
    const numericFields = ['price', 'netArea', 'grossArea', 'openArea', 'monthlyFee'];
    
    if (numericFields.includes(field)) {
      const numericValue = value.replace(/[^\d]/g, '');
      setFormData(prev => ({ ...prev, [field]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const toggleSection = (section) => {
    setFormData(prev => ({
      ...prev,
      expandedSections: {
        ...prev.expandedSections,
        [section]: !prev.expandedSections[section]
      }
    }));
  };

  const toggleFeature = (category, feature) => {
    setFormData(prev => {
      const currentFeatures = prev[category] || [];
      const isSelected = currentFeatures.includes(feature);
      
      return {
        ...prev,
        [category]: isSelected 
          ? currentFeatures.filter(f => f !== feature)
          : [...currentFeatures, feature]
      };
    });
  };

  const handleFileUpload = (type, event) => {
    const files = Array.from(event.target.files);
    const maxFiles = type === 'photos' ? 20 : type === 'videos' ? 3 : 5;
    
    if (uploadedFiles[type].length + files.length > maxFiles) {
      alert(`En fazla ${maxFiles} adet ${type === 'photos' ? 'fotoğraf' : type === 'videos' ? 'video' : '360° fotoğraf'} yükleyebilirsiniz.`);
      return;
    }

    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      preview: URL.createObjectURL(file)
    }));

    setUploadedFiles(prev => ({
      ...prev,
      [type]: [...prev[type], ...newFiles]
    }));
  };

  const removeFile = (type, fileId) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: prev[type].filter(f => f.id !== fileId)
    }));
  };

  const handleSubmit = () => {
    const requiredFields = [];
    
    if (!formData.title) requiredFields.push('İlan Başlığı');
    if (!formData.description || formData.description.length < 15) requiredFields.push('Açıklama');
    if (!formData.price) requiredFields.push('Fiyat');
    if (!formData.netArea) requiredFields.push('Net m²');
    if (!formData.city) requiredFields.push('İl');
    if (!formData.district) requiredFields.push('İlçe');
    if (!formData.neighborhood) requiredFields.push('Mahalle');
    
    if (requiredFields.length > 0) {
      setValidationError('Lütfen zorunlu alanları doldurun.');
      return;
    }
    
    setValidationError('');
    localStorage.removeItem('draft_isyeri');
    alert('İlan başarıyla oluşturuldu!');
  };

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-black to-black rounded-3xl p-2 shadow-2xl">
      <div className="bg-gray-100 rounded-xl p-4 min-h-[660px] max-h-[680px] overflow-y-auto">
        
        <div className="flex items-center mb-6">
          <button className="bg-gray-100 border-2 border-gray-300 text-2xl mr-3 text-gray-800 font-black rounded-lg w-10 h-10 flex items-center justify-center">
            ←
          </button>
          <div>
            <div className="text-lg font-extrabold text-gray-700">
              <span className="text-gray-700">{formType === "konut" ? "Emlak" : "İşyeri"}</span>
              <span className="text-yellow-500">İlan</span>
              <span className="text-gray-700"> Formu</span>
            </div>
            <div className="text-xs text-gray-600">Tüm bilgileri doldurun</div>
          </div>
        </div>

        <div className="space-y-6">
          
          {/* 1. Temel Bilgiler */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">1</span>
              Temel Bilgiler
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İlan Başlığı <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder={formType === "konut" ? "Örn: Merkezi konumda 3+1 satılık daire" : "Örn: Ana caddede dükkan"}
                  maxLength={70}
                  rows={1}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 resize-none overflow-hidden"
                  style={{ minHeight: '40px', height: 'auto' }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.title.length}/70 karakter
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder={formType === "konut" ? "Mülkünüz hakkında detaylı bilgi verin..." : "İş yeriniz hakkında detaylı bilgi verin..."}
                  maxLength={2000}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 resize-none overflow-hidden"
                  style={{ minHeight: '96px', height: 'auto' }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
                <div className={`text-xs mt-1 ${formData.description.length >= 15 ? 'text-green-600' : 'text-red-500'}`}>
                  {formData.description.length}/2000 karakter (en az 15 karakter)
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fiyat (TL) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formatNumber(formData.price)}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="850.000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Aidat (TL)</label>
                <input
                  type="text"
                  value={formatNumber(formData.monthlyFee)}
                  onChange={(e) => handleInputChange('monthlyFee', e.target.value)}
                  placeholder="350"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <select
                    value={formData.creditSuitable}
                    onChange={(e) => handleInputChange('creditSuitable', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                  >
                    <option value="">Krediye Uygun</option>
                    <option value="Evet">Evet</option>
                    <option value="Hayır">Hayır</option>
                    <option value="Bilinmiyor">Bilinmiyor</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.swapSuitable}
                      onChange={(e) => handleInputChange('swapSuitable', e.target.checked)}
                      className="mr-2 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Takasa Uygun</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Konum Bilgileri */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">2</span>
              Konum Bilgileri
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İl <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                >
                  <option value="">İl seçin</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">İlçe <span className="text-red-500">*</span></label>
                  <select
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    disabled={!formData.city}
                  >
                    <option value="">İlçe seçin</option>
                    {formData.city && districts[formData.city] && districts[formData.city].map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mahalle <span className="text-red-500">*</span></label>
                  <select
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    disabled={!formData.district}
                  >
                    <option value="">Mahalle seçin</option>
                    {formData.district && neighborhoods[formData.district] && neighborhoods[formData.district].map(neighborhood => (
                      <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          // Gerçek GPS koordinatları alındı, demo için İstanbul'a set ediyoruz
                          handleInputChange('city', 'İstanbul');
                          setTimeout(() => {
                            handleInputChange('district', 'Kadıköy');
                            setTimeout(() => {
                              handleInputChange('neighborhood', 'Fenerbahçe');
                              alert('GPS konumunuz alındı!');
                            }, 100);
                          }, 100);
                        },
                        (error) => {
                          alert('Konum izni gerekli. Lütfen konum erişimine izin verin.');
                        }
                      );
                    } else {
                      alert('Tarayıcınız konum özelliğini desteklemiyor.');
                    }
                  }}
                  className="flex items-center gap-1 text-xs bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
                >
                  📍 Bulunduğum Konumu Al
                </button>
                <button
                  type="button"
                  onClick={() => setShowMapModal(true)}
                  className="flex items-center gap-1 text-xs bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition-colors"
                >
                  🗺️ Haritadan Seç
                </button>
              </div>

              {showMapModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-4 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Konum Seçin</h3>
                      <button
                        onClick={() => setShowMapModal(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-100 to-green-100 h-64 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        <div className="w-full h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"></div>
                      </div>
                      <div className="text-center z-10">
                        <div className="text-gray-600 mb-4">İnteraktif harita yüklenecek</div>
                        <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto animate-pulse">
                          📍
                        </div>
                        <div className="mt-2 text-sm text-gray-500">Konum seçmek için tıklayın</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="text-sm font-medium text-gray-700">Popüler Konumlar:</div>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { city: 'İstanbul', district: 'Beşiktaş', neighborhood: 'Etiler' },
                          { city: 'İstanbul', district: 'Kadıköy', neighborhood: 'Fenerbahçe' },
                          { city: 'İstanbul', district: 'Şişli', neighborhood: 'Nişantaşı' },
                          { city: 'Ankara', district: 'Çankaya', neighborhood: 'Kızılay' }
                        ].map((location, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              handleInputChange('city', location.city);
                              setTimeout(() => {
                                handleInputChange('district', location.district);
                                setTimeout(() => {
                                  handleInputChange('neighborhood', location.neighborhood);
                                  setShowMapModal(false);
                                  alert(`${location.neighborhood}, ${location.district}, ${location.city} konumu seçildi!`);
                                }, 100);
                              }, 100);
                            }}
                            className="text-left p-2 bg-gray-50 hover:bg-gray-100 rounded-md text-sm transition-colors"
                          >
                            📍 {location.neighborhood}, {location.district}, {location.city}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowMapModal(false)}
                        className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        İptal
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">📍 Seçilen Konum</span>
                </div>
                <div className="text-sm text-gray-600">
                  {formData.city ? 
                    [formData.neighborhood, formData.district, formData.city].filter(Boolean).join(', ') : 
                    'Henüz konum seçilmedi'
                  }
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Konum Türü</label>
                <select
                  value={formData.locationType}
                  onChange={(e) => handleInputChange('locationType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Seçin</option>
                  <option value="Alışveriş Merkezi İçinde">Alışveriş Merkezi İçinde</option>
                  <option value="Sanayi İçinde">Sanayi İçinde</option>
                  <option value="Ana Cadde Üzeri">Ana Cadde Üzeri</option>
                  <option value="Yan Sokak">Yan Sokak</option>
                  <option value="İş Merkezi İçinde">İş Merkezi İçinde</option>
                  <option value="Plaza İçinde">Plaza İçinde</option>
                  <option value="Pasaj İçinde">Pasaj İçinde</option>
                  <option value="Serbest Bölge">Serbest Bölge</option>
                  <option value="OSB İçinde">OSB İçinde</option>
                  <option value="Teknokent İçinde">Teknokent İçinde</option>
                  <option value="Çarşı İçinde">Çarşı İçinde</option>
                  <option value="Pazar Yeri">Pazar Yeri</option>
                  <option value="Residence İçinde">Residence İçinde</option>
                  <option value="Sitede">Sitede</option>
                  <option value="Müstakil">Müstakil</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. Mülk Özellikleri */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">3</span>
              {formType === "konut" ? "Konut Özellikleri" : "İşyeri Özellikleri"}
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-3">📐 Alan Bilgileri</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Net m² <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={formatNumber(formData.netArea)}
                      onChange={(e) => handleInputChange('netArea', e.target.value)}
                      placeholder="75"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Brüt m²</label>
                    <input
                      type="text"
                      value={formatNumber(formData.grossArea)}
                      onChange={(e) => handleInputChange('grossArea', e.target.value)}
                      placeholder="85"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Açık Alan</label>
                    <input
                      type="text"
                      value={formatNumber(formData.openArea)}
                      onChange={(e) => handleInputChange('openArea', e.target.value)}
                      placeholder="25"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-3">🏢 Bina Bilgileri</h4>
                <div className="grid grid-cols-1 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Bölüm Sayısı</label>
                    <select
                      value={formData.rooms}
                      onChange={(e) => handleInputChange('rooms', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Seçin</option>
                      {formType === "konut" ? (
                        <>
                          <option value="Stüdyo">Stüdyo</option>
                          <option value="1+0">1+0</option>
                          <option value="1+1">1+1</option>
                          <option value="1.5+1">1.5+1</option>
                          <option value="2+1">2+1</option>
                          <option value="2.5+1">2.5+1</option>
                          <option value="3+1">3+1</option>
                          <option value="3.5+1">3.5+1</option>
                          <option value="4+1">4+1</option>
                          <option value="4.5+1">4.5+1</option>
                          <option value="5+1">5+1</option>
                          <option value="5.5+1">5.5+1</option>
                          <option value="6+1">6+1</option>
                          <option value="6+2">6+2</option>
                          <option value="7+1">7+1</option>
                          <option value="8+1">8+1</option>
                          <option value="9+1">9+1</option>
                          <option value="10+1">10+1</option>
                        </>
                      ) : (
                        <>
                          <option value="Tek Mekân">Tek Mekân</option>
                          <option value="1 Bölüm">1 Bölüm</option>
                          <option value="2 Bölüm">2 Bölüm</option>
                          <option value="3 Bölüm">3 Bölüm</option>
                          <option value="4 Bölüm">4 Bölüm</option>
                          <option value="5 Bölüm">5 Bölüm</option>
                          <option value="6+ Bölüm">6+ Bölüm</option>
                          <option value="Açık Ofis">Açık Ofis</option>
                          <option value="Kapalı Ofis">Kapalı Ofis</option>
                          <option value="Loft">Loft</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Binanın Toplam Kat Sayısı</label>
                    <select
                      value={formData.buildingFloors}
                      onChange={(e) => handleInputChange('buildingFloors', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11-15">11-15</option>
                      <option value="16-20">16-20</option>
                      <option value="21-25">21-25</option>
                      <option value="26-30">26-30</option>
                      <option value="30+">30+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Bulunduğu Kat</label>
                    <select
                      value={formData.floor}
                      onChange={(e) => handleInputChange('floor', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="Bodrum Kat">Bodrum Kat</option>
                      <option value="Asma Kat">Asma Kat</option>
                      <option value="Zemin Kat">Zemin Kat</option>
                      <option value="Bahçe Katı">Bahçe Katı</option>
                      <option value="Yüksek Zemin">Yüksek Zemin</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11-15">11-15</option>
                      <option value="16-20">16-20</option>
                      <option value="21-25">21-25</option>
                      <option value="26-30">26-30</option>
                      <option value="30+">30+</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Kat Planı</label>
                    <select
                      value={formData.floorPlan}
                      onChange={(e) => handleInputChange('floorPlan', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="Tek Kat">Tek Kat</option>
                      <option value="Çok Katlı">Çok Katlı</option>
                      <option value="Dubleks">Dubleks</option>
                      <option value="Tripleks">Tripleks</option>
                      <option value="Loft">Loft</option>
                      <option value="Galeri">Galeri</option>
                      <option value="Asma Kat">Asma Kat</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Kullanım Durumu</label>
                    <select
                      value={formData.rentalStatus}
                      onChange={(e) => handleInputChange('rentalStatus', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="Boş">Boş</option>
                      <option value="Kiracılı">Kiracılı</option>
                      <option value="Sahibi Kullanıyor">Sahibi Kullanıyor</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Bina Yaşı</label>
                    <select
                      value={formData.buildingAge}
                      onChange={(e) => handleInputChange('buildingAge', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="0">0 (Sıfır)</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6-10">6-10</option>
                      <option value="11-15">11-15</option>
                      <option value="16-20">16-20</option>
                      <option value="21-25">21-25</option>
                      <option value="26-30">26-30</option>
                      <option value="31-40">31-40</option>
                      <option value="41-50">41-50</option>
                      <option value="50+">50+</option>
                    </select>
                  </div>
                  <div></div>
                  <div></div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Isıtma</label>
                    <select
                      value={formData.heatingType}
                      onChange={(e) => handleInputChange('heatingType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Seçin</option>
                      {heatingTypes.slice(0, 8).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Tapu</label>
                    <select
                      value={formData.deed}
                      onChange={(e) => handleInputChange('deed', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Seçin</option>
                      {deedTypes.slice(0, 6).map(deed => (
                        <option key={deed} value={deed}>{deed}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Otopark</label>
                    <select
                      value={formData.parkingType}
                      onChange={(e) => handleInputChange('parkingType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="Yok">Yok</option>
                      <option value="Açık">Açık</option>
                      <option value="Kapalı">Kapalı</option>
                      <option value="Açık+Kapalı">Açık+Kapalı</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Asansör</label>
                    <select
                      value={formData.elevatorType}
                      onChange={(e) => handleInputChange('elevatorType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="Yok">Yok</option>
                      <option value="Var">Var</option>
                      <option value="Yük Asansörü">Yük Asansörü</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Depo</label>
                    <select
                      value={formData.storageAvailable}
                      onChange={(e) => handleInputChange('storageAvailable', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="Var">Var</option>
                      <option value="Yok">Yok</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Tır Girişi</label>
                    <select
                      value={formData.truckAccess}
                      onChange={(e) => handleInputChange('truckAccess', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="Uygun">Uygun</option>
                      <option value="Uygun Değil">Uygun Değil</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Giriş Yüksekliği (m)</label>
                    <input
                      type="text"
                      value={formData.entranceHeight}
                      onChange={(e) => handleInputChange('entranceHeight', e.target.value)}
                      placeholder="3.5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Elektrik Gücü (kW)</label>
                    <input
                      type="text"
                      value={formData.electricPower}
                      onChange={(e) => handleInputChange('electricPower', e.target.value)}
                      placeholder="25"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Detaylı Özellikler */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">4</span>
              Detaylı Özellikler
            </h3>

            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleSection('location')}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-700">📍 Konum ve Yön</span>
                  <span className="text-gray-400">
                    {formData.expandedSections.location ? '▲' : '▼'}
                  </span>
                </button>
                {formData.expandedSections.location && (
                  <div className="border-t border-gray-200 p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {['Kuzey Cephe', 'Güney Cephe', 'Doğu Cephe', 'Batı Cephe'].map(feature => (
                        <label key={feature} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={formData.locationFeatures.includes(feature)}
                            onChange={() => toggleFeature('locationFeatures', feature)}
                            className="mr-2 rounded border-gray-300 text-blue-600"
                          />
                          <span className="text-gray-700">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleSection('transport')}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-700">🚗 Ulaşım</span>
                  <span className="text-gray-400">
                    {formData.expandedSections.transport ? '▲' : '▼'}
                  </span>
                </button>
                {formData.expandedSections.transport && (
                  <div className="border-t border-gray-200 p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {['E5\'e Yakın', 'Metroya Yakın', 'Metrobüse Yakın', 'TEM\'e Yakın', 'Metro', 'Otobüs', 'Taksi Durağı', 'Sahil Yoluna Yakın'].map(feature => (
                        <label key={feature} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={formData.transportFeatures.includes(feature)}
                            onChange={() => toggleFeature('transportFeatures', feature)}
                            className="mr-2 rounded border-gray-300 text-blue-600"
                          />
                          <span className="text-gray-700">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleSection('security')}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-700">🔒 Güvenlik</span>
                  <span className="text-gray-400">
                    {formData.expandedSections.security ? '▲' : '▼'}
                  </span>
                </button>
                {formData.expandedSections.security && (
                  <div className="border-t border-gray-200 p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {['24 Saat Güvenlik', 'Güvenlik Kamerası', 'Kapıcı', 'Diafon', 'Alarm Sistemi'].map(feature => (
                        <label key={feature} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={formData.securityFeatures.includes(feature)}
                            onChange={() => toggleFeature('securityFeatures', feature)}
                            className="mr-2 rounded border-gray-300 text-blue-600"
                          />
                          <span className="text-gray-700">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleSection('interior')}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-700">🏠 İç Özellikler</span>
                  <span className="text-gray-400">
                    {formData.expandedSections.interior ? '▲' : '▼'}
                  </span>
                </button>
                {formData.expandedSections.interior && (
                  <div className="border-t border-gray-200 p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {['Parke Zemin', 'Laminat Zemin', 'Seramik Zemin', 'Klima', 'Ankastre Mutfak', 'Buzdolabı', 'Banyo Var'].map(feature => (
                        <label key={feature} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={formData.interiorFeatures.includes(feature)}
                            onChange={() => toggleFeature('interiorFeatures', feature)}
                            className="mr-2 rounded border-gray-300 text-blue-600"
                          />
                          <span className="text-gray-700">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleSection('technology')}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-700">💻 Teknoloji</span>
                  <span className="text-gray-400">
                    {formData.expandedSections.technology ? '▲' : '▼'}
                  </span>
                </button>
                {formData.expandedSections.technology && (
                  <div className="border-t border-gray-200 p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {['Fiber İnternet', 'WiFi', 'Uydu TV', 'Akıllı Ev', 'Smart TV', 'Interkom'].map(feature => (
                        <label key={feature} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={formData.technologyFeatures.includes(feature)}
                            onChange={() => toggleFeature('technologyFeatures', feature)}
                            className="mr-2 rounded border-gray-300 text-blue-600"
                          />
                          <span className="text-gray-700">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 5. Ek Bilgiler */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">5</span>
              Ek Bilgiler
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Taşınmaz Numarası</label>
                <input
                  type="text"
                  value={formData.propertyId}
                  onChange={(e) => handleInputChange('propertyId', e.target.value)}
                  placeholder="TR123456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 6. İletişim Seçenekleri */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">6</span>
              İletişim Seçenekleri
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nasıl ulaşılsın?</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.contactOptions.all}
                      disabled={formData.hidePhoneNumber}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({
                            ...prev,
                            contactOptions: {
                              all: true,
                              phone: true,
                              whatsapp: true,
                              appMessage: false,
                              siteMessage: true,
                              sms: false
                            }
                          }));
                        }
                      }}
                      className="mr-2 rounded border-gray-300 text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <span className={`text-sm font-bold ${formData.hidePhoneNumber ? 'text-gray-400' : 'text-gray-700'}`}>Hepsi</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.contactOptions.phone}
                      disabled={formData.hidePhoneNumber}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          contactOptions: {
                            ...prev.contactOptions,
                            all: false,
                            phone: e.target.checked
                          }
                        }));
                      }}
                      className="mr-2 rounded border-gray-300 text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <span className={`text-sm ${formData.hidePhoneNumber ? 'text-gray-400' : 'text-gray-700'}`}>Telefon</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.contactOptions.whatsapp}
                      disabled={formData.hidePhoneNumber}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          contactOptions: {
                            ...prev.contactOptions,
                            all: false,
                            whatsapp: e.target.checked
                          }
                        }));
                      }}
                      className="mr-2 rounded border-gray-300 text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <span className={`text-sm ${formData.hidePhoneNumber ? 'text-gray-400' : 'text-gray-700'}`}>WhatsApp</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.contactOptions.siteMessage}
                      disabled={formData.hidePhoneNumber}
                      onChange={(e) => {
                        if (!formData.hidePhoneNumber) {
                          setFormData(prev => ({
                            ...prev,
                            contactOptions: {
                              ...prev.contactOptions,
                              all: false,
                              siteMessage: e.target.checked
                            }
                          }));
                        }
                      }}
                      className={`mr-2 rounded border-gray-300 text-blue-600 ${formData.hidePhoneNumber ? 'cursor-not-allowed' : ''}`}
                      style={formData.hidePhoneNumber ? { opacity: 1 } : {}}
                    />
                    <span className="text-sm text-gray-700">Site İçi Mesaj</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.hidePhoneNumber}
                    onChange={(e) => {
                      const newValue = e.target.checked;
                      setFormData(prev => ({
                        ...prev,
                        hidePhoneNumber: newValue,
                        // Telefon numarası gizlenirse, telefon ile iletişim seçeneklerini kaldır ve site içi mesajı otomatik seç
                        contactOptions: newValue ? {
                          ...prev.contactOptions,
                          all: false,
                          phone: false,
                          whatsapp: false,
                          siteMessage: true  // Site içi mesajı otomatik seç
                        } : prev.contactOptions
                      }));
                    }}
                    className="mr-2 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Telefon numaramı gizle</span>
                </label>
              </div>
            </div>
          </div>

          {/* 7. Fotoğraf ve Video */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">7</span>
              Fotoğraf ve Video
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors relative"
                  onClick={() => document.getElementById('photo-upload').click()}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload('photos', e)}
                    style={{ display: 'none' }}
                    id="photo-upload"
                  />
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                      <span className="text-blue-600 text-sm">📷</span>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Fotoğraf</span>
                    <span className="text-xs text-gray-500">{uploadedFiles.photos.length}/20</span>
                  </div>
                </div>

                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-green-400 hover:bg-green-50 transition-colors relative"
                  onClick={() => document.getElementById('virtual360-upload').click()}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload('virtual360', e)}
                    style={{ display: 'none' }}
                    id="virtual360-upload"
                  />
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-1">
                      <span className="text-green-600 text-sm">🔄</span>
                    </div>
                    <span className="text-xs font-medium text-gray-700">360° Foto</span>
                    <span className="text-xs text-gray-500">{uploadedFiles.virtual360.length}/5</span>
                  </div>
                </div>

                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-red-400 hover:bg-red-50 transition-colors relative"
                  onClick={() => document.getElementById('video-upload').click()}
                >
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={(e) => handleFileUpload('videos', e)}
                    style={{ display: 'none' }}
                    id="video-upload"
                  />
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mb-1">
                      <span className="text-red-600 text-sm">🎥</span>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Video</span>
                    <span className="text-xs text-gray-500">{uploadedFiles.videos.length}/3</span>
                  </div>
                </div>
              </div>

              {/* Uploaded Files Preview */}
              {(uploadedFiles.photos.length > 0 || uploadedFiles.videos.length > 0 || uploadedFiles.virtual360.length > 0) && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-2">Yüklenen Dosyalar:</div>
                  
                  {uploadedFiles.photos.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs font-medium text-blue-600 mb-1">Fotoğraflar ({uploadedFiles.photos.length})</div>
                      <div className="grid grid-cols-4 gap-1">
                        {uploadedFiles.photos.slice(0, 8).map((file) => (
                          <div key={file.id} className="relative">
                            <img 
                              src={file.preview} 
                              alt={file.name}
                              className="w-full h-12 object-cover rounded border"
                            />
                            <button
                              onClick={() => removeFile('photos', file.id)}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        {uploadedFiles.photos.length > 8 && (
                          <div className="w-full h-12 bg-gray-200 rounded border flex items-center justify-center text-xs text-gray-600">
                            +{uploadedFiles.photos.length - 8}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {uploadedFiles.videos.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs font-medium text-red-600 mb-1">Videolar ({uploadedFiles.videos.length})</div>
                      {uploadedFiles.videos.map((file) => (
                        <div key={file.id} className="flex items-center justify-between bg-white p-2 rounded border text-xs mb-1">
                          <span className="truncate flex-1 mr-2">🎥 {file.name}</span>
                          <button
                            onClick={() => removeFile('videos', file.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {uploadedFiles.virtual360.length > 0 && (
                    <div>
                      <div className="text-xs font-medium text-green-600 mb-1">360° Fotoğraflar ({uploadedFiles.virtual360.length})</div>
                      <div className="grid grid-cols-4 gap-1">
                        {uploadedFiles.virtual360.map((file) => (
                          <div key={file.id} className="relative">
                            <img 
                              src={file.preview} 
                              alt={file.name}
                              className="w-full h-12 object-cover rounded border"
                            />
                            <button
                              onClick={() => removeFile('virtual360', file.id)}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-600">
                  <div className="font-medium mb-1">Yükleme Kuralları:</div>
                  <div>• <span className="font-semibold text-red-600">İlk fotoğraf vitrin fotoğrafı olur</span></div>
                  <div>• Fotoğraflar: JPG, PNG formatında, max 10MB</div>
                  <div>• Video: MP4 formatında, max 90 saniye</div>
                  <div>• Birden fazla dosya seçmek için Ctrl+tık kullanın</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="text-yellow-600 text-lg mr-2">⏱️</div>
              <div>
                <div className="text-sm font-medium text-yellow-800">Moderatör Onayı</div>
                <div className="text-xs text-yellow-700 mt-1">
                  İlanınız 24 saat içinde incelenerek yayına alınacaktır.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sticky bottom-0 bg-gray-100 pt-4">
          <div className="flex gap-2 mb-2">
            <button 
              onClick={clearDraft}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg text-sm hover:bg-gray-300"
            >Taslağı Temizle</button>
            <div className="flex-1 text-right text-xs text-gray-500 self-center">{formData.adMode ? (formData.adMode === 'sale' ? 'Satılık' : 'Kiralık') : ''} {formData.subType ? `• ${formData.subType}` : ''}</div>
          </div>
          <button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold text-base hover:from-green-600 hover:to-green-700 transition-colors shadow-lg"
          >
            İlanı Yayınla
          </button>
          
          {validationError && (
            <div className="mt-2 text-center text-sm text-red-600 font-medium">
              {validationError}
            </div>
          )}
          
          <div className="mt-2 text-center text-xs text-gray-500">
            <span className="text-red-500">*</span> zorunlu alanları belirtir
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmlakIlanFormu;
