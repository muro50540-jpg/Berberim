KADİR PAK HAİR STÜDİO — FİNAL SÜRÜM

Bu paket GitHub Pages + Firebase Firestore için hazırlanmıştır.

DOSYALAR
- index.html: karşılama ekranı
- customer.html: müşteri randevu ekranı
- admin.html: yönetici paneli
- style.css: ortak profesyonel tasarım
- firestore.rules: Firestore güvenlik kuralları

GITHUB
1) Bu paketin TÜM dosyalarını GitHub reposunun ana dizinine yükleyin.
2) main branch üzerinde olduklarını kontrol edin.
3) Settings > Pages bölümünde yayın kaynağı olarak main / root seçili olsun.
4) Yayından sonra adresiniz: https://muro50540-jpg.github.io/Berberim/

FIREBASE — ZORUNLU
1) Firebase Console > Authentication > Sign-in method
2) Email/Password = Etkin
3) Anonymous = Etkin
4) Authentication > Users > Add user
   E-posta: kadirpak@gmail.com
   Şifre: kadir123
5) Firestore Database oluşturulmuş olmalı.
6) Firestore > Rules bölümüne bu paketteki firestore.rules içeriğini yapıştırıp Publish yapın.

ÖNEMLİ
- Müşteri saatleri herkese okunabilir; dolu saatler otomatik kapanır.
- Aynı saat iki kişiye verilemez; kayıt Firebase transaction ile korunur.
- Müşteri randevuyu oluştururken anonim giriş kullanır.
- Yönetici paneli sadece kadirpak@gmail.com ile açılır.
- İptal veya silinen randevunun saati tekrar boşalır.
- Yönetici panelinden şifre değiştirme ve “Şifremi unuttum” vardır.
- Damat Tıraşı için fiyat verilmediği için satışa kapalı bırakılmıştır; fiyat belirlendiğinde kodda değiştirilebilir.

RENKLENDİRME / CSS KONTROLÜ
customer.html, admin.html ve index.html dosyalarının head bölümünde şu bağlantı bulunmalıdır:
<link rel="stylesheet" href="style.css">

NOT
Firebase ayarları GitHub Pages üzerinde frontend içinde görünür. Bu tek başına gizli bilgi değildir; asıl güvenlik Firestore/Auth kuralları ile sağlanır.
