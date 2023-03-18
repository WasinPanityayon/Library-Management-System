# Library-Management-System (LMS)
## Link Demo video
- https://www.youtube.com/watch?v=fKKgs8M6Dig
## เกี่ยวกับโปรเจค
เว็บแอปพลิเคชันนี้เป็นการเว็บไซต์จัดการหนังสือห้องสมุดที่ใช้ชื่อว่า LMS โดยในโปรเจคจะใช้การเขียนแบบ MERN Stack (MongoDB, Express, React and NodeJS) โดยจะแยกการทำงานออกเป็นสองโปรเจคหลักคือ 
- Library Management System [BACKEND] โดยในส่วนนี้จะใช้ Express NodeJS และ MongoDB เป็นหลักรับผิดชอบและจัดทำโดย นายวศิน พานิชยายนต์ 6310110444
- Library Management System [FRONTEND] โดยในส่วนนี้จะใช้ React Redux และ NodeJS เป็นหลัก รับผิดชอบและจัดทำโดย นายภคพล สงสุรินทร์ 6310110345 และ นายพชรพล ปวีณานันท์ 6310110643


## ระบบภายในเว็บไซต์
- Sign up  โดยจะขอเก็บข้อมูลคือชื่อจริง นามสกุล ชื่อผู้ใช้ และรหัสผ่าน โดยในส่วนของรหัสผ่าน มีการ Hash ไว้เพื่อความปลอดภัยของรหัสผ่านหลังจาก Sign up แล้วระบบจะ Sign in ให้ทันที
- Sign in โดยต้องกรอกชื่อผู้ใช้ รหัสผ่าน และจะมี Trust This Device เพื่อให้ระบบจดจำ Token ของเครื่องนี้ไว้ว่าให้คงอยู่ในระบบตลอดไป หากไม่มีการติ๊ก ระบบจะตัดการเชื่อมต่อหากมีการ Refresh เว็ปไซต์มีรหัสผ่านให้ทดสอบใช้ดังนี้ ( admin : admin@1234 , librarian : lib@1234 , user : user@ 1234 ) โดยสามารถเชื่อมเข้าถึง Database ได้จากไฟล์ env ที่ commit ไว้ได้เลย

    [สิทธิ์เพิ่มเติมเมื่อ Sign in]
- User จะเห็นเพียง Menu ฺ(Books, Users)
- Librarian จะเห็นเพียง Menu (Books, Users) แต่จะสามารถเพิ่มหลังสือ แก้ไขหนังสือ และลบหนังสือได้
- Admin จะเห็น Menu (Books, Settings, Users) จะสามารถทำได้ทุกอย่างรวมถึงแก้ Role ของ User ทุกคน เพิ่ม ลบ แก้ไข ผู้ใช้ได้

    [หลังจาก Sign in]
- Books เป็น Menu ดูรายการหนังสือสามารถกดที่หนังสือเพื่อดูรายละเอียดเพิ่มเติมของหนังสือนั้นๆได้ จะมี Menu ย่อย ๆ สำหรับ Librarian และ Admin คือ New Edit และ Delete และ Search Bar สำหรับทุก Role สามารถเสริชแบบ Real time ได้เลย
- Settings เป็น Menu สำหรับ Admin ที่สามารถดูตารางหนังสือ และ ผู้ใช้ทั้งหมด รวมถึง เพิ่ม แก้ไข ลบ ดูและเปลี่ยนแปลงข้อมูลได้ทั้งหมด แต่สิ่งเดียวที่ไม่เห็นแต่สามารถแก้ไขได้คือ Password
- Users เป็น Menu ที่สามารถเห็นได้ทุกคน โดยจะแสดงข้อมูลส่วนบุคคลของตัวผู้ใช้เอง สามารถแก้ไขข้อมูลส่วนตัวได้ และ เลือกได้ว่าจะเปลี่ยนรหัสผ่านหรือไม่หากไม่เปลี่ยนสามารถบันทึกข้อมูลได้เลย หากเปลี่ยนเพียงแค่กรอกรหัสผ่านใหม่
- Log out ออกจากระบบ

[ระบบเบื้องหลัง]

-   มีระบบ middleware ที่สามารถเก็บ log การ request ขอเชื่อมต่อเข้ามาของ user มี log error ที่เก็บ log การขอเชื่อมต่อที่ต้องสงสัยหรือไม่มี permission ได้ error log Database กรณีที่เชื่อมต่อ Database ไม่ได้

## Backend
Library ที่ใช้งาน

- bcrypt สำหรับเข้ารหัสและถอดรหัส นำมาใช้กับ password
- cookie-parser สำหรับอ่านและเขียน cookie 
- cors เป็นการป้องกันการเข้าถึง Cross-Origin Resource Sharing
- date-fns สำหรับเวลา
- dotenv อ่านไฟล์ .env
- express ใช้เป็บเว็ปแอปพลิเคชั้นฝั่ง Backend Serfver
- express-async-errors สำหรับจัดการข้อผิดพลาด
- express-rate-limit จำกัดการเข้าถึงจาก IP โดยในที่นี้ใช้ จำกัด Sign in ผิดพลาด ได้ 5 ครั้ง delay 1 นาที
- jsonwebtoken สร้างและเก็บ Token
- mongoose เชื่อมต่อ mongoDB
- mongoose-sequence จัดการลำดับใน mongoDB
- uuid สร้าง Universal Unique Identifier (UUID)

## Frontend
Library ที่ใช้งาน

- jwt-decode สำหรับการถอดรหัส JSON Web Token (JWT)
- react
- react-dom สำหรับการแสดงผล React component บนหน้าเว็บ
- react-redux ไลบรารีสำหรับการเชื่อมต่อ react redux กับ server ในที่นี้คือ Database
- react-router-dom จัดการการ Route ใน React
- react-scripts
- react-spinners icon ที่ใช้แสดง loading
- react-toastify สำหรับแสดง notification
- web-vitals

## สมาชิก
6310110444 นายวศิน พานิชยายนต์

6310110345 นายภคพล สงสุรินทร์

6310110643 นายพชรพล ปวีณานันท์
