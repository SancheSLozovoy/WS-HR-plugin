# Инструкция по развороту Плагина

## Требования

- Установленный [Node.js](https://nodejs.org/) (v20.x)
- Установленный [npm](https://www.npmjs.com/) или [yarn](https://yarnpkg.com/)
- Установленный [yalc](https://github.com/alyssaxuu/yalc) для связывания плагина с Strapi



## Шаг 1: Установка и настройка Strapi

1. **Склонируйте серверную часть Strapi**:
```bash
git clone https://github.com/SancheSLozovoy/WS-HR-admin.git
cd path/WS-HR-admin
```

2. **Создайте файл `.env` для конфигурации**:

Создайте файл `.env` в корне проекта и добавьте настройки подключения:

```javascript
HOST=0.0.0.0
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified
```
3. **Установите зависимости**
```bash
npm i
```


## Шаг 2: Установка плагина
1. **Склонируйте репозиторий проекта**:

```bash
git clone https://github.com/SancheSLozovoy/WS-HR-plugin.git
cd path/WS-HR-plugin
```

2. **Установите зависимости**:
```bash
npm install
```

3. **Связать плагин с Strapi с помощью yalc**:
   - Сначала установите `yalc`, если он не установлен:
```bash
npm install -g yalc
```

   - В директории вашего плагина выполните команды:
```bash
npm run build
npm i
yalc publish
```

   - Затем вернитесь в директорию Strapi и выполните команду для установки плагина:
```bash
cd path/WS-HR-admin
yalc add ws-hr
npm install
 ```

4. **Запустите Strapi**:
```bash
npm run develop --watch-admin
```

## Шаг 3: Настройка и использование

1. **Создайте нового администратора**:
   Перейдите в браузер по адресу `http://localhost:1337/admin` и авторизуйтесь

2. **Настройка плагина**:
   Перейдите в меню настроек. В разделе USERS & PERMISSIONS PLUGIN выберете Roles/Public. В разделе Permissions укажите все разрешения для Specialt, Task, Task-link.

3. **Добавление контента**
   Перейдите в меню Content Manager. В каждую из сущностей добавьте хотя бы одну запись.
