# LIONX Reference Audit

## Scope reviewed

تمت مراجعة ملفات handover وblueprints وbacklog والملاحظات المرفقة، إضافة إلى نسخ WebDev المرجعية read-only. هذه المواد لا تعدّل المشروع الحالي تلقائيًا؛ هي مراجع فقط.

## Reference decisions worth carrying forward

المرجع الأقوى لتجربة الويب هو `LIONX_MASTER_HANDOFF_PACKAGE.md` و`LIONX_Handoff_Report_For_Developers.md` و`lionx_site_report.md`. وهي تثبت أن المنتج المقصود هو **مول رقمي فاخر + وكالة تسويق** مع مسارين B2B وB2C، بهوية Luxury Fintech Glass / Black & Gold، وكتالوج منظم إلى 15 فئة و5 مسارات تسويقية كبرى.

التدفقات التي يجب أن تكون هدف النسخة النهائية هي: Home، Departments Mall، Department/Section، Service Detail، Cart، Checkout، Order Success، Track Order، Quote Builder للشركات، LIONXPAY، Payment Methods، Account، Affiliate، Wishlist، Blog، Academy، Tools، Contact، Policies، وAdmin Operations. النسخة الجوالة الحالية تغطي جزءًا أساسيًا فقط من هذه القائمة.

## Critical product rules from references

لا ندّعي دفعًا إلكترونيًا مكتملًا دون مزود دفع وWebhook موثوق. checkout الحالي أو النسخة التجريبية يجب أن تسجل طلبًا مبدئيًا أو تحويلًا للمراجعة اليدوية. طلبات B2B الائتمانية يجب أن تمر بمراجعة/‏KYC ولا تعتبر موافقة تلقائية. لا نستخدم أرقام عملاء أو نتائج تسويقية مختلقة. يجب إبقاء طرق الدفع والأرقام الرسمية في ثابت مركزي بعد اعتمادها من المستخدم.

## Architecture comparison

النسخ المرجعية القديمة هي مشاريع React/Vite/Web منفصلة مع routing متعدد الصفحات وtRPC/Drizzle، وبعضها يحتوي على وحدات Backend متقدمة. المشروع الحالي المعتمد هو Expo/React Native في `/home/ubuntu/lionx-mobile` ويعمل للجوال وExpo Web من قاعدة كود واحدة. لذلك ننقل **المنتج والتدفقات وأسماء الصفحات** تدريجيًا إلى المشروع الحالي، ولا نخلط ملفات Vite وExpo أو ننشئ نسخة ثانية دون قرار صريح.

## Conflicts and reliability notes

تختلف الملفات المرجعية في نسب الإنجاز، أسماء النطاقات، أرقام الاتصال، أرقام الخدمات، ومسارات الإدارة. لا نعتمد النسبة الأعلى أو العبارة «جاهز 100%» تلقائيًا. نعتمد ما يمكن التحقق منه في الكود الحالي، ونضع أي معلومات تشغيلية أو مالية تحتاج تأكيدًا في قائمة أسئلة قبل الإنتاج.

ملف `LIONX_EXECUTION_BACKLOG.md` يذكر عوائق Enterprise مثل Pricing Engine وOrganization/Role/Permission وnamespace routing. هذه عوائق صحيحة لمسار Enterprise/production، لكنها ليست سببًا لخلط بنية المشروع الجوال الحالية. تُسجل كحزمة لاحقة بعد تثبيت نطاق MVP.

## Canonical decision

المشروع الوحيد الذي نعدّله الآن هو `/home/ubuntu/lionx-mobile`. المراجع الأخرى read-only أو أرشيفية. الخطوة التنفيذية التالية هي توسيع النسخة الحالية بأعلى حزمة قيمة: هيكل المول الخماسي ومسارات B2B/B2C وصفحات القطاعات، مع إبقاء الدفع تجريبيًا وشفافًا.

## Sources reviewed

- `/home/ubuntu/upload/LIONX_PROJECT_HANDOVER_REPORT.md`
- `/home/ubuntu/upload/v10_blueprint.md`
- `/home/ubuntu/upload/v11_blueprint.md`
- `/home/ubuntu/upload/lionx_mall_findings.md`
- `/home/ubuntu/upload/LIONX_EXECUTION_BACKLOG.md`
- `/home/ubuntu/upload/LIONX_ENTERPRISE_AUDIT.md`
- `/home/ubuntu/upload/LIONX_MASTER_HANDOFF_PACKAGE.md`
- `/home/ubuntu/upload/LIONX_Comprehensive_Documentation_And_AI_Guide.md`
- `/home/ubuntu/upload/LIONX_Handoff_Report_For_Developers.md`
- `/home/ubuntu/upload/lionx_site_report.md`
- `/home/ubuntu/upload/lionx_link_diagnostics.md`
- `/home/ubuntu/upload/PROJECT_STATUS.md`
