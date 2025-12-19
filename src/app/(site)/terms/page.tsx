import React from 'react';

export default function TermsPage() {
    return (
        <div className="bg-soft-white min-h-screen py-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-bold text-navy mb-8">KULLANIM KOŞULLARI</h1>
                <p className="text-gray-500 mb-8">Son Güncelleme: {new Date().getFullYear()}</p>

                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 space-y-8">

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">1. Genel Hükümler</h2>
                        <p className="text-text-gray leading-relaxed">
                            Bu web sitesi, Double T Soft (“Şirket”) tarafından yalnızca tanıtım ve bilgilendirme amaçlı hazırlanmıştır.
                            Sitemizi ziyaret eden kullanıcılar, işbu kullanım koşullarını kabul etmiş sayılır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">2. Hizmet Kapsamı</h2>
                        <p className="text-text-gray leading-relaxed">
                            Web sitemizde yer alan bilgiler, görseller ve içerikler tamamen genel bilgilendirme niteliğindedir.
                            Sitemiz üzerinden doğrudan bir ürün satışı, üyelik sistemi veya ödeme işlemi gerçekleştirilmemektedir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">3. Sorumluluk Reddi</h2>
                        <p className="text-text-gray leading-relaxed">
                            Şirketimiz, web sitesindeki içeriklerin güncelliği veya doğruluğu konusunda azami özeni göstermekle birlikte, olası hatalardan veya eksikliklerden dolayı sorumlu tutulamaz.
                            Sitedeki bilgiler önceden haber verilmeksizin değiştirilebilir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">4. Fikri Mülkiyet</h2>
                        <p className="text-text-gray leading-relaxed">
                            Web sitemizde yer alan tüm metinler, görseller, logolar ve tasarımlar Double T Soft’a aittir veya lisanslı olarak kullanılmaktadır.
                            İzinsiz kopyalanması, çoğaltılması veya ticari amaçla kullanılması yasaktır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-navy mb-4">5. İletişim</h2>
                        <p className="text-text-gray leading-relaxed">
                            Kullanım koşulları hakkında sorularınız veya talepleriniz için <a href="mailto:info@doubletsoft.com" className="text-accent-blue hover:underline">info@doubletsoft.com</a> adresi üzerinden bizimle iletişime geçebilirsiniz.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
