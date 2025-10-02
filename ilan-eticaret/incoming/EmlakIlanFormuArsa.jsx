import { useState } from 'react';

const EmlakIlanFormu = ({ formType = "arsa" }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    totalArea: '',
    city: '',
    district: '',
    neighborhood: '',
    zoning: '',
    waterElectricity: '',
    roadAccess: '',
    deed: '',
    creditSuitable: '',
    swapSuitable: false,
    propertyId: '',
    locationType: '',
    // Arsa teknik bilgileri
    ada: '',
    parsel: '',
    pafta: '',
    kaks: '',
    gabari: '',
    expandedSections: {},
    locationFeatures: [],
    transportFeatures: [],
    interiorFeatures: [],
    technologyFeatures: [],
    contactOptions: {
      all: true,
      phone: true,
      whatsapp: true,
      appMessage: false,
      siteMessage: true,
      sms: false
    },
    hidePhoneNumber: false
  });

  const [showMapModal, setShowMapModal] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState({
    photos: [],
    videos: [],
    virtual360: []
  });

  const cities = ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Adana'];
  
  const districts = {
    'İstanbul': ['Kadıköy', 'Beşiktaş', 'Şişli', 'Beyoğlu'],
    'Ankara': ['Çankaya', 'Keçiören', 'Mamak'],
    'İzmir': ['Konak', 'Karşıyaka', 'Bornova']
  };

  const neighborhoods = {
    'Kadıköy': ['Fenerbahçe', 'Göztepe', 'Moda'],
    'Beşiktaş': ['Etiler', 'Levent', 'Ortaköy'],
    'Şişli': ['Nişantaşı', 'Mecidiyeköy'],
    'Çankaya': ['Kızılay', 'Bahçelievler'],
    'Keçiören': ['Ovacık', 'Pınarbaşı'],
    'Konak': ['Alsancak', 'Basmane'],
    'Karşıyaka': ['Bostanlı', 'Mavişehir']
  };

  const formatNumber = (value) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleInputChange = (field, value) => {
    const numericFields = ['price', 'totalArea', 'ada', 'parsel', 'pafta', 'kaks', 'gabari'];
    
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
      alert(`En fazla ${maxFiles} dosya yükleyebilirsiniz.`);
      return;
    }

    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
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
    if (!formData.totalArea) requiredFields.push('Toplam Alan');
    if (!formData.city) requiredFields.push('İl');
    if (!formData.district) requiredFields.push('İlçe');
    if (!formData.neighborhood) requiredFields.push('Mahalle');
    if (!formData.zoning) requiredFields.push('İmar Durumu');
    if (!formData.deed) requiredFields.push('Tapu Durumu');
    if (!formData.ada && !formData.parsel) requiredFields.push('Ada veya Parsel');
    
    if (requiredFields.length > 0) {
      setValidationError('Lütfen zorunlu alanları doldurun.');
      return;
    }
    
    setValidationError('');
    alert('İlan başarıyla oluşturuldu!');
  };

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-black to-black rounded-3xl p-2 shadow-2xl">
      <div className="bg-gray-100 rounded-xl p-4 min-h-[660px] max-h-[680px] overflow-y-auto">
        
        <div className="flex items-center mb-6">
          <button className="bg-gray-100 border-2 border-gray-300 text-2xl mr-3 text-gray-800 font-black rounded-lg w-10 h-10 flex items-center justify-center">
            ←
          </button>
          <div className="flex-1">
            <div className="text-lg font-extrabold text-gray-700">
              <span className="text-gray-700">Arsa</span>
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
                  placeholder="Örn: İmarlı arsa satılık"
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
                  placeholder="Arsanız hakkında detaylı bilgi verin..."
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Ödeme Seçenekleri</label>
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
                    handleInputChange('city', 'İstanbul');
                    setTimeout(() => {
                      handleInputChange('district', 'Kadıköy');
                      setTimeout(() => {
                        handleInputChange('neighborhood', 'Fenerbahçe');
                        alert('GPS konumunuz alındı!');
                      }, 100);
                    }, 100);
                  }}
                  className="flex items-center gap-1 text-xs bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
                >
                  📍 GPS Konum
                </button>
                <button
                  type="button"
                  onClick={() => setShowMapModal(true)}
                  className="flex items-center gap-1 text-xs bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition-colors"
                >
                  🗺️ Harita
                </button>
              </div>

              {showMapModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-4 max-w-md w-full mx-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Konum Seçin</h3>
                      <button
                        onClick={() => setShowMapModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <div className="text-gray-600 mb-4">Harita yüklenecek</div>
                        <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto">
                          📍
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          handleInputChange('city', 'İstanbul');
                          setTimeout(() => {
                            handleInputChange('district', 'Beşiktaş');
                            setTimeout(() => {
                              handleInputChange('neighborhood', 'Etiler');
                              setShowMapModal(false);
                              alert('Konum seçildi!');
                            }, 100);
                          }, 100);
                        }}
                        className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                      >
                        Konumu Seç
                      </button>
                      <button
                        onClick={() => setShowMapModal(false)}
                        className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
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
            </div>
          </div>

          {/* 3. Arsa Özellikleri */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">3</span>
              Arsa Özellikleri
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-3">📐 Temel Bilgiler</h4>
                
                {/* Toplam Alan */}
                <div className="grid grid-cols-1 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Toplam Alan (m²) <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={formatNumber(formData.totalArea)}
                      onChange={(e) => handleInputChange('totalArea', e.target.value)}
                      placeholder="5000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Ada / Parsel */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ada <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={formData.ada}
                      onChange={(e) => handleInputChange('ada', e.target.value)}
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parsel <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={formData.parsel}
                      onChange={(e) => handleInputChange('parsel', e.target.value)}
                      placeholder="45"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  Ada veya Parsel bilgilerinden en az birini doldurun
                </div>

                {/* Pafta / KAKS / Gabari - YENİ KONUM */}
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pafta</label>
                    <input
                      type="text"
                      value={formData.pafta}
                      onChange={(e) => handleInputChange('pafta', e.target.value)}
                      placeholder="15"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">KAKS</label>
                    <select
                      value={formData.kaks}
                      onChange={(e) => handleInputChange('kaks', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="0,15">0,15</option>
                      <option value="0,20">0,20</option>
                      <option value="0,25">0,25</option>
                      <option value="0,30">0,30</option>
                      <option value="0,35">0,35</option>
                      <option value="0,40">0,40</option>
                      <option value="0,50">0,50</option>
                      <option value="0,60">0,60</option>
                      <option value="0,80">0,80</option>
                      <option value="1,00">1,00</option>
                      <option value="1,20">1,20</option>
                      <option value="1,50">1,50</option>
                      <option value="2,00">2,00</option>
                      <option value="2,50">2,50</option>
                      <option value="3,00">3,00</option>
                      <option value="4,00">4,00</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gabari (m)</label>
                    <select
                      value={formData.gabari}
                      onChange={(e) => handleInputChange('gabari', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="3,5">3,5</option>
                      <option value="4,5">4,5</option>
                      <option value="6,0">6,0</option>
                      <option value="6,5">6,5</option>
                      <option value="7,5">7,5</option>
                      <option value="9,0">9,0</option>
                      <option value="9,5">9,5</option>
                      <option value="12,0">12,0</option>
                      <option value="15,0">15,0</option>
                      <option value="18,0">18,0</option>
                      <option value="21,0">21,0</option>
                      <option value="Serbest">Serbest</option>
                    </select>
                  </div>
                </div>

                {/* İmar Durumu */}
                <div className="grid grid-cols-1 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">İmar Durumu <span className="text-red-500">*</span></label>
                    <select
                      value={formData.zoning}
                      onChange={(e) => handleInputChange('zoning', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="Konut İmarlı">Konut İmarlı</option>
                      <option value="Konut + Ticari İmarlı">Konut + Ticari İmarlı</option>
                      <option value="Tarla">Tarla</option>
                      <option value="Bağ">Bağ</option>
                      <option value="Bahçe">Bahçe</option>
                      <option value="Zeytinlik">Zeytinlik</option>
                      <option value="Ticari İmarlı">Ticari İmarlı</option>
                      <option value="Sanayi İmarlı">Sanayi İmarlı</option>
                      <option value="Turizm İmarlı">Turizm İmarlı</option>
                      <option value="Karma İmarlı">Karma İmarlı</option>
                      <option value="Rekreasyon İmarlı">Rekreasyon İmarlı</option>
                      <option value="Kültür İmarlı">Kültür İmarlı</option>
                      <option value="Eğitim İmarlı">Eğitim İmarlı</option>
                      <option value="Sağlık İmarlı">Sağlık İmarlı</option>
                      <option value="Dini Tesis İmarlı">Dini Tesis İmarlı</option>
                      <option value="Spor İmarlı">Spor İmarlı</option>
                      <option value="Sosyal Tesis İmarlı">Sosyal Tesis İmarlı</option>
                      <option value="Teknik Altyapı İmarlı">Teknik Altyapı İmarlı</option>
                      <option value="Ulaşım İmarlı">Ulaşım İmarlı</option>
                      <option value="Yeşil Alan İmarlı">Yeşil Alan İmarlı</option>
                      <option value="Tarımsal Nitelikli">Tarımsal Nitelikli</option>
                      <option value="Orman">Orman</option>
                      <option value="Su Ürünleri İmarlı">Su Ürünleri İmarlı</option>
                      <option value="Mera">Mera</option>
                      <option value="Çevre Koruma İmarlı">Çevre Koruma İmarlı</option>
                      <option value="Sit Alanı">Sit Alanı</option>
                      <option value="İmarsız">İmarsız</option>
                      <option value="İmar Planı Dışı">İmar Planı Dışı</option>
                      <option value="Plan Tadilatında">Plan Tadilatında</option>
                      <option value="İmar Plan Notu Var">İmar Plan Notu Var</option>
                    </select>
                  </div>
                </div>

                {/* Tapu Durumu */}
                <div className="mt-3 mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tapu Durumu <span className="text-red-500">*</span></label>
                  <select
                    value={formData.deed}
                    onChange={(e) => handleInputChange('deed', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                  >
                    <option value="">Seçin</option>
                    <option value="Kat Mülkiyeti">Kat Mülkiyeti</option>
                    <option value="Müstakil Tapu">Müstakil Tapu</option>
                    <option value="Hisseli Tapu">Hisseli Tapu</option>
                    <option value="Arsa Payı">Arsa Payı</option>
                    <option value="Tahsis Belgesi">Tahsis Belgesi</option>
                    <option value="Tapusuz">Tapusuz</option>
                  </select>
                </div>

                {/* Su/Elektrik ve Yol Durumu */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Su/Elektrik</label>
                    <select
                      value={formData.waterElectricity}
                      onChange={(e) => handleInputChange('waterElectricity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="Su/Elektrik Var">Su/Elektrik Var</option>
                      <option value="Elektrik Var">Elektrik Var</option>
                      <option value="Su Var">Su Var</option>
                      <option value="Elektrik Yok">Elektrik Yok</option>
                      <option value="Su Yok">Su Yok</option>
                      <option value="Su/Elektrik Yok">Su/Elektrik Yok</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yol Durumu</label>
                    <select
                      value={formData.roadAccess}
                      onChange={(e) => handleInputChange('roadAccess', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="Asfalt Yol">Asfalt Yol</option>
                      <option value="Beton Yol">Beton Yol</option>
                      <option value="Stabilize Yol">Stabilize Yol</option>
                      <option value="Toprak Yol">Toprak Yol</option>
                      <option value="Patika">Patika</option>
                      <option value="Yol Yok">Yol Yok</option>
                    </select>
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
                  onClick={() => toggleSection('landFeatures')}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-700">🌱 Arazi Özellikleri</span>
                  <span className="text-gray-400">
                    {formData.expandedSections.landFeatures ? '▲' : '▼'}
                  </span>
                </button>
                {formData.expandedSections.landFeatures && (
                  <div className="border-t border-gray-200 p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {['Sulama Kanalı', 'Kuyu Var', 'Artezyen', 'Çeşme', 'Meyve Ağaçlı', 'Zeytinli', 'Tarıma Elverişli', 'Hayvancılığa Uygun', 'Sera Kurulabilir', 'İnşaat Yapılabilir', 'Rekreasyon Alanı', 'Av Sahası', 'Düz Arazi', 'Eğimli Arazi', 'Güneş Alıyor', 'Rüzgarlı', 'Sulak Alan', 'Kayalık Alan'].map(feature => (
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
                  onClick={() => toggleSection('location')}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-700">📍 Konum ve Çevre</span>
                  <span className="text-gray-400">
                    {formData.expandedSections.location ? '▲' : '▼'}
                  </span>
                </button>
                {formData.expandedSections.location && (
                  <div className="border-t border-gray-200 p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {['Denize Yakın', 'Şehir Merkezine Yakın', 'Orman Kenarı', 'Göl Kenarı', 'Dere Kenarı', 'Yol Kenarı', 'Köy İçinde', 'Mezarlık Yakını', 'Okul Yakını', 'Hastane Yakını', 'Cami Yakını', 'Pazar Yakını'].map(feature => (
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
                      {['Anayola Yakın', 'Otobüs Durağı', 'Minibüs Hattı', 'Dolmuş Hattı', 'Tren İstasyonu', 'Havaalanı Yakını', 'Liman Yakını', 'Karayolu Bağlantısı'].map(feature => (
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
                  onClick={() => toggleSection('facilities')}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-700">🏗️ Tesis ve Yapılar</span>
                  <span className="text-gray-400">
                    {formData.expandedSections.facilities ? '▲' : '▼'}
                  </span>
                </button>
                {formData.expandedSections.facilities && (
                  <div className="border-t border-gray-200 p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {['Ahır Var', 'Samanlık Var', 'Depo Var', 'Bekçi Evi', 'Çiftçi Evi', 'Baraka Var', 'Çit/Tel Çevrili', 'Kapı Var', 'Elektrik Direği', 'Su Deposu', 'Traktör Yolu', 'Hasat Makinesi Girişi'].map(feature => (
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
                        contactOptions: newValue ? {
                          ...prev.contactOptions,
                          all: false,
                          phone: false,
                          whatsapp: false,
                          siteMessage: true
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
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload('photos', e)}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="text-blue-600 text-sm">📷</div>
                  <span className="text-xs font-medium text-gray-700">Fotoğraf</span>
                  <span className="text-xs text-gray-500 block">{uploadedFiles.photos.length}/20</span>
                </label>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-green-400 hover:bg-green-50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload('virtual360', e)}
                  className="hidden"
                  id="virtual360-upload"
                />
                <label htmlFor="virtual360-upload" className="cursor-pointer">
                  <div className="text-green-600 text-sm">🔄</div>
                  <span className="text-xs font-medium text-gray-700">360° Foto</span>
                  <span className="text-xs text-gray-500 block">{uploadedFiles.virtual360.length}/5</span>
                </label>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-red-400 hover:bg-red-50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={(e) => handleFileUpload('videos', e)}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <div className="text-red-600 text-sm">🎥</div>
                  <span className="text-xs font-medium text-gray-700">Video</span>
                  <span className="text-xs text-gray-500 block">{uploadedFiles.videos.length}/3</span>
                </label>
              </div>
            </div>

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

import { useState } from 'react';

const EmlakIlanFormu = ({ formType = "arsa" }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    totalArea: '',
    city: '',
    district: '',
    neighborhood: '',
    zoning: '',
    waterElectricity: '',
    roadAccess: '',
    deed: '',
    creditSuitable: '',
    swapSuitable: false,
    propertyId: '',
    locationType: '',
    // Arsa teknik bilgileri
    ada: '',
    parsel: '',
    pafta: '',
    kaks: '',
    gabari: '',
    expandedSections: {},
    locationFeatures: [],
    transportFeatures: [],
    interiorFeatures: [],
    technologyFeatures: [],
    contactOptions: {
      all: true,
      phone: true,
      whatsapp: true,
      appMessage: false,
      siteMessage: true,
      sms: false
    },
    hidePhoneNumber: false
  });

  const [showMapModal, setShowMapModal] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState({
    photos: [],
    videos: [],
    virtual360: []
  });

  const cities = ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Adana'];
  
  const districts = {
    'İstanbul': ['Kadıköy', 'Beşiktaş', 'Şişli', 'Beyoğlu'],
    'Ankara': ['Çankaya', 'Keçiören', 'Mamak'],
    'İzmir': ['Konak', 'Karşıyaka', 'Bornova']
  };

  const neighborhoods = {
    'Kadıköy': ['Fenerbahçe', 'Göztepe', 'Moda'],
    'Beşiktaş': ['Etiler', 'Levent', 'Ortaköy'],
    'Şişli': ['Nişantaşı', 'Mecidiyeköy'],
    'Çankaya': ['Kızılay', 'Bahçelievler'],
    'Keçiören': ['Ovacık', 'Pınarbaşı'],
    'Konak': ['Alsancak', 'Basmane'],
    'Karşıyaka': ['Bostanlı', 'Mavişehir']
  };

  const formatNumber = (value) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleInputChange = (field, value) => {
    const numericFields = ['price', 'totalArea', 'ada', 'parsel', 'pafta', 'kaks', 'gabari'];
    
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
      alert(`En fazla ${maxFiles} dosya yükleyebilirsiniz.`);
      return;
    }

    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
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
    if (!formData.totalArea) requiredFields.push('Toplam Alan');
    if (!formData.city) requiredFields.push('İl');
    if (!formData.district) requiredFields.push('İlçe');
    if (!formData.neighborhood) requiredFields.push('Mahalle');
    if (!formData.zoning) requiredFields.push('İmar Durumu');
    if (!formData.deed) requiredFields.push('Tapu Durumu');
    if (!formData.ada && !formData.parsel) requiredFields.push('Ada veya Parsel');
    
    if (requiredFields.length > 0) {
      setValidationError('Lütfen zorunlu alanları doldurun.');
      return;
    }
    
    setValidationError('');
    alert('İlan başarıyla oluşturuldu!');
  };

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-black to-black rounded-3xl p-2 shadow-2xl">
      <div className="bg-gray-100 rounded-xl p-4 min-h-[660px] max-h-[680px] overflow-y-auto">
        
        <div className="flex items-center mb-6">
          <button className="bg-gray-100 border-2 border-gray-300 text-2xl mr-3 text-gray-800 font-black rounded-lg w-10 h-10 flex items-center justify-center">
            ←
          </button>
          <div className="flex-1">
            <div className="text-lg font-extrabold text-gray-700">
              <span className="text-gray-700">Arsa</span>
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
                  placeholder="Örn: İmarlı arsa satılık"
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
                  placeholder="Arsanız hakkında detaylı bilgi verin..."
                  maxLength={2000}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 resize-none overflow-hidden"
                  style={{ minHeight: '96px', height: 'auto' }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
                <div className={`${formData.description.length >= 15 ? 'text-green-600' : 'text-red-500'} text-xs mt-1`}>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Ödeme Seçenekleri</label>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus;border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus;border-blue-500"
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
                    handleInputChange('city', 'İstanbul');
                    setTimeout(() => {
                      handleInputChange('district', 'Kadıköy');
                      setTimeout(() => {
                        handleInputChange('neighborhood', 'Fenerbahçe');
                        alert('GPS konumunuz alındı!');
                      }, 100);
                    }, 100);
                  }}
                  className="flex items-center gap-1 text-xs bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
                >
                  📍 GPS Konum
                </button>
                <button
                  type="button"
                  onClick={() => setShowMapModal(true)}
                  className="flex items-center gap-1 text-xs bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition-colors"
                >
                  🗺️ Harita
                </button>
              </div>

              {showMapModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-4 max-w-md w-full mx-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Konum Seçin</h3>
                      <button
                        onClick={() => setShowMapModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <div className="text-gray-600 mb-4">Harita yüklenecek</div>
                        <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto">
                          📍
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          handleInputChange('city', 'İstanbul');
                          setTimeout(() => {
                            handleInputChange('district', 'Beşiktaş');
                            setTimeout(() => {
                              handleInputChange('neighborhood', 'Etiler');
                              setShowMapModal(false);
                              alert('Konum seçildi!');
                            }, 100);
                          }, 100);
                        }}
                        className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                      >
                        Konumu Seç
                      </button>
                      <button
                        onClick={() => setShowMapModal(false)}
                        className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
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
            </div>
          </div>

          {/* 3. Arsa Özellikleri */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">3</span>
              Arsa Özellikleri
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-3">📐 Temel Bilgiler</h4>
                
                {/* Toplam Alan */}
                <div className="grid grid-cols-1 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Toplam Alan (m²) <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={formatNumber(formData.totalArea)}
                      onChange={(e) => handleInputChange('totalArea', e.target.value)}
                      placeholder="5000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus;border-blue-500"
                    />
                  </div>
                </div>

                {/* Ada / Parsel */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ada <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={formData.ada}
                      onChange={(e) => handleInputChange('ada', e.target.value)}
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus;border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parsel <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={formData.parsel}
                      onChange={(e) => handleInputChange('parsel', e.target.value)}
                      placeholder="45"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus;border-blue-500"
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  Ada veya Parsel bilgilerinden en az birini doldurun
                </div>

                {/* Pafta / KAKS / Gabari - YENİ KONUM */}
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pafta</label>
                    <input
                      type="text"
                      value={formData.pafta}
                      onChange={(e) => handleInputChange('pafta', e.target.value)}
                      placeholder="15"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus;border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">KAKS</label>
                    <select
                      value={formData.kaks}
                      onChange={(e) => handleInputChange('kaks', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus;border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="0,15">0,15</option>
                      <option value="0,20">0,20</option>
                      <option value="0,25">0,25</option>
                      <option value="0,30">0,30</option>
                      <option value="0,35">0,35</option>
                      <option value="0,40">0,40</option>
                      <option value="0,50">0,50</option>
                      <option value="0,60">0,60</option>
                      <option value="0,80">0,80</option>
                      <option value="1,00">1,00</option>
                      <option value="1,20">1,20</option>
                      <option value="1,50">1,50</option>
                      <option value="2,00">2,00</option>
                      <option value="2,50">2,50</option>
                      <option value="3,00">3,00</option>
                      <option value="4,00">4,00</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gabari (m)</label>
                    <select
                      value={formData.gabari}
                      onChange={(e) => handleInputChange('gabari', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus;border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="3,5">3,5</option>
                      <option value="4,5">4,5</option>
                      <option value="6,0">6,0</option>
                      <option value="6,5">6,5</option>
                      <option value="7,5">7,5</option>
                      <option value="9,0">9,0</option>
                      <option value="9,5">9,5</option>
                      <option value="12,0">12,0</option>
                      <option value="15,0">15,0</option>
                      <option value="18,0">18,0</option>
                      <option value="21,0">21,0</option>
                      <option value="Serbest">Serbest</option>
                    </select>
                  </div>
                </div>

                {/* İmar Durumu */}
                <div className="grid grid-cols-1 gap-3 mb-3">
                  <div>
                    <label className="block text.sm font-medium text-gray-700 mb-1">İmar Durumu <span className="text-red-500">*</span></label>
                    <select
                      value={formData.zoning}
                      onChange={(e) => handleInputChange('zoning', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus;border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="Konut İmarlı">Konut İmarlı</option>
                      <option value="Konut + Ticari İmarlı">Konut + Ticari İmarlı</option>
                      <option value="Tarla">Tarla</option>
                      <option value="Bağ">Bağ</option>
                      <option value="Bahçe">Bahçe</option>
                      <option value="Zeytinlik">Zeytinlik</option>
                      <option value="Ticari İmarlı">Ticari İmarlı</option>
                      <option value="Sanayi İmarlı">Sanayi İmarlı</option>
                      <option value="Turizm İmarlı">Turizm İmarlı</option>
                      <option value="Karma İmarlı">Karma İmarlı</option>
                      <option value="Rekreasyon İmarlı">Rekreasyon İmarlı</option>
                      <option value="Kültür İmarlı">Kültür İmarlı</option>
                      <option value="Eğitim İmarlı">Eğitim İmarlı</option>
                      <option value="Sağlık İmarlı">Sağlık İmarlı</option>
                      <option value="Dini Tesis İmarlı">Dini Tesis İmarlı</option>
                      <option value="Spor İmarlı">Spor İmarlı</option>
                      <option value="Sosyal Tesis İmarlı">Sosyal Tesis İmarlı</option>
                      <option value="Teknik Altyapı İmarlı">Teknik Altyapı İmarlı</option>
                      <option value="Ulaşım İmarlı">Ulaşım İmarlı</option>
                      <option value="Yeşil Alan İmarlı">Yeşil Alan İmarlı</option>
                      <option value="Tarımsal Nitelikli">Tarımsal Nitelikli</option>
                      <option value="Orman">Orman</option>
                      <option value="Su Ürünleri İmarlı">Su Ürünleri İmarlı</option>
                      <option value="Mera">Mera</option>
                      <option value="Çevre Koruma İmarlı">Çevre Koruma İmarlı</option>
                      <option value="Sit Alanı">Sit Alanı</option>
                      <option value="İmarsız">İmarsız</option>
                      <option value="İmar Planı Dışı">İmar Planı Dışı</option>
                      <option value="Plan Tadilatında">Plan Tadilatında</option>
                      <option value="İmar Plan Notu Var">İmar Plan Notu Var</option>
                    </select>
                  </div>
                </div>

                {/* Tapu Durumu */}
                <div className="mt-3 mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tapu Durumu <span className="text-red-500">*</span></label>
                  <select
                    value={formData.deed}
                    onChange={(e) => handleInputChange('deed', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus;border-blue-500"
                  >
                    <option value="">Seçin</option>
                    <option value="Kat Mülkiyeti">Kat Mülkiyeti</option>
                    <option value="Müstakil Tapu">Müstakil Tapu</option>
                    <option value="Hisseli Tapu">Hisseli Tapu</option>
                    <option value="Arsa Payı">Arsa Payı</option>
                    <option value="Tahsis Belgesi">Tahsis Belgesi</option>
                    <option value="Tapusuz">Tapusuz</option>
                  </select>
                </div>

                {/* Su/Elektrik ve Yol Durumu */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Su/Elektrik</label>
                    <select
                      value={formData.waterElectricity}
                      onChange={(e) => handleInputChange('waterElectricity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus;border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="Su/Elektrik Var">Su/Elektrik Var</option>
                      <option value="Elektrik Var">Elektrik Var</option>
                      <option value="Su Var">Su Var</option>
                      <option value="Elektrik Yok">Elektrik Yok</option>
                      <option value="Su Yok">Su Yok</option>
                      <option value="Su/Elektrik Yok">Su/Elektrik Yok</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yol Durumu</label>
                    <select
                      value={formData.roadAccess}
                      onChange={(e) => handleInputChange('roadAccess', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus;border-blue-500"
                    >
                      <option value="">Seçin</option>
                      <option value="Asfalt Yol">Asfalt Yol</option>
                      <option value="Beton Yol">Beton Yol</option>
                      <option value="Stabilize Yol">Stabilize Yol</option>
                      <option value="Toprak Yol">Toprak Yol</option>
                      <option value="Patika">Patika</option>
                      <option value="Yol Yok">Yol Yok</option>
                    </select>
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
                  onClick={() => toggleSection('landFeatures')}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-700">🌱 Arazi Özellikleri</span>
                  <span className="text-gray-400">
                    {formData.expandedSections.landFeatures ? '▲' : '▼'}
                  </span>
                </button>
                {formData.expandedSections.landFeatures && (
                  <div className="border-t border-gray-200 p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {['Sulama Kanalı', 'Kuyu Var', 'Artezyen', 'Çeşme', 'Meyve Ağaçlı', 'Zeytinli', 'Tarıma Elverişli', 'Hayvancılığa Uygun', 'Sera Kurulabilir', 'İnşaat Yapılabilir', 'Rekreasyon Alanı', 'Av Sahası', 'Düz Arazi', 'Eğimli Arazi', 'Güneş Alıyor', 'Rüzgarlı', 'Sulak Alan', 'Kayalık Alan'].map(feature => (
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
                  onClick={() => toggleSection('location')}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-700">📍 Konum ve Çevre</span>
                  <span className="text-gray-400">
                    {formData.expandedSections.location ? '▲' : '▼'}
                  </span>
                </button>
                {formData.expandedSections.location && (
                  <div className="border-t border-gray-200 p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {['Denize Yakın', 'Şehir Merkezine Yakın', 'Orman Kenarı', 'Göl Kenarı', 'Dere Kenarı', 'Yol Kenarı', 'Köy İçinde', 'Mezarlık Yakını', 'Okul Yakını', 'Hastane Yakını', 'Cami Yakını', 'Pazar Yakını'].map(feature => (
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
                  className="w-full flex items.center justify-between p-3 text-left hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-700">🚗 Ulaşım</span>
                  <span className="text-gray-400">
                    {formData.expandedSections.transport ? '▲' : '▼'}
                  </span>
                </button>
                {formData.expandedSections.transport && (
                  <div className="border-t border-gray-200 p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {['Anayola Yakın', 'Otobüs Durağı', 'Minibüs Hattı', 'Dolmuş Hattı', 'Tren İstasyonu', 'Havaalanı Yakını', 'Liman Yakını', 'Karayolu Bağlantısı'].map(feature => (
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
                  onClick={() => toggleSection('facilities')}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-700">🏗️ Tesis ve Yapılar</span>
                  <span className="text-gray-400">
                    {formData.expandedSections.facilities ? '▲' : '▼'}
                  </span>
                </button>
                {formData.expandedSections.facilities && (
                  <div className="border-t border-gray-200 p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {['Ahır Var', 'Samanlık Var', 'Depo Var', 'Bekçi Evi', 'Çiftçi Evi', 'Baraka Var', 'Çit/Tel Çevrili', 'Kapı Var', 'Elektrik Direği', 'Su Deposu', 'Traktör Yolu', 'Hasat Makinesi Girişi'].map(feature => (
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus;border-blue-500"
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
                    <span className={`${formData.hidePhoneNumber ? 'text-gray-400' : 'text-gray-700'} text-sm font-bold`}>Hepsi</span>
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
                    <span className={`${formData.hidePhoneNumber ? 'text-gray-400' : 'text-gray-700'} text-sm`}>Telefon</span>
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
                    <span className={`${formData.hidePhoneNumber ? 'text-gray-400' : 'text-gray-700'} text-sm`}>WhatsApp</span>
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
                      className={`${formData.hidePhoneNumber ? 'cursor-not-allowed' : ''} mr-2 rounded border-gray-300 text-blue-600`}
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
                        contactOptions: newValue ? {
                          ...prev.contactOptions,
                          all: false,
                          phone: false,
                          whatsapp: false,
                          siteMessage: true
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
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload('photos', e)}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="text-blue-600 text-sm">📷</div>
                  <span className="text-xs font-medium text-gray-700">Fotoğraf</span>
                  <span className="text-xs text-gray-500 block">{uploadedFiles.photos.length}/20</span>
                </label>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-green-400 hover:bg-green-50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload('virtual360', e)}
                  className="hidden"
                  id="virtual360-upload"
                />
                <label htmlFor="virtual360-upload" className="cursor-pointer">
                  <div className="text-green-600 text-sm">🔄</div>
                  <span className="text-xs font-medium text-gray-700">360° Foto</span>
                  <span className="text-xs text-gray-500 block">{uploadedFiles.virtual360.length}/5</span>
                </label>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-red-400 hover:bg-red-50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={(e) => handleFileUpload('videos', e)}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <div className="text-red-600 text-sm">🎥</div>
                  <span className="text-xs font-medium text-gray-700">Video</span>
                  <span className="text-xs text-gray-500 block">{uploadedFiles.videos.length}/3</span>
                </label>
              </div>
            </div>

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

