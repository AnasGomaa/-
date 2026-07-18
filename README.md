# منصة Bonus & Minus لإدارة نقاط الطلاب

مشروع Next.js 15 عربي جاهز كبداية إنتاجية لمنصة إدارة نقاط الطلاب داخل الفصل. يحتوي على لوحة معلم، لوحة طالب، لوحة شرف، إنجازات، مستويات XP، مكافآت، سجل عمليات، تصدير Excel/PDF، PWA، وطبقة Firebase جاهزة للتفعيل.

## التشغيل المحلي

1. ثبّت الحزم:

```bash
npm install
```

2. شغّل المشروع:

```bash
npm run dev
```

3. افتح:

```text
http://localhost:3000
```

## بيانات التجربة

تعمل المنصة مباشرة ببيانات محلية داخل `lib/sample-data.ts`.

- دخول المعلم: زر "دخول المعلم" من الصفحة الرئيسية.
- دخول الطالب: الكود `STU-1010` وكلمة المرور `123456`.
- يوجد 10 طلاب جاهزون للتجربة.

## إعداد Firebase

1. أنشئ مشروع Firebase وفعل:
   - Authentication
   - Firestore Database
   - Firebase Storage

2. انسخ `.env.example` إلى `.env.local` وضع مفاتيح Firebase.

3. انشر قواعد Firestore وStorage من:
   - `firestore/firestore.rules`
   - `firestore/storage.rules`

4. يمكن استخدام `scripts/seed-firestore.ts` كبداية لرفع البيانات التجريبية بعد إعداد بيئة تشغيل TypeScript مثل `tsx`.

## الصفحات

- `/` الصفحة الرئيسية.
- `/teacher` لوحة تحكم المعلم.
- `/student` لوحة الطالب الخاصة.
- `/honor` لوحة الشرف العامة.

## ملاحظات إنتاجية

- قواعد Firebase تفصل صلاحيات `admin` و`teacher` و`student`.
- صور الطلاب التجريبية تستخدم DiceBear ويمكن استبدالها بصور Firebase Storage.
- التصدير إلى Excel وPDF يعمل من لوحة إدارة الطلاب.
- الـ PWA يعمل في وضع الإنتاج بعد `npm run build && npm run start`.

## أوامر مفيدة

```bash
npm run typecheck
npm run build
npm run start
```
