import React from 'react';

export default function CookiePolicyPage() {
    return (
        <div className="bg-soft-white min-h-screen py-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-bold text-navy mb-8">ÇEREZ POLİTİKASI</h1>
                <p className="text-gray-500 mb-8">Son Güncelleme: {new Date().getFullYear()}</p>

                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 space-y-8">

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">1. Çerez (Cookie) Nedir?</h2>
                        <p className="text-text-gray leading-relaxed">
                            Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınız aracılığıyla cihazınıza veya ağ sunucusuna depolanan küçük metin dosyalarıdır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">2. Kullanım Amacı ve Türleri</h2>
                        <p className="text-text-gray leading-relaxed mb-4">
                            Web sitemizde, ziyaretçilerimize daha iyi bir deneyim sunmak ve hizmet kalitemizi artırmak amacıyla çerezler kullanılmaktadır.
                        </p>
                        <ul className="list-disc list-inside text-text-gray space-y-4 ml-4">
                            <li>
                                <strong>Zorunlu Çerezler:</strong> Web sitesinin teknik olarak çalışabilmesi için gereklidir. Bu çerezler olmadan site düzgün görüntülenemez. Herhangi bir kişisel veri barındırmazlar.
                            </li>
                            <li>
                                <strong>Analitik Çerezler (İsteğe Bağlı):</strong> Sitemizin nasıl kullanıldığını analiz etmemize ve geliştirmemize yardımcı olan, kimliğinizi doğrudan tespit etmeyen anonim veriler toplayan çerezlerdir. Bu çerezler ancak sizin onayınız ("Kabul Et") halinde aktif olur.
                            </li>
                        </ul>
                        <p className="text-text-gray leading-relaxed mt-4">
                            Sitemizde ürün satışı, üyelik sistemi veya kişiselleştirilmiş reklam/pazarlama faaliyeti bulunmadığından, bu amaçlara yönelik çerezler kullanılmamaktadır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">3. Çerez Yönetimi</h2>
                        <p className="text-text-gray leading-relaxed">
                            İnternet tarayıcınızın ayarlarını kullanarak dilediğiniz zaman çerezleri silebilir veya engelleyebilirsiniz. Ancak zorunlu çerezlerin engellenmesi durumunda web sitesi beklendiği gibi çalışmayabilir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">4. İletişim</h2>
                        <p className="text-text-gray leading-relaxed">
                            Çerez kullanımı hakkında daha fazla bilgi almak isterseniz <a href="mailto:info@doubletsoft.com" className="text-accent-blue hover:underline">info@doubletsoft.com</a> adresi üzerinden bizimle iletişime geçebilirsiniz.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
