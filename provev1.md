# Kalori Takip Web Uygulaması – FE UI/UX Dokümanı

**Teknoloji:** Vite + React + TailwindCSS
**Kapsam:** Sadece Frontend (API / Backend yok)
**Amaç:** Modern, sade, hızlı bir kalori & fitness takip arayüzü

---

## Genel Tasarım Prensipleri

* Modern SaaS dashboard görünümü
* Card-based yapı
* Soft renkler, bol boşluk (spacing)
* Responsive (desktop öncelikli, mobil uyumlu)
* Dark / Light tema uyumlu

---

## Sayfa Yapısı (Layout)

* **Sol Sidebar**

  * Dashboard
  * Fitness & Antrenman
  * Profil
  * Raporlar
* **Üst Bar**

  * Tarih seçici (Today, Yesterday, Calendar)
  * Profil avatarı

---

## 1️⃣ Dashboard Ekranı

### Üst Alan – İstatistik Kartları

4 adet kart (grid):

* Alınan Kalori
* Yakılan Kalori
* Kalan Kalori
* Günlük Hedef

**Kart Özellikleri:**

* Büyük sayı + küçük açıklama
* Icon destekli
* Progress bar (kalan kalori için)

### Hedef Kilo Grafiği

* Line chart
* Mevcut kilo vs hedef kilo
* Basit, sade tooltip

### Alt Alan – Kanban Öğün Sistemi

4 kolon (horizontal scroll destekli):

* Sabah
* Öğle
* Akşam
* Ara Öğün

**Her Kolon:**

* Besin kartları
* Kalori bilgisi
* Ekle (+) / Sil (×)
* Tarihe göre state (local state)

---

## 2️⃣ Fitness & Antrenman Ekranı

### Haftalık Program Tablosu

* Satırlar: Günler (Pzt–Paz)
* Kolonlar:

  * Antrenman Adı
  * Süre
  * Not

**UI:**

* Table + card karışımı
* Editable input alanları
* Haftalık görünüm sabit

---

## 3️⃣ Profil Ekranı

### Kişisel Bilgiler

* Boy (cm)
* Kilo (kg)
* Vücut ölçüleri (bel, göğüs, kalça)
* Not alanı

**UI:**

* Form tabanlı
* Section’lara ayrılmış
* Minimal input tasarımı

---

## 4️⃣ Raporlar Ekranı

### Grafikler

* Kilo değişimi (Line Chart)
* Günlük alınan kalori (Bar Chart)
* Makro / oran dağılımı (Pie Chart)

**UI:**

* Kart içinde grafikler
* Filtre: Günlük / Haftalık / Aylık

---

## Component Yapısı (Özet)

* Layout

  * Sidebar
  * Topbar
* UI

  * StatCard
  * MealCard
  * ChartCard
* Pages

  * Dashboard
  * Fitness
  * Profile
  * Reports

---

## State Yönetimi (Şimdilik)

* React useState
* Tarihe göre local state
* Mock data ile çalışılacak

---

## Tasarım Dili

* Tailwind utility-first
* Rounded-xl cardlar
* Soft shadow
* Inter / Poppins font

---

## Bu Aşamada Yapılmayacaklar

* Backend
* Auth
* API bağlantıları
* Gerçek veri entegrasyonu

---

> Bu doküman Cursor içinde direkt geliştirmeye başlamak için hazırlanmıştır.
