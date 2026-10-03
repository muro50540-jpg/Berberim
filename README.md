# Berber Randevu Sistemi — V1

Bu proje GitHub Pages üzerinde çalışabilecek ilk prototiptir.

## Paneller

- `index.html` — giriş
- `customer.html` — müşteri randevu paneli
- `admin.html` — yönetici paneli

## V1 özellikleri

- Hizmet seçimi
- Berber seçimi
- 14 günlük tarih seçimi
- Saat seçimi
- Dolu saatlerin pasif gösterilmesi
- Müşteri adı ve telefon bilgisi
- Randevu oluşturma
- Yönetici panelinde randevular
- Hizmet ve berber listeleri
- Günlük randevu / ciro istatistikleri
- Mobil uyumlu tasarım

## Önemli

Bu ilk sürümde veriler `localStorage` ile aynı tarayıcıda tutulur. Bu nedenle henüz gerçek müşterilerin ortak kullanacağı üretim sistemi değildir.

### Sonraki aşama

Firebase eklenerek:

- Gerçek veritabanı
- Yönetici girişi
- Müşteri hesabı / güvenli randevu takibi
- Gerçek zamanlı randevu dolulukları
- Randevu iptal / düzenleme
- Çalışma saatleri
- Hizmet ve fiyat yönetimi
- WhatsApp / bildirim altyapısı

eklenecektir.

## GitHub Pages

Repository oluşturduktan sonra:
Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.

Birkaç dakika sonra GitHub Pages adresinden açılabilir.
