import React from 'react';

export default function KvkkPage() {
    return (
        <div className="bg-soft-white min-h-screen py-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">KVKK AYDINLATMA METNİ</h1>
                <p className="text-gray-500 mb-8">Kişisel Verilerin Korunması Kanunu Aydınlatma Metni</p>

                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 space-y-8">

                    <section>
                        <p className="text-text-gray leading-relaxed">
                            Double T Soft (“Veri Sorumlusu”) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında, web sitemizi ziyaret eden kullanıcıların kişisel verilerinin gizliliğine önem veriyoruz.
                        </p>
                        <p className="text-text-gray leading-relaxed mt-2">
                            Bu metin, web sitemiz üzerinden toplanan kişisel verilerin hangi amaçlarla işlendiği konusunda sizleri bilgilendirmek amacıyla hazırlanmıştır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">1. İşlenen Kişisel Veriler</h2>
                        <p className="text-text-gray leading-relaxed mb-4">
                            Web sitemiz üzerinden yalnızca iletişim formu aracılığıyla, kullanıcılar tarafından gönüllü olarak paylaşılan aşağıdaki kişisel veriler işlenmektedir:
                        </p>
                        <ul className="list-disc list-inside text-text-gray space-y-2 ml-4">
                            <li>Ad ve Soyad</li>
                            <li>E-posta adresi</li>
                            <li>Kullanıcı tarafından iletilen mesaj içeriği</li>
                        </ul>
                        <p className="text-text-gray leading-relaxed mt-4">
                            Web sitemizde üyelik sistemi, satış, ödeme veya kullanıcı hesabı bulunmamaktadır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">2. Kişisel Verilerin İşlenme Amaçları</h2>
                        <p className="text-text-gray leading-relaxed mb-4">
                            Toplanan kişisel veriler, aşağıdaki amaçlarla sınırlı olmak üzere işlenmektedir:
                        </p>
                        <ul className="list-disc list-inside text-text-gray space-y-2 ml-4">
                            <li>Kullanıcı taleplerine yanıt verilmesi</li>
                            <li>İletilen mesajlara geri dönüş sağlanması</li>
                            <li>İletişim faaliyetlerinin yürütülmesi</li>
                        </ul>
                        <p className="text-text-gray leading-relaxed mt-4">
                            Kişisel veriler reklam, pazarlama veya tanıtım amaçlı kullanılmaz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">3. Kişisel Verilerin Aktarılması</h2>
                        <p className="text-text-gray leading-relaxed mb-2">
                            Toplanan kişisel veriler:
                        </p>
                        <ul className="list-disc list-inside text-text-gray space-y-2 ml-4">
                            <li>Üçüncü kişilere aktarılmaz</li>
                            <li>Satılmaz</li>
                            <li>Kiralanmaz</li>
                        </ul>
                        <p className="text-text-gray leading-relaxed mt-4">
                            Ancak, ilgili mevzuat kapsamında yasal yükümlülüklerin yerine getirilmesi amacıyla yetkili kamu kurum ve kuruluşlarıyla paylaşılabilir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">4. Kişisel Verilerin Saklama Süresi</h2>
                        <p className="text-text-gray leading-relaxed">
                            Kişisel veriler, işlenme amacının gerektirdiği süre boyunca saklanmakta olup, ilgili talebin sonuçlanmasının ardından silinmekte, yok edilmekte veya anonim hale getirilmektedir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">5. KVKK Kapsamındaki Haklarınız</h2>
                        <p className="text-text-gray leading-relaxed mb-4">
                            KVKK’nın 11. maddesi uyarınca veri sahipleri;
                        </p>
                        <ul className="list-disc list-inside text-text-gray space-y-2 ml-4">
                            <li>Kişisel verilerinin işlenip işlenmediğini öğrenme</li>
                            <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                            <li>Yanlış veya eksik işlenmişse düzeltilmesini isteme</li>
                            <li>İşlenme amacının ortadan kalkması halinde silinmesini veya yok edilmesini talep etme</li>
                        </ul>
                        <p className="text-text-gray leading-relaxed mt-4">
                            haklarına sahiptir.
                        </p>
                        <p className="text-text-gray leading-relaxed mt-4">
                            Bu haklara ilişkin taleplerinizi <a href="mailto:info@doubletsoft.com" className="text-accent-blue hover:underline">info@doubletsoft.com</a> adresi üzerinden bize iletebilirsiniz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">6. Veri Sorumlusu Bilgileri</h2>
                        <div className="text-text-gray">
                            <p className="font-bold">Veri Sorumlusu: Double T Soft</p>
                            <p>E-posta: <a href="mailto:info@doubletsoft.com" className="text-accent-blue hover:underline">info@doubletsoft.com</a></p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
