const { useState } = React;

const EmlakIlanFormuKonut = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'TL',
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
    hidePhoneNumber: false
  });

  const [showMapModal, setShowMapModal] = useState(false);
  const [validationError, setValidationError] = useState('');

  const cities = ['İstanbul', 'Ankara', 'İzmir'];
  const districts = {
    'İstanbul': ['Kadıköy', 'Beşiktaş', 'Şişli'],
    'Ankara': ['Çankaya', 'Keçiören'],
    'İzmir': ['Konak', 'Karşıyaka']
  };

  const neighborhoods = {
    'Kadıköy': ['Fenerbahçe', 'Göztepe', 'Bostancı', 'Suadiye', 'Caddebostan'],
    'Beşiktaş': ['Etiler', 'Levent', 'Ortaköy', 'Bebek', 'Arnavutköy'],
    'Şişli': ['Nişantaşı', 'Mecidiyeköy', 'Gayrettepe', 'Elmadağ', 'Harbiye'],
    'Çankaya': ['Kızılay', 'Bahçelievler', 'Dikmen', 'Çayyolu', 'Ümitköy'],
    'Keçiören': ['Etimesgut', 'Ovacık', 'Aktepe', 'Kalaba', 'Pınarbaşı'],
    'Konak': ['Alsancak', 'Konak Merkez', 'Kahramanlar', 'Akdeniz', 'Göztepe'],
    'Karşıyaka': ['Bostanlı', 'Mavişehir', 'Çiğli', 'Bayraklı', 'Alaybey']
  };

  const heatingTypes = ['Doğalgaz Kombi', 'Merkezi Sistem', 'Doğalgaz Soba', 'Elektrik', 'Soba', 'Klima', 'Kalorifer', 'Yerden Isıtma', 'Güneş Enerjisi'];
  const deedTypes = ['Kat Mülkiyetli (İskanlı)', 'Kat Mülkiyetli', 'Hisseli Tapu', 'Kat İrtifaklı', 'Kooperatif', 'Topraktan Hisseli', 'Arsa Payı'];

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
      return { ...prev, [category]: isSelected ? currentFeatures.filter(f => f !== feature) : [...currentFeatures, feature] };
    });
  };

  const handleSubmit = () => {
    const requiredFields = [];
    if (!formData.title) requiredFields.push('İlan Başlığı');
    if (!formData.description || formData.description.length < 15) requiredFields.push('Açıklama (en az 15 karakter)');
    if (!formData.price) requiredFields.push('Fiyat');
    if (!formData.city) requiredFields.push('İl');
    if (!formData.district) requiredFields.push('İlçe');
    if (!formData.neighborhood) requiredFields.push('Mahalle');
    if (!formData.netArea) requiredFields.push('Net m²');
    if (!formData.grossArea) requiredFields.push('Brüt m²');
    if (!formData.rooms) requiredFields.push('Oda Sayısı');
    if (!formData.floor) requiredFields.push('Bulunduğu Kat');
    if (!formData.buildingFloors) requiredFields.push('Kat Sayısı');
    if (!formData.buildingAge) requiredFields.push('Bina Yaşı');
    if (!formData.heatingType) requiredFields.push('Isıtma Tipi');
    if (!formData.deed) requiredFields.push('Tapu Durumu');
    if (!formData.usageStatus) requiredFields.push('Kullanım Durumu');
    if (formData.grossArea && formData.netArea) {
      const netValue = parseInt(formData.netArea.replace(/[^\d]/g, '') || '0');
      const grossValue = parseInt(formData.grossArea.replace(/[^\d]/g, '') || '0');
      if (grossValue < netValue) {
        setValidationError('Brüt m² net m²\'den küçük olamaz.');
        return;
      }
    }
    if (requiredFields.length > 0) {
      setValidationError('Lütfen zorunlu alanları doldurun ve tekrar deneyin.');
      return;
    }
    setValidationError('');
    alert('İlan başarıyla oluşturuldu!');
  };

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-black to-black rounded-3xl p-2 shadow-2xl">
      <div className="bg-gray-100 rounded-xl p-4 min-h-[660px] max-h-[680px] overflow-y-auto">
        <div className="flex items-center mb-6">
          <button className="bg-gray-100 border-2 border-gray-300 text-2xl mr-3 text-gray-800 font-black rounded-lg w-10 h-10 flex items-center justify-center">←</button>
          <div>
            <div className="text-lg font-extrabold text-gray-700"><span className="text-gray-700">Konut</span><span className="text-yellow-500">İlan</span><span className="text-gray-700"> Formu</span></div>
            <div className="text-xs text-gray-600">Tüm bilgileri doldurun</div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center"><span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">1</span>Temel Bilgiler</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">İlan Başlığı <span className="text-red-500">*</span></label>
                <textarea value={formData.title} onChange={(e) => { handleInputChange('title', e.target.value); e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }} placeholder="Örn: Merkezi konumda 3+1 satılık daire" maxLength={70} rows={1} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 resize-none overflow-hidden" style={{ minHeight: '36px' }} />
                <div className="text-xs text-gray-500 mt-1">{formData.title.length}/70 karakter</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama <span className="text-red-500">*</span></label>
                <textarea value={formData.description} onChange={(e) => { handleInputChange('description', e.target.value); e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }} placeholder="Mülkünüz hakkında detaylı bilgi verin..." maxLength={2000} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 resize-none overflow-hidden" style={{ minHeight: '96px' }} />
                <div className={`${formData.description.length >= 15 ? 'text-green-600' : 'text-red-500'} text-xs mt-1`}>{formData.description.length}/2000 karakter (en az 15 karakter gerekli)</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (TL) <span className="text-red-500">*</span></label>
                  <input type="text" value={formatNumber(formData.price)} onChange={(e) => handleInputChange('price', e.target.value)} placeholder="850.000" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Aidat (TL)</label>
                  <input type="text" value={formatNumber(formData.monthlyFee)} onChange={(e) => handleInputChange('monthlyFee', e.target.value)} placeholder="350" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ödeme Seçenekleri</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <select value={formData.creditSuitable} onChange={(e) => handleInputChange('creditSuitable', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500">
                      <option value="">Krediye Uygun</option>
                      <option value="Evet">Evet</option>
                      <option value="Hayır">Hayır</option>
                      <option value="Bilinmiyor">Bilinmiyor</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center"><input type="checkbox" checked={formData.swapSuitable} onChange={(e) => handleInputChange('swapSuitable', e.target.checked)} className="mr-2 rounded border-gray-300 text-blue-600" /><span className="text-sm text-gray-700">Takasa Uygun</span></label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center"><span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">2</span>Konum Bilgileri</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">İl <span className="text-red-500">*</span></label>
                <select value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500">
                  <option value="">İl seçin</option>
                  {cities.map(city => (<option key={city} value={city}>{city}</option>))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">İlçe <span className="text-red-500">*</span></label>
                  <select value={formData.district} onChange={(e) => handleInputChange('district', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500" disabled={!formData.city}>
                    <option value="">İlçe seçin</option>
                    {formData.city && districts[formData.city] && districts[formData.city].map(district => (<option key={district} value={district}>{district}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mahalle <span className="text-red-500">*</span></label>
                  <select value={formData.neighborhood} onChange={(e) => handleInputChange('neighborhood', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500" disabled={!formData.district}>
                    <option value="">Mahalle seçin</option>
                    {formData.district && neighborhoods[formData.district] && neighborhoods[formData.district].map(neighborhood => (<option key={neighborhood} value={neighborhood}>{neighborhood}</option>))}
                  </select>
                </div>
              </div>
              <div className="flex justify-center gap-3 mt-4">
                <button type="button" onClick={() => { handleInputChange('city', 'İstanbul'); setTimeout(() => { handleInputChange('district', 'Kadıköy'); setTimeout(() => { handleInputChange('neighborhood', 'Fenerbahçe'); alert('GPS konumunuz alındı ve form dolduruldu!'); }, 100); }, 100); }} className="flex items-center gap-1 text-xs bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors">📍 Bulunduğum Konum</button>
                <button type="button" onClick={() => setShowMapModal(true)} className="flex items-center gap-1 text-xs bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition-colors">🗺️ Haritadan Seç</button>
              </div>
              {showMapModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-4 max-w-md w-full mx-4">
                    <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-semibold">Konum Seçin</h3><button onClick={() => setShowMapModal(false)} className="text-gray-500 hover:text-gray-700">✕</button></div>
                    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4"><div className="text-center"><div className="text-gray-600 mb-4">Harita burada yüklenecek</div><div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto">📍</div></div></div>
                    <div className="flex gap-2"><button onClick={() => { const locations = [{ city: 'İstanbul', district: 'Kadıköy', neighborhood: 'Fenerbahçe' }, { city: 'İstanbul', district: 'Beşiktaş', neighborhood: 'Etiler' }, { city: 'Ankara', district: 'Çankaya', neighborhood: 'Kızılay' }]; const randomLocation = locations[Math.floor(Math.random() * locations.length)]; handleInputChange('city', randomLocation.city); setTimeout(() => { handleInputChange('district', randomLocation.district); setTimeout(() => { handleInputChange('neighborhood', randomLocation.neighborhood); setShowMapModal(false); alert('Konum seçildi!'); }, 100); }, 100); }} className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">Bu Konumu Seç</button><button onClick={() => setShowMapModal(false)} className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors">İptal</button></div>
                  </div>
                </div>
              )}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="flex items-center mb-2"><span className="text-sm font-medium text-gray-700">📍 Seçilen Konum</span></div>
                <div className="text-sm text-gray-600">{formData.city ? [formData.neighborhood, formData.district, formData.city].filter(Boolean).join(', ') : 'Henüz konum seçilmedi'}</div>
              </div>
              <div className="mt-3">
                <label className="flex items-center"><input type="checkbox" checked={formData.isInSite} onChange={(e) => handleInputChange('isInSite', e.target.checked)} className="mr-2 rounded border-gray-300 text-blue-600" /><span className="text-sm text-gray-700">Site içerisinde</span></label>
                {formData.isInSite && (
                  <div className="mt-2 ml-6"><label className="block text-xs font-medium text-gray-700 mb-1">Site adını yazmak ister misiniz?</label><input type="text" value={formData.siteName} onChange={(e) => handleInputChange('siteName', e.target.value)} placeholder="Örn: Anadolu Residence" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500" /></div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center"><span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">3</span>Konut Özellikleri</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">📐 Alan Bilgileri</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div><label className="block text-xs font-medium text-gray-700 mb-1">Net m² <span className="text-red-500">*</span></label><input type="text" value={formatNumber(formData.netArea)} onChange={(e) => handleInputChange('netArea', e.target.value)} placeholder="75" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500" /></div>
                  <div><label className="block text-xs font-medium text-gray-700 mb-1">Brüt m² <span className="text-red-500">*</span></label><input type="text" value={formatNumber(formData.grossArea)} onChange={(e) => handleInputChange('grossArea', e.target.value)} placeholder="85" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500" /></div>
                  <div><label className="block text-xs font-medium text-gray-700 mb-1">Açık Alan m²</label><input type="text" value={formatNumber(formData.openArea)} onChange={(e) => handleInputChange('openArea', e.target.value)} placeholder="25" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500" /></div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">🏠 Oda ve Mekan</h4>
                <div className="mb-3"><label className="block text-xs font-medium text-gray-700 mb-1">Oda Sayısı <span className="text-red-500">*</span></label><select value={formData.rooms} onChange={(e) => handleInputChange('rooms', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"><option value="">Seçin</option><option value="1+0">1+0</option><option value="1+1">1+1</option><option value="2+1">2+1</option><option value="2+2">2+2</option><option value="3+1">3+1</option><option value="3+2">3+2</option><option value="4+1">4+1</option><option value="4+2">4+2</option><option value="5+1">5+1</option><option value="6+1">6+1</option><option value="7+1">7+1</option><option value="8+">8+</option></select></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-medium text-gray-700 mb-1">Mutfak Tipi</label><select value={formData.kitchenType} onChange={(e) => handleInputChange('kitchenType', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"><option value="">Seçin</option><option value="Açık Mutfak">Açık Mutfak</option><option value="Kapalı Mutfak">Kapalı Mutfak</option><option value="Amerikan Mutfak">Amerikan Mutfak</option></select></div>
                  <div><label className="block text-xs font-medium text-gray-700 mb-1">Balkon</label><select value={formData.balconyType} onChange={(e) => handleInputChange('balconyType', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"><option value="">Seçin</option><option value="Balkon Yok">Balkon Yok</option><option value="1 Balkon">1 Balkon</option><option value="2 Balkon">2 Balkon</option><option value="3 Balkon">3 Balkon</option><option value="Teras">Teras</option><option value="Balkon + Teras">Balkon + Teras</option></select></div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3"><div><label className="block text-xs font-medium text-gray-700 mb-1">Banyo Sayısı</label><select value={formData.bathrooms} onChange={(e) => handleInputChange('bathrooms', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"><option value="">Seçin</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div></div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">🏢 Bina Bilgileri</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-xs font-medium text-gray-700 mb-1">Kat Sayısı <span className="text-red-500">*</span></label><select value={formData.buildingFloors} onChange={(e) => handleInputChange('buildingFloors', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"><option value="">Seçin</option>{Array.from({length:15},(_,i)=>i+1).map(n=>(<option key={n} value={String(n)}>{n}</option>))}<option value="15+">15+</option></select></div>
                    <div><label className="block text-xs font-medium text-gray-700 mb-1">Bulunduğu Kat <span className="text-red-500">*</span></label><select value={formData.floor} onChange={(e) => handleInputChange('floor', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"><option value="">Seçin</option>{['Kot 1','Kot 2','Bahçe Katı','Giriş Kat','Yüksek Giriş','Ters Dubleks','Çatı Dubleks','Bodrum','Zemin',...Array.from({length:15},(_,i)=>String(i+1)),'15+'].map(v=>(<option key={v} value={v}>{v}</option>))}</select></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-xs font-medium text-gray-700 mb-1">Bina Yaşı <span className="text-red-500">*</span></label><select value={formData.buildingAge} onChange={(e) => handleInputChange('buildingAge', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"><option value="">Seçin</option>{['0','1','2','3','4','5','6-10','11-15','16-20','21-25','26-30','31+'].map(v=>(<option key={v} value={v}>{v}</option>))}</select></div>
                    <div><label className="block text-xs font-medium text-gray-700 mb-1">Isıtma <span className="text-red-500">*</span></label><select value={formData.heatingType} onChange={(e) => handleInputChange('heatingType', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"><option value="">Seçin</option>{heatingTypes.map(type=>(<option key={type} value={type}>{type}</option>))}</select></div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">📄 Yasal Durum</h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div><label className="block text-xs font-medium text-gray-700 mb-1">Tapu Durumu <span className="text-red-500">*</span></label><select value={formData.deed} onChange={(e) => handleInputChange('deed', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"><option value="">Seçin</option>{deedTypes.map(deed=>(<option key={deed} value={deed}>{deed}</option>))}</select></div>
                  <div><label className="block text-xs font-medium text-gray-700 mb-1">Kullanım Durumu <span className="text-red-500">*</span></label><select value={formData.usageStatus} onChange={(e) => handleInputChange('usageStatus', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"><option value="">Seçin</option><option value="Boş">Boş</option><option value="Kiracılı">Kiracılı</option><option value="Mülk Sahibi">Mülk Sahibi Oturuyor</option></select></div>
                </div>
                <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-medium text-gray-700 mb-1">Zemin Etüdü</label><select value={formData.groundSurvey} onChange={(e) => handleInputChange('groundSurvey', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"><option value="">Seçin</option><option value="Var">Var</option><option value="Yok">Yok</option><option value="Bilinmiyor">Bilinmiyor</option></select></div></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center"><span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">4</span>Detaylı Özellikler</h3>
            <div className="space-y-3">
              {[
                ['location','📍 Konum ve Yön',['Kuzey Cephe','Güney Cephe','Doğu Cephe','Batı Cephe','Deniz Manzara','Şehir Manzara','Doğa Manzara','Cadde Manzara'],'locationFeatures'],
                ['transport','🚗 Otopark ve Ulaşım',['Açık Otopark','Kapalı Otopark','Garaj','Asansör','Metro','Metrobüs','Otobüs Durağı','Taksi Durağı'],'transportFeatures'],
                ['security','🔒 Güvenlik',['24 Saat Güvenlik','Güvenlik Kamerası','Kapıcı','Diafon','Kapalı Devre TV','Alarm Sistemi','Jeneratör','Yangın Merdiveni'],'securityFeatures'],
                ['interior','🏠 İç Özellikler',['Parke Zemin','Laminat Zemin','Seramik Zemin','Mermer Zemin','Şömine','Klima','Spot Işık','Ankastre Mutfak','Buzdolabı','Bulaşık Makinesi','Fırın','Davlumbaz'],'interiorFeatures'],
                ['technology','💻 Teknoloji',['Fiber İnternet','WiFi','Uydu TV','Kablo TV','Akıllı Ev','Akıllı Kilit','Smart TV','Ses Sistemi','Interkom'],'technologyFeatures'],
                ['outdoor','🌳 Dış Özellikler',['Yüzme Havuzu','Kapalı Havuz','Çocuk Havuzu','Sauna','Türk Hamamı','Fitness','Spor Salonu','Çocuk Oyun Alanı','Barbekü','Kamelyalı','Pergola'],'outdoorFeatures']
              ].map(([key,title,items,field]) => (
                <div key={key} className="border border-gray-200 rounded-lg">
                  <button type="button" onClick={() => toggleSection(key)} className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"><span className="text-sm font-medium text-gray-700">{title}</span><span className="text-gray-400">{formData.expandedSections[key] ? '▲' : '▼'}</span></button>
                  {formData.expandedSections[key] && (
                    <div className="border-t border-gray-200 p-3"><div className="grid grid-cols-2 gap-2">{items.map(feature => (
                      <label key={feature} className="flex items-center text-sm"><input type="checkbox" checked={(formData[field]||[]).includes(feature)} onChange={() => toggleFeature(field, feature)} className="mr-2 rounded border-gray-300 text-blue-600" /><span className="text-gray-700">{feature}</span></label>
                    ))}</div></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center"><span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">5</span>İletişim Seçenekleri</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nasıl ulaşılsın?</label>
                <div className="space-y-2">
                  <label className="flex items-center"><input type="checkbox" checked={formData.contactOptions.all} disabled={formData.hidePhoneNumber} onChange={(e) => { if (e.target.checked) { setFormData(prev => ({ ...prev, contactOptions: { all: true, phone: true, whatsapp: true, appMessage: false, siteMessage: true, sms: false } })); } }} className="mr-2 rounded border-gray-300 text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed" /><span className={`${formData.hidePhoneNumber ? 'text-gray-400' : 'text-gray-700'} text-sm font-bold`}>Hepsi</span></label>
                  <label className="flex items-center"><input type="checkbox" checked={formData.contactOptions.phone} disabled={formData.hidePhoneNumber} onChange={(e) => { setFormData(prev => ({ ...prev, contactOptions: { ...prev.contactOptions, all: false, phone: e.target.checked } })); }} className="mr-2 rounded border-gray-300 text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed" /><span className={`${formData.hidePhoneNumber ? 'text-gray-400' : 'text-gray-700'} text-sm`}>Telefon</span></label>
                  <label className="flex items-center"><input type="checkbox" checked={formData.contactOptions.whatsapp} disabled={formData.hidePhoneNumber} onChange={(e) => { setFormData(prev => ({ ...prev, contactOptions: { ...prev.contactOptions, all: false, whatsapp: e.target.checked } })); }} className="mr-2 rounded border-gray-300 text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed" /><span className={`${formData.hidePhoneNumber ? 'text-gray-400' : 'text-gray-700'} text-sm`}>WhatsApp</span></label>
                  <label className="flex items-center"><input type="checkbox" checked={formData.contactOptions.siteMessage} disabled={formData.hidePhoneNumber} onChange={(e) => { if (!formData.hidePhoneNumber) { setFormData(prev => ({ ...prev, contactOptions: { ...prev.contactOptions, all: false, siteMessage: e.target.checked } })); } }} className={`${formData.hidePhoneNumber ? 'cursor-not-allowed' : ''} mr-2 rounded border-gray-300 text-blue-600`} style={formData.hidePhoneNumber ? { opacity: 1 } : {}} /><span className="text-sm text-gray-700">Site İçi Mesaj</span></label>
                </div>
              </div>
              <div>
                <label className="flex items-center"><input type="checkbox" checked={formData.hidePhoneNumber} onChange={(e) => { const newValue = e.target.checked; setFormData(prev => ({ ...prev, hidePhoneNumber: newValue, contactOptions: newValue ? { ...prev.contactOptions, all: false, phone: false, whatsapp: false, siteMessage: true } : prev.contactOptions })); }} className="mr-2 rounded border-gray-300 text-blue-600" /><span className="text-sm text-gray-700">Telefon numaramı gizle</span></label>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center"><span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">6</span>Fotoğraf ve Video</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div onClick={() => alert('Fotoğraf yükleme özelliği aktif edildi!')} className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"><div className="flex flex-col items-center"><div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-1"><span className="text-blue-600 text-sm">📷</span></div><span className="text-xs font-medium text-gray-700">Fotoğraf</span><span className="text-xs text-gray-500">0/20</span></div></div>
                <div onClick={() => alert('360° fotoğraf yükleme özelliği aktif edildi!')} className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-green-400 hover:bg-green-50 transition-colors cursor-pointer"><div className="flex flex-col items-center"><div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-1"><span className="text-green-600 text-sm">🔄</span></div><span className="text-xs font-medium text-gray-700">360° Foto</span><span className="text-xs text-gray-500">0/5</span></div></div>
                <div onClick={() => alert('Video yükleme özelliği aktiv edildi!')} className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-red-400 hover:bg-red-50 transition-colors cursor-pointer"><div className="flex flex-col items-center"><div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mb-1"><span className="text-red-600 text-sm">🎥</span></div><span className="text-xs font-medium text-gray-700">Video</span><span className="text-xs text-gray-500">0/3</span></div></div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg"><div className="text-xs text-gray-600"><div className="font-medium mb-1">Yükleme Kuralları:</div><div>• Fotoğraflar: JPG, PNG formatında, en fazla 10MB</div><div>• Video: MP4 formatında, en fazla 90 saniye</div><div>• İlk fotoğraf kapak resmi olarak kullanılır</div></div></div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"><div className="flex items-start"><div className="text-yellow-600 text-lg mr-2">⏱️</div><div><div className="text-sm font-medium text-yellow-800">Moderatör Onayı</div><div className="text-xs text-yellow-700 mt-1">İlanınız 24 saat içinde incelenerek yayına alınacaktır.</div></div></div></div>
        </div>
        <div className="mt-6 sticky bottom-0 bg-gray-100 pt-4">
          <button onClick={handleSubmit} className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold text-base hover:from-green-600 hover:to-green-700 transition-colors shadow-lg">İlanı Yayınla</button>
          {validationError && (<div className="mt-2 text-center text-sm text-red-600 font-medium">{validationError}</div>)}
          <div className="mt-2 text-center text-xs text-gray-500"><span className="text-red-500">*</span> zorunlu alanları belirtir</div>
        </div>
      </div>
    </div>
  );
};

window.EmlakIlanFormuKonut = EmlakIlanFormuKonut;

