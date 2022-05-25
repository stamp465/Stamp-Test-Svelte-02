# To Run This Project

```bash
# clone
git clone https://github.com/stamp465/-Stamp-Test-Svelte-02.git Stamp-Test-Svelte-02

#install module
cd Stamp-Test-Svelte-02
npm install

#for graphql (ด้านบน น่าจะลงมาให้แล้ว)
npm i @urql/svelte --save
```

# To Run Fauna
สร้างไฟล์ .env ที่ภายในประกอบด้วย (ทำจาก Security > Keys > New Key)
```bash
VITE_PUBLIC_FAUNA_KEY=<Fauna Public Key>
FGU_SECRET=<Your Admin Key>
```
ติดตั้ง fauna for authentication 
```bash
npm i @fauna-labs/graphql-tool fauna-gql-upload --save-dev
```
สร้าง schema
```bash
npm run fgt
npm run fgu
```