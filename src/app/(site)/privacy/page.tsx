import React from 'react';

export default function PrivacyPage() {
    return (
        <div className="bg-soft-white min-h-screen py-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-bold text-navy mb-8">GİZLİLİK POLİTİKASI</h1>

                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 space-y-8">

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">1. Genel Bilgilendirme</h2>
                        <p className="text-text-gray leading-relaxed">
                            Double T Soft (“Şirket”, “Biz”) olarak, web sitemizi ziyaret eden kullanıcılarımızın (“Ziyaretçi”) gizliliğine önem veriyoruz.
                        </p>
                        <p className="text-text-gray leading-relaxed mt-2">
                            Bu Gizlilik Politikası, web sitemiz üzerinden toplanan kişisel verilerin neler olduğunu ve hangi amaçlarla işlendiğini açıklamaktadır. Web sitemiz yalnızca tanıtım ve bilgilendirme amaçlıdır; herhangi bir üyelik, satış veya ödeme işlemi bulunmamaktadır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">2. Toplanan Veriler</h2>
                        <p className="text-text-gray leading-relaxed mb-4">
                            Web sitemizde hesap oluşturma veya kayıt olma zorunluluğu yoktur.
                        </p>
                        <p className="text-text-gray leading-relaxed mb-4">
                            Sadece İletişim Formu aracılığıyla bizimle iletişime geçtiğinizde, size geri dönüş yapabilmek amacıyla aşağıdaki bilgiler toplanmaktadır:
                        </p>
                        <ul className="list-disc list-inside text-text-gray space-y-2 ml-4">
                            <li>Ad ve Soyad</li>
                            <li>E-posta Adresi</li>
                            <li>İletilen mesaj içeriği</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">3. Verilerin Kullanım Amacı</h2>
                        <p className="text-text-gray leading-relaxed">
                            İletişim formu üzerinden elde edilen kişisel veriler yalnızca aşağıdaki amaçlarla işlenmektedir:
                        </p>
                        <ul className="list-disc list-inside text-text-gray space-y-2 ml-4 mt-2">
                            <li>Kullanıcı taleplerine yanıt vermek</li>
                            <li>İletilen mesajlara geri dönüş sağlamak</li>
                        </ul>
                        <p className="text-text-gray leading-relaxed mt-4">
                            Toplanan veriler; reklam, pazarlama veya ticari amaçlarla kullanılmaz, üçüncü kişilerle paylaşılmaz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">4. Çerezler</h2>
                        <p className="text-text-gray leading-relaxed">
                            Web sitemizin teknik olarak düzgün çalışmasını sağlamak ve anonim ziyaretçi istatistiklerini takip edebilmek amacıyla zorunlu ve anonim çerezler kullanılabilir.
                        </p>
                        <p className="text-text-gray leading-relaxed mt-2">
                            Bu çerezler, ziyaretçilerin kimliğini doğrudan tespit etmeye yönelik değildir. Dilerseniz tarayıcı ayarlarınız üzerinden çerez kullanımını engelleyebilirsiniz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">5. KVKK Kapsamında Haklarınız</h2>
                        <p className="text-text-gray leading-relaxed">
                            6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında; kişisel verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini isteme ve silinmesini talep etme haklarına sahipsiniz.
                        </p>
                        <p className="text-text-gray leading-relaxed mt-4">
                            Kişisel verilerinizin silinmesine ilişkin taleplerinizi <a href="mailto:info@doubletsoft.com" className="text-accent-blue hover:underline">info@doubletsoft.com</a> adresi üzerinden iletebilirsiniz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">6. İletişim</h2>
                        <p className="text-text-gray leading-relaxed">
                            Bu Gizlilik Politikası hakkında sorularınız için bizimle iletişime geçebilirsiniz.
                        </p>
                        <div className="mt-4 text-text-gray">
                            <p className="font-bold">Double T Soft</p>
                            <p>E-posta: <a href="mailto:info@doubletsoft.com" className="text-accent-blue hover:underline">info@doubletsoft.com</a></p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
