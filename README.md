# 🖥️ Project Manager Dashboard (Angular)

Frontend для сервиса управления проектами и задачами (Kanban).  
Backend: **Go + Ent ORM + PostgreSQL + Chi** — [project-manager-dashboard-go](https://github.com/donuwave/project-manager-dashboard-go).

![Angular](https://img.shields.io/badge/Angular_20-DD0031?style=flat&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=flat&logo=reactivex&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat&logo=sass&logoColor=white)
![Go](https://img.shields.io/badge/backend-Go-00ADD8?style=flat&logo=go&logoColor=white)

![Статус](https://img.shields.io/badge/статус-в_разработке-orange?style=flat)

> [!NOTE]
> **Сейчас:** авторизации нет — текущий пользователь выбирается из списка, это демо-режим.
> **В планах:** вход по логину и паролю, раздел сообщений.

---

## ✨ Возможности

### Проекты
- Список проектов
- Просмотр проекта (участники + задачи)
- Редактирование проекта (name/description)
- Приглашение пользователя в проект
- Удаление проекта (только owner)

### Kanban / Задачи
- Kanban-доска: **Todo / In Progress / Done**
- Создание задачи в проекте
- Обновление задачи (PATCH)
- Перетаскивание задач между колонками (меняет `status`)
- Перетаскивание задач внутри колонки (меняет `position`)
- Удаление задачи (только owner проекта)
- Назначение задачи пользователю / на себя (если включено на бэке)
- Получение assignee в списке задач (если включено на бэке)

### Пользователи
- Список пользователей
- Выбор текущего пользователя (сохраняется в cookie), от его имени выполняются действия в проектах

---

## 🧰 Технологии

- Angular (standalone components)
- RxJS
- Angular CDK Drag&Drop (Kanban)
- TypeScript
- SCSS
- Angular SSR (`@angular/ssr`)

---

## 🧩 Как устроено

- **Standalone-компоненты** без NgModule, Angular 20
- Структура по слоям в духе FSD: `pages` / `widgets` / `features` / `entities` / `shared`
- **Сторы на RxJS**: `BehaviorSubject` + `shareReplay` для списка проектов, выбранного проекта, пользователей и сессии. Без NgRx, но с тем же принципом единого источника данных
- HTTP-сервисы по сущностям (`ProjectService`, `UserService`), запросы идут через dev-прокси `/api` → `localhost:8081`
- **Kanban на Angular CDK Drag&Drop**: перенос между колонками отправляет `PATCH` со сменой `status`, перенос внутри колонки — со сменой `position`
- **SVG-спрайт**: скрипт `scripts/build-sprite.mjs` собирает иконки из `src/assets/icons` в один `sprite.svg`, компонент `icon` выводит иконку по имени

---

## ✅ Требования

- Node.js 18+ (или 20+)
- npm / pnpm / yarn (любой)

---

## 🚀 Быстрый старт

### 1) Подними backend (https://github.com/donuwave/project-manager-dashboard-go/tree/main)

В репозитории backend:

```bash
  docker compose up --build
```

Установи зависимости и запусти frontend:

```bash
  npm i
  npm start
```
